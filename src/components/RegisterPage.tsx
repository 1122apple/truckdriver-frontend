import { useState } from 'react';
import { Truck, Lock, User, Mail, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import { register } from '../utils/api';

interface RegisterPageProps {
  onRegister: () => void;
  onSwitchToLogin: () => void;
}

export default function RegisterPage({ onRegister, onSwitchToLogin }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    phone: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // 清除错误信息
    if (error) setError('');
  };

  const validateForm = (): boolean => {
    if (formData.username.length < 3) {
      setError('用户名长度至少3个字符');
      return false;
    }
    if (formData.password.length < 6) {
      setError('密码长度至少6个字符');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // 调用后端API注册
      await register({
        username: formData.username,
        password: formData.password,
        phone: formData.phone || undefined,
        email: formData.email || undefined,
      });

      setSuccess('注册成功！请登录...');

      // 延迟跳转，让用户看到成功提示
      setTimeout(() => {
        onRegister();
      }, 1000);
    } catch (err: any) {
      setError(err.message || '注册失败，请检查输入信息');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 flex flex-col justify-center items-center px-6 py-8">
      <div className="w-full max-w-md">
        {/* Logo 和标题 */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-white rounded-full p-4 mb-4">
            <Truck className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-white text-center mb-2">货车司机权益保障平台</h1>
          <p className="text-blue-100 text-center">专业保护您的合法权益</p>
        </div>

        {/* 注册表单 */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex flex-col gap-5">
            {/* 用户名输入 */}
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="text-gray-700">用户名</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="请输入用户名（至少3个字符）"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={3}
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
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="请输入密码（至少6个字符）"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {/* 确认密码输入 */}
            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="text-gray-700">确认密码</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="请再次输入密码"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* 手机号输入（可选） */}
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-gray-700">
                手机号 <span className="text-gray-400 text-sm">(可选)</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="请输入手机号"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 邮箱输入（可选） */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-gray-700">
                邮箱 <span className="text-gray-400 text-sm">(可选)</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="请输入邮箱"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 成功提示 */}
            {success && (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {/* 错误提示 */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* 注册按钮 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '注册中...' : '注册'}
            </button>

            {/* 切换到登录 */}
            <div className="text-center text-sm text-gray-600">
              <span>已有账号？</span>
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-blue-600 hover:text-blue-700 font-medium ml-1"
              >
                立即登录
              </button>
            </div>
          </div>
        </form>

        {/* 提示信息 */}
        <div className="mt-6 text-center text-blue-100 text-sm">
          <p>注册后即可使用所有功能</p>
        </div>
      </div>
    </div>
  );
}
