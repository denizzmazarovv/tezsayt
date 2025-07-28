import React from 'react';
import { Code, Instagram} from 'lucide-react';
import { FaTelegramPlane } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Web Lezen</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Создаем современные веб-решения для вашего бизнеса. Качественные сайты, лендинги и интернет-магазины
            </p>
            <div className="flex gap-4">
              <a href="https://t.me/web_lezen" className="text-gray-400 hover:text-purple-400 transition-colors">
                <FaTelegramPlane className="w-5 h-5" />
              </a>
              
              <a href="https://www.instagram.com/web_lezen/" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
             
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Услуги</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Лендинг страницы</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Корпоративные сайты</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Интернет-магазины</a></li>
              <li><a href="#" className="hover:text-white transition-colors">SEO оптимизация</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2 text-gray-400">
              <li>+998 94 171 71 94</li>
              <li>lezenuz@gmail.com</li>
              <li>Tashkent, Uzbekistan</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Web Lezen. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;