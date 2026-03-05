import { useState, useRef } from 'react';
import { Upload, Mic, AlertCircle, XCircle, CheckCircle, Info } from 'lucide-react';

interface RiskKeyword {
  word: string;
  risk: 'high' | 'medium' | 'low';
  reason: string;
}

interface AnalysisResult {
  riskLevel: 'high' | 'medium' | 'low';
  riskKeywords: RiskKeyword[];
  suggestions: string[];
  reportId: string;
}

export default function MisleadingDetection() {
  const [analyzing, setAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  // 模拟数据 - 类似智能合同解析
  const misleadingCases = [
    {
      word: '统筹',
      risk: 'high',
      original: '我们的统筹产品和保险一样，出事绝对给你赔',
      interpretation: '统筹产品不是保险，不受《保险法》保护。销售方使用"和保险一样"的表述属于误导性宣传，可能构成虚假陈述。',
      highlight: true,
    },
    {
      word: '绝对赔付',
      risk: 'high',
      original: '我们的产品绝对赔付，没有任何免赔条款',
      interpretation: '"绝对赔付"是虚假承诺，违反保险法规定。所有保险产品都有免责条款和免赔范围，消费者应仔细阅读合同条款。',
      highlight: true,
    },
    {
      word: '银保监会备案',
      risk: 'high',
      original: '我们公司在银保监会有备案，是正规金融机构',
      interpretation: '统筹机构不受银保监会监管，没有备案资格。销售方声称在银保监会有备案属于虚假宣传，可能构成欺诈。',
      highlight: true,
    },
    {
      word: '限时优惠',
      risk: 'medium',
      original: '现在购买有限时优惠，过几天就涨价了',
      interpretation: '制造紧迫感诱导消费者仓促决策，属于常见的销售技巧。消费者应保持理性，不要被促销话术影响判断力。',
      highlight: true,
    },
    {
      word: '好多司机都买了',
      risk: 'medium',
      original: '好多货车司机都买了我们的产品，反响很好',
      interpretation: '通过从众心理诱导购买，缺乏实际保障说明。消费者应关注产品本身的保障内容，而非仅凭他人购买情况做决定。',
      highlight: false,
    },
  ];

  const interpretation = [
    {
      type: '产品性质',
      content: '识别到"统筹"等关键词，该产品可能不是正规保险，不受《保险法》保护',
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      type: '销售手法',
      content: '检测到虚假承诺和诱导性话术，建议谨慎对待',
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      type: '风险提示',
      content: '如已购买此类产品，建议咨询专业律师了解维权途径',
      icon: Info,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
  ];

  const handleUpload = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setShowResult(true);
    }, 2000);
  };

  const handleButtonClick = (type: 'file' | 'audio') => {
    // 模拟文件选择后直接上传
    handleUpload();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 模拟文件上传
    handleUpload();
  };

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 模拟音频上传
    handleUpload();
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* 页面标题 */}
      <div className="flex flex-col gap-2">
        <h1 className="text-gray-900">误导话术识别</h1>
        <p className="text-gray-500">AI智能识别保险销售中的误导性话术</p>
      </div>

      {/* 上传区域 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-gray-900 mb-4">上传材料</h2>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleButtonClick('file')}
            className="w-full flex flex-col items-center gap-3 p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <Upload className="w-12 h-12 text-gray-400" />
            <div className="text-center">
              <p className="text-gray-900 mb-1">上传聊天记录/合同照片</p>
              <p className="text-gray-500 text-sm">支持JPG、PNG、PDF格式，大小不超过10MB</p>
            </div>
          </button>

          <button 
            onClick={() => handleButtonClick('audio')}
            className="w-full flex flex-col items-center gap-3 p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <Mic className="w-12 h-12 text-gray-400" />
            <div className="text-center">
              <p className="text-gray-900 mb-1">上传录音文件</p>
              <p className="text-gray-500 text-sm">支持MP3、WAV、M4A格式，大小不超过20MB</p>
            </div>
          </button>

          {/* 隐藏的文件输入 */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png,.pdf,.txt"
            className="hidden"
          />
          <input
            type="file"
            ref={audioInputRef}
            onChange={handleAudioChange}
            accept=".mp3,.wav,.m4a"
            className="hidden"
          />
        </div>
      </div>

      {/* 分析中状态 */}
      {analyzing && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600">AI正在分析中...</p>
            <p className="text-gray-500 text-sm">这可能需要几秒钟</p>
          </div>
        </div>
      )}

      {/* 分析结果 */}
      {showResult && (
        <>
          {/* 风险评估 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-gray-900 mb-4">综合风险评估</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 text-sm">整体风险等级</span>
                  <span className="text-red-600">高风险</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <p className="text-red-600">⚠ 检测到多处严重误导性话术</p>
              <p className="text-red-600">⚠ 产品可能不是正规保险</p>
              <p className="text-orange-600">⚠ 销售手法存在诱导性</p>
            </div>
          </div>

          {/* 误导话术标注 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-gray-900 mb-4">误导话术标注</h2>
            <div className="flex flex-col gap-4">
              {misleadingCases.map((item, index) => (
                <div key={index} className={`border rounded-lg p-4 ${
                  item.highlight ? 'border-orange-300 bg-orange-50' : 'border-gray-200'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-gray-900">{item.word}</p>
                    <span className={`px-2 py-1 rounded text-xs text-white ${
                      item.risk === 'high' ? 'bg-red-500' :
                      item.risk === 'medium' ? 'bg-orange-500' : 'bg-green-500'
                    }`}>
                      {item.risk === 'high' ? '高风险' :
                       item.risk === 'medium' ? '中风险' : '低风险'}
                    </span>
                  </div>
                  <div className="bg-white rounded p-3 mb-2">
                    <p className="text-gray-700 text-sm italic">"{item.original}"</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600 text-sm">{item.interpretation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 通俗版解读 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-gray-900 mb-4">通俗版话术解读</h2>
            <div className="flex flex-col gap-3">
              {interpretation.map((item, index) => (
                <div key={index} className={`${item.bgColor} rounded-lg p-4`}>
                  <div className="flex items-start gap-3">
                    <item.icon className={`w-5 h-5 ${item.color} flex-shrink-0 mt-0.5`} />
                    <div className="flex-1">
                      <p className={`${item.color} mb-1`}>{item.type}</p>
                      <p className="text-gray-700 text-sm">{item.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex flex-col gap-3">
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
              保存分析报告
            </button>
            <button className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition-colors">
              咨询专业律师
            </button>
          </div>
        </>
      )}

      {/* 使用说明 */}
      {!showResult && !analyzing && (
        <div className="bg-blue-50 rounded-xl p-4">
          <h3 className="text-gray-900 mb-3">功能说明</h3>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <p>• 上传与销售人员的聊天记录、合同照片或录音</p>
            <p>• AI自动识别其中的误导性话术和风险关键词</p>
            <p>• 重点标注高风险内容并提供专业解读</p>
            <p>• 评估销售手法的合规性并给出建议</p>
          </div>
        </div>
      )}
    </div>
  );
}
