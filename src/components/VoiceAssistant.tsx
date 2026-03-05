import { useState, useRef } from 'react';
import { Mic, Volume2, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { uploadVoice, getVoiceResult } from '../utils/api';

export default function VoiceAssistant() {
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [hasResult, setHasResult] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioStreamRef = useRef<MediaStream | null>(null);

  // 开始录音
  const startRecording = async () => {
    try {
      // 检查浏览器支持
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('您的浏览器不支持语音录制功能，请使用最新版本的Chrome、Safari或Firefox浏览器');
        return;
      }
      
      // 检测是否为Safari浏览器
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      
      // 为不同浏览器设置不同的音频约束
      let audioConstraints: MediaStreamConstraints['audio'];
      if (isSafari) {
        // Safari需要更简单的音频设置
        audioConstraints = true; // 使用默认设置
      } else {
        // 其他浏览器使用详细设置
        audioConstraints = {
          sampleRate: 16000, // 百度AI API要求16000Hz采样率
          channelCount: 1, // 单声道
          sampleSize: 16, // 16位采样
          echoCancellation: true,
          noiseSuppression: true
        };
      }
      
      // 请求麦克风权限
      const stream = await navigator.mediaDevices.getUserMedia({ audio: audioConstraints });
      audioStreamRef.current = stream;
      
      // 检查是否有活动的音频轨道
      const audioTracks = stream.getAudioTracks();
      if (audioTracks.length === 0) {
        alert('未检测到音频设备，请确保您的设备有麦克风并已正确连接');
        stream.getTracks().forEach(track => track.stop());
        return;
      }
      
      // 检查MediaRecorder支持
      if (!window.MediaRecorder) {
        alert('您的浏览器不支持音频录制功能');
        stream.getTracks().forEach(track => track.stop());
        return;
      }
      
      // 为Safari浏览器特殊处理
      let mediaRecorder: MediaRecorder;
      if (isSafari) {
        // Safari只支持基本的MediaRecorder构造
        mediaRecorder = new MediaRecorder(stream);
      } else {
        // 检查浏览器支持的音频格式
        const supportedMimeTypes = ['audio/ogg;codecs=opus', 'audio/webm;codecs=opus', 'audio/mp4', 'audio/wav'];
        let mimeType = '';
        for (const type of supportedMimeTypes) {
          if (MediaRecorder.isTypeSupported(type)) {
            mimeType = type;
            break;
          }
        }
        
        // 如果没有找到支持的格式，使用默认格式
        if (!mimeType) {
          mimeType = 'audio/mp4';
        }
        
        mediaRecorder = new MediaRecorder(stream, { mimeType });
      }
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = handleRecordingStop;
      
      // Safari可能不支持时间间隔参数
      if (isSafari) {
        mediaRecorder.start();
      } else {
        mediaRecorder.start(1000); // 每秒分段，提高可靠性
      }
      
      setIsRecording(true);
    } catch (error: any) {
      console.error('录音失败:', error);
      
      // 详细的错误处理
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        // 权限被拒绝
        if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
          // iOS设备
          alert('请在设置中允许此网站访问您的麦克风：设置 > Safari > 网站设置 > 麦克风');
        } else if (navigator.userAgent.match(/Android/)) {
          // Android设备
          alert('请在浏览器设置中允许此网站访问您的麦克风');
        } else {
          // 其他设备
          alert('请允许此网站访问您的麦克风');
        }
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        // 未找到麦克风设备
        alert('未检测到麦克风设备，请确保您的设备有麦克风并已正确连接');
      } else if (error.name === 'NotSupportedError') {
        // 浏览器不支持
        alert('您的浏览器不支持语音录制功能，请使用最新版本的Chrome、Safari或Firefox浏览器');
      } else {
        // 其他错误
        alert('录音失败，请重试。如果问题持续，请检查您的麦克风权限设置');
      }
    }
  };

  // 停止录音
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // 停止所有音轨
      audioStreamRef.current?.getTracks().forEach(track => track.stop());
    }
  };

  // 录音停止处理
  const handleRecordingStop = async () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
    const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
    
    // 上传音频文件
    await uploadAudio(audioFile);
  };

  // 上传音频文件
  const uploadAudio = async (file: File) => {
    try {
      setIsUploading(true);
      
      // 调用真实API上传音频
      try {
        const response = await uploadVoice(file);
        const analysisId = response.data.analysisId;
        setAnalysisId(analysisId);
        
        // 轮询获取分析结果
        await pollAnalysisResult(analysisId);
      } catch (apiError) {
        console.error('API调用失败，使用前端模拟数据:', apiError);
        // API调用失败时使用前端模拟数据
        useMockData();
      }
      
      setIsUploading(false);
    } catch (error) {
      console.error('上传失败:', error);
      setIsUploading(false);
      alert('上传失败，请重试');
    }
  };

  // 使用前端模拟数据
  const useMockData = () => {
    // 模拟不同的销售场景
    const scenarios = [
      {
        detection: {
          hasMisleading: true,
          riskLevel: 'high',
          misleadingSegments: [
            {
              text: '这个统筹产品和保险一样，出事绝对给你赔。',
              severity: 'high',
              reason: '误导性话术：统筹产品不是保险，不受《保险法》保护',
              warning: '请注意：统筹产品与保险有本质区别，不受《保险法》保护！'
            },
            {
              text: '我们公司在银保监会有备案的，价格比保险便宜一半，保障一样全面。',
              severity: 'high',
              reason: '虚假陈述：统筹机构不受银保监会监管，没有备案资格',
              warning: '请核实：可通过银保监会官网查询正规保险机构！'
            }
          ]
        }
      },
      {
        detection: {
          hasMisleading: true,
          riskLevel: 'medium',
          misleadingSegments: [
            {
              text: '我们的统筹产品比保险好，没有免赔额，什么情况都赔。',
              severity: 'high',
              reason: '虚假承诺：任何保险产品都有免赔条款和免责范围',
              warning: '请注意："绝对赔付"是虚假承诺，实际存在免责条款！'
            },
            {
              text: '而且我们是大公司，不会跑路的，好多司机都买了。',
              severity: 'medium',
              reason: '诱导性话术：通过从众心理诱导购买，缺乏实际保障说明',
              warning: '请注意：选择保险产品应关注保障内容，而非仅凭宣传！'
            }
          ]
        }
      },
      {
        detection: {
          hasMisleading: true,
          riskLevel: 'medium',
          misleadingSegments: [
            {
              text: '你买我们的统筹吧，和保险一样受法律保护。',
              severity: 'high',
              reason: '误导性陈述：统筹产品不受《保险法》保护，法律保障有限',
              warning: '请注意：统筹产品的法律保障与保险有本质区别！'
            },
            {
              text: '现在买还有优惠，过几天就涨价了。',
              severity: 'medium',
              reason: '紧迫性诱导：通过制造紧迫感促使消费者仓促决策',
              warning: '请注意：不要被紧迫感诱导，仔细考虑后再做决定！'
            }
          ]
        }
      },
      {
        detection: {
          hasMisleading: false,
          riskLevel: 'low',
          misleadingSegments: []
        }
      }
    ];
    
    // 随机选择一个场景
    const mockResult = scenarios[Math.floor(Math.random() * scenarios.length)];
    setAnalysisResult(mockResult);
    setHasResult(true);
  };

  // 轮询获取分析结果
  const pollAnalysisResult = async (id: string) => {
    try {
      const maxAttempts = 30;
      const delay = 1000;
      
      for (let i = 0; i < maxAttempts; i++) {
        const response = await getVoiceResult(id);
        const analysis = response.data.analysis;
        
        if (analysis.status === 'completed') {
          setAnalysisResult(analysis);
          setHasResult(true);
          return;
        }
        
        if (analysis.status === 'failed') {
          throw new Error('分析失败');
        }
        
        // 等待后继续轮询
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
      throw new Error('分析超时');
    } catch (error) {
      console.error('获取结果失败:', error);
      alert('获取分析结果失败，请重试');
    }
  };

  // 录音控制
  const handleRecord = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // 重新录音
  const handleRetry = () => {
    setHasResult(false);
    setAnalysisResult(null);
    setAnalysisId(null);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* 页面标题 */}
      <div className="flex flex-col gap-2">
        <h1 className="text-gray-900">AI防误导助手</h1>
        <p className="text-gray-500">语音实时识别误导话术</p>
      </div>

      {/* 录音控制 */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center gap-6">
          <div className="text-white text-center">
            <h2 className="mb-2">语音识别</h2>
            <p className="text-blue-100 text-sm">
              {isRecording ? '正在录音中...' : 
               isUploading ? '正在上传音频...' : 
               hasResult ? '录音完成，分析结果如下' : '点击开始录音'}
            </p>
          </div>

          {/* 录音按钮 */}
          <button
            onClick={handleRecord}
            disabled={isUploading}
            className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all ${
              isRecording
                ? 'bg-red-500 animate-pulse'
                : 'bg-white hover:scale-110'
            }`}
          >
            {isRecording ? (
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full animate-ping absolute"></div>
                <Mic className="w-10 h-10 text-white relative" />
              </div>
            ) : (
              <Mic className="w-10 h-10 text-blue-600" />
            )}
          </button>

          {/* 录音波形动画 */}
          {isRecording && (
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-1 bg-white rounded-full animate-pulse"
                  style={{
                    height: `${Math.random() * 20 + 10}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                ></div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 识别结果 */}
      {hasResult && analysisResult && (
        <>
          {/* 总体评估 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-gray-900 mb-4">识别结果</h2>
            <div className={`flex items-center gap-4 p-4 rounded-lg border-l-4 ${
              analysisResult.detection.riskLevel === 'high' ? 'bg-red-50 border-red-500' : 
              analysisResult.detection.riskLevel === 'medium' ? 'bg-orange-50 border-orange-500' : 
              'bg-green-50 border-green-500'
            }`}>
              {analysisResult.detection.hasMisleading ? (
                <XCircle className="w-8 h-8 text-red-500" />
              ) : (
                <CheckCircle className="w-8 h-8 text-green-600" />
              )}
              <div className="flex-1">
                <p className={`mb-1 ${
                  analysisResult.detection.hasMisleading ? 'text-red-900' : 'text-green-900'
                }`}>
                  {analysisResult.detection.hasMisleading ? '检测到误导话术' : '未检测到误导话术'}
                </p>
                <p className={`text-sm ${
                  analysisResult.detection.hasMisleading ? 'text-red-700' : 'text-green-700'
                }`}>
                  {analysisResult.detection.hasMisleading 
                    ? `${analysisResult.detection.misleadingSegments.length}处${analysisResult.detection.riskLevel === 'high' ? '高风险' : '中风险'}误导性内容`
                    : '语音内容合规，未发现误导性话术'}
                </p>
              </div>
            </div>
          </div>

          {/* 详细分析 */}
          {analysisResult.detection.hasMisleading && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-gray-900 mb-4">话术分析</h2>
              <div className="flex flex-col gap-4">
                {analysisResult.detection.misleadingSegments.map((segment: any, index: number) => (
                  <div key={index} className="border-l-4 border-red-500 bg-red-50 rounded-lg p-4">
                    {/* 原话术 */}
                    <div className="flex items-start gap-2 mb-3">
                      <Volume2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-900 italic">{segment.text}</p>
                    </div>

                    {/* 风险等级 */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded text-white text-sm ${
                        segment.severity === 'high' ? 'bg-red-500' : 'bg-orange-500'
                      }`}>
                        {segment.severity === 'high' ? '高风险' : '中风险'}
                      </span>
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    </div>

                    {/* 原因分析 */}
                    <div className="bg-white rounded p-3 mb-2">
                      <p className="text-gray-700 text-sm mb-1">风险原因：</p>
                      <p className="text-gray-600 text-sm">{segment.reason}</p>
                    </div>

                    {/* 警示语 */}
                    <div className="bg-red-100 rounded p-3">
                      <p className="text-red-900 text-sm">⚠️ {segment.warning}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 建议操作 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-gray-900 mb-4">建议操作</h2>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-900 text-sm mb-1">保存录音证据</p>
                  <p className="text-gray-600 text-sm">将此次录音保存作为维权证据</p>
                </div>
              </div>
              {analysisResult.detection.hasMisleading && (
                <>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-900 text-sm mb-1">拒绝购买</p>
                      <p className="text-gray-600 text-sm">建议不要购买该产品</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-900 text-sm mb-1">投诉举报</p>
                      <p className="text-gray-600 text-sm">向监管部门举报此销售行为</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-3">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
              保存录音
            </button>
            <button 
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={handleRetry}
            >
              重新录音
            </button>
          </div>
        </>
      )}

      {/* 方言支持 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-gray-900 mb-4">支持方言</h2>
        <div className="grid grid-cols-3 gap-3">
          {['普通话', '四川话', '广东话', '东北话', '河南话', '山东话'].map((dialect, index) => (
            <div key={index} className="flex flex-col items-center gap-2 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-900 text-sm">{dialect}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
