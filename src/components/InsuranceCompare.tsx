import { Check, X, TrendingUp, Shield } from 'lucide-react';

export default function InsuranceCompare() {
  const comparisonData = [
    {
      category: '法律性质',
      insurance: '受《保险法》保护的金融产品',
      tongchou: '互助性质，不受保险法保护',
      insuranceGood: true,
    },
    {
      category: '监管机构',
      insurance: '银保监会严格监管',
      tongchou: '缺乏有效监管',
      insuranceGood: true,
    },
    {
      category: '赔付保障',
      insurance: '法律强制履约，有保障基金',
      tongchou: '无法律强制力，赔付无保障',
      insuranceGood: true,
    },
    {
      category: '理赔流程',
      insurance: '规范透明，有投诉渠道',
      tongchou: '流程不透明，维权困难',
      insuranceGood: true,
    },
    {
      category: '保障范围',
      insurance: '条款明确，保障全面',
      tongchou: '条款模糊，保障有限',
      insuranceGood: true,
    },
    {
      category: '价格',
      insurance: '相对较高',
      tongchou: '价格较低',
      insuranceGood: false,
    },
  ];

  const recommendedProducts = [
    {
      name: '货车司机综合保险A',
      company: '中国人保',
      coverage: '最高200万',
      price: '3,800元/年',
      features: ['意外伤害', '医疗费用', '第三者责任', '法律援助'],
    },
    {
      name: '货运责任险B',
      company: '平安保险',
      coverage: '最高150万',
      price: '3,200元/年',
      features: ['货物损失', '车辆损坏', '人身伤害', '24小时救援'],
    },
    {
      name: '商用车保障计划C',
      company: '太平洋保险',
      coverage: '最高180万',
      price: '3,500元/年',
      features: ['全面保障', '快速理赔', '异地出险', '法律咨询'],
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* 页面标题 */}
      <div className="flex flex-col gap-2">
        <h1 className="text-gray-900">保险产品对比</h1>
        <p className="text-gray-500">了解正规保险与统筹产品的本质区别</p>
      </div>

      {/* 警告提示 */}
      <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-900 mb-1">重要警示</p>
            <p className="text-red-700 text-sm">交通安全统筹不是保险！一旦发生事故，赔付无法律保障，维权困难。</p>
          </div>
        </div>
      </div>

      {/* 对比表格 */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
          <h2 className="text-white">正规保险 vs 交通安全统筹</h2>
        </div>
        <div className="flex flex-col">
          {comparisonData.map((item, index) => (
            <div key={index} className="border-b border-gray-100 last:border-0">
              <div className="p-4 bg-gray-50">
                <p className="text-gray-900">{item.category}</p>
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-100">
                <div className="p-4 flex items-start gap-2">
                  {item.insuranceGood ? (
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  )}
                  <p className="text-gray-700 text-sm">{item.insurance}</p>
                </div>
                <div className="p-4 flex items-start gap-2">
                  {!item.insuranceGood ? (
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  )}
                  <p className="text-gray-700 text-sm">{item.tongchou}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 关键差异说明 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-gray-900 mb-4">关键差异说明</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-gray-900">保障范围</p>
            <p className="text-gray-600 text-sm">正规保险条款经过监管审核，保障范围明确；统筹产品条款随意，常有隐藏免责条款。</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-gray-900">理赔流程</p>
            <p className="text-gray-600 text-sm">保险公司理赔有标准流程和时限要求；统筹组织理赔随意性大，常以各种理由拒赔。</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-gray-900">法律效力</p>
            <p className="text-gray-600 text-sm">保险合同受法律保护，可依法维权；统筹协议效力存疑，维权成本高且成功率低。</p>
          </div>
        </div>
      </div>

      {/* AI推荐产品 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-blue-600" />
          <h2 className="text-gray-900">AI推荐正规产品</h2>
        </div>
        <div className="flex flex-col gap-4">
          {recommendedProducts.map((product, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-gray-900 mb-1">{product.name}</p>
                  <p className="text-gray-500 text-sm">{product.company}</p>
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-gray-600 text-sm">最高保额</p>
                  <p className="text-blue-600">{product.coverage}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 text-sm">保费</p>
                  <p className="text-orange-600">{product.price}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {product.features.map((feature, idx) => (
                  <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">
                    {feature}
                  </span>
                ))}
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                了解详情
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 底部提示 */}
      <div className="bg-green-50 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-green-900 mb-1">选择建议</p>
            <p className="text-green-700 text-sm">建议选择正规保险公司产品，虽然价格稍高，但保障更全面，理赔更有保障。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
