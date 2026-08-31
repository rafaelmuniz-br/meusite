// Conteúdo e modelo do formulário de solicitação de projeto (popup multi-etapas).
//
// FILOSOFIA: o formulário existe pra virar um briefing que o Rafael transforma
// num prompt de desenvolvimento. Então as perguntas são detalhadas, ramificam
// conforme a escolha do cliente, e NUNCA falam de tecnologia (hospedagem,
// domínio, linguagem...). O cliente só descreve o problema/desejo dele; a parte
// técnica é com o Rafael.
//
// Pra editar/adicionar pergunta: mexa só neste arquivo. O render é genérico
// (`ProjectRequestQuestionStep.vue`).

// ---------------------------------------------------------------------------
// Modelo
// ---------------------------------------------------------------------------

export type QuestionType = 'text' | 'textarea' | 'toggle' | 'tags' | 'color' | 'logo'

export interface Question {
  key: string // chave em form.answers. Compartilhada (canônica) ou `${tool}.slug`.
  label: string // a pergunta, em linguagem de gente
  help?: string // exemplo / dica de uma linha, exibida sob o label
  type: QuestionType
  placeholder?: string
  required?: boolean
  rows?: number // textarea
  toggleLabels?: [string, string] // toggle: [rótulo p/ true, rótulo p/ false]
  options?: string[] // tags: chips predefinidos (sempre há um "outro" livre)
  reveal?: Question // pergunta-filha, aparece quando o toggle está em "true"
}

export interface Step {
  id: string
  title: string
  intro?: string
  questions: Question[]
}

export type AnswerValue = string | string[] | boolean
export type Answers = Record<string, AnswerValue | undefined>

export function isAnswered(answers: Answers, key: string): boolean {
  const v = answers[key]
  if (Array.isArray(v)) return v.length > 0
  if (typeof v === 'boolean') return true
  return typeof v === 'string' && v.trim() !== ''
}

// ---------------------------------------------------------------------------
// Tipos de serviço (etapa 2)
// ---------------------------------------------------------------------------

export const serviceTypes = [
  {
    id: 'site',
    label: 'Site',
    description: 'Site profissional novo ou reformulação de um já existente. Responsivo, moderno e elegante.',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    description: 'Automatize seu WhatsApp: bots, respostas automáticas, integrações de atendimento.',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    description: 'Organização de perfil, destaques, identidade visual.',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    description:
      'Ferramentas para LIVE (overlays, metas, alertas, ranking), configuração de transmissão e suporte técnico.',
  },
  {
    id: 'sistema',
    label: 'Sistema',
    description: 'Um sistema sob medida para você automatizar processos, planilhas, relatórios, integrações.',
  },
  {
    id: 'suporte',
    label: 'Suporte',
    description: 'Ajustes, correções ou manutenção em algo que já existe.',
  },
  {
    id: 'outro',
    label: 'Outro',
    description: 'Conte o que você precisa e a gente vê como ajudar.',
  },
] as const

export type ServiceTypeId = (typeof serviceTypes)[number]['id']

export function serviceLabel(id: string): string {
  return serviceTypes.find((s) => s.id === id)?.label ?? 'Projeto'
}

// ---------------------------------------------------------------------------
// TikTok — serviços de LIVE (multi-seleção)
// ---------------------------------------------------------------------------

export const tiktokServices = [
  { id: 'overlay', label: 'Overlay personalizado', description: 'Layout visual da LIVE: metas, seguidores, mensagens e identidade do criador.' },
  { id: 'painel-metas', label: 'Painel de metas', description: 'Metas de seguidores, presentes, inscrições e mais.' },
  { id: 'alertas', label: 'Alertas personalizados', description: 'Animações e notificações para eventos da LIVE.' },
  { id: 'ranking', label: 'Ranking de apoiadores', description: 'Ranking visual dos principais apoiadores.' },
  { id: 'painel-comentarios', label: 'Painel de comentários', description: 'Ferramenta para acompanhar e destacar comentários.' },
  { id: 'interativas', label: 'Ferramentas interativas', description: 'Sorteios, contadores, desafios, comandos e interações.' },
  { id: 'dashboard', label: 'Dashboard de LIVE', description: 'Painel próprio para acompanhar métricas e organização.' },
  { id: 'cortes', label: 'Sistema de cortes', description: 'Organização de gravações e apoio para transformar LIVE em conteúdo.' },
  { id: 'assistente-conteudo', label: 'Assistente de conteúdo', description: 'Organização de ideias, títulos, descrições e conteúdo pós-LIVE.' },
  { id: 'landing-page', label: 'Landing page do criador', description: 'Página profissional reunindo redes, links, agenda e conteúdo.' },
  { id: 'controle-mobile', label: 'Painel de controle mobile', description: 'Controle de ferramentas da LIVE pelo celular.' },
  { id: 'automacao', label: 'Automação personalizada', description: 'Ferramentas sob medida para o workflow do criador.' },
  { id: 'config-live', label: 'Configuração de LIVE', description: 'TikTok LIVE Studio, cenas, fontes, áudio, câmera e resolução.' },
  { id: 'config-live-pix', label: 'Configuração de Live Pix', description: 'Live Pix, alertas, páginas e integração com a transmissão.' },
  { id: 'suporte-tecnico', label: 'Suporte Técnico para LIVE', description: 'Atendimento remoto para resolver problemas e configurar ferramentas.' },
] as const

export type TiktokServiceId = (typeof tiktokServices)[number]['id']

export function tiktokLabel(id: string): string {
  return tiktokServices.find((s) => s.id === id)?.label ?? id
}

// ---------------------------------------------------------------------------
// Perguntas específicas por ferramenta de TikTok (uma etapa cada)
// ---------------------------------------------------------------------------

