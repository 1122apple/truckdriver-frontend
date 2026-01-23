import { useState, useEffect } from 'react';
import { TrendingUp, AlertTriangle, CheckCircle, Bell, FileText, Shield, Phone, LogOut } from 'lucide-react';
import { getDashboardStats } from '../utils/api';

interface DashboardProps {
  onLogout: () => void;
  onTabChange?: (tab: string) => void;
}

interface StatItem {
  label: string;
  value: string;
  icon: typeof AlertTriangle;
  color: string;
}

interface PolicyItem {
  title: string;
  time: string;
  tag: string;
}

interface QuickAction {
  title: string;
  icon: typeof AlertTriangle;
  color: string;
  key: string;
}

export default function Dashboard({ onLogout, onTabChange }: DashboardProps) {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [policies] = useState<PolicyItem[]>([
    { title: '《交通安全统筹管理通知》最新解读', time: '2小时前', tag: '政策' },
    { title: '警惕假冒保险产品，保护自身权益', time: '5小时前', tag: '警示' },
    { title: '货车司机保险维权成功案例分享', time: '1天前', tag: '案例' },
    { title: '正规保险与统筹产品区别详解', time: '2天前', tag: '知识' },
  ]);
  const [quickActions] = useState<QuickAction[]>([
    { title: '误导识别', icon: AlertTriangle, color: 'bg-red-500', key: 'detect' },
    { title: '法律咨询', icon: FileText, color: 'bg-blue-500', key: 'legal' },
    { title: '投诉举报', icon: Phone, color: 'bg-orange-500', key: 'complaint' },
    { title: '合同解析', icon: Shield, color: 'bg-green-500', key: 'contract' },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await getDashboardStats();
        const data = response.data.stats;
        
        setStats([
          { 
            label: '误导投诉量', 
            value: data.totalComplaints.toLocaleString(), 
            icon: AlertTriangle, 
            color: 'bg-red-500' 
          },
          { 
            label: 'AI识别风险案件', 
            value: data.aiDetectedCases.toLocaleString(), 
            icon: Shield, 
            color: 'bg-orange-500' 
          },
          { 
            label: '维权成功率', 
            value: `${data.successRate}%`, 
            icon: CheckCircle, 
            color: 'bg-green-500' 
          },
        ]);
      } catch (err) {
        console.error('获取统计数据失败:', err);
        setError('获取数据失败，请稍后重试');
        // 使用默认数据
        setStats([
          { label: '误导投诉量', value: '1,247', icon: AlertTriangle, color: 'bg-red-500' },
          { label: 'AI识别风险案件', value: '856', icon: Shield, color: 'bg-orange-500' },
          { label: '维权成功率', value: '87.5%', icon: CheckCircle, color: 'bg-green-500' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleQuickActionClick = (key: string) => {
    if (onTabChange) {
      onTabChange(key);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* 顶部标题 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-gray-900">驾驶舱</h1>
          <p className="text-gray-500 mt-1">货车司机权益保障中心</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-white rounded-lg shadow-sm relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button 
            className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
            onClick={onLogout}
            title="退出登录"
          >
            <LogOut className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* 数据总览卡片 */}
      <div className="flex flex-col gap-3">
        {loading ? (
          // 加载状态
          Array(3).fill(0).map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-4 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="bg-gray-200 rounded-lg p-3 w-12 h-12"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-5 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="bg-gray-200 rounded w-5 h-5"></div>
              </div>
            </div>
          ))
        ) : error ? (
          // 错误状态
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-red-500 text-center">{error}</p>
          </div>
        ) : (
          // 正常数据
          stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-4">
                <div className={`${stat.color} rounded-lg p-3`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-600">{stat.label}</p>
                  <p className="text-gray-900 mt-1 text-xl font-semibold">{stat.value}</p>
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* 最新政策动态 */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-gray-900">最新政策动态</h2>
          <button className="text-blue-600 text-sm">更多</button>
        </div>
        <div className="flex flex-col gap-3">
          {policies.map((policy, index) => (
            <div key={index} className="flex flex-col gap-2 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="flex items-start gap-2">
                <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">{policy.tag}</span>
                <p className="flex-1 text-gray-900 text-sm hover:text-blue-600 transition-colors cursor-pointer">{policy.title}</p>
              </div>
              <p className="text-gray-400 text-xs">{policy.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 快速入口 */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-gray-900 mb-4">快速入口</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
              onClick={() => handleQuickActionClick(action.key)}
            >
              <div className={`${action.color} rounded-lg p-3`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-gray-900">{action.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 安全提示 */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-sm p-4 text-white">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-1" />
          <div>
            <p className="mb-1 font-semibold">重要提示</p>
            <p className="text-sm text-white/90">请警惕非法统筹产品，购买保险前务必核实产品资质，保护自身权益。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
