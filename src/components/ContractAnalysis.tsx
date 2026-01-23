import { useState } from 'react';
import { Upload, FileText, AlertTriangle, Info, CheckCircle } from 'lucide-react';

export default function ContractAnalysis() {
  const [analyzing, setAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleUpload = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setShowResult(true);
    }, 2000);
  };

  const clauses = [
    {
      title: '免责条款',
      risk: 'high',
      original: '因战争、暴乱、核辐射等不可抗力造成的损失不予赔偿',
      interpretation: '这是常见的免责条款，属于正常范围。但要注意是否有过度扩大免责范围的情况。',
      highlight: true,
    },
    {
      title: '赔偿限额',
      risk: 'medium',
      original: '单次事故最高赔偿限额为人民币50万元',
      interpretation: '赔偿限额相对较低，对于货运事故可能不够。建议考虑提高保额。',
      highlight: true,
    },
    {
      title: '隐藏条件',
      risk: 'high',
      original: '被保险人需在事故发生后24小时内报案，否则保险公司有权拒赔',
      interpretation: '这个时限要求较为严格，实际操作中可能难以满足。属于需要重点注意的条款。',
      highlight: true,
    },
    {
      title: '理赔流程',
      risk: 'low',
      original: '保险公司应在收到理赔申请后30日内作出核定',
      interpretation: '符合保险法规定，属于正常条款，对投保人较为有利。',
      highlight: false,
    },
  ];

  const interpretation = [
    {
      type: '产品性质',
      content: '该产品为正规保险产品，受《保险法》保护',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      type: '保障范围',
      content: '涵盖意外伤害、医疗费用、第三者责任，但对职业病、慢性病不保障',
      icon: Info,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      type: '重点提示',
      content: '注意24小时报案时限，建议事故后第一时间联系保险公司',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* 页面标题 */}
      <div className="flex flex-col gap-2">
        <h1 className="text-gray-900">智能合同解析</h1>
        <p className="text-gray-500">AI帮您解读保险合同条款</p>
      </div>

      {/* 上传区域 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-gray-900 mb-4">上传保险合同</h2>
        <button
          onClick={handleUpload}
          className="w-full flex flex-col items-center gap-3 p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
        >
          <Upload className="w-12 h-12 text-gray-400" />
          <div className="text-center">
            <p className="text-gray-900 mb-1">点击上传合同文件</p>
            <p className="text-gray-500 text-sm">支持PDF、图片格式，大小不超过10MB</p>
          </div>
        </button>
      </div>

      {/* 分析中 */}
      {analyzing && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600">AI正在解析合同条款...</p>
            <p className="text-gray-500 text-sm">这可能需要几秒钟</p>
          </div>
        </div>
      )}

      {/* 分析结果 */}
      {showResult && (
        <>
          {/* 合同概览 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-blue-600" />
              <h2 className="text-gray-900">合同概览</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-gray-500 text-sm">产品名称</p>
                <p className="text-gray-900">货车司机综合保险</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-gray-500 text-sm">保险公司</p>
                <p className="text-gray-900">中国人保</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-gray-500 text-sm">保险期限</p>
                <p className="text-gray-900">1年</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-gray-500 text-sm">保险金额</p>
                <p className="text-gray-900">100万元</p>
              </div>
            </div>
          </div>

          {/* 重点条款标注 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-gray-900 mb-4">重点条款标注</h2>
            <div className="flex flex-col gap-4">
              {clauses.map((clause, index) => (
                <div key={index} className={`border rounded-lg p-4 ${
                  clause.highlight ? 'border-orange-300 bg-orange-50' : 'border-gray-200'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-gray-900">{clause.title}</p>
                    <span className={`px-2 py-1 rounded text-xs text-white ${
                      clause.risk === 'high' ? 'bg-red-500' :
                      clause.risk === 'medium' ? 'bg-orange-500' : 'bg-green-500'
                    }`}>
                      {clause.risk === 'high' ? '高风险' :
                       clause.risk === 'medium' ? '中风险' : '低风险'}
                    </span>
                  </div>
                  <div className="bg-white rounded p-3 mb-2">
                    <p className="text-gray-700 text-sm italic">"{clause.original}"</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600 text-sm">{clause.interpretation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 通俗版解读 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-gray-900 mb-4">通俗版条款解读</h2>
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

          {/* 风险评估 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-gray-900 mb-4">综合风险评估</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 text-sm">整体风险等级</span>
                  <span className="text-orange-600">中等</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <p className="text-gray-600">✓ 这是正规保险产品</p>
              <p className="text-gray-600">✓ 保障范围较为全面</p>
              <p className="text-orange-600">⚠ 报案时限要求严格</p>
              <p className="text-orange-600">⚠ 赔偿限额相对较低</p>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex flex-col gap-3">
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
              下载解读报告
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
            <p>• 上传保险合同，AI自动识别关键条款</p>
            <p>• 重点标注免责条款、赔偿限额等重要内容</p>
            <p>• 提供通俗易懂的条款解读</p>
            <p>• 评估合同整体风险等级</p>
          </div>
        </div>
      )}
    </div>
  );
}
