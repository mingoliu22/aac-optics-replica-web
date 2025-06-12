
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'zh' | 'en' | 'ja' | 'ko' | 'fr' | 'de' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getLanguageName: (lang: Language) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.products': '产品系列',
    'nav.about': '关于我们',
    'nav.news': '新闻中心',
    'nav.contact': '联系我们',
    'nav.sitemap': '网站地图',
    'nav.search': '搜索',
    'nav.searchPlaceholder': '搜索产品...',
    
    // Home Page
    'home.title': 'AAC Optics - 专业光学器件制造商',
    'home.subtitle': '专注于高品质光学器件的研发、生产和销售',
    'home.description': '我们是一家专业的光学器件制造商，致力于为全球客户提供高品质的光学产品和解决方案。',
    'home.ourProducts': '我们的产品',
    'home.whyChooseUs': '为什么选择我们',
    'home.quality': '卓越品质',
    'home.qualityDesc': '严格的质量控制体系，确保每一件产品都达到最高标准',
    'home.innovation': '技术创新',
    'home.innovationDesc': '持续的研发投入，不断推出适应市场需求的创新产品',
    'home.service': '专业服务',
    'home.serviceDesc': '专业的技术团队，为客户提供全方位的技术支持和售后服务',
    
    // Products
    'products.title': '产品系列',
    'products.optics': '光学器件',
    'products.opticsDesc': '高精度光学透镜、反射镜等核心器件',
    'products.systems': '光学系统',
    'products.systemsDesc': '完整的光学系统解决方案',
    'products.components': '光学组件',
    'products.componentsDesc': '各类专业光学组件和配件',
    
    // About
    'about.title': '关于我们',
    'about.company': '公司简介',
    'about.companyDesc': 'AAC Optics成立于多年前，是一家专业从事光学器件研发、生产和销售的高新技术企业。我们拥有先进的生产设备和专业的技术团队，致力于为客户提供高品质的光学产品。',
    'about.mission': '我们的使命',
    'about.missionDesc': '通过持续的技术创新和优质的产品服务，成为全球领先的光学器件供应商。',
    'about.vision': '我们的愿景',
    'about.visionDesc': '推动光学技术的发展，为人类的美好生活贡献力量。',
    
    // Contact
    'contact.title': '联系我们',
    'contact.address': '地址',
    'contact.phone': '电话',
    'contact.email': '邮箱',
    'contact.getInTouch': '联系方式',
    
    // News
    'news.title': '新闻中心',
    'news.latest': '最新动态',
    'news.readMore': '阅读更多',
    
    // Common
    'common.learnMore': '了解更多',
    'common.viewProducts': '查看产品',
    'common.contactUs': '联系我们',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.about': 'About Us',
    'nav.news': 'News',
    'nav.contact': 'Contact',
    'nav.sitemap': 'Sitemap',
    'nav.search': 'Search',
    'nav.searchPlaceholder': 'Search products...',
    
    // Home Page
    'home.title': 'AAC Optics - Professional Optical Components Manufacturer',
    'home.subtitle': 'Specialized in R&D, production and sales of high-quality optical components',
    'home.description': 'We are a professional optical components manufacturer dedicated to providing high-quality optical products and solutions to customers worldwide.',
    'home.ourProducts': 'Our Products',
    'home.whyChooseUs': 'Why Choose Us',
    'home.quality': 'Excellent Quality',
    'home.qualityDesc': 'Strict quality control system ensures every product meets the highest standards',
    'home.innovation': 'Technical Innovation',
    'home.innovationDesc': 'Continuous R&D investment, constantly launching innovative products that meet market demands',
    'home.service': 'Professional Service',
    'home.serviceDesc': 'Professional technical team providing comprehensive technical support and after-sales service',
    
    // Products
    'products.title': 'Product Series',
    'products.optics': 'Optical Components',
    'products.opticsDesc': 'High-precision optical lenses, mirrors and other core components',
    'products.systems': 'Optical Systems',
    'products.systemsDesc': 'Complete optical system solutions',
    'products.components': 'Optical Parts',
    'products.componentsDesc': 'Various professional optical parts and accessories',
    
    // About
    'about.title': 'About Us',
    'about.company': 'Company Profile',
    'about.companyDesc': 'AAC Optics was established years ago as a high-tech enterprise specializing in R&D, production and sales of optical components. We have advanced production equipment and professional technical team, committed to providing high-quality optical products to customers.',
    'about.mission': 'Our Mission',
    'about.missionDesc': 'Through continuous technological innovation and quality product services, become a leading global supplier of optical components.',
    'about.vision': 'Our Vision',
    'about.visionDesc': 'Promote the development of optical technology and contribute to a better life for humanity.',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.address': 'Address',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.getInTouch': 'Get In Touch',
    
    // News
    'news.title': 'News Center',
    'news.latest': 'Latest News',
    'news.readMore': 'Read More',
    
    // Common
    'common.learnMore': 'Learn More',
    'common.viewProducts': 'View Products',
    'common.contactUs': 'Contact Us',
  },
  ja: {
    // Navigation
    'nav.home': 'ホーム',
    'nav.products': '製品シリーズ',
    'nav.about': '会社概要',
    'nav.news': 'ニュース',
    'nav.contact': 'お問い合わせ',
    'nav.sitemap': 'サイトマップ',
    'nav.search': '検索',
    'nav.searchPlaceholder': '製品を検索...',
    
    // Home Page
    'home.title': 'AAC Optics - 専門光学部品メーカー',
    'home.subtitle': '高品質光学部品の研究開発、製造、販売に特化',
    'home.description': '私たちは専門的な光学部品メーカーとして、世界中のお客様に高品質な光学製品とソリューションを提供することに専念しています。',
    'home.ourProducts': '私たちの製品',
    'home.whyChooseUs': '選ばれる理由',
    'home.quality': '優れた品質',
    'home.qualityDesc': '厳格な品質管理システムにより、すべての製品が最高基準を満たすことを保証',
    'home.innovation': '技術革新',
    'home.innovationDesc': '継続的なR&D投資により、市場ニーズに応じた革新的な製品を絶えず開発',
    'home.service': 'プロフェッショナルサービス',
    'home.serviceDesc': 'プロフェッショナルな技術チームが包括的な技術サポートとアフターサービスを提供',
    
    // Products
    'products.title': '製品シリーズ',
    'products.optics': '光学部品',
    'products.opticsDesc': '高精度光学レンズ、ミラーなどのコア部品',
    'products.systems': '光学システム',
    'products.systemsDesc': '完全な光学システムソリューション',
    'products.components': '光学コンポーネント',
    'products.componentsDesc': '各種専門光学部品とアクセサリー',
    
    // About
    'about.title': '会社概要',
    'about.company': '会社プロフィール',
    'about.companyDesc': 'AAC Opticsは数年前に設立された光学部品の研究開発、製造、販売を専門とするハイテク企業です。先進的な生産設備と専門的な技術チームを持ち、お客様に高品質な光学製品を提供することに専念しています。',
    'about.mission': '私たちの使命',
    'about.missionDesc': '継続的な技術革新と優れた製品サービスを通じて、世界をリードする光学部品サプライヤーになること。',
    'about.vision': '私たちのビジョン',
    'about.visionDesc': '光学技術の発展を推進し、人類のより良い生活に貢献すること。',
    
    // Contact
    'contact.title': 'お問い合わせ',
    'contact.address': '住所',
    'contact.phone': '電話',
    'contact.email': 'メール',
    'contact.getInTouch': 'お問い合わせ',
    
    // News
    'news.title': 'ニュースセンター',
    'news.latest': '最新ニュース',
    'news.readMore': '続きを読む',
    
    // Common
    'common.learnMore': '詳細を見る',
    'common.viewProducts': '製品を見る',
    'common.contactUs': 'お問い合わせ',
  },
  ko: {
    // Navigation
    'nav.home': '홈',
    'nav.products': '제품 시리즈',
    'nav.about': '회사 소개',
    'nav.news': '뉴스',
    'nav.contact': '문의하기',
    'nav.sitemap': '사이트맵',
    'nav.search': '검색',
    'nav.searchPlaceholder': '제품 검색...',
    
    // Home Page
    'home.title': 'AAC Optics - 전문 광학 부품 제조업체',
    'home.subtitle': '고품질 광학 부품의 연구개발, 제조 및 판매 전문',
    'home.description': '저희는 전 세계 고객에게 고품질 광학 제품과 솔루션을 제공하는 데 전념하는 전문 광학 부품 제조업체입니다.',
    'home.ourProducts': '저희 제품',
    'home.whyChooseUs': '선택하는 이유',
    'home.quality': '우수한 품질',
    'home.qualityDesc': '엄격한 품질 관리 시스템으로 모든 제품이 최고 기준을 충족하도록 보장',
    'home.innovation': '기술 혁신',
    'home.innovationDesc': '지속적인 R&D 투자로 시장 요구에 맞는 혁신적인 제품을 지속적으로 출시',
    'home.service': '전문 서비스',
    'home.serviceDesc': '전문 기술팀이 포괄적인 기술 지원과 애프터서비스 제공',
    
    // Products
    'products.title': '제품 시리즈',
    'products.optics': '광학 부품',
    'products.opticsDesc': '고정밀 광학 렌즈, 미러 및 기타 핵심 부품',
    'products.systems': '광학 시스템',
    'products.systemsDesc': '완전한 광학 시스템 솔루션',
    'products.components': '광학 구성요소',
    'components.componentsDesc': '다양한 전문 광학 부품 및 액세서리',
    
    // About
    'about.title': '회사 소개',
    'about.company': '회사 프로필',
    'about.companyDesc': 'AAC Optics는 몇 년 전 설립된 광학 부품의 연구개발, 제조 및 판매를 전문으로 하는 하이테크 기업입니다. 첨단 생산 장비와 전문 기술팀을 보유하고 있으며, 고객에게 고품질 광학 제품을 제공하는 데 전념하고 있습니다.',
    'about.mission': '저희의 사명',
    'about.missionDesc': '지속적인 기술 혁신과 우수한 제품 서비스를 통해 세계를 선도하는 광학 부품 공급업체가 되는 것.',
    'about.vision': '저희의 비전',
    'about.visionDesc': '광학 기술의 발전을 촉진하고 인류의 더 나은 삶에 기여하는 것.',
    
    // Contact
    'contact.title': '문의하기',
    'contact.address': '주소',
    'contact.phone': '전화',
    'contact.email': '이메일',
    'contact.getInTouch': '연락하기',
    
    // News
    'news.title': '뉴스 센터',
    'news.latest': '최신 뉴스',
    'news.readMore': '더 읽기',
    
    // Common
    'common.learnMore': '자세히 보기',
    'common.viewProducts': '제품 보기',
    'common.contactUs': '문의하기',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.products': 'Série de produits',
    'nav.about': 'À propos',
    'nav.news': 'Actualités',
    'nav.contact': 'Contact',
    'nav.sitemap': 'Plan du site',
    'nav.search': 'Rechercher',
    'nav.searchPlaceholder': 'Rechercher des produits...',
    
    // Home Page
    'home.title': 'AAC Optics - Fabricant professionnel de composants optiques',
    'home.subtitle': 'Spécialisé dans la R&D, la production et la vente de composants optiques de haute qualité',
    'home.description': 'Nous sommes un fabricant professionnel de composants optiques dédié à fournir des produits optiques et des solutions de haute qualité aux clients du monde entier.',
    'home.ourProducts': 'Nos produits',
    'home.whyChooseUs': 'Pourquoi nous choisir',
    'home.quality': 'Excellente qualité',
    'home.qualityDesc': 'Un système de contrôle qualité strict garantit que chaque produit répond aux normes les plus élevées',
    'home.innovation': 'Innovation technique',
    'home.innovationDesc': 'Investissement continu en R&D, lancement constant de produits innovants répondant aux demandes du marché',
    'home.service': 'Service professionnel',
    'home.serviceDesc': 'Équipe technique professionnelle fournissant un support technique complet et un service après-vente',
    
    // Products
    'products.title': 'Série de produits',
    'products.optics': 'Composants optiques',
    'products.opticsDesc': 'Lentilles optiques de haute précision, miroirs et autres composants de base',
    'products.systems': 'Systèmes optiques',
    'products.systemsDesc': 'Solutions complètes de systèmes optiques',
    'products.components': 'Pièces optiques',
    'products.componentsDesc': 'Diverses pièces optiques professionnelles et accessoires',
    
    // About
    'about.title': 'À propos',
    'about.company': 'Profil de l\'entreprise',
    'about.companyDesc': 'AAC Optics a été créée il y a plusieurs années en tant qu\'entreprise de haute technologie spécialisée dans la R&D, la production et la vente de composants optiques. Nous disposons d\'équipements de production avancés et d\'une équipe technique professionnelle, nous nous engageons à fournir des produits optiques de haute qualité aux clients.',
    'about.mission': 'Notre mission',
    'about.missionDesc': 'Grâce à l\'innovation technologique continue et aux services de produits de qualité, devenir un fournisseur mondial leader de composants optiques.',
    'about.vision': 'Notre vision',
    'about.visionDesc': 'Promouvoir le développement de la technologie optique et contribuer à une meilleure vie pour l\'humanité.',
    
    // Contact
    'contact.title': 'Nous contacter',
    'contact.address': 'Adresse',
    'contact.phone': 'Téléphone',
    'contact.email': 'E-mail',
    'contact.getInTouch': 'Entrer en contact',
    
    // News
    'news.title': 'Centre de presse',
    'news.latest': 'Dernières nouvelles',
    'news.readMore': 'Lire la suite',
    
    // Common
    'common.learnMore': 'En savoir plus',
    'common.viewProducts': 'Voir les produits',
    'common.contactUs': 'Nous contacter',
  },
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.products': 'Produktserie',
    'nav.about': 'Über uns',
    'nav.news': 'Nachrichten',
    'nav.contact': 'Kontakt',
    'nav.sitemap': 'Sitemap',
    'nav.search': 'Suchen',
    'nav.searchPlaceholder': 'Produkte suchen...',
    
    // Home Page
    'home.title': 'AAC Optics - Professioneller Hersteller optischer Komponenten',
    'home.subtitle': 'Spezialisiert auf F&E, Produktion und Verkauf hochwertiger optischer Komponenten',
    'home.description': 'Wir sind ein professioneller Hersteller optischer Komponenten, der sich der Bereitstellung hochwertiger optischer Produkte und Lösungen für Kunden weltweit widmet.',
    'home.ourProducts': 'Unsere Produkte',
    'home.whyChooseUs': 'Warum uns wählen',
    'home.quality': 'Exzellente Qualität',
    'home.qualityDesc': 'Strenges Qualitätskontrollsystem gewährleistet, dass jedes Produkt den höchsten Standards entspricht',
    'home.innovation': 'Technische Innovation',
    'home.innovationDesc': 'Kontinuierliche F&E-Investitionen, ständige Markteinführung innovativer Produkte, die Marktanforderungen erfüllen',
    'home.service': 'Professioneller Service',
    'home.serviceDesc': 'Professionelles technisches Team bietet umfassenden technischen Support und Kundendienst',
    
    // Products
    'products.title': 'Produktserie',
    'products.optics': 'Optische Komponenten',
    'products.opticsDesc': 'Hochpräzise optische Linsen, Spiegel und andere Kernkomponenten',
    'products.systems': 'Optische Systeme',
    'products.systemsDesc': 'Komplette optische Systemlösungen',
    'products.components': 'Optische Teile',
    'products.componentsDesc': 'Verschiedene professionelle optische Teile und Zubehör',
    
    // About
    'about.title': 'Über uns',
    'about.company': 'Unternehmensprofil',
    'about.companyDesc': 'AAC Optics wurde vor Jahren als High-Tech-Unternehmen gegründet, das sich auf F&E, Produktion und Verkauf optischer Komponenten spezialisiert hat. Wir verfügen über fortschrittliche Produktionsanlagen und ein professionelles technisches Team und sind bestrebt, Kunden hochwertige optische Produkte zu liefern.',
    'about.mission': 'Unsere Mission',
    'about.missionDesc': 'Durch kontinuierliche technische Innovation und qualitativ hochwertige Produktdienstleistungen ein weltweit führender Anbieter optischer Komponenten werden.',
    'about.vision': 'Unsere Vision',
    'about.visionDesc': 'Die Entwicklung der optischen Technologie fördern und zu einem besseren Leben für die Menschheit beitragen.',
    
    // Contact
    'contact.title': 'Kontaktieren Sie uns',
    'contact.address': 'Adresse',
    'contact.phone': 'Telefon',
    'contact.email': 'E-Mail',
    'contact.getInTouch': 'In Kontakt treten',
    
    // News
    'news.title': 'Nachrichtenzentrum',
    'news.latest': 'Neueste Nachrichten',
    'news.readMore': 'Weiterlesen',
    
    // Common
    'common.learnMore': 'Mehr erfahren',
    'common.viewProducts': 'Produkte anzeigen',
    'common.contactUs': 'Kontaktieren Sie uns',
  },
  pt: {
    // Navigation
    'nav.home': 'Início',
    'nav.products': 'Série de produtos',
    'nav.about': 'Sobre nós',
    'nav.news': 'Notícias',
    'nav.contact': 'Contato',
    'nav.sitemap': 'Mapa do site',
    'nav.search': 'Pesquisar',
    'nav.searchPlaceholder': 'Pesquisar produtos...',
    
    // Home Page
    'home.title': 'AAC Optics - Fabricante profissional de componentes ópticos',
    'home.subtitle': 'Especializado em P&D, produção e venda de componentes ópticos de alta qualidade',
    'home.description': 'Somos um fabricante profissional de componentes ópticos dedicado a fornecer produtos ópticos e soluções de alta qualidade para clientes em todo o mundo.',
    'home.ourProducts': 'Nossos produtos',
    'home.whyChooseUs': 'Por que nos escolher',
    'home.quality': 'Excelente qualidade',
    'home.qualityDesc': 'Sistema rigoroso de controle de qualidade garante que cada produto atenda aos mais altos padrões',
    'home.innovation': 'Inovação técnica',
    'home.innovationDesc': 'Investimento contínuo em P&D, lançamento constante de produtos inovadores que atendem às demandas do mercado',
    'home.service': 'Serviço profissional',
    'home.serviceDesc': 'Equipe técnica profissional fornecendo suporte técnico abrangente e atendimento pós-venda',
    
    // Products
    'products.title': 'Série de produtos',
    'products.optics': 'Componentes ópticos',
    'products.opticsDesc': 'Lentes ópticas de alta precisão, espelhos e outros componentes centrais',
    'products.systems': 'Sistemas ópticos',
    'products.systemsDesc': 'Soluções completas de sistemas ópticos',
    'products.components': 'Peças ópticas',
    'products.componentsDesc': 'Várias peças ópticas profissionais e acessórios',
    
    // About
    'about.title': 'Sobre nós',
    'about.company': 'Perfil da empresa',
    'about.companyDesc': 'A AAC Optics foi estabelecida há anos como uma empresa de alta tecnologia especializada em P&D, produção e venda de componentes ópticos. Temos equipamentos de produção avançados e uma equipe técnica profissional, comprometidos em fornecer produtos ópticos de alta qualidade aos clientes.',
    'about.mission': 'Nossa missão',
    'about.missionDesc': 'Através da inovação tecnológica contínua e serviços de produtos de qualidade, tornar-se um fornecedor líder mundial de componentes ópticos.',
    'about.vision': 'Nossa visão',
    'about.visionDesc': 'Promover o desenvolvimento da tecnologia óptica e contribuir para uma vida melhor para a humanidade.',
    
    // Contact
    'contact.title': 'Entre em contato',
    'contact.address': 'Endereço',
    'contact.phone': 'Telefone',
    'contact.email': 'E-mail',
    'contact.getInTouch': 'Entrar em contato',
    
    // News
    'news.title': 'Centro de notícias',
    'news.latest': 'Últimas notícias',
    'news.readMore': 'Leia mais',
    
    // Common
    'common.learnMore': 'Saiba mais',
    'common.viewProducts': 'Ver produtos',
    'common.contactUs': 'Entre em contato',
  }
};

const languageNames = {
  zh: '中文',
  en: 'English',
  ja: '日本語',
  ko: '한국어',
  fr: 'Français',
  de: 'Deutsch',
  pt: 'Português'
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['zh']] || key;
  };

  const getLanguageName = (lang: Language): string => {
    return languageNames[lang];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getLanguageName }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
