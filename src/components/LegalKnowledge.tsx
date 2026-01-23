import { useState } from 'react';
import { Search, BookOpen, FileText, Scale, ChevronRight } from 'lucide-react';

export default function LegalKnowledge() {
  const [searchQuery, setSearchQuery] = useState('');

  const laws = [
    {
      title: '《中华人民共和国保险法》',
      summary: '规范保险活动的基本法律，保护投保人、被保险人和受益人的合法权益',
      articles: 8,
    },
    {
      title: '《交通安全统筹管理通知》',
      summary: '明确交通安全统筹不是保险，不受保险法保护',
      articles: 5,
    },
    {
      title: '《消费者权益保护法》',
      summary: '保护消费者合法权益，规范经营者行为',
      articles: 6,
    },
  ];

  const cases = [
    {
      number: '(2022)沪0115民初7343号',
      title: '货车司机诉统筹机构拒赔案',
      court: '上海市浦东新区人民法院',
      result: '原告胜诉',
      summary: '统筹组织以各种理由拒赔，法院认定其行为违反合同约定，判决赔偿',
      keyPoints: ['统筹非保险', '合同效力', '举证责任'],
    },
    {
      number: '(2023)京0108民初2156号',
      title: '误导销售保险产品纠纷',
      court: '北京市海淀区人民法院',
      result: '调解结案',
      summary: '销售人员误导宣传统筹为保险，法院主持调解，保险公司退还保费',
      keyPoints: ['误导销售', '证据保全', '录音录像'],
    },
    {
      number: '(2023)粤0106民初8934号',
      title: '货运保险理赔争议案',
      court: '广州市天河区人民法院',
      result: '原告部分胜诉',
      summary: '保险公司以免责条款拒赔，法院认定条款未明确告知，判决部分赔偿',
      keyPoints: ['免责条款', '告知义务', '格式合同'],
    },
  ];

  const evidenceGuide = [
    {
      type: '录音录像',
      description: '保存销售人员的推销录音或录像',
      tips: '确保录音清晰，能够识别销售人员身份和误导话术',
    },
    {
      type: '聊天记录',
      description: '保存微信、QQ等聊天记录截图',
      tips: '完整保存对话记录，包括时间、对方信息等',
    },
    {
      type: '合同文件',
      description: '保管好所有签署的合同和协议',
      tips: '注意保留原件，拍照备份电子版',
    },
    {
      type: '支付凭证',
      description: '保存缴费记录、转账凭证',
      tips: '银行流水、支付宝/微信转账记录都要保存',
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* 页面标题 */}
      <div className="flex flex-col gap-2">
        <h1 className="text-gray-900">法律知识库</h1>
        <p className="text-gray-500">查询法律法规和维权案例</p>
      </div>

      {/* 搜索框 */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索法律法规、案例..."
            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 法律法规 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <h2 className="text-gray-900">相关法律法规</h2>
        </div>
        <div className="flex flex-col gap-3">
          {laws.map((law, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <p className="text-gray-900 flex-1">{law.title}</p>
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </div>
              <p className="text-gray-600 text-sm mb-2">{law.summary}</p>
              <span className="text-blue-600 text-xs">{law.articles} 个重点条款</span>
            </div>
          ))}
        </div>
      </div>

      {/* 典型案例 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Scale className="w-5 h-5 text-blue-600" />
          <h2 className="text-gray-900">典型案例查询</h2>
        </div>
        <div className="flex flex-col gap-4">
          {cases.map((caseItem, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="text-gray-900 mb-1">{caseItem.title}</p>
                  <p className="text-gray-500 text-sm">{caseItem.number}</p>
                </div>
                <span className={`px-3 py-1 rounded text-white text-sm whitespace-nowrap ml-2 ${
                  caseItem.result.includes('胜诉') ? 'bg-green-500' : 'bg-blue-500'
                }`}>
                  {caseItem.result}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{caseItem.summary}</p>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-gray-400" />
                <p className="text-gray-500 text-sm">{caseItem.court}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {caseItem.keyPoints.map((point, idx) => (
                  <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">
                    {point}
                  </span>
                ))}
              </div>
              <button className="w-full mt-3 border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                查看裁判文书
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 举证要点 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-gray-900 mb-4">举证要点提示</h2>
        <div className="flex flex-col gap-3">
          {evidenceGuide.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
                  {index + 1}
                </div>
                <p className="text-gray-900">{item.type}</p>
              </div>
              <p className="text-gray-600 text-sm">{item.description}</p>
              <div className="bg-blue-50 rounded p-2 mt-1">
                <p className="text-blue-700 text-sm">💡 {item.tips}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 常见问题 */}
      <div className="bg-blue-50 rounded-xl p-4">
        <h3 className="text-gray-900 mb-3">维权常见问题</h3>
        <div className="flex flex-col gap-2 text-sm text-gray-600">
          <p>Q: 统筹产品拒赔怎么办？</p>
          <p className="text-gray-900">A: 保留所有证据，向消协或银保监会投诉，必要时可提起诉讼。</p>
          <p className="mt-2">Q: 销售时被误导如何维权？</p>
          <p className="text-gray-900">A: 及时收集录音、聊天记录等证据，向监管部门举报并要求退费。</p>
        </div>
      </div>
    </div>
  );
}
