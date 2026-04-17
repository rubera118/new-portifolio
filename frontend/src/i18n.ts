import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: {
      // Nav
      nav: {
        home: 'Home',
        about: 'About',
        skills: 'Skills',
        projects: 'Projects',
        awards: 'Awards',
        gallery: 'Gallery',
        blog: 'Blog',
        contact: 'Contact',
      },
      // Hero
      hero: {
        greeting: "Hello, I'm",
        name: 'UWAMWEZI PHIONAH',
        roles: ['Software Developer', 'Frontend Engineer', 'Problem Solver', 'Creative Coder'],
        tagline: 'Building smart, modern solutions through code and creativity.',
        cta_projects: 'View Projects',
        cta_contact: 'Get in Touch',
        scroll: 'Scroll down',
        visitors: 'visitors',
      },
      // About
      about: {
        label: 'About Me',
        title: 'Passionate about crafting digital experiences',
        bio: "I'm Uwamwezi Phionah, a passionate software development student based in Kigali, Rwanda. I love building clean, responsive, and user-friendly web applications that solve real-world problems. With a strong foundation in HTML, CSS, JavaScript, and a growing expertise in modern frameworks, I'm on a continuous journey to sharpen my skills and contribute meaningfully to the tech community.",
        bio2: "When I'm not coding, I enjoy exploring new technologies, sharing knowledge, and collaborating with fellow developers. I believe great software is built at the intersection of creativity and technical excellence.",
        stat1_num: '10+',
        stat1_label: 'Projects Built',
        stat2_num: '3+',
        stat2_label: 'Languages',
        stat3_num: '2+',
        stat3_label: 'Years Learning',
        download_cv: 'Download CV',
      },
      // Skills
      skills: {
        label: 'Skills',
        title: 'Technologies I work with',
        subtitle: 'A growing toolkit of modern web technologies',
      },
      // Projects
      projects: {
        label: 'Projects',
        title: 'Things I\'ve Built',
        subtitle: 'A selection of projects that showcase my skills',
        live: 'Live Demo',
        github: 'GitHub',
        view_all: 'View All Projects',
        no_projects: 'Projects coming soon...',
      },
      // Awards
      awards: {
        label: 'Honors & Awards',
        title: 'Recognition & Achievements',
        subtitle: 'Milestones along my learning journey',
      },
      // Gallery
      gallery: {
        label: 'Gallery',
        title: 'Moments & Work',
        subtitle: 'A visual glimpse into my journey',
      },
      // Blog
      blog: {
        label: 'Blog',
        title: 'Thoughts & Insights',
        subtitle: 'Writing about code, design, and the journey of learning',
        read_more: 'Read More',
        coming_soon: 'Coming Soon',
        coming_soon_msg: "I'm working on some exciting articles. Stay tuned!",
        no_posts: 'No posts yet — check back soon!',
      },
      // Contact
      contact: {
        label: 'Contact',
        title: "Let's Work Together",
        subtitle: "Have a project in mind or just want to say hello? I'd love to hear from you.",
        name: 'Your Name',
        email: 'Your Email',
        subject: 'Subject (optional)',
        message: 'Your Message',
        send: 'Send Message',
        sending: 'Sending...',
        success: "Message sent! I'll get back to you soon 🚀",
        error: 'Something went wrong. Please try again.',
        email_label: 'Email',
        phone_label: 'Phone',
        location_label: 'Location',
        location_val: 'Kigali, Rwanda',
      },
      // Footer
      footer: {
        rights: 'All rights reserved.',
        built: 'Built with React & FastAPI',
      },
    },
  },

  fr: {
    translation: {
      nav: {
        home: 'Accueil',
        about: 'À Propos',
        skills: 'Compétences',
        projects: 'Projets',
        awards: 'Prix',
        gallery: 'Galerie',
        blog: 'Blog',
        contact: 'Contact',
      },
      hero: {
        greeting: 'Bonjour, je suis',
        name: 'UWAMWEZI PHIONAH',
        roles: ['Développeuse Web', 'Ingénieure Frontend', 'Résolveur de Problèmes', 'Codeuse Créative'],
        tagline: 'Créer des solutions modernes et intelligentes grâce au code et à la créativité.',
        cta_projects: 'Voir les Projets',
        cta_contact: 'Me Contacter',
        scroll: 'Défiler',
        visitors: 'visiteurs',
      },
      about: {
        label: 'À Propos',
        title: 'Passionnée par la création d\'expériences numériques',
        bio: "Je suis Uwamwezi Phionah, une étudiante en développement logiciel basée à Kigali, Rwanda. J'adore créer des applications web propres, réactives et conviviales. Avec une solide base en HTML, CSS, JavaScript et une expertise croissante dans les frameworks modernes, je suis en voyage continu pour affiner mes compétences.",
        bio2: "Quand je ne code pas, j'aime explorer de nouvelles technologies et collaborer avec d'autres développeurs. Je crois que le grand logiciel est construit à l'intersection de la créativité et de l'excellence technique.",
        stat1_num: '10+',
        stat1_label: 'Projets Réalisés',
        stat2_num: '3+',
        stat2_label: 'Langages',
        stat3_num: '2+',
        stat3_label: 'Ans d\'Apprentissage',
        download_cv: 'Télécharger CV',
      },
      skills: {
        label: 'Compétences',
        title: 'Technologies avec lesquelles je travaille',
        subtitle: 'Une boîte à outils croissante de technologies web modernes',
      },
      projects: {
        label: 'Projets',
        title: 'Ce Que J\'ai Construit',
        subtitle: 'Une sélection de projets qui montrent mes compétences',
        live: 'Démo Live',
        github: 'GitHub',
        view_all: 'Voir Tous les Projets',
        no_projects: 'Projets bientôt disponibles...',
      },
      awards: {
        label: 'Honneurs & Prix',
        title: 'Reconnaissances & Réalisations',
        subtitle: 'Jalons de mon parcours d\'apprentissage',
      },
      gallery: {
        label: 'Galerie',
        title: 'Moments & Travaux',
        subtitle: 'Un aperçu visuel de mon parcours',
      },
      blog: {
        label: 'Blog',
        title: 'Pensées & Perspectives',
        subtitle: 'Écrire sur le code, le design et le voyage de l\'apprentissage',
        read_more: 'Lire Plus',
        coming_soon: 'Bientôt Disponible',
        coming_soon_msg: 'Je travaille sur des articles passionnants. Restez à l\'écoute!',
        no_posts: 'Aucun article pour l\'instant — revenez bientôt!',
      },
      contact: {
        label: 'Contact',
        title: 'Travaillons Ensemble',
        subtitle: 'Vous avez un projet en tête ou voulez simplement dire bonjour? Je serais ravie de vous entendre.',
        name: 'Votre Nom',
        email: 'Votre Email',
        subject: 'Sujet (optionnel)',
        message: 'Votre Message',
        send: 'Envoyer le Message',
        sending: 'Envoi en cours...',
        success: 'Message envoyé! Je vous répondrai bientôt 🚀',
        error: 'Quelque chose a mal tourné. Veuillez réessayer.',
        email_label: 'Email',
        phone_label: 'Téléphone',
        location_label: 'Localisation',
        location_val: 'Kigali, Rwanda',
      },
      footer: {
        rights: 'Tous droits réservés.',
        built: 'Construit avec React & FastAPI',
      },
    },
  },

  rw: {
    translation: {
      nav: {
        home: 'Ahabanza',
        about: 'Ibyanjye',
        skills: 'Ubumenyi',
        projects: 'Ibikorwa',
        awards: 'Ibihembo',
        gallery: 'Amafoto',
        blog: 'Inyandiko',
        contact: 'Twandikire',
      },
      hero: {
        greeting: 'Muraho, ndi',
        name: 'UWAMWEZI PHIONAH',
        roles: ['Umuyobozi wa Software', 'Injeniyeri ya Frontend', 'Gukemura Ibibazo', 'Umucuranzi wa Code'],
        tagline: 'Kubaka ibisubizo byiza kandi bishya binyuze mu code no gutunga ubwenge.',
        cta_projects: 'Reba Ibikorwa',
        cta_contact: 'Twandikire',
        scroll: 'Manuka hasi',
        visitors: 'abasura',
      },
      about: {
        label: 'Ibyanjye',
        title: 'Nkunda gukora ibikorwa bya digitali',
        bio: "Ndi Uwamwezi Phionah, umunyeshuri w'iterambere rya software utuye i Kigali, Rwanda. Nkunda kubaka porogaramu nziza, zishobora gukora ku bikoresho bitandukanye kandi zifasha abantu. Mfite insinzi nziza muri HTML, CSS, JavaScript no kumenya gukoresha imodeli za none.",
        bio2: "Igihe ntakora code, nkunda gushakashaka ikoranabuhanga rishya no gukorana n'abandi banyamuryango. Nkunda gukora porogaramu nziza zihuza ubwenge n'ubumenyi bwa tekiniki.",
        stat1_num: '10+',
        stat1_label: 'Ibikorwa',
        stat2_num: '3+',
        stat2_label: 'Indimi',
        stat3_num: '2+',
        stat3_label: 'Imyaka y\'Kwiga',
        download_cv: 'Pakurura CV',
      },
      skills: {
        label: 'Ubumenyi',
        title: 'Ikoranabuhanga nkoresheje',
        subtitle: 'Urutonde rw\'ubumenyi rwa tekiniki bwa none',
      },
      projects: {
        label: 'Ibikorwa',
        title: 'Ibyo Nakoze',
        subtitle: 'Amashusho y\'ibikorwa byerekana ubumenyi bwanjye',
        live: 'Reba Live',
        github: 'GitHub',
        view_all: 'Reba Ibikorwa Byose',
        no_projects: 'Ibikorwa bizaza vuba...',
      },
      awards: {
        label: 'Ibihembo',
        title: 'Impano & Ibikorwa Byiza',
        subtitle: 'Inzira y\'urugendo rwanjye rwo kwiga',
      },
      gallery: {
        label: 'Amafoto',
        title: 'Ibihe & Ibikorwa',
        subtitle: 'Amafoto y\'urugendo rwanjye',
      },
      blog: {
        label: 'Inyandiko',
        title: 'Ibitekerezo & Ubumenyi',
        subtitle: 'Kwandika ku code, design no kwiga',
        read_more: 'Soma Byinshi',
        coming_soon: 'Bizaza Vuba',
        coming_soon_msg: 'Nkora ku ngingo zizereka. Komeza urebe!',
        no_posts: 'Nta nyandiko ubu — garuka vuba!',
      },
      contact: {
        label: 'Twandikire',
        title: 'Dukorane Hamwe',
        subtitle: 'Ufite umushinga cyangwa ushaka kuvuga nanjye? Nkunda kukumva.',
        name: 'Izina Ryawe',
        email: 'Email Yawe',
        subject: 'Inshingano (ntabwo ngombwa)',
        message: 'Ubutumwa Bwawe',
        send: 'Ohereza Ubutumwa',
        sending: 'Kohereza...',
        success: 'Ubutumwa bwoherejwe! Nzakusubiza vuba 🚀',
        error: 'Habaye ikosa. Ongera ugerageze.',
        email_label: 'Email',
        phone_label: 'Telefoni',
        location_label: 'Aho Ntuye',
        location_val: 'Kigali, Rwanda',
      },
      footer: {
        rights: 'Uburenganzira bwose bugabanijwe.',
        built: 'Yakozwe na React & FastAPI',
      },
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

export default i18n
