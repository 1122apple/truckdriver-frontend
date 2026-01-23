import { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';
import MisleadingDetection from './components/MisleadingDetection';
import InsuranceCompare from './components/InsuranceCompare';
import LegalKnowledge from './components/LegalKnowledge';
import ContractAnalysis from './components/ContractAnalysis';
import EvidenceHelper from './components/EvidenceHelper';
import ComplaintCenter from './components/ComplaintCenter';
import VoiceAssistant from './components/VoiceAssistant';
import LearningCenter from './components/LearningCenter';
import DataBoard from './components/DataBoard';
import BottomNav from './components/BottomNav';
import { getToken, clearToken } from './utils/api';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // 检查是否已登录（页面刷新后保持登录状态）
  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);
    }
    // 确保刷新页面后回到首页
    setActiveTab('dashboard');
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowRegister(false);
  };

  const handleRegister = () => {
    setIsLoggedIn(false); // 注册成功后不自动登录，让用户手动登录
    setShowRegister(false); // 切换回登录页面
  };

  // 退出登录处理函数
  const handleLogout = () => {
    clearToken(); // 清除本地存储的token
    setIsLoggedIn(false); // 设置登录状态为false
    setActiveTab('dashboard'); // 重置为首页
  };



  if (!isLoggedIn) {
    if (showRegister) {
      return (
        <RegisterPage
          onRegister={handleRegister}
          onSwitchToLogin={() => setShowRegister(false)}
        />
      );
    }
    return (
      <LoginPage
        onLogin={handleLogin}
        onSwitchToRegister={() => setShowRegister(true)}
      />
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onLogout={handleLogout} onTabChange={setActiveTab} />;
      case 'detect':
        return <MisleadingDetection />;
      case 'compare':
        return <InsuranceCompare />;
      case 'legal':
        return <LegalKnowledge />;
      case 'contract':
        return <ContractAnalysis />;
      case 'evidence':
        return <EvidenceHelper />;
      case 'complaint':
        return <ComplaintCenter />;
      case 'voice':
        return <VoiceAssistant />;
      case 'learn':
        return <LearningCenter />;
      case 'data':
        return <DataBoard />;
      default:
        return <Dashboard onLogout={handleLogout} onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 内容区域 - 垂直滚动 */}
      <div className="flex-1 overflow-y-auto pb-20">
        {renderContent()}
      </div>
      
      {/* 底部导航栏 - 固定 */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
