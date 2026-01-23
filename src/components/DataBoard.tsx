import { TrendingUp, MapPin, AlertTriangle, Shield, BarChart3 } from 'lucide-react';

export default function DataBoard() {
  const regionData = [
    { region: '华东地区', complaints: 456, risk: 'high', change: '+12%' },
    { region: '华南地区', complaints: 328, risk: 'high', change: '+8%' },
    { region: '华北地区', complaints: 287, risk: 'medium', change: '+5%' },
    { region: '西南地区', complaints: 198, risk: 'medium', change: '+3%' },
    { region: '华中地区', complaints: 156, risk: 'low', change: '-2%' },
    { region: '东北地区', complaints: 134, risk: 'low', change: '-5%' },
  ];

  const policyUpdates = [
    {
      province: '上海市',
      policy: '加强互联网保险监管',
      date: '2024-11-20',
      impact: 'high',
    },
    {
      province: '广东省',
      policy: '统筹产品整治通知',
      date: '2024-11-18',
      impact: 'high',
    },
    {
      province: '浙江省',
      policy: '保险销售行为规范',
      date: '2024-11-15',
      impact: 'medium',
    },
    {
      province: '江苏省',
      policy: '消费者权益保护条例',
      date: '2024-11-12',
      impact: 'medium',
    },
  ];

  const riskAgencies = [
    {
      name: '某统筹互助平台',
      location: '上海市',
      complaints: 89,
      risk: 'high',
      issues: ['虚假宣传', '拒赔', '失联'],
    },
    {
      name: '某保险代理公司',
      location: '深圳市',
      complaints: 67,
      risk: 'high',
      issues: ['误导销售', '隐瞒条款'],
    },
    {
      name: '某互助保障组织',
      location: '北京市',
      complaints: 54,
      risk: 'medium',
      issues: ['理赔拖延', '服务差'],
    },
  ];

  const statistics = [
    { label: '总投诉量', value: '12,456', trend: '+15%', color: 'text-red-600' },
    { label: '高风险机构', value: '234', trend: '+8%', color: 'text-orange-600' },
    { label: '成功维权', value: '8,967', trend: '+22%', color: 'text-green-600' },
    { label: '政策更新', value: '45', trend: '+5%', color: 'text-blue-600' },
  ];

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* 页面标题 */}
      <div className="flex flex-col gap-2">
        <h1 className="text-gray-900">数据看板</h1>
        <p className="text-gray-500">全国权益保障数据分析</p>
      </div>

      {/* 核心数据 */}
      <div className="grid grid-cols-2 gap-3">
        {statistics.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
            <p className="text-gray-900 text-2xl mb-1">{stat.value}</p>
            <div className="flex items-center gap-1">
              <TrendingUp className={`w-4 h-4 ${stat.color}`} />
              <span className={`text-sm ${stat.color}`}>{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 区域投诉热力图 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-blue-600" />
          <h2 className="text-gray-900">区域投诉热力</h2>
        </div>
        <div className="flex flex-col gap-3">
          {regionData.map((region, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-gray-900">{region.region}</span>
                  <span className={`px-2 py-1 rounded text-xs text-white ${
                    region.risk === 'high' ? 'bg-red-500' :
                    region.risk === 'medium' ? 'bg-orange-500' : 'bg-green-500'
                  }`}>
                    {region.risk === 'high' ? '高风险' :
                     region.risk === 'medium' ? '中风险' : '低风险'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-900">{region.complaints}</span>
                  <span className={`text-sm ${
                    region.change.startsWith('+') ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {region.change}
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    region.risk === 'high' ? 'bg-red-500' :
                    region.risk === 'medium' ? 'bg-orange-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${(region.complaints / 500) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 政策法规地图 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-blue-600" />
          <h2 className="text-gray-900">最新政策地图</h2>
        </div>
        <div className="flex flex-col gap-3">
          {policyUpdates.map((policy, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{policy.province}</span>
                  </div>
                  <p className="text-gray-700 mb-1">{policy.policy}</p>
                  <p className="text-gray-500 text-xs">{policy.date}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs text-white whitespace-nowrap ml-2 ${
                  policy.impact === 'high' ? 'bg-red-500' : 'bg-orange-500'
                }`}>
                  {policy.impact === 'high' ? '重要' : '一般'}
                </span>
              </div>
              <button className="w-full mt-2 border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                查看详情
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 高风险机构预警 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <h2 className="text-gray-900">高风险机构预警</h2>
        </div>
        <div className="flex flex-col gap-4">
          {riskAgencies.map((agency, index) => (
            <div key={index} className="border-l-4 border-red-500 bg-red-50 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <p className="text-gray-900 mb-1">{agency.name}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600 text-sm">{agency.location}</span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-red-500 text-white text-sm rounded whitespace-nowrap ml-2">
                  {agency.complaints} 投诉
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {agency.issues.map((issue, idx) => (
                  <span key={idx} className="px-2 py-1 bg-white text-red-700 text-xs rounded border border-red-200">
                    {issue}
                  </span>
                ))}
              </div>
              <div className="bg-red-100 rounded p-2">
                <p className="text-red-900 text-sm">⚠️ 建议谨慎选择，避免与该机构交易</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 投诉趋势 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h2 className="text-gray-900">投诉趋势分析</h2>
        </div>
        <div className="flex items-end justify-between h-40 gap-2">
          {[65, 78, 82, 88, 95, 92, 98, 105, 112, 118, 125, 132].map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer" 
                   style={{ height: `${(value / 132) * 100}%` }}>
              </div>
              <span className="text-gray-400 text-xs">{index + 1}月</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-gray-600">月度投诉量</span>
          </div>
          <span className="text-red-600">↑ 持续上升趋势</span>
        </div>
      </div>

      {/* 数据说明 */}
      <div className="bg-blue-50 rounded-xl p-4">
        <h3 className="text-gray-900 mb-3">数据说明</h3>
        <div className="flex flex-col gap-2 text-sm text-gray-600">
          <p>• 数据来源：银保监会、消费者协会等官方渠道</p>
          <p>• 更新频率：每周更新一次</p>
          <p>• 统计周期：2024年1月至今</p>
          <p>• 数据仅供参考，具体以官方发布为准</p>
        </div>
      </div>
    </div>
  );
}
