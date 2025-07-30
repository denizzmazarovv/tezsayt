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
    image: '/images/razor.webp',
    category: 'landing',
    technologies: ['React', 'GoogleApi', 'TelegramBotApi'],
    url: 'https://razorcraft.netlify.app/'
  },
  {
    id: '2',
    title: {
      ru: 'Сайт, который заменяет администратора',
      en: 'A site that replaces the administrator',
      uz: 'Administratorni almashtiradigan sayt'
    },
    description: {
      ru: 'Сайт для салона красоты с онлайн-записью в Telegram и автоматическим отображением актуальных цен из таблицы',
      en: 'Beauty salon website with Telegram booking and real-time price updates from a spreadsheets',
      uz: 'Go‘zallik saloni uchun sayt: Telegram orqali yozilish va jadvallardan avtomatik yangilanadigan narxlar'
    },
    image: '/images/salonSpa.webp',
    category: 'landing',
    technologies: ['React', 'GoogleApi', 'TelegramBotApi'],
    url: 'https://salonbeautyspa.netlify.app/'
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
      ru: 'Необходимый',
      en: 'Necessary',
      uz: 'Zarurlii'
    },
    price: {
      ru: 'от 100$',
      en: 'from $100',
      uz: '100$ dan'
    },
    features: {
      ru: [
        'Лендинг страница',
        'Адаптивный дизайн',
        'Базовая SEO оптимизация',
        'Месяц технической поддержки'
      ],
      en: [
        'Landing page',
        'Responsive design',
        'Basic SEO optimization',
        'One month technical support'
      ],
      uz: [
        'Lending sahifa',
        'Moslashuvchan dizayn',
        'Asosiy SEO optimallashtirish',
        'Bir oylik texnik yordam'
      ]
    }
  },
  {
    id: 'standard',
    name: {
      ru: 'Индивидуальный',
      en: 'Individual',
      uz: 'Individual'
    },
    price: {
      ru: 'от 150-300$',
      en: 'from $150-300',
      uz: '150-300$ dan'
    },
    features: {
      ru: [
        '0$ - Тариф (необходимый)',
        '50$ — Мульти-язычность RU, UZB, ENG',
        '50$ — Форма отправки в Телеграм + Таблицу',
        'Полная оптимизация',
        'Админ-панель',
        'Интеграции с сервисами'
      ],
      en: [
        '0$ - Package (required)',
        '$50 — Multilanguage: RU, UZB, ENG',
        '$50 — Form submission to Telegram + Spreadsheet',
        'Full optimization',
        'Admin panel',
        'Service integrations',
      ],
      uz: [
        '0$ - Tarif (majburiy)',
        '50$ — Ko‘p tilli: RU, UZB, ENG',
        '50$ — Telegram va Jadvalga yuborish formasi',
        'To‘liq optimizatsiya',
        'Admin panel',
        'Xizmatlarga integratsiya',
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
      ru: 'от 700$',
      en: 'from 700',
      uz: '700$ dan'
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