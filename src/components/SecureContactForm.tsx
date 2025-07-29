import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { translations } from '../data/translations';

const currentLanguage: 'ru' | 'en' | 'uz' = 'ru';
const t = translations[currentLanguage];

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

const SecureContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
    phone: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validateInput(formData.name, 100)) newErrors.name = t.form.formInputName;
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }
    
    if (!validateInput(formData.message, 1000)) newErrors.message = t.form.formInputMessage;
    if (formData.phone && !validatePhone(formData.phone)) newErrors.phone = 'Неверный телефон';

    if (isRateLimited()) newErrors.submit = "⛔ Лимит: не более 5 заявок за 10 минут.";

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
        setErrors({ submit: "⚠️ Ошибка сервера." });
      }
    } catch (err) {
      console.error(err);
      setErrors({ submit: "❌ Ошибка при отправке." });
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
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.form.formMessageSucces}</h3>
        <p className="text-gray-600 mb-4">{t.form.formWeTypeYou}</p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          {t.form.formSentRepeatMessage}
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
          <InputField
            label={t.form.formName}
            type="text"
            value={formData.name}
            onChange={(v) => handleInputChange("name", v)}
            placeholder={t.form.formInputName}
            error={errors.name}
          />
          <InputField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(v) => handleInputChange("email", v)}
            placeholder="example@mail.com"
            error={errors.email}
          />
          <InputField
            label="Телефон"
            type="tel"
            value={formData.phone || ""}
            onChange={(v) => handleInputChange("phone", v)}
            placeholder="+998 90 123 45 67"
            error={errors.phone}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.form.formMessage}
            </label>
            <textarea
              rows={6}
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 resize-none ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t.form.formInputMessage}
              required
              maxLength={1000}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
            <div className="text-right text-sm text-gray-500 mt-1">
              {formData.message.length}/1000
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
          {isSubmitting ? t.form.formSending : 'Отправить сообщение'}
        </button>
      </form>
    </div>
  );
};

const InputField = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  error
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  error?: string;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
      placeholder={placeholder}
      required={type !== 'email'}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default SecureContactForm;
