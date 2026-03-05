import { useState } from 'react';
import { Phone, Upload, Clock, AlertCircle, Check } from 'lucide-react';

export default function ComplaintCenter() {
  const [selectedType, setSelectedType] = useState('');
  const [complaintText, setComplaintText] = useState('');
  const [complaintSubmitted, setComplaintSubmitted] = useState(false);
  const [submittedComplaint, setSubmittedComplaint] = useState<any>(null);

  const complaintTypes = [
    { id: 'insurance', name: '保险公司', desc: '理赔纠纷、拒赔等' },
    { id: 'agent', name: '保险中介', desc: '误导销售、虚假宣传' },
    { id: 'tongchou', name: '统筹机构', desc: '非法经营、欺诈' },
  ];

  const complaints = [
    {
      id: 'C2024112301',
      type: '保险公司',
      title: '理赔拖延问题投诉',
      date: '2024-11-23',
      status: '处理中',
      progress: 60,
    },
    {
      id: 'C2024112201',
      type: '统筹机构',
      title: '误导宣传举报',
      date: '2024-11-22',
      status: '已回复',
      progress: 100,
    },
    {
      id: 'C2024112101',
      type: '保险中介',
      title: '虚假承诺投诉',
      date: '2024-11-21',
      status: '已受理',
      progress: 30,
    },
  ];

  const agencies = [
    {
      name: '银保监会投诉热线',
      phone: '12378',
      time: '工作日 9:00-17:00',
    },
    {
      name: '消费者协会',
      phone: '12315',
      time: '全天24小时',
    },
    {
      name: '保险行业协会',
      phone: '010-66286688',
      time: '工作日 9:00-18:00',
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* 页面标题 */}
      <div className="flex flex-col gap-2">
        <h1 className="text-gray-900">投诉举报中心</h1>
        <p className="text-gray-500">维护您的合法权益</p>
      </div>

      {/* 快速投诉 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        {!complaintSubmitted ? (
          <>
            <h2 className="text-gray-900 mb-4">发起投诉</h2>
            
            {/* 选择投诉对象 */}
            <div className="flex flex-col gap-3 mb-4">
              <label className="text-gray-700">投诉对象</label>
              <div className="grid grid-cols-1 gap-3">
                {complaintTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-4 border-2 rounded-lg text-left transition-colors ${
                      selectedType === type.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="text-gray-900 mb-1">{type.name}</p>
                    <p className="text-gray-500 text-sm">{type.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 投诉事由 */}
            <div className="flex flex-col gap-3 mb-4">
              <label className="text-gray-700">投诉事由</label>
              <textarea
                value={complaintText}
                onChange={(e) => setComplaintText(e.target.value)}
                placeholder="请详细描述投诉的事由、经过和诉求..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* 上传证据 */}
            <div className="flex flex-col gap-3 mb-4">
              <label className="text-gray-700">上传证据</label>
              <button className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <Upload className="w-6 h-6 text-gray-400" />
                <div className="flex-1 text-left">
                  <p className="text-gray-900">上传相关证据材料</p>
                  <p className="text-gray-500 text-sm">支持图片、PDF、音频等格式</p>
                </div>
              </button>
            </div>

            {/* 提交按钮 */}
            <button 
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => {
                // 生成模拟投诉数据
                const newComplaint = {
                  id: 'C' + new Date().getTime(),
                  type: complaintTypes.find(t => t.id === selectedType)?.name || '其他',
                  title: complaintText.substring(0, 20) + (complaintText.length > 20 ? '...' : ''),
                  date: new Date().toISOString().split('T')[0],
                  status: '已受理',
                  progress: 30,
                };
                
                setSubmittedComplaint(newComplaint);
                setComplaintSubmitted(true);
              }}
            >
              提交投诉
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-6 py-8">
            {/* 成功图标 */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            
            {/* 成功信息 */}
            <div className="text-center">
              <h2 className="text-gray-900 text-xl mb-2">投诉提交成功！</h2>
              <p className="text-gray-600 mb-4">您的投诉已被受理，我们将尽快处理</p>
            </div>
            
            {/* 投诉信息 */}
            {submittedComplaint && (
              <div className="w-full border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <p className="text-gray-900 mb-1">{submittedComplaint.title}</p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
                        {submittedComplaint.type}
                      </span>
                      <span className="text-gray-500 text-xs">{submittedComplaint.id}</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded">
                    {submittedComplaint.status}
                  </span>
                </div>
                
                {/* 进度条 */}
                <div className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600 text-xs">处理进度</span>
                    <span className="text-gray-900 text-xs">{submittedComplaint.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all" 
                      style={{ width: `${submittedComplaint.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-500 text-xs">
                  <Clock className="w-4 h-4" />
                  <span>提交时间：{submittedComplaint.date}</span>
                </div>
              </div>
            )}
            
            {/* 操作按钮 */}
            <div className="flex gap-3 w-full">
              <button 
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => {
                  setComplaintSubmitted(false);
                  setSelectedType('');
                  setComplaintText('');
                  setSubmittedComplaint(null);
                }}
              >
                再次投诉
              </button>
              <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                查看详情
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 投诉记录 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-gray-900">我的投诉</h2>
          <button className="text-blue-600 text-sm">查看全部</button>
        </div>
        <div className="flex flex-col gap-3">
          {complaints.map((complaint) => (
            <div key={complaint.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <p className="text-gray-900 mb-1">{complaint.title}</p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
                      {complaint.type}
                    </span>
                    <span className="text-gray-500 text-xs">{complaint.id}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded text-white text-sm whitespace-nowrap ml-2 ${
                  complaint.status === '已回复' ? 'bg-green-500' :
                  complaint.status === '处理中' ? 'bg-blue-500' : 'bg-orange-500'
                }`}>
                  {complaint.status}
                </span>
              </div>
              
              {/* 进度条 */}
              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600 text-xs">处理进度</span>
                  <span className="text-gray-900 text-xs">{complaint.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all" 
                    style={{ width: `${complaint.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <Clock className="w-4 h-4" />
                <span>提交时间：{complaint.date}</span>
              </div>

              <button className="w-full mt-3 border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                查看详情
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 监管机构联系方式 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-gray-900 mb-4">监管机构联系方式</h2>
        <div className="flex flex-col gap-3">
          {agencies.map((agency, index) => (
            <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 mb-1">{agency.name}</p>
                <p className="text-blue-600">{agency.phone}</p>
                <p className="text-gray-500 text-xs mt-1">{agency.time}</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                拨打
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 投诉流程 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-gray-900 mb-4">投诉处理流程</h2>
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
              1
            </div>
            <div>
              <p className="text-gray-900 mb-1">提交投诉</p>
              <p className="text-gray-600 text-sm">填写投诉信息并上传证据材料</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
              2
            </div>
            <div>
              <p className="text-gray-900 mb-1">受理审核</p>
              <p className="text-gray-600 text-sm">监管机构在5个工作日内受理</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
              3
            </div>
            <div>
              <p className="text-gray-900 mb-1">调查处理</p>
              <p className="text-gray-600 text-sm">对投诉事项进行调查核实</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
              4
            </div>
            <div>
              <p className="text-gray-900 mb-1">反馈结果</p>
              <p className="text-gray-600 text-sm">15个工作日内反馈处理结果</p>
            </div>
          </div>
        </div>
      </div>

      {/* 投诉须知 */}
      <div className="bg-orange-50 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-orange-900 mb-2">投诉须知</p>
            <div className="flex flex-col gap-1 text-orange-700 text-sm">
              <p>• 投诉前请准备好相关证据材料</p>
              <p>• 投诉内容应真实、准确、完整</p>
              <p>• 保持电话畅通，以便接收反馈</p>
              <p>• 恶意投诉将承担法律责任</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