export const tiktokToolDetails: Record<string, Question[]> = {
  overlay: [
    {
      key: 'overlay.elements',
      label: 'O que deve aparecer na tela ao mesmo tempo durante a LIVE?',
      type: 'tags',
      options: [
        'Contador de seguidores',
        'Meta',
        'Últimos seguidores',
        'Últimos presentes',
        'Mensagem fixa',
        'Cronômetro',
        'Moldura da câmera',
        'Chat',
        'Redes sociais',
      ],
    },
    {
      key: 'overlay.layout',
      label: 'Como você imagina a disposição das coisas na tela?',
      help: 'pode descrever com palavras, ou me mandar um rascunho / print depois',
      type: 'textarea',
      rows: 2,
    },
    {
      key: 'overlay.vibe',
      label: 'Qual o clima visual que você quer?',
      help: 'ex: minimalista · neon/gamer · fofo · elegante · retrô',
      type: 'text',
    },
    {
      key: 'overlay.fixedText',
      label: 'Tem textos que ficam fixos sempre? (regras, redes, "seja bem-vindo")',
      type: 'textarea',
      rows: 2,
    },
    {
      key: 'overlay.changes',
      label: 'O overlay muda ao longo da LIVE (abertura, intervalo, encerramento)?',
      type: 'toggle',
      toggleLabels: ['Sim', 'Não'],
      reveal: { key: 'overlay.changesHow', label: 'Descreve esses momentos.', type: 'textarea', rows: 2 },
    },
  ],
  'painel-metas': [
    {
      key: 'metas.quais',
      label: 'Quais metas você quer acompanhar?',
      type: 'tags',
      options: [
        'Seguidores',
        'Presentes / diamantes',
        'Curtidas',
        'Inscritos',
        'Espectadores ao vivo',
        'Valor arrecadado (Live Pix)',
      ],
    },
    { key: 'metas.alvo', label: 'Qual o número-alvo de cada meta? (pode ser um exemplo)', type: 'textarea', rows: 2 },
    {
      key: 'metas.zera',
      label: 'A meta zera quando?',
      help: 'toda LIVE · todo dia · toda semana · nunca',
      type: 'text',
    },
    {
      key: 'metas.aoBater',
      label: 'O que acontece quando bate a meta?',
      help: 'animação, som, mensagem, alguma recompensa que você promete...',
      type: 'textarea',
      rows: 2,
    },
    {
      key: 'metas.progresso',
      label: 'Como você quer ver o progresso?',
      help: 'barra enchendo · número · círculo · termômetro...',
      type: 'text',
    },
  ],
  alertas: [
    {
      key: 'alertas.eventos',
      label: 'Quais acontecimentos disparam um alerta?',
      type: 'tags',
      options: [
        'Novo seguidor',
        'Presente',
        'Presente grande',
        'Novo inscrito',
        'Alguém compartilhou',
        'Meta batida',
        'Comando específico',
      ],
    },
    { key: 'alertas.visual', label: 'Cada alerta tem um visual / animação diferente? Descreve o que imagina.', type: 'textarea', rows: 2 },
    { key: 'alertas.som', label: 'Tem som? Você já tem os arquivos ou precisa de ajuda?', type: 'text' },
    {
      key: 'alertas.texto',
      label: 'O que o alerta escreve na tela?',
      help: 'ex: "Fulano seguiu!", "Ciclano mandou uma Rosa!"',
      type: 'textarea',
      rows: 2,
    },
    { key: 'alertas.porValor', label: 'Presentes de valores diferentes têm alertas diferentes?', type: 'toggle', toggleLabels: ['Sim', 'Não'] },
  ],
  ranking: [
    {
      key: 'ranking.criterio',
      label: 'O ranking conta o quê?',
      help: 'presentes/diamantes · tempo assistindo · nº de comentários · participação nos jogos',
      type: 'text',
    },
    { key: 'ranking.quantos', label: 'Quantas pessoas aparecem? (top 3, top 10...)', type: 'text' },
    { key: 'ranking.periodo', label: 'Qual período conta? (a LIVE atual, a semana, o mês, sempre)', type: 'text' },
    { key: 'ranking.recompensa', label: 'Tem alguma vantagem ou reconhecimento pra quem fica no topo?', type: 'textarea', rows: 2 },
    { key: 'ranking.exibicao', label: 'Fica sempre na tela, ou você chama quando quer mostrar?', type: 'text' },
  ],
  'painel-comentarios': [
    {
      key: 'coment.proposito',
      label: 'Pra que serve esse painel?',
      help: 'destacar comentários na tela · moderar · os dois',
      type: 'text',
    },
    { key: 'coment.fixar', label: 'Você quer poder "fixar" um comentário na tela durante a LIVE?', type: 'toggle', toggleLabels: ['Sim', 'Não'] },
    { key: 'coment.filtro', label: 'Precisa filtrar alguma coisa? (palavrão, spam, link)', type: 'text' },
    { key: 'coment.moderadores', label: 'Mais alguém modera com você?', type: 'text' },
  ],
  interativas: [
    {
      key: 'inter.quais',
      label: 'Quais interações você quer?',
      type: 'tags',
      options: [
        'Sorteio',
        'Roleta',
        'Contador ("X flexões por presente")',
        'Desafios',
        'Enquete / votação',
        'Comandos de chat (!meta, !redes)',
        'Mini-jogos',
      ],
    },
    {
      key: 'inter.comoFunciona',
      label: 'Descreve como cada uma funciona na sua LIVE: quem entra, o que dispara, o que a pessoa ganha.',
      type: 'textarea',
      rows: 3,
    },
    { key: 'inter.participacao', label: 'O público participa pelo chat, por presente, ou pelos dois?', type: 'text' },
  ],
  dashboard: [
    {
      key: 'dash.oquever',
      label: 'O que você quer num painel só seu (que o público não vê)?',
      type: 'tags',
      options: ['Metas', 'Ganhos', 'Ranking', 'Cronograma da LIVE', 'Checklist', 'Anotações', 'Próximos sorteios'],
    },
    { key: 'dash.onde', label: 'Você abre isso no mesmo PC da LIVE, num segundo monitor, ou no celular?', type: 'text' },
  ],
  cortes: [
    { key: 'cortes.hoje', label: 'Você já faz cortes hoje? Como é o processo?', type: 'textarea', rows: 2 },
    {
      key: 'cortes.onde',
      label: 'Onde os cortes são publicados?',
      type: 'tags',
      options: ['TikTok', 'Reels', 'Shorts', 'YouTube'],
    },
    {
      key: 'cortes.ajuda',
      label: 'Você quer ajuda com o quê?',
      type: 'tags',
      options: ['Organizar as gravações', 'Achar os melhores momentos', 'Editar', 'Legendar', 'Publicar'],
    },
    { key: 'cortes.frequencia', label: 'Com que frequência você faz LIVE / quer postar cortes?', type: 'text' },
    { key: 'cortes.quemEdita', label: 'Quem edita: você, um editor, ou seria automático?', type: 'text' },
  ],
  'assistente-conteudo': [
    {
      key: 'assist.trava',
      label: 'Onde você trava hoje?',
      help: 'ideias de LIVE · títulos e descrições · roteiro · conteúdo pós-LIVE · calendário',
      type: 'textarea',
      rows: 2,
    },
    { key: 'assist.plataformas', label: 'Você posta em quais lugares além do TikTok?', type: 'text' },
    { key: 'assist.tipo', label: 'Quer algo que te dê ideias, que organize as suas, ou que gere textos prontos?', type: 'text' },
  ],
  'landing-page': [
    {
      key: 'land.reune',
      label: 'O que essa página precisa reunir?',
      type: 'tags',
      options: [
        'Todas as redes',
        'Agenda de LIVEs',
        'Últimos cortes',
        'Loja / produtos',
        'Contato pra parcerias',
        'Doação / Pix',
        'Bio',
      ],
    },
    { key: 'land.visual', label: 'Qual o clima visual? (a mesma "cara" do canal?)', type: 'text' },
    { key: 'land.autoAtualiza', label: 'Você quer poder atualizar sozinho (ex: mudar a agenda)?', type: 'toggle', toggleLabels: ['Sim', 'Pode ser com você'] },
  ],
  'controle-mobile': [
    {
      key: 'mobile.controla',
      label: 'O que você quer controlar pelo celular durante a LIVE?',
      type: 'tags',
      options: ['Trocar cena', 'Disparar alerta', 'Iniciar sorteio', 'Mostrar/esconder painel', 'Mudar meta'],
    },
    { key: 'mobile.comoSegura', label: 'Você segura o celular durante a LIVE, ou ele fica apoiado?', type: 'text' },
    { key: 'mobile.moderador', label: 'Mais alguém (moderador) também controlaria?', type: 'text' },
  ],
  automacao: [
    {
      key: 'auto.repetitivo',
      label: 'Tem alguma tarefa repetitiva no seu fluxo de LIVE que te consome tempo ou que você sempre esquece?',
      type: 'textarea',
      rows: 2,
    },
    { key: 'auto.passoApasso', label: 'Me descreve o passo a passo de como você prepara e faz uma LIVE hoje.', type: 'textarea', rows: 3 },
    { key: 'auto.magico', label: 'O que seria "mágico" se acontecesse sozinho?', type: 'textarea', rows: 2 },
  ],
  'config-live': [
    {
      key: 'cfg.oque',
      label: 'O que você quer deixar configurado?',
      type: 'tags',
      options: [
        'LIVE Studio do zero',
        'Cenas (abertura / tela cheia / intervalo)',
        'Câmera e qualidade da imagem',
        'Microfone e áudio',
        'Fontes e textos',
        'Plano de fundo',
        'Filtros',
      ],
    },
    {
      key: 'cfg.equipamento',
      label: 'Que equipamento você tem?',
      help: 'celular, webcam, câmera, microfone, PC — só o que você souber',
      type: 'textarea',
      rows: 2,
    },
    { key: 'cfg.incomoda', label: 'O que está te incomodando hoje na imagem ou no som?', type: 'textarea', rows: 2 },
    { key: 'cfg.quando', label: 'Tem alguma LIVE marcada? Quando?', type: 'text' },
  ],
  'config-live-pix': [
    {
      key: 'pix.jaTem',
      label: 'Você já tem conta no Live Pix?',
      type: 'toggle',
      toggleLabels: ['Sim', 'Ainda não'],
      reveal: { key: 'pix.usuario', label: 'Qual o e-mail / usuário? (pode me passar na conversa)', type: 'text' },
    },
    {
      key: 'pix.naTela',
      label: 'O que você quer que apareça na tela quando alguém manda um Pix?',
      help: 'nome, valor, mensagem, animação...',
      type: 'textarea',
      rows: 2,
    },
    { key: 'pix.pagina', label: 'Quer uma página de doação personalizada?', type: 'toggle', toggleLabels: ['Sim', 'Não'] },
    { key: 'pix.integra', label: 'Precisa integrar com as metas / alertas que a gente já falou?', type: 'text' },
  ],
  'suporte-tecnico': [
    {
      key: 'sup.problema',
      label: 'O que está acontecendo? Me conta o problema como você contaria pra um amigo.',
      type: 'textarea',
      rows: 3,
      required: true,
    },
    { key: 'sup.urgencia', label: 'É pra resolver agora (tem urgência) ou pra deixar tudo pronto com calma?', type: 'text' },
    {
      key: 'sup.modalidade',
      label: 'Como você prefere que eu te ajude?',
      help: 'te explico numa chamada · você compartilha a tela e eu oriento · eu acesso seu PC pelo AnyDesk e configuro (você me passa o código na hora e revoga depois)',
      type: 'textarea',
      rows: 2,
    },
    { key: 'sup.recorrencia', label: 'É uma vez só, ou você gostaria de alguém pra chamar sempre que der problema?', type: 'text' },
  ],
}

