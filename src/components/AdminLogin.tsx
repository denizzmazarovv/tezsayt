import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { authenticateAdmin, AuthCredentials } from '../utils/auth';
import { sanitizeInput, validateInput } from '../utils/security';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [credentials, setCredentials] = useState<AuthCredentials>({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field: keyof AuthCredentials, value: string) => {
    // Light sanitization for login form
    const sanitizedValue = value.trim();
    
    // Basic validation
    if (sanitizedValue.length > 50) {
      setError('Слишком длинное значение');
      return;
    }
    
    setCredentials(prev => ({
      ...prev,
      [field]: sanitizedValue
    }));
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Additional validation
      if (!credentials.username || !credentials.password) {
        setError('Заполните все поля');
        return;
      }

      if (credentials.username.length > 50 || credentials.password.length > 50) {
        setError('Слишком длинные данные');
        return;
      }

      console.log('Attempting login with:', credentials); // Debug log

      const isValid = await authenticateAdmin(credentials);
      
      if (isValid) {
        onLoginSuccess();
      } else {
        setError('Неверные учетные данные');
      }
    } catch (error) {
      setError('Ошибка аутентификации');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Админ-панель</h1>
          <p className="text-gray-600">Web Lezen</p>
        </div>

        {/* Debug info */}
        <div className="mb-4 p-3 bg-gray-100 rounded-lg text-sm text-gray-600">
          <p><strong>Логин:</strong> admin</p>
          <p><strong>Пароль:</strong> password123</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Имя пользователя
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                placeholder="Введите имя пользователя"
                required
                maxLength={50}
                autoComplete="username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Пароль
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                placeholder="Введите пароль"
                required
                maxLength={50}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Защищенная админ-панель Web Lezen
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;