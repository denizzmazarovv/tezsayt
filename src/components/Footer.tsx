import React from 'react';
import { Code } from 'lucide-react';
import { FaInstagram, FaTelegramPlane } from "react-icons/fa";
import { translations } from '../data/translations';
import { Language } from '../types';

interface FooterProps {
  currentLanguage: Language;
}

const Footer: React.FC<FooterProps> = ({ currentLanguage }) => {
  const t = translations[currentLanguage];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12">
              <img src="/images/webLezenLogo.png" alt="" />
              </div>
              <span className="text-xl font-bold">Web Lezen</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              {t.footer.text}
            </p>
            <div className="flex gap-4">
              <a
                href="https://t.me/tezsayt"
                className="text-gray-400 hover:text-purple-400 transition-colors"
                aria-label="Telegram"
              >
                <FaTelegramPlane className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/tezsayt/"
                className="text-gray-400 hover:text-purple-400 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.footer.contact}</h3>
            <ul className="space-y-2 text-gray-400">
              <li>+998 94 171 71 94</li>
              <li>lezenuz@gmail.com</li>
              <li>Tashkent, Uzbekistan</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Tez Sayt. {t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
