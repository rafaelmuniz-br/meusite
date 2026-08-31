// Todos os textos do currículo ficam centralizados aqui.
// Edite este arquivo para atualizar o conteúdo do site.

export const profile = {
  name: 'Rafael Muniz',
  photo: '/profile.jpg',
  initials: 'RM',
}

export const contacts = [
  {
    label: 'Email',
    value: 'rafael.s.m.muniz@gmail.com',
    href: 'mailto:rafael.s.m.muniz@gmail.com',
  },
  {
    label: 'Telefone',
    value: '(71) 99105-5569',
    href: 'tel:+5571991055569',
  },
  {
    label: 'LinkedIn',
    value: 'rafael-muniz-88b417245',
    href: 'https://www.linkedin.com/in/rafael-muniz-88b417245',
    external: true,
  },
]

// Número usado pelo formulário de contato (WhatsApp), formato internacional sem símbolos.
export const whatsappNumber = '5571991055569'

export const education = {
  degree: 'Bacharelado em Ciência e Tecnologia',
  institution: 'UFBA',
}

// "text" usa "\n" para forçar a quebra de linha; "highlight" é a parte final
// exibida em destaque (cor de texto primária) — o resto do texto usa a cor secundária.
export const summary = {
  text: 'Programador com anos de bagagem resolvendo todo tipo de problema.\nO que você precisa envolve tecnologia? ',
  highlight: 'Eu faço acontecer.',
}

// "summary": frase curta sempre visível. "highlights": lista detalhada que fica
// dentro do dropdown (<details>) de cada experiência — escrita no método XYZ
// (resultado primeiro, depois como foi feito), usando só números reais do Rafael.
export const experiences = [
  {
    period: 'Julho 2025 – Atual',
    role: 'Desenvolvedor Fullstack',
    company: 'Grupo A TARDE',
    summary:
      'Sites dos projetos educacionais e site institucional do grupo — desenvolvimento e manutenção contínua.',
    highlights: [
      'Entrego em Vue.js e Nuxt os sites dos projetos educacionais do jornal — Prêmio Educação A TARDE e Jovem Jornalista —, partindo do design definido pelo time de design e mantendo cada um atualizado a cada edição.',
      'Mantenho o ambiente de ensino a distância dos projetos educacionais sempre disponível, administrando e dando suporte ao AVA Moodle (plataforma terceirizada).',
      'Assumi a manutenção do site institucional do grupo (WordPress, de fornecedor terceirizado) e, em julho de 2026, propus um novo site — publicado no meu portfólio —, hoje em análise pelo grupo para substituir o atual.',
    ],
  },
  {
    period: 'Janeiro 2025 – Atual',
    role: 'Desenvolvedor Freelancer',
    company: '',
    summary: 'Sites e sistemas sob demanda para empresas, do design ao deploy.',
    highlights: [
      'Desenvolvo sites e sistemas sob demanda para empresas de forma independente, conduzindo cada projeto sozinho do design ao deploy.',
      'Mantenho essa atuação em paralelo ao trabalho no Grupo A TARDE, atendendo clientes do primeiro contato à entrega.',
    ],
  },
  {
    period: 'Agosto 2024 – Janeiro 2025',
    duration: '6 meses',
    role: 'Suporte Técnico N3',
    company: 'Sindauto (Sindicato das Auto Escolas da Bahia)',
    summary:
      'Suporte N3 ao sistema interno usado por cerca de 90% dos Centros de Formação de Condutores da Bahia.',
    highlights: [
      'Resolvi dezenas de chamados por dia no sistema interno do sindicato — que atende cerca de 90% dos Centros de Formação de Condutores da Bahia —, atuando via CloudBeaver e diretamente no banco de dados.',
      'Mantive as equipes operantes atendendo chamados presenciais de infraestrutura, incluindo manutenção de estações de trabalho.',
      'Dei suporte ao gerenciamento de dados da entidade e automatizei processos internos recorrentes.',
    ],
  },
  {
    period: 'Outubro 2022 – Outubro 2024',
    duration: '2 anos',
    role: 'Estagiário (Bolsista PROCATI)',
    company: 'Superintendência de TI, UFBA',
    summary:
      'Manutenção e evolução do GERE, sistema de gerência de eventos da UFBA em operação há mais de 20 anos.',
    highlights: [
      'Mantive em operação o GERE (Sistema de Gerência de Eventos), plataforma multi-eventos legada com mais de 20 anos de uso, que apoia os eventos acadêmicos da UFBA.',
      'Configurei eventos pela interface web e dei suporte de rotina a gerentes de eventos e participantes ao longo de 2 anos.',
      'Corrigi e evoluí o sistema mexendo diretamente no código-fonte (ASP/JavaScript) e no banco de dados (SQL Server), incluindo o desenvolvimento de relatórios em SQL.',
      'Dei rastreabilidade às mudanças documentando cada alteração no Redmine e acompanhando os chamados no GLPI.',
      'Reduzi a dependência de suporte individual treinando gerentes de eventos e novos estagiários no uso e na administração do sistema.',
    ],
  },
  {
    period: 'Março 2022 – Março 2023',
    duration: '1 ano',
    role: 'Voluntário',
    company: 'Onda Digital, Grupo de Pesquisa UFBA',
    summary:
      'Formação de professores em Computação e desenvolvimento do site do PROFCOMP.',
    highlights: [
      'Colaborei por um ano no PROFCOMP (Programa de Ações Pedagógicas para Formação de Professores em Computação), braço do Onda Digital voltado às relações entre Computação, Educação e Sociedade.',
      'Ajudei a desenvolver o site do PROFCOMP, apoiando as ações de inclusão sociodigital do grupo na Bahia.',
    ],
  },
]