// ---------------------------------------------------------------------------
// Trilha SITE
// ---------------------------------------------------------------------------

export const siteSteps: Step[] = [
  {
    id: 'site-you',
    title: 'O que você faz',
    questions: [
      { key: 'clientName', label: 'Seu nome ou o do seu negócio', type: 'text', required: true },
      {
        key: 'whatYouDo',
        label: 'O que você faz? Descreve sua profissão ou atividade como você explicaria pra alguém que acabou de te conhecer.',
        type: 'textarea',
        rows: 3,
        required: true,
      },
      { key: 'city', label: 'Cidade onde você atende', type: 'text' },
      {
        key: 'hasCurrentSite',
        label: 'Você já tem um site hoje?',
        type: 'toggle',
        toggleLabels: ['Sim', 'Ainda não'],
        reveal: {
          key: 'currentSiteInfo',
          label: 'Qual o link? E o que te incomoda nele hoje — tem algo que você quer manter?',
          type: 'textarea',
          rows: 3,
          placeholder: 'https://...  —  o que muda, o que fica',
        },
      },
    ],
  },
  {
    id: 'site-goal',
    title: 'O objetivo do site',
    intro: 'Quanto mais você contar aqui, mais o site vai ter a sua cara.',
    questions: [
      {
        key: 'siteGoals',
        label: 'O que você mais quer que esse site faça por você?',
        type: 'tags',
        options: [
          'Passar credibilidade / parecer mais profissional',
          'Mostrar meu trabalho (portfólio)',
          'Fazer as pessoas me chamarem no WhatsApp',
          'Explicar meus serviços com clareza',
          'Ser encontrado no Google quando procuram meu tipo de serviço',
          'Ter um lugar "oficial" pra mandar as pessoas',
        ],
      },
      {
        key: 'siteAction',
        label: 'Quando alguém gosta do que vê, o que você quer que a pessoa faça em seguida?',
        help: 'ex: me chamar no WhatsApp, preencher um formulário, ligar, agendar, ir até meu endereço',
        type: 'text',
      },
      {
        key: 'siteAudience',
        label: 'Quem é o cliente que você quer atrair? Me descreve essa pessoa.',
        help: 'o que ela valoriza, o que ela procura quando te encontra',
        type: 'textarea',
        rows: 2,
      },
      {
        key: 'siteFeeling',
        label: 'Que impressão o site tem que passar? Descreve em 3 palavras.',
        help: 'ex: sofisticado e acolhedor · moderno e confiável · leve e criativo',
        type: 'text',
      },
    ],
  },
  {
    id: 'site-story',
    title: 'Sua história e seus serviços',
    questions: [
      {
        key: 'siteStory',
        label: 'Conta sua história: como você começou, o que te move, o que te diferencia de outros profissionais da sua área.',
        type: 'textarea',
        rows: 4,
        required: true,
      },
      {
        key: 'siteServices',
        label: 'Liste tudo que você oferece. Se der, uma frase explicando cada um.',
        type: 'textarea',
        rows: 4,
        required: true,
      },
      {
        key: 'siteDifferentiators',
        label: 'Por que alguém deveria te escolher e não outro profissional? O que só você faz, ou faz melhor?',
        type: 'textarea',
        rows: 2,
      },
    ],
  },
  {
    id: 'site-content',
    title: 'Conteúdo e portfólio',
    questions: [
      {
        key: 'sitePortfolio',
        label: 'Você tem trabalhos, fotos ou casos que quer mostrar no site? Me conta quais — as fotos você me manda depois pelo WhatsApp.',
        type: 'textarea',
        rows: 3,
      },
      {
        key: 'hasTestimonials',
        label: 'Você tem depoimentos ou avaliações de clientes?',
        type: 'toggle',
        toggleLabels: ['Sim', 'Ainda não'],
        reveal: {
          key: 'testimonialsWhere',
          label: 'Cola aqui os que puder, ou me diz de onde eu pego (Google, Instagram...).',
          type: 'textarea',
          rows: 3,
        },
      },
      {
        key: 'siteContentReady',
        label: 'O que você já tem pronto?',
        type: 'tags',
        options: [
          'Fotos profissionais (minhas / do trabalho)',
          'Textos',
          'Logo',
          'Depoimentos',
          'Ainda não tenho quase nada, preciso de ajuda',
        ],
      },
    ],
  },
  {
    id: 'site-look',
    title: 'A cara do site',
    questions: [
      { key: 'colorSwatches', label: 'Tem cores que combinam com você ou com sua marca?', type: 'color' },
      { key: 'hasLogo', label: 'Você já tem uma logo?', type: 'logo' },
      {
        key: 'siteReferences',
        label: 'Tem algum site (de qualquer área) que você acha bonito ou bem feito? Cola o link e me diz o que te agradou nele.',
        type: 'textarea',
        rows: 3,
      },
      {
        key: 'siteAvoid',
        label: 'Tem algo que você NÃO quer no seu site? Ou algo que te incomoda em sites de outros profissionais da sua área?',
        type: 'textarea',
        rows: 2,
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// TikTok — etapa "sobre você e seu canal" (depois das etapas de ferramenta)
// ---------------------------------------------------------------------------

export const tiktokChannelStep: Step = {
  id: 'tiktok-channel',
  title: 'Sobre você e seu canal',
  questions: [
    { key: 'clientName', label: 'Seu nome ou o nome do canal', type: 'text', required: true },
    {
      key: 'tiktokChannel',
      label: 'Me conta sobre suas LIVEs: que tipo de conteúdo, há quanto tempo você faz, tamanho da audiência hoje, com que frequência.',
      type: 'textarea',
      rows: 3,
    },
    {
      key: 'tiktokVibe',
      label: 'Seu canal tem uma "cara"? Cores, mascote, estilo (gamer, aconchegante, chique, caótico)?',
      type: 'textarea',
      rows: 2,
    },
    { key: 'colorSwatches', label: 'Cores do seu canal', type: 'color' },
    { key: 'hasLogo', label: 'Você já tem uma logo / identidade visual?', type: 'logo' },
    {
      key: 'tiktokReference',
      label: 'Tem algum criador cujas LIVEs você acha visualmente incríveis? Manda o @ e me diz o que te chama atenção.',
      type: 'textarea',
      rows: 2,
    },
    { key: 'tiktokReuse', label: 'É só pra você, ou você quer poder oferecer isso pra outros criadores também?', type: 'text' },
    {
      key: 'tiktokCurrentTools',
      label: 'Você já usa alguma ferramenta hoje (StreamElements, Live Pix, OBS...)? Quer manter, trocar ou integrar?',
      type: 'textarea',
      rows: 2,
    },
  ],
}

// ---------------------------------------------------------------------------
// Trilhas genéricas (WhatsApp / Instagram / Sistema / Suporte / Outro)
// ---------------------------------------------------------------------------

export const genericSteps: Record<string, Step[]> = {
  whatsapp: [
    {
      id: 'wa',
      title: 'Seu WhatsApp hoje',
      questions: [
        {
          key: 'waProblem',
          label: 'O problema em uma frase: o que te faz perder tempo ou clientes hoje no WhatsApp?',
          type: 'textarea',
          rows: 2,
          required: true,
        },
        {
          key: 'waCommon',
          label: 'Quais mensagens ou perguntas você responde toda hora? Liste as mais comuns (pode colar exemplos reais).',
          type: 'textarea',
          rows: 4,
        },
        {
          key: 'waSolve',
          label: 'O que você quer que o WhatsApp resolva sozinho?',
          type: 'tags',
          options: [
            'Responder dúvidas',
            'Agendar / marcar horário',
            'Mandar orçamento',
            'Qualificar quem chega',
            'Enviar catálogo / preços',
            'Lembrete de compromisso',
            'Recuperar quem sumiu',
          ],
        },
        { key: 'waHandoff', label: 'Quando o robô não der conta, ele te passa a conversa? Como você quer ser avisado?', type: 'text' },
        { key: 'waTone', label: 'Qual o tom das suas mensagens? Manda um exemplo de como VOCÊ escreve.', type: 'textarea', rows: 2 },
        {
          key: 'waIntegra',
          label: 'Isso precisa conversar com alguma coisa que você já usa? (agenda, lista de clientes, catálogo)',
          help: 'pode falar em palavras suas, não precisa saber o nome técnico',
          type: 'textarea',
          rows: 2,
        },
        { key: 'waNumber', label: 'É o seu número pessoal, ou um número separado pro comercial?', type: 'text' },
      ],
    },
  ],
  instagram: [
    {
      id: 'ig',
      title: 'Seu Instagram hoje',
      questions: [
        { key: 'igProblem', label: 'O que te incomoda hoje no seu Instagram?', type: 'textarea', rows: 2, required: true },
        {
          key: 'igImprove',
          label: 'O que você quer melhorar primeiro?',
          type: 'tags',
          options: [
            "A 'cara' do feed",
            'Os destaques',
            'A bio',
            'A frequência de posts',
            'A qualidade das fotos',
            'A estratégia de conteúdo',
          ],
        },
        { key: 'igGoal', label: 'Qual o objetivo da conta? (atrair clientes, vender direto, portfólio, autoridade...)', type: 'text' },
        { key: 'igContent', label: 'Você já tem fotos / conteúdo, ou precisa de ajuda pra produzir?', type: 'text' },
        { key: 'igReference', label: 'Tem algum perfil que você admira? Manda o @ e diz o que te agrada.', type: 'textarea', rows: 2 },
        { key: 'igFrequency', label: 'Com que frequência você consegue postar de verdade?', type: 'text' },
      ],
    },
  ],
  sistema: [
    {
      id: 'sys',
      title: 'O processo que te consome tempo',
      questions: [
        {
          key: 'sysProblem',
          label: 'Qual tarefa hoje é manual, chata ou demorada, e você queria que fosse automática?',
          type: 'textarea',
          rows: 2,
          required: true,
        },
        { key: 'sysHowNow', label: 'Me descreve o passo a passo de como você faz isso hoje, do começo ao fim.', type: 'textarea', rows: 4 },
        { key: 'sysFrequency', label: 'Com que frequência? (todo dia, toda semana, todo mês...)', type: 'text' },
        { key: 'sysWhere', label: 'Onde isso vive hoje? (papel, caderno, planilha, WhatsApp, na sua cabeça...)', type: 'text' },
        { key: 'sysWho', label: 'Quem mais faz ou precisaria usar isso?', type: 'text' },
        { key: 'sysSuccess', label: 'Se desse certo, o que mudaria pra você? Como você saberia que ficou bom?', type: 'textarea', rows: 2 },
      ],
    },
  ],
  suporte: [
    {
      id: 'sup',
      title: 'O que precisa de ajuste',
      questions: [
        {
          key: 'supProblem',
          label: 'O que precisa ser consertado ou mudado? Descreve como você percebe o problema.',
          type: 'textarea',
          rows: 3,
          required: true,
        },
        { key: 'supWhere', label: 'Onde está isso? (manda o link, ou me diz onde eu encontro)', type: 'text' },
        { key: 'supWhen', label: 'O que aconteceu / o que mudou? Quando começou?', type: 'textarea', rows: 2 },
        { key: 'supUrgency', label: 'É urgente? Tem algum prazo ou evento dependendo disso?', type: 'text' },
        { key: 'supHistory', label: 'Você sabe quem cuidou disso antes, ou está sem contato com quem fez?', type: 'text' },
      ],
    },
  ],
  outro: [
    {
      id: 'outro',
      title: 'Conta com suas palavras',
      questions: [
        {
          key: 'otherNeed',
          label:
            'Conta o que você precisa como se estivesse explicando pra um amigo. Não precisa saber nada de tecnologia — isso é comigo.',
          type: 'textarea',
          rows: 5,
          required: true,
        },
        { key: 'otherOutcome', label: 'Qual é o resultado que você quer no final?', type: 'textarea', rows: 2 },
        { key: 'otherTried', label: 'Já tentou resolver de outro jeito? O que não funcionou?', type: 'textarea', rows: 2 },
        {
          key: 'otherExample',
          label: 'Tem algum exemplo (site, app, ferramenta, pessoa) que faz algo parecido com o que você quer?',
          type: 'textarea',
          rows: 2,
        },
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Etapa final compartilhada — "Onde eu te encontro"
// (campos já respondidos antes são escondidos automaticamente)
// ---------------------------------------------------------------------------

export const linksStep: Step = {
  id: 'links',
  title: 'Onde eu te encontro',
  intro: 'Não preciso do seu número — a conversa já abre a partir do seu WhatsApp. Só me diz onde eu vejo mais do seu trabalho.',
  questions: [
    { key: 'clientName', label: 'Seu nome ou o do seu negócio', type: 'text', required: true },
    { key: 'instagram', label: 'Seu Instagram ou outra rede onde eu vejo seu trabalho', help: '@seuusuario', type: 'text' },
    {
      key: 'otherLinks',
      label: 'Algum outro link que ajude a te conhecer?',
      help: 'site, portfólio, YouTube, seu perfil no Google...',
      type: 'text',
    },
    { key: 'email', label: 'E-mail', type: 'text' },
  ],
}
