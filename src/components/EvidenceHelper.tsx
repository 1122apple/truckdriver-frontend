import { useState } from 'react';
import { Mic, Camera, MessageSquare, FileText, Download, Plus, Check } from 'lucide-react';

export default function EvidenceHelper() {
  const [evidenceList] = useState([
    { id: 1, type: '录音', name: '销售电话录音.mp3', date: '2024-11-20', status: '已保存' },
    { id: 2, type: '截图', name: '微信聊天记录.jpg', date: '2024-11-21', status: '已保存' },
    { id: 3, type: '合同', name: '保险合同扫描件.pdf', date: '2024-11-22', status: '已保存' },
  ]);

  const evidenceTypes = [
    {
      type: '录音证据',
      icon: Mic,
      color: 'bg-purple-500',
      items: ['销售推销电话录音', '理赔沟通录音', '现场录音'],
    },
    {
      type: '图片证据',
      icon: Camera,
      color: 'bg-blue-500',
      items: ['事故现场照片', '合同照片', '车辆损坏照片'],
    },
    {
      type: '聊天记录',
      icon: MessageSquare,
      color: 'bg-green-500',
      items: ['微信聊天截图', 'QQ聊天截图', '短信记录'],
    },
    {
      type: '文件证据',
      icon: FileText,
      color: 'bg-orange-500',
      items: ['保险合同', '缴费凭证', '拒赔通知'],
    },
  ];

  const guideSteps = [
    {
      step: 1,
      title: '及时保存',
      description: '事故发生或产生纠纷后，第一时间保存所有相关证据',
    },
    {
      step: 2,
      title: '分类整理',
      description: '按照证据类型分类保存，便于后续查找和使用',
    },
    {
      step: 3,
      title: '多重备份',
      description: '重要证据建议保存多个副本，避免丢失',
    },
    {
      step: 4,
      title: '标注信息',
      description: '记录证据的时间、地点、人物等关键信息',
    },
  ];

  const templates = [
    { name: '投诉申请书', desc: '向监管部门投诉使用' },
    { name: '民事起诉状', desc: '提起民事诉讼使用' },
    { name: '证据清单', desc: '整理提交证据使用' },
    { name: '情况说明', desc: '详细说明事件经过' },
  ];

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* 页面标题 */}
      <div className="flex flex-col gap-2">
        <h1 className="text-gray-900">举证助手</h1>
        <p className="text-gray-500">帮助您收集和管理维权证据</p>
      </div>

      {/* 证据统计 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-sm p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <h2>我的证据</h2>
          <button className="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-3xl mb-1">{evidenceList.length}</p>
            <p className="text-blue-100 text-sm">总证据数</p>
          </div>
          <div className="text-center">
            <p className="text-3xl mb-1">3</p>
            <p className="text-blue-100 text-sm">关键证据</p>
          </div>
          <div className="text-center">
            <p className="text-3xl mb-1">100%</p>
            <p className="text-blue-100 text-sm">完整度</p>
          </div>
        </div>
      </div>

      {/* 快速添加证据 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-gray-900 mb-4">快速添加证据</h2>
        <div className="grid grid-cols-2 gap-3">
          {evidenceTypes.map((item, index) => (
            <button
              key={index}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <div className={`${item.color} rounded-lg p-2`}>
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-900 text-sm">{item.type}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 证据清单 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-gray-900">证据清单</h2>
          <button className="text-blue-600 text-sm">导出清单</button>
        </div>
        <div className="flex flex-col gap-3">
          {evidenceList.map((evidence) => (
            <div key={evidence.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 text-sm mb-1">{evidence.name}</p>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded">
                    {evidence.type}
                  </span>
                  <span className="text-gray-500 text-xs">{evidence.date}</span>
                </div>
              </div>
              <Check className="w-5 h-5 text-green-500" />
            </div>
          ))}
        </div>
      </div>

      {/* 举证指引 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-gray-900 mb-4">举证指引</h2>
        <div className="flex flex-col gap-4">
          {guideSteps.map((step) => (
            <div key={step.step} className="flex gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                {step.step}
              </div>
              <div className="flex-1">
                <p className="text-gray-900 mb-1">{step.title}</p>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 证据要求 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-gray-900 mb-4">各类证据要求</h2>
        <div className="flex flex-col gap-3">
          {evidenceTypes.map((type, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className={`${type.color} rounded p-1.5`}>
                  <type.icon className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-900">{type.type}</p>
              </div>
              <div className="flex flex-col gap-1">
                {type.items.map((item, idx) => (
                  <p key={idx} className="text-gray-600 text-sm">• {item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 法律文书模板 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-gray-900 mb-4">法律文书模板</h2>
        <div className="grid grid-cols-2 gap-3">
          {templates.map((template, index) => (
            <button
              key={index}
              className="flex flex-col items-start gap-2 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <Download className="w-5 h-5 text-blue-600" />
              <div className="text-left">
                <p className="text-gray-900 text-sm mb-1">{template.name}</p>
                <p className="text-gray-500 text-xs">{template.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 重要提示 */}
      <div className="bg-orange-50 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-orange-900 mb-1">证据保全提示</p>
            <p className="text-orange-700 text-sm">证据的真实性、合法性和关联性是维权成功的关键。建议及时保存原始证据，必要时可申请公证或向法院申请证据保全。</p>
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
        生成完整证据清单
      </button>
    </div>
  );
}
