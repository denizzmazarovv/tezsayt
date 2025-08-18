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
    category: 'ecommerce',
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
    category: 'ecommerce',
    technologies: ['React', 'GoogleApi', 'TelegramBotApi'],
    url: 'https://salonbeautyspa.netlify.app/'
  },
  {
    id: '3',
    title: {
      ru: 'Сайт для строительной компании',
      en: 'Website for a construction company',
      uz: 'Qurilish kompaniyasi uchun sayt'
    },
    description: {
      ru: 'Современный одностраничный сайт для строительной компании. Включает описание услуг, примеры работ, контакты и форму заявки.',
      en: 'A modern one-page website for a construction company. Includes services overview, portfolio examples, contact details, and an application form.',
      uz: 'Qurilish kompaniyasi uchun zamonaviy bir sahifali sayt. Unda xizmatlar tavsifi, ish namunalar, aloqa ma’lumotlari va ariza shakli mavjud.'
    } ,
    
    image: '/images/stroyMaster.webp',
    category: 'ecommerce',
    technologies: ['Vue.js', 'Laravel', 'MySQL'],
    url: 'https://webstroymaster.netlify.app/'
  },
  {
    id: '4',
    title: {
      ru: 'Сайт для ',
      en: '',
      uz: ''
    },
    description: {
      ru: '',
      en: '',
      uz: ''
    } ,
    
    image: '/images/stroyMaster.webp',
    category: 'ecommerce',
    technologies: ['Vue.js', 'Laravel', 'MySQL'],
    url: 'https://webstroymaster.netlify.app/'
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
      ru: '1.5 млн сум',
      en: '1.5 mln sum',
      uz: '1.5 mln sum'
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
      ru: '200$',
      en: '200$',
      uz: '200$'
    },
    features: {
      ru: [
        '120$ - Тариф (необходимый)',
        '70$ — Мульти-язычность RU, UZB, ENG',
        '50$ — Форма отправки в Телеграм + Таблицу',
        '100$ - Дизайнерская плата',
        '80$ - Админ-панель',
        'Интеграции с сервисами'
      ],
      en: [
        '$120 — Base plan (required)',
        '$70 — Multi-language RU, UZB, ENG',
        '$50 — Contact form to Telegram + Google Sheets',
        '$100 — Design fee',
        '80$ - Admin panel',
        'Integrations with services'
      ],
      uz: [
        '120$ — Asosiy tarif (majburiy)',
        '70$ — Ko‘p tillilik RU, UZB, ENG',
        '50$ — Telegram va Jadvalga yuborish formasi',
        '100$ — Dizaynerlik to‘lovi',
        '80$ - Admin panel',
        'Xizmatlarga integratsiya'
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
      en: 'from 700$',
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
        "Onlayn do'kon",
        "To'lov tizimi",
        'Buyurtmalarni boshqarish',
        'CRM bilan integratsiya',
        'Mobil ilova',
        '6 oylik texnik yordam'
      ]
    }
  }
];
