import type { ResumeContent } from './resume'

export const resumeEn: ResumeContent = {
  education: {
    degree: 'Bachelor of Science and Technology',
    institution: 'UFBA',
  },

  summary: {
    text: 'A developer with years of experience solving every kind of problem.\nDoes what you need involve technology? ',
    highlight: 'I make it happen.',
  },

  experiences: [
    {
      period: 'July 2025 – Present',
      role: 'Fullstack Developer',
      company: 'Grupo A TARDE',
      summary:
        "Websites for the group's educational projects and its corporate site — ongoing development and maintenance.",
      highlights: [
        "I build the websites for the newspaper's educational projects — Prêmio Educação A TARDE and Jovem Jornalista — in Vue.js and Nuxt, implementing the design defined by the design team and keeping each one updated every edition.",
        'I keep the distance-learning environment for the educational projects always available, administering and supporting the Moodle LMS (a third-party platform).',
        "I took over maintenance of the group's corporate website (WordPress, from a third-party vendor) and, in July 2026, proposed a new site — published in my portfolio — currently under review by the group to replace the current one.",
      ],
    },
    {
      period: 'January 2025 – Present',
      role: 'Freelance Developer',
      company: '',
      summary: 'Websites and systems on demand for companies, from design to deployment.',
      highlights: [
        'I develop websites and systems on demand for companies independently, handling each project on my own from design to deployment.',
        'I keep this work going alongside my role at Grupo A TARDE, serving clients from first contact to delivery.',
      ],
    },
    {
      period: 'August 2024 – January 2025',
      duration: '6 months',
      role: 'N3 Technical Support',
      company: 'Sindauto (Bahia Driving Schools Union)',
      summary:
        "N3 support for the internal system used by about 90% of Bahia's driver training centers.",
      highlights: [
        "I resolved dozens of tickets a day in the union's internal system — which serves about 90% of Bahia's driver training centers — working through CloudBeaver and directly in the database.",
        'I kept teams running by handling on-site infrastructure tickets, including workstation maintenance.',
        "I supported the organization's data management and automated recurring internal processes.",
      ],
    },
    {
      period: 'October 2022 – October 2024',
      duration: '2 years',
      role: 'Intern (PROCATI Scholarship)',
      company: 'IT Department, UFBA',
      summary:
        "Maintenance and evolution of GERE, UFBA's event management system, in operation for over 20 years.",
      highlights: [
        "I worked on GERE (Event Management System), a legacy multi-event platform with over 20 years of use that supports UFBA's academic events.",
        'I configured events through the web interface and provided routine support to event managers and participants over 2 years.',
        'I worked with the source code (ASP/JavaScript) and the database (SQL Server), including developing SQL reports.',
        'I gave traceability to changes by documenting tasks in Redmine and tracking tickets in GLPI.',
        'I trained event managers and new interns on using and administering the system.',
      ],
    },
    {
      period: 'March 2022 – March 2023',
      duration: '1 year',
      role: 'Volunteer',
      company: 'Onda Digital, UFBA Research Group',
      summary: 'Training computing teachers and developing the PROFCOMP website.',
      highlights: [
        'I collaborated for a year on PROFCOMP (Pedagogical Actions Program for Training Computing Teachers), the branch of Onda Digital focused on the relationship between Computing, Education and Society.',
        "I helped develop the PROFCOMP website, supporting the group's socio-digital inclusion efforts in Bahia.",
      ],
    },
  ],

  portfolio: [
    {
      slug: 'people-equipamentos',
      name: 'People Equipamentos',
      description:
        'Institutional website development for People Equipamentos, focused on presenting their professional lighting services, LED panels and technical structure for events, with a responsive experience for mobile devices.',
      status: 'Formalized',
      url: 'https://peopleequipamentos.netlify.app/',
      logo: '/portfolio/logos/people-equipamentos.svg',
      bgColor: '#181818',
    },
    {
      slug: 'atarde-educacao',
      name: 'A TARDE Educação',
      description:
        'Website development for the A TARDE Educação program, focused on promoting its educommunication projects, courses and experiences, prioritizing content organization and mobile reading.',
      status: 'Being formalized',
      url: 'https://atardeeducacao.netlify.app/',
      logo: '/portfolio/logos/atarde-educacao.png',
      bgColor: '#F3F8FB',
    },
    {
      slug: 'ferreira-muniz-imoveis',
      name: 'Ferreira Muniz Imóveis',
      description:
        'Institutional website development for Ferreira Muniz Imóveis, focused on presenting the agency, its brokers and the listed properties, with a responsive experience for mobile devices.',
      status: 'Formalized',
      url: 'https://ferreiramunizimoveis.com.br/',
      logo: '/portfolio/logos/ferreira-muniz-imoveis.svg',
      bgColor: '#FFFFFF',
      logoScale: 0.7,
    },
    {
      slug: 'loja-kalu',
      name: 'Kalu',
      description:
        'Website development for Kalu, a sunglasses shop in Salvador, with a catalog of models, variant selection (color, temple and view) and order checkout via WhatsApp, prioritizing the mobile experience.',
      status: 'Formalized',
      url: 'https://lojakalu.netlify.app/',
      logo: '/portfolio/logos/loja-kalu.svg',
      bgColor: '#FAF7F0',
      logoScale: 1.05,
    },
    {
      slug: 'royale-solucoes-industriais',
      name: 'Royale Soluções Industriais',
      description:
        "Institutional website development for Royale Soluções Industriais, focused on presenting the company's industrial automation solutions.",
      status: 'Being formalized',
      url: 'https://royalesolucoesindustriais.netlify.app/',
      logo: '/portfolio/logos/royale-solucoes-industriais.png',
      bgColor: '#FFFFFF',
    },
    {
      slug: 'espaco-psique-e-vida',
      name: 'Espaço Psique e Vida',
      description:
        'Institutional website development for Espaço Psique e Vida, focused on presenting the practice, the services offered and a responsive experience for mobile devices.',
      status: 'Being formalized',
      url: 'https://espacopsiqueevida.netlify.app/',
      logo: '/portfolio/logos/espaco-psique-e-vida.png',
      bgColor: '#F3E3D3',
    },
  ],
}
