import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { translations } from '../data/translations';
import { Language } from '../types';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  phone?: string;
}

const escapeHtml = (unsafe: string) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone: string) => {
  const digits = phone.replace(/\D/g, '');
  return /^(998\d{9}|9\d{8})$/.test(digits);
};
const validateInput = (input: string, maxLength: number) =>
  input.trim().length > 1 && input.length <= maxLength;

const isRateLimited = () => {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const stored = localStorage.getItem("successfulSubmissions");
  const submissions = stored ? JSON.parse(stored) : [];
  const recent = submissions.filter((time: number) => now - time <= windowMs);
  return recent.length >= 5;
};

const recordSubmission = () => {
  const now = Date.now();
  const stored = localStorage.getItem("successfulSubmissions");
  const submissions = stored ? JSON.parse(stored) : [];
  submissions.push(now);
  localStorage.setItem("successfulSubmissions", JSON.stringify(submissions));
};

interface SecureContactFormProps {
  currentLanguage: Language;
}

const SecureContactForm: React.FC<SecureContactFormProps> = ({ currentLanguage }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
    phone: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Безопасное получение переводов
  const t = translations[currentLanguage]?.form || translations.ru.form;

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validateInput(formData.name, 100)) newErrors.name = t.formInputName;
    if (!validateInput(formData.message, 1000)) newErrors.message = t.formInputMessage;
    if (formData.phone && !validatePhone(formData.phone)) newErrors.phone = t.formTelephone;
    if (formData.email && !validateEmail(formData.email)) newErrors.email = t.formTelephone;

    if (isRateLimited()) newErrors.submit = t.formSendError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    const sanitizedValue = value.replace(/[<>[\]{}'"]/g, '').trim();
    setFormData((prev) => ({ ...prev, [field]: sanitizedValue }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const payload = new URLSearchParams();
    payload.append("name", escapeHtml(formData.name));
    payload.append("email", escapeHtml(formData.email));
    payload.append("message", escapeHtml(formData.message));
    if (formData.phone) payload.append("phone", escapeHtml(formData.phone));

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbzknqi83jOfSo9UswTP3hwoAjdV3SDbf5-5yEGwmYVqAzR2V7VB2xkPDFIp-zEkRe0/exec",
        {
          method: "POST",
          body: payload
        }
      );

      const text = await res.text();
      if (text === "OK") {
        recordSubmission();
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '', phone: '' });
      } else {
        setErrors({ submit: t.formSendError });
      }
    } catch (err) {
      console.error(err);
      setErrors({ submit: t.formSendError });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.formMessageSucces}</h3>
        <p className="text-gray-600 mb-4">{t.formWeTypeYou}</p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          {t.formSentRepeatMessage}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {errors.submit}
          </div>
        )}
        
        <div className="grid gap-6">
          {/* Поле имени */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.formName}
              <span className="text-red-500"> *</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t.formInputName}
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Поле email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="example@mail.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Поле телефона */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.formTelephone}
            </label>
            <input
              type="tel"
              value={formData.phone || ""}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="998 XX 000 00 00 | XX 000 00 00"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Поле сообщения */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.formMessage}
              <span className="text-red-500"> *</span>
            </label>
            <textarea
              rows={6}
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 resize-none ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t.formInputMessage}
              required
              maxLength={1000}
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            <div className="text-right text-sm text-gray-500 mt-1">
              {formData.message.length}/1000
            </div>
          </div>
        </div>

        {/* Кнопка отправки */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
          {isSubmitting ? t.formSending : t.formMessage}
        </button>
      </form>
    </div>
  );
};

export default SecureContactForm;