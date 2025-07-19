import { Project, PricingPlan } from '../types';

export const initialProjects: Project[] = [
  {
    id: '1',
    title: {
      ru: 'Мужской барбершоп',
      en: 'Mens Barbershop',
      uz: 'Erkaklar sartaroshxonasi'
    },
    description: {
      ru: 'Современный сайт для барбершопа с онлайн-записью прямо в Telegram и наглядным прайсом',
      en: 'Modern barbershop website with instant booking to Telegram and a clear price list',
      uz: 'Zamonaviy barber-shop sayti: Telegram’ga tezkor yozilish va ochiq narxlar ro‘yxati'
    },
    image: '/public/images/razor.png',
    category: 'ecommerce',
    technologies: ['React', 'GoogleApi', 'TelegramBotApi'],
    url: 'https://barbercraft.netlify.app/'
  },
  {
    id: '2',
    title: {
      ru: 'Лендинг IT-компании',
      en: 'IT Company Landing',
      uz: 'IT kompaniyasi lending sahifasi'
    },
    description: {
      ru: 'Яркий и современный лендинг для привлечения клиентов IT-услуг',
      en: 'Bright and modern landing page to attract IT service clients',
      uz: 'IT xizmatlar mijozlarini jalb qilish uchun yorqin va zamonaviy lending sahifa'
    },
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'landing',
    technologies: ['React', 'Tailwind CSS', 'Framer Motion'],
    url: '#'
  },
  {
    id: '3',
    title: {
      ru: 'Корпоративный сайт ресторана',
      en: 'Restaurant Corporate Website',
      uz: 'Restoran korporativ veb-sayti'
    },
    description: {
      ru: 'Элегантный сайт ресторана с онлайн-бронированием столиков',
      en: 'Elegant restaurant website with online table booking',
      uz: 'Onlayn stol bron qilish bilan nafis restoran veb-sayti'
    },
    image: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'website',
    technologies: ['Vue.js', 'Laravel', 'MySQL'],
    url: '#'
  }
];

export const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: {
      ru: 'Базовый',
      en: 'Basic',
      uz: 'Asosiy'
    },
    price: {
      ru: 'от 300$',
      en: 'from $300',
      uz: '300$ dan'
    },
    features: {
      ru: [
        'Лендинг страница',
        'Адаптивный дизайн',
        'Базовая SEO оптимизация',
        'Форма обратной связи',
        'Месяц технической поддержки'
      ],
      en: [
        'Landing page',
        'Responsive design',
        'Basic SEO optimization',
        'Contact form',
        'One month technical support'
      ],
      uz: [
        'Lending sahifa',
        'Moslashuvchan dizayn',
        'Asosiy SEO optimallashtirish',
        'Aloqa formasi',
        'Bir oylik texnik yordam'
      ]
    }
  },
  {
    id: 'standard',
    name: {
      ru: 'Стандарт',
      en: 'Standard',
      uz: 'Standart'
    },
    price: {
      ru: 'от 800$',
      en: 'from $800',
      uz: '800$ dan'
    },
    features: {
      ru: [
        'Многостраничный сайт',
        'Адаптивный дизайн',
        'Полная SEO оптимизация',
        'Админ-панель',
        'Интеграции с сервисами',
        '3 месяца технической поддержки'
      ],
      en: [
        'Multi-page website',
        'Responsive design',
        'Full SEO optimization',
        'Admin panel',
        'Service integrations',
        '3 months technical support'
      ],
      uz: [
        'Ko\'p sahifali veb-sayt',
        'Moslashuvchan dizayn',
        'To\'liq SEO optimallashtirish',
        'Admin panel',
        'Xizmatlar bilan integratsiya',
        '3 oylik texnik yordam'
      ]
    },
    highlighted: true
  },
  {
    id: 'premium',
    name: {
      ru: 'Премиум',
      en: 'Premium',
      uz: 'Premium'
    },
    price: {
      ru: 'от 1500$',
      en: 'from $1500',
      uz: '1500$ dan'
    },
    features: {
      ru: [
        'Интернет-магазин',
        'Система оплаты',
        'Управление заказами',
        'Интеграция с CRM',
        'Мобильное приложение',
        '6 месяцев технической поддержки'
      ],
      en: [
        'Online store',
        'Payment system',
        'Order management',
        'CRM integration',
        'Mobile application',
        '6 months technical support'
      ],
      uz: [
        'Onlayn do\'kon',
        'To\'lov tizimi',
        'Buyurtmalarni boshqarish',
        'CRM bilan integratsiya',
        'Mobil ilova',
        '6 oylik texnik yordam'
      ]
    }
  }
];