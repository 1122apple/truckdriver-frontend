import { useState } from 'react';
import { Mic, Volume2, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function VoiceAssistant() {
  const [isRecording, setIsRecording] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const handleRecord = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setHasResult(true);
    }, 3000);
  };

  const detectionResults = [
    {
      text: '"这个统筹产品和保险一样，出事绝对给你赔"',
      isMisleading: true,
      severity: 'high',
      reason: '误导性话术：统筹产品不是保险，"绝对赔付"属于虚假承诺',
      warning: '请注意：此为典型误导话术！',
    },
    {
      text: '"我们公司在银保监会有备案的"',
      isMisleading: true,
      severity: 'high',
      reason: '虚假陈述：统筹机构不受银保监会监管',
      warning: '请核实：可通过银保监会官网查询',
    },
    {
      text: '"价格比保险便宜一半，保障一样全面"',
      isMisleading: true,
      severity: 'medium',
      reason: '夸大宣传：低价通常意味着保障范围有限',
      warning: '建议：详细了解保障范围和免责条款',
    },
  ];

  const dialectSupport = [
    { name: '普通话', status: 'supported' },
    { name: '四川话', status: 'supported' },
    { name: '广东话', status: 'supported' },
    { name: '东北话', status: 'supported' },
    { name: '河南话', status: 'supported' },
    { name: '山东话', status: 'supported' },
  ];

  const usageGuide = [
    '点击"开始录音"按钮',
    '对着手机说出销售人员的话术',
    'AI将实时分析并判断是否存在误导',
    '查看详细的风险提示和建议',
  ];

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
              {isRecording ? '正在录音中...' : hasResult ? '录音完成' : '点击开始录音'}
            </p>
          </div>

          {/* 录音按钮 */}
          <button
            onClick={handleRecord}
            disabled={isRecording}
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
      {hasResult && (
        <>
          {/* 总体评估 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-gray-900 mb-4">识别结果</h2>
            <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
              <XCircle className="w-8 h-8 text-red-500" />
              <div className="flex-1">
                <p className="text-red-900 mb-1">检测到误导话术</p>
                <p className="text-red-700 text-sm">识别到3处高风险误导性内容</p>
              </div>
            </div>
          </div>

          {/* 详细分析 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-gray-900 mb-4">话术分析</h2>
            <div className="flex flex-col gap-4">
              {detectionResults.map((result, index) => (
                <div key={index} className="border-l-4 border-red-500 bg-red-50 rounded-lg p-4">
                  {/* 原话术 */}
                  <div className="flex items-start gap-2 mb-3">
                    <Volume2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-900 italic">"{result.text}"</p>
                  </div>

                  {/* 风险等级 */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded text-white text-sm ${
                      result.severity === 'high' ? 'bg-red-500' : 'bg-orange-500'
                    }`}>
                      {result.severity === 'high' ? '高风险' : '中风险'}
                    </span>
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  </div>

                  {/* 原因分析 */}
                  <div className="bg-white rounded p-3 mb-2">
                    <p className="text-gray-700 text-sm mb-1">风险原因：</p>
                    <p className="text-gray-600 text-sm">{result.reason}</p>
                  </div>

                  {/* 警示语 */}
                  <div className="bg-red-100 rounded p-3">
                    <p className="text-red-900 text-sm">⚠️ {result.warning}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-3">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
              保存录音
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              重新录音
            </button>
          </div>
        </>
      )}

      {/* 方言支持 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-gray-900 mb-4">支持方言</h2>
        <div className="grid grid-cols-3 gap-3">
          {dialectSupport.map((dialect, index) => (
            <div key={index} className="flex flex-col items-center gap-2 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-900 text-sm">{dialect.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 使用说明 */}
      {!hasResult && !isRecording && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-gray-900 mb-4">使用说明</h2>
          <div className="flex flex-col gap-3">
            {usageGuide.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-600 flex-1">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 功能特点 */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
        <h3 className="text-gray-900 mb-3">功能特点</h3>
        <div className="flex flex-col gap-2 text-sm text-gray-600">
          <p>✓ 实时语音识别，快速判断</p>
          <p>✓ 支持多种方言识别</p>
          <p>✓ AI智能分析话术风险</p>
          <p>✓ 即时提供防范建议</p>
        </div>
      </div>
    </div>
  );
}