// Descrições focadas nas atividades de desenvolvimento realizadas por Rafael em
// cada projeto — sem afirmar vínculo societário, parceria ou representação
// comercial (ver seção "Portfólio e Projetos Desenvolvidos" em /politicas-e-termos).
// "status": texto curto em itálico abaixo da descrição (estágio comercial do case).
export const portfolio = [
  {
    slug: 'people-equipamentos',
    name: 'People Equipamentos',
    description:
      'Desenvolvimento de website institucional para a People Equipamentos, com foco na apresentação dos serviços de iluminação, painéis de LED e estrutura técnica para eventos, com experiência responsiva para dispositivos móveis.',
    status: 'Projeto contratado',
    url: 'https://peopleequipamentos.netlify.app/',
    logo: '/portfolio/logos/people-equipamentos.svg',
    bgColor: '#181818',
  },
  {
    slug: 'atarde-educacao',
    name: 'A TARDE Educação',
    description:
      'Desenvolvimento do site do programa A TARDE Educação, com foco na divulgação dos projetos, formações e experiências de educomunicação, priorizando a organização do conteúdo e a leitura em dispositivos móveis.',
    status: 'Em formalização',
    url: 'https://atardeeducacao.netlify.app/',
    logo: '/portfolio/logos/atarde-educacao.png',
    bgColor: '#F3F8FB',
  },
  {
    slug: 'ferreira-muniz-imoveis',
    name: 'Ferreira Muniz Imóveis',
    description:
      'Desenvolvimento de website institucional para a Ferreira Muniz Imóveis, com foco na apresentação da imobiliária, dos corretores e dos imóveis anunciados, com experiência responsiva para dispositivos móveis.',
    status: 'Projeto contratado',
    url: 'https://ferreiramunizimoveis.com.br/',
    logo: '/portfolio/logos/ferreira-muniz-imoveis.svg',
    bgColor: '#FFFFFF',
    logoScale: 0.7,
  },
  {
    slug: 'espaco-psique-e-vida',
    name: 'Espaço Psique e Vida',
    description:
      'Desenvolvimento de website institucional para o Espaço Psique e Vida, com foco na apresentação do espaço, dos serviços oferecidos e em uma experiência responsiva para dispositivos móveis.',
    status: 'Em formalização',
    url: 'https://espacopsiqueevida.netlify.app/',
    logo: '/portfolio/logos/espaco-psique-e-vida.png',
    bgColor: '#F3E3D3',
  },
  {
    slug: 'royale-solucoes-industriais',
    name: 'Royale Soluções Industriais',
    description:
      'Desenvolvimento de website institucional para a Royale Soluções Industriais, com foco na apresentação das soluções de automação industrial da empresa.',
    status: 'Em formalização',
    url: 'https://royalesolucoesindustriais.netlify.app/',
    logo: '/portfolio/logos/royale-solucoes-industriais.png',
    bgColor: '#FFFFFF',
  },
]

export const skills = [
  'Vue.js / Nuxt',
  'JavaScript / HTML / CSS',
  'Docker / Git',
  'Python / Power BI',
  'SQL / MySQL / SQL Server',
  'APIs REST',
  'Figma / UI/UX',
]

// Texto "digitado" no preloader de assinatura (efeito terminal).
export const preloaderPhrase = 'System.out.println("Rafael Muniz");'
