import { useState } from 'react';
import { 
  Home, 
  Shield, 
  GitCompare, 
  BookOpen, 
  FileText, 
  FolderOpen, 
  Phone, 
  Mic, 
  GraduationCap, 
  BarChart3 
} from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  
  const tabs = [
    { id: 'dashboard', label: '首页', icon: Home },
    { id: 'detect', label: '识别', icon: Shield },
    { id: 'compare', label: '对比', icon: GitCompare },
    { id: 'legal', label: '法规', icon: BookOpen },
    { id: 'more', label: '更多', icon: FolderOpen },
  ];

  const moreMenuItems = [
    { id: 'contract', label: '合同解析', icon: FileText },
    { id: 'evidence', label: '举证助手', icon: FolderOpen },
    { id: 'complaint', label: '投诉举报', icon: Phone },
    { id: 'voice', label: '语音助手', icon: Mic },
    { id: 'learn', label: '学习培训', icon: GraduationCap },
    { id: 'data', label: '数据看板', icon: BarChart3 },
  ];

  // 判断是否在"更多"菜单中的页面
  const isInMoreMenu = moreMenuItems.some(item => item.id === activeTab);
  const displayActiveTab = isInMoreMenu ? 'more' : activeTab;

  const handleTabClick = (tabId: string) => {
    if (tabId === 'more') {
      // 点击"更多"标签，切换更多菜单的显示状态
      setShowMoreMenu(!showMoreMenu);
      return;
    }
    // 点击其他标签，隐藏更多菜单
    setShowMoreMenu(false);
    onTabChange(tabId);
  };

  const handleMoreMenuItemClick = (tabId: string) => {
    // 点击更多菜单中的项，隐藏更多菜单并切换到对应的页面
    setShowMoreMenu(false);
    onTabChange(tabId);
  };

  const handleCloseMoreMenu = () => {
    setShowMoreMenu(false);
  };

  return (
    <>
      {/* 更多菜单弹出层 */}
      {showMoreMenu && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={handleCloseMoreMenu}>
          <div 
            className="absolute bottom-16 left-0 right-0 bg-white rounded-t-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-900">更多功能</h3>
              <button 
                onClick={handleCloseMoreMenu}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {moreMenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMoreMenuItemClick(item.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 底部导航栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center h-16 px-2">
          {tabs.map((tab) => {
            const isActive = displayActiveTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors flex-1 ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className="text-xs">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
