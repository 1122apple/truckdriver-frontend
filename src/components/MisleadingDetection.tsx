import { useState, useRef } from 'react';
import { Upload, Mic, AlertCircle, XCircle, CheckCircle } from 'lucide-react';
import { uploadAndAnalyze, getDetectionReport } from '../utils/api';

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
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    setAnalyzing(true);
    setError('');
    
    try {
      const response = await uploadAndAnalyze(file);
      const report = await getDetectionReport(response.data.reportId);
      
      setResult({
        riskLevel: report.data.riskLevel,
        riskKeywords: report.data.riskKeywords,
        suggestions: report.data.suggestions,
        reportId: report.data._id
      });
      
      setShowResult(true);
    } catch (err) {
      console.error('分析失败:', err);
      setError('分析失败，请稍后重试');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleButtonClick = (type: 'file' | 'audio') => {
    if (type === 'file') {
      fileInputRef.current?.click();
    } else {
      audioInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const getRiskLevelInfo = (level: string) => {
    switch (level) {
      case 'high':
        return {
          icon: <XCircle className="w-8 h-8 text-red-500" />,
          title: '高风险',
          description: '检测到多处严重误导性话术，建议谨慎对待',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-500',
          textColor: 'text-red-900'
        };
      case 'medium':
        return {
          icon: <AlertCircle className="w-8 h-8 text-orange-500" />,
          title: '中风险',
          description: '检测到部分误导性话术，建议仔细核实',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-500',
          textColor: 'text-orange-900'
        };
      case 'low':
        return {
          icon: <CheckCircle className="w-8 h-8 text-green-500" />,
          title: '低风险',
          description: '未检测到明显误导性话术，可以放心购买',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-500',
          textColor: 'text-green-900'
        };
      default:
        return {
          icon: <AlertCircle className="w-8 h-8 text-gray-500" />,
          title: '未知风险',
          description: '无法确定风险等级，请手动核实',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-500',
          textColor: 'text-gray-900'
        };
    }
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
            className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <Upload className="w-6 h-6 text-gray-400" />
            <div className="flex-1 text-left">
              <p className="text-gray-900">上传聊天记录/合同</p>
              <p className="text-gray-500 text-sm">支持图片、PDF、文本文件</p>
            </div>
          </button>

          <button 
            onClick={() => handleButtonClick('audio')}
            className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <Mic className="w-6 h-6 text-gray-400" />
            <div className="flex-1 text-left">
              <p className="text-gray-900">上传录音文件</p>
              <p className="text-gray-500 text-sm">支持MP3、WAV、M4A格式</p>
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

      {/* 错误提示 */}
      {error && (
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
            <XCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* 分析中状态 */}
      {analyzing && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600">AI正在分析中...</p>
            <p className="text-gray-500 text-sm">预计需要3-5秒</p>
          </div>
        </div>
      )}

      {/* 分析结果 */}
      {showResult && result && (
        <>
          {/* 风险评级 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-gray-900 mb-4">风险评级</h2>
            {(() => {
              const info = getRiskLevelInfo(result.riskLevel);
              return (
                <div className={`flex items-center gap-4 p-4 ${info.bgColor} rounded-lg border-l-4 ${info.borderColor}`}>
                  {info.icon}
                  <div>
                    <p className={`${info.textColor}`}>{info.title}</p>
                    <p className={`${info.textColor} text-sm mt-1`}>{info.description}</p>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* 风险关键词 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-gray-900 mb-4">风险关键词识别</h2>
            <div className="flex flex-col gap-3">
              {result.riskKeywords.map((item, index) => (
                <div key={index} className="flex flex-col gap-2 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded text-white text-sm ${
                      item.risk === 'high' ? 'bg-red-500' : item.risk === 'medium' ? 'bg-orange-500' : 'bg-yellow-500'
                    }`}>
                      {item.word}
                    </span>
                    <span className={`text-xs ${
                      item.risk === 'high' ? 'text-red-600' : item.risk === 'medium' ? 'text-orange-600' : 'text-yellow-600'
                    }`}>
                      {item.risk === 'high' ? '高风险' : item.risk === 'medium' ? '中风险' : '低风险'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{item.reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 解读建议 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-gray-900 mb-4">专业建议</h2>
            <div className="flex flex-col gap-3">
              {result.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-sm">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-3">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
              保存报告
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              分享给好友
            </button>
          </div>
        </>
      )}

      {/* 使用说明 */}
      {!showResult && !analyzing && !error && (
        <div className="bg-blue-50 rounded-xl p-4">
          <h3 className="text-gray-900 mb-3">使用说明</h3>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <p>1. 上传与销售人员的聊天记录、合同或录音</p>
            <p>2. AI将自动识别其中的误导性话术</p>
            <p>3. 系统会高亮显示风险关键词并给出风险评级</p>
            <p>4. 根据专业建议决定是否购买该产品</p>
          </div>
        </div>
      )}
    </div>
  );
}
