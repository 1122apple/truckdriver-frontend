import { useState } from 'react';
import { Truck, Lock, User, AlertCircle } from 'lucide-react';
import { login, saveToken } from '../utils/api';

interface LoginPageProps {
  onLogin: () => void;
  onSwitchToRegister: () => void;
}

export default function LoginPage({ onLogin, onSwitchToRegister }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 调用后端API登录
      const response = await login({ username, password });
      
      // 保存token
      saveToken(response.data.token);
      
      // 触发登录成功回调
      onLogin();
    } catch (err: any) {
      setError(err.message || '登录失败，请检查用户名和密码');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 flex flex-col justify-center items-center px-6">
      <div className="w-full max-w-md">
        {/* Logo 和标题 */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-white rounded-full p-4 mb-4">
            <Truck className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-white text-center mb-2">货车司机权益保障平台</h1>
          <p className="text-blue-100 text-center">专业保护您的合法权益</p>
        </div>

        {/* 登录表单 */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex flex-col gap-6">
            {/* 用户名输入 */}
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="text-gray-700">用户名</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="请输入用户名"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* 密码输入 */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-gray-700">密码</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* 错误提示 */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* 登录按钮 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '登录中...' : '登录'}
            </button>

            {/* 其他选项 */}
            <div className="flex justify-between text-sm text-gray-600">
              <a href="#" className="hover:text-blue-600">忘记密码？</a>
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="hover:text-blue-600"
              >
                注册账号
              </button>
            </div>
          </div>
        </form>

        {/* 提示信息 */}
        <div className="mt-6 text-center text-blue-100 text-sm">
          <p>使用注册的账号登录，享受专业权益保障服务</p>
        </div>
      </div>
    </div>
  );
}
