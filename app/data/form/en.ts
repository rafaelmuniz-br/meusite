import type { FormContent } from './types'

export const formEn: FormContent = {
  serviceTypes: [
    { id: 'site', label: 'Website', description: 'A new professional website, or a redesign of an existing one. Responsive, modern and elegant.' },
    { id: 'whatsapp', label: 'WhatsApp', description: 'Automate your WhatsApp: bots, auto-replies, customer-service integrations.' },
    { id: 'instagram', label: 'Instagram', description: 'Profile organization, highlights, visual identity.' },
    { id: 'tiktok', label: 'TikTok', description: 'LIVE tools (overlays, goals, alerts, ranking), broadcast setup and technical support.' },
    { id: 'sistema', label: 'System', description: 'A custom system to automate your processes, spreadsheets, reports, integrations.' },
    { id: 'suporte', label: 'Support', description: 'Tweaks, fixes or maintenance on something that already exists.' },
    { id: 'outro', label: 'Other', description: 'Tell me what you need and we’ll figure out how to help.' },
  ],

  tiktokServices: [
    { id: 'overlay', label: 'Custom overlay', description: 'The visual layout of the LIVE: goals, followers, messages and the creator’s identity.' },
    { id: 'painel-metas', label: 'Goals panel', description: 'Goals for followers, gifts, subscriptions and more.' },
    { id: 'alertas', label: 'Custom alerts', description: 'Animations and notifications for LIVE events.' },
    { id: 'ranking', label: 'Supporters ranking', description: 'A visual ranking of the top supporters.' },
    { id: 'painel-comentarios', label: 'Comments panel', description: 'A tool to follow and highlight comments.' },
    { id: 'interativas', label: 'Interactive tools', description: 'Giveaways, counters, challenges, commands and interactions.' },
    { id: 'dashboard', label: 'LIVE dashboard', description: 'A private panel to track metrics and stay organized.' },
    { id: 'cortes', label: 'Clips system', description: 'Organizing recordings and support to turn a LIVE into content.' },
    { id: 'assistente-conteudo', label: 'Content assistant', description: 'Organizing ideas, titles, descriptions and post-LIVE content.' },
    { id: 'landing-page', label: 'Creator landing page', description: 'A professional page gathering social networks, links, schedule and content.' },
    { id: 'controle-mobile', label: 'Mobile control panel', description: 'Control your LIVE tools from your phone.' },
    { id: 'automacao', label: 'Custom automation', description: 'Tailor-made tools for the creator’s workflow.' },
    { id: 'config-live', label: 'LIVE setup', description: 'TikTok LIVE Studio, scenes, sources, audio, camera and resolution.' },
    { id: 'config-live-pix', label: 'Live Pix setup', description: 'Live Pix, alerts, pages and integration with the broadcast.' },
    { id: 'suporte-tecnico', label: 'Technical support for LIVE', description: 'Remote help to solve problems and set up tools.' },
  ],

  tiktokToolDetails: {
    overlay: [
      {
        key: 'overlay.elements',
        label: 'What should be on screen at the same time during the LIVE?',
        mine: 'What I want on screen',
        type: 'tags',
        options: ['Follower counter', 'Goal', 'Latest followers', 'Latest gifts', 'Pinned message', 'Timer', 'Camera frame', 'Chat', 'Social networks'],
      },
      { key: 'overlay.layout', label: 'How do you picture things arranged on the screen?', mine: 'How I picture the screen', help: 'you can describe it in words, or send me a sketch / screenshot later', type: 'textarea', rows: 2 },
      { key: 'overlay.vibe', label: 'What visual mood do you want?', mine: 'Visual mood I want', help: 'e.g. minimalist · neon/gamer · cute · elegant · retro', type: 'text' },
      { key: 'overlay.fixedText', label: 'Any text that stays on screen the whole time? (rules, socials, "welcome")', mine: 'Fixed text', type: 'textarea', rows: 2 },
      { key: 'overlay.changes', label: 'Does the overlay change during the LIVE (intro, break, closing)?', mine: 'Overlay changes during the LIVE', type: 'toggle', toggleLabels: ['Yes', 'No'], reveal: { key: 'overlay.changesHow', label: 'Describe those moments.', type: 'textarea', rows: 2 } },
    ],
    'painel-metas': [
      { key: 'metas.quais', label: 'Which goals do you want to track?', mine: 'Goals I want to track', type: 'tags', options: ['Followers', 'Gifts / diamonds', 'Likes', 'Subscribers', 'Live viewers', 'Amount raised (Live Pix)'] },
      { key: 'metas.alvo', label: 'What is the target number for each goal? (an example is fine)', mine: 'Target numbers', type: 'textarea', rows: 2 },
      { key: 'metas.zera', label: 'When does the goal reset?', mine: 'When the goal resets', help: 'every LIVE · every day · every week · never', type: 'text' },
      { key: 'metas.aoBater', label: 'What happens when a goal is reached?', mine: 'What happens when a goal is reached', help: 'animation, sound, message, some reward you promise...', type: 'textarea', rows: 2 },
      { key: 'metas.progresso', label: 'How do you want to see the progress?', mine: 'How I want to see the progress', help: 'a filling bar · a number · a circle · a thermometer...', type: 'text' },
    ],
    alertas: [
      { key: 'alertas.eventos', label: 'Which events trigger an alert?', mine: 'Events that trigger an alert', type: 'tags', options: ['New follower', 'Gift', 'Big gift', 'New subscriber', 'Someone shared', 'Goal reached', 'Specific command'] },
      { key: 'alertas.visual', label: 'Does each alert have a different look / animation? Describe what you imagine.', mine: 'Look of the alerts', type: 'textarea', rows: 2 },
      { key: 'alertas.som', label: 'Is there sound? Do you already have the files or do you need help?', mine: 'Sound of the alerts', type: 'text' },
      { key: 'alertas.texto', label: 'What does the alert write on screen?', mine: 'Alert text', help: 'e.g. "John followed!", "Jane sent a Rose!"', type: 'textarea', rows: 2 },
      { key: 'alertas.porValor', label: 'Do gifts of different values have different alerts?', mine: 'Different alerts by gift value', type: 'toggle', toggleLabels: ['Yes', 'No'] },
    ],
    ranking: [
      { key: 'ranking.criterio', label: 'What does the ranking count?', mine: 'Ranking criteria', help: 'gifts/diamonds · watch time · number of comments · participation in games', type: 'text' },
      { key: 'ranking.quantos', label: 'How many people show up? (top 3, top 10...)', mine: 'How many people show up', type: 'text' },
      { key: 'ranking.periodo', label: 'What period counts? (the current LIVE, the week, the month, all time)', mine: 'Period that counts', type: 'text' },
      { key: 'ranking.recompensa', label: 'Is there any perk or recognition for whoever is at the top?', mine: 'Perk for whoever is at the top', type: 'textarea', rows: 2 },
      { key: 'ranking.exibicao', label: 'Is it always on screen, or do you call it up when you want to show it?', mine: 'When the ranking appears', type: 'text' },
    ],
    'painel-comentarios': [
      { key: 'coment.proposito', label: 'What is this panel for?', mine: 'What the panel is for', help: 'highlighting comments on screen · moderating · both', type: 'text' },
      { key: 'coment.fixar', label: 'Do you want to be able to "pin" a comment on screen during the LIVE?', mine: 'I want to pin comments on screen', type: 'toggle', toggleLabels: ['Yes', 'No'] },
      { key: 'coment.filtro', label: 'Do you need to filter anything? (profanity, spam, links)', mine: 'Filters I need', type: 'text' },
      { key: 'coment.moderadores', label: 'Does anyone else moderate with you?', mine: 'Who moderates with me', type: 'text' },
    ],
    interativas: [
      { key: 'inter.quais', label: 'Which interactions do you want?', mine: 'Interactions I want', type: 'tags', options: ['Giveaway', 'Wheel', 'Counter ("X push-ups per gift")', 'Challenges', 'Poll / vote', 'Chat commands (!goal, !socials)', 'Mini-games'] },
      { key: 'inter.comoFunciona', label: 'Describe how each one works in your LIVE: who joins in, what triggers it, what the person gets.', mine: 'How each interaction works', type: 'textarea', rows: 3 },
      { key: 'inter.participacao', label: 'Does the audience take part through chat, through gifts, or both?', mine: 'How the audience takes part', type: 'text' },
    ],
    dashboard: [
      { key: 'dash.oquever', label: 'What do you want on a panel that’s just yours (that the audience doesn’t see)?', mine: 'What I want on my panel', type: 'tags', options: ['Goals', 'Earnings', 'Ranking', 'LIVE schedule', 'Checklist', 'Notes', 'Upcoming giveaways'] },
      { key: 'dash.onde', label: 'Do you open this on the same PC as the LIVE, on a second monitor, or on your phone?', mine: 'Where I open the panel', type: 'text' },
    ],
    cortes: [
      { key: 'cortes.hoje', label: 'Do you make clips today? What’s the process like?', mine: 'How I make clips today', type: 'textarea', rows: 2 },
      { key: 'cortes.onde', label: 'Where are the clips published?', mine: 'Where I publish the clips', type: 'tags', options: ['TikTok', 'Reels', 'Shorts', 'YouTube'] },
      { key: 'cortes.ajuda', label: 'What do you want help with?', mine: 'Where I want help', type: 'tags', options: ['Organizing the recordings', 'Finding the best moments', 'Editing', 'Captioning', 'Publishing'] },
      { key: 'cortes.frequencia', label: 'How often do you go LIVE / do you want to post clips?', mine: 'How often I go LIVE and post clips', type: 'text' },
      { key: 'cortes.quemEdita', label: 'Who edits: you, an editor, or would it be automatic?', mine: 'Who edits', type: 'text' },
    ],
    'assistente-conteudo': [
      { key: 'assist.trava', label: 'Where do you get stuck today?', mine: 'Where I get stuck today', help: 'LIVE ideas · titles and descriptions · script · post-LIVE content · calendar', type: 'textarea', rows: 2 },
      { key: 'assist.plataformas', label: 'Where do you post besides TikTok?', mine: 'Where I post besides TikTok', type: 'text' },
      { key: 'assist.tipo', label: 'Do you want something that gives you ideas, that organizes yours, or that writes finished text?', mine: 'Kind of help I want', type: 'text' },
    ],
    'landing-page': [
      { key: 'land.reune', label: 'What does this page need to bring together?', mine: 'What the page needs to bring together', type: 'tags', options: ['All the social networks', 'LIVE schedule', 'Latest clips', 'Shop / products', 'Contact for partnerships', 'Donation / Pix', 'Bio'] },
      { key: 'land.visual', label: 'What visual mood? (the same "look" as the channel?)', mine: 'Visual mood of the page', type: 'text' },
      { key: 'land.autoAtualiza', label: 'Do you want to be able to update it yourself (e.g. change the schedule)?', mine: 'I want to update it myself', type: 'toggle', toggleLabels: ['Yes', 'You can handle it'] },
    ],
    'controle-mobile': [
      { key: 'mobile.controla', label: 'What do you want to control from your phone during the LIVE?', mine: 'What I want to control from my phone', type: 'tags', options: ['Switch scene', 'Trigger an alert', 'Start a giveaway', 'Show/hide a panel', 'Change a goal'] },
      { key: 'mobile.comoSegura', label: 'Do you hold the phone during the LIVE, or is it on a stand?', mine: 'How I hold the phone during the LIVE', type: 'text' },
      { key: 'mobile.moderador', label: 'Would anyone else (a moderator) also control it?', mine: 'A moderator would also control it', type: 'text' },
    ],
    automacao: [
      { key: 'auto.repetitivo', label: 'Is there a repetitive task in your LIVE workflow that eats up your time or that you always forget?', mine: 'Repetitive task that eats up my time', type: 'textarea', rows: 2 },
      { key: 'auto.passoApasso', label: 'Describe step by step how you prepare and run a LIVE today.', mine: 'How I prepare and run a LIVE today', type: 'textarea', rows: 3 },
      { key: 'auto.magico', label: 'What would be "magic" if it happened on its own?', mine: 'What would be magic to happen on its own', type: 'textarea', rows: 2 },
    ],
    'config-live': [
      { key: 'cfg.oque', label: 'What do you want to get set up?', mine: 'What I want to set up', type: 'tags', options: ['LIVE Studio from scratch', 'Scenes (intro / full screen / break)', 'Camera and image quality', 'Microphone and audio', 'Fonts and text', 'Background', 'Filters'] },
      { key: 'cfg.equipamento', label: 'What equipment do you have?', mine: 'My equipment', help: 'phone, webcam, camera, microphone, PC — whatever you know', type: 'textarea', rows: 2 },
      { key: 'cfg.incomoda', label: 'What is bothering you today about the image or the sound?', mine: 'What bothers me about the image or sound', type: 'textarea', rows: 2 },
      { key: 'cfg.quando', label: 'Is there a LIVE scheduled? When?', mine: 'Scheduled LIVE', type: 'text' },
    ],
    'config-live-pix': [
      { key: 'pix.jaTem', label: 'Do you already have a Live Pix account?', mine: 'I already have a Live Pix account', type: 'toggle', toggleLabels: ['Yes', 'Not yet'], reveal: { key: 'pix.usuario', label: 'What’s the email / username? (you can send it to me in the chat)', type: 'text' } },
      { key: 'pix.naTela', label: 'What do you want on screen when someone sends a Pix?', mine: 'What I want on screen when a Pix arrives', help: 'name, amount, message, animation...', type: 'textarea', rows: 2 },
      { key: 'pix.pagina', label: 'Do you want a custom donation page?', mine: 'I want a custom donation page', type: 'toggle', toggleLabels: ['Yes', 'No'] },
      { key: 'pix.integra', label: 'Does it need to integrate with the goals / alerts we already talked about?', mine: 'Integrate with goals and alerts', type: 'text' },
    ],
    'suporte-tecnico': [
      { key: 'sup.problema', label: 'What is happening? Tell me the problem the way you’d tell a friend.', mine: 'What is happening', type: 'textarea', rows: 3, required: true },
      { key: 'sup.urgencia', label: 'Is it to solve right now (urgent) or to get everything ready without a rush?', mine: 'Urgency', type: 'text' },
      { key: 'sup.modalidade', label: 'How would you prefer me to help you?', mine: 'How I prefer to be helped', help: 'I explain it on a call · you share your screen and I guide you · I access your PC via AnyDesk and set it up (you give me the code at the time and revoke it afterwards)', type: 'textarea', rows: 2 },
      { key: 'sup.recorrencia', label: 'Is it a one-off, or would you like someone to call whenever something breaks?', mine: 'One-off or ongoing support', type: 'text' },
    ],
  },

  siteSteps: [
    {
      id: 'site-you',
      title: 'What you do',
      mineTitle: 'What I do',
      questions: [
        { key: 'clientName', label: 'Your name or your business name', mine: 'Name', type: 'text', required: true },
        { key: 'whatYouDo', label: 'What do you do? Describe your profession or activity the way you’d explain it to someone who just met you.', mine: 'What I do', type: 'textarea', rows: 3, required: true },
        { key: 'city', label: 'City where you work', mine: 'City', type: 'text' },
        { key: 'hasCurrentSite', label: 'Do you already have a website today?', mine: 'I already have a website', type: 'toggle', toggleLabels: ['Yes', 'Not yet'], reveal: { key: 'currentSiteInfo', label: 'What’s the link? And what bothers you about it today — is there anything you want to keep?', type: 'textarea', rows: 3, placeholder: 'https://...  —  what changes, what stays' } },
      ],
    },
    {
      id: 'site-goal',
      title: 'The goal of the site',
      intro: 'The more you tell me here, the more the site will look like you.',
      questions: [
        { key: 'siteGoals', label: 'What do you most want this site to do for you?', mine: 'What I want the site to do', type: 'tags', options: ['Convey credibility / look more professional', 'Show my work (portfolio)', 'Get people to message me on WhatsApp', 'Explain my services clearly', 'Be found on Google when people search for my kind of service', 'Have an "official" place to send people'] },
        { key: 'siteAction', label: 'When someone likes what they see, what do you want them to do next?', mine: 'Action I want people to take', help: 'e.g. message me on WhatsApp, fill in a form, call, book, come to my address', type: 'text' },
        { key: 'siteAudience', label: 'Who is the client you want to attract? Describe that person to me.', mine: 'Client I want to attract', help: 'what they value, what they’re looking for when they find you', type: 'textarea', rows: 2 },
        { key: 'siteFeeling', label: 'What impression does the site have to give? Describe it in 3 words.', mine: 'Impression the site should give', help: 'e.g. sophisticated and welcoming · modern and trustworthy · light and creative', type: 'text' },
      ],
    },
    {
      id: 'site-story',
      title: 'Your story and your services',
      mineTitle: 'My story and my services',
      questions: [
        { key: 'siteStory', label: 'Tell your story: how you started, what drives you, what sets you apart from other professionals in your field.', mine: 'My story', type: 'textarea', rows: 4, required: true },
        { key: 'siteServices', label: 'List everything you offer. If you can, a sentence explaining each one.', mine: 'What I offer', type: 'textarea', rows: 4, required: true },
        { key: 'siteDifferentiators', label: 'Why should someone choose you and not another professional? What do only you do, or do better?', mine: 'My differentiator', type: 'textarea', rows: 2 },
      ],
    },
    {
      id: 'site-content',
      title: 'Content and portfolio',
      questions: [
        { key: 'sitePortfolio', label: 'Do you have work, photos or cases you want to show on the site? Tell me which — you can send the photos later on WhatsApp.', mine: 'Work I want to show', type: 'textarea', rows: 3 },
        { key: 'hasTestimonials', label: 'Do you have testimonials or client reviews?', mine: 'I have testimonials', type: 'toggle', toggleLabels: ['Yes', 'Not yet'], reveal: { key: 'testimonialsWhere', label: 'Paste the ones you can here, or tell me where I can get them (Google, Instagram...).', type: 'textarea', rows: 3 } },
        { key: 'siteContentReady', label: 'What do you already have ready?', mine: 'What I already have ready', type: 'tags', options: ['Professional photos (of me / of the work)', 'Text', 'Logo', 'Testimonials', 'I have almost nothing yet, I need help'] },
      ],
    },
    {
      id: 'site-look',
      title: 'The look of the site',
      questions: [
        { key: 'colorSwatches', label: 'Are there colors that suit you or your brand?', mine: 'My colors', type: 'color' },
        { key: 'hasLogo', label: 'Do you already have a logo?', mine: 'Logo', type: 'logo' },
        { key: 'siteReferences', label: 'Is there any website (in any field) you find beautiful or well made? Paste the link and tell me what you liked about it.', mine: 'References I like', type: 'textarea', rows: 3 },
        { key: 'siteAvoid', label: 'Is there anything you do NOT want on your site? Or something that bothers you on other professionals’ sites in your field?', mine: 'What I don’t want on the site', type: 'textarea', rows: 2 },
      ],
    },
  ],

  tiktokChannelStep: {
    id: 'tiktok-channel',
    title: 'About you and your channel',
    mineTitle: 'About me and my channel',
    questions: [
      { key: 'clientName', label: 'Your name or the channel name', mine: 'Name / channel', type: 'text', required: true },
      { key: 'tiktokChannel', label: 'Tell me about your LIVEs: what kind of content, how long you’ve been doing it, your audience size today, how often.', mine: 'About my LIVEs', type: 'textarea', rows: 3 },
      { key: 'tiktokVibe', label: 'Does your channel have a "look"? Colors, a mascot, a style (gamer, cozy, chic, chaotic)?', mine: 'The look of my channel', type: 'textarea', rows: 2 },
      { key: 'colorSwatches', label: 'Your channel’s colors', mine: 'My channel’s colors', type: 'color' },
      { key: 'hasLogo', label: 'Do you already have a logo / visual identity?', mine: 'Logo', type: 'logo' },
      { key: 'tiktokReference', label: 'Is there a creator whose LIVEs you find visually amazing? Send the @ and tell me what catches your eye.', mine: 'Reference I like', type: 'textarea', rows: 2 },
      { key: 'tiktokReuse', label: 'Is it just for you, or do you want to be able to offer this to other creators too?', mine: 'Just for me or to offer to others', type: 'text' },
      { key: 'tiktokCurrentTools', label: 'Do you already use any tool today (StreamElements, Live Pix, OBS...)? Do you want to keep it, replace it or integrate it?', mine: 'Tools I already use', type: 'textarea', rows: 2 },
    ],
  },

  genericSteps: {
    whatsapp: [
      {
        id: 'wa',
        title: 'Your WhatsApp today',
        mineTitle: 'My WhatsApp today',
        questions: [
          { key: 'waProblem', label: 'The problem in one sentence: what makes you lose time or clients on WhatsApp today?', mine: 'My problem on WhatsApp', type: 'textarea', rows: 2, required: true },
          { key: 'waCommon', label: 'Which messages or questions do you answer all the time? List the most common ones (you can paste real examples).', mine: 'Messages I answer all the time', type: 'textarea', rows: 4 },
          { key: 'waSolve', label: 'What do you want WhatsApp to handle on its own?', mine: 'What I want it to handle on its own', type: 'tags', options: ['Answer questions', 'Schedule / book a time', 'Send a quote', 'Qualify who comes in', 'Send a catalog / prices', 'Appointment reminder', 'Win back people who went quiet'] },
          { key: 'waHandoff', label: 'When the bot can’t handle it, does it pass the conversation to you? How do you want to be notified?', mine: 'When to pass it to me and how to notify me', type: 'text' },
          { key: 'waTone', label: 'What’s the tone of your messages? Send an example of how YOU write.', mine: 'My message tone', type: 'textarea', rows: 2 },
          { key: 'waIntegra', label: 'Does this need to talk to something you already use? (calendar, client list, catalog)', mine: 'What it needs to talk to', help: 'you can put it in your own words, you don’t need to know the technical name', type: 'textarea', rows: 2 },
          { key: 'waNumber', label: 'Is it your personal number, or a separate number for business?', mine: 'Number (personal or business)', type: 'text' },
        ],
      },
    ],
    instagram: [
      {
        id: 'ig',
        title: 'Your Instagram today',
        mineTitle: 'My Instagram today',
        questions: [
          { key: 'igProblem', label: 'What bothers you about your Instagram today?', mine: 'What bothers me about my Instagram', type: 'textarea', rows: 2, required: true },
          { key: 'igImprove', label: 'What do you want to improve first?', mine: 'What I want to improve first', type: 'tags', options: ['The "look" of the feed', 'The highlights', 'The bio', 'How often I post', 'The photo quality', 'The content strategy'] },
          { key: 'igGoal', label: 'What’s the goal of the account? (attract clients, sell directly, portfolio, authority...)', mine: 'Goal of the account', type: 'text' },
          { key: 'igContent', label: 'Do you already have photos / content, or do you need help producing it?', mine: 'I already have content or I need help', type: 'text' },
          { key: 'igReference', label: 'Is there a profile you admire? Send the @ and say what you like about it.', mine: 'Profile I admire', type: 'textarea', rows: 2 },
          { key: 'igFrequency', label: 'How often can you actually post?', mine: 'How often I can post', type: 'text' },
        ],
      },
    ],
    sistema: [
      {
        id: 'sys',
        title: 'The process that eats up your time',
        mineTitle: 'The process that eats up my time',
        questions: [
          { key: 'sysProblem', label: 'Which task today is manual, tedious or slow, and you wish it were automatic?', mine: 'Task I want to automate', type: 'textarea', rows: 2, required: true },
          { key: 'sysHowNow', label: 'Describe step by step how you do this today, from start to finish.', mine: 'How I do this today', type: 'textarea', rows: 4 },
          { key: 'sysFrequency', label: 'How often? (every day, every week, every month...)', mine: 'Frequency', type: 'text' },
          { key: 'sysWhere', label: 'Where does this live today? (paper, a notebook, a spreadsheet, WhatsApp, in your head...)', mine: 'Where this lives today', type: 'text' },
          { key: 'sysWho', label: 'Who else does this or would need to use it?', mine: 'Who else uses it', type: 'text' },
          { key: 'sysSuccess', label: 'If it worked, what would change for you? How would you know it turned out well?', mine: 'How I’d know it turned out well', type: 'textarea', rows: 2 },
        ],
      },
    ],
    suporte: [
      {
        id: 'sup',
        title: 'What needs adjusting',
        questions: [
          { key: 'supProblem', label: 'What needs to be fixed or changed? Describe the problem as you experience it.', mine: 'What needs to be fixed', type: 'textarea', rows: 3, required: true },
          { key: 'supWhere', label: 'Where is it? (send the link, or tell me where I find it)', mine: 'Where it is', type: 'text' },
          { key: 'supWhen', label: 'What happened / what changed? When did it start?', mine: 'What changed and when it started', type: 'textarea', rows: 2 },
          { key: 'supUrgency', label: 'Is it urgent? Is there a deadline or an event depending on it?', mine: 'Urgency', type: 'text' },
          { key: 'supHistory', label: 'Do you know who handled this before, or are you out of contact with whoever built it?', mine: 'Who handled this before', type: 'text' },
        ],
      },
    ],
    outro: [
      {
        id: 'outro',
        title: 'Tell me in your own words',
        mineTitle: 'What I need',
        questions: [
          { key: 'otherNeed', label: 'Tell me what you need as if you were explaining it to a friend. You don’t need to know anything about technology — that’s on me.', mine: 'What I need', type: 'textarea', rows: 5, required: true },
          { key: 'otherOutcome', label: 'What’s the result you want in the end?', mine: 'Result I want', type: 'textarea', rows: 2 },
          { key: 'otherTried', label: 'Have you tried to solve it another way? What didn’t work?', mine: 'What I’ve tried', type: 'textarea', rows: 2 },
          { key: 'otherExample', label: 'Is there an example (site, app, tool, person) that does something similar to what you want?', mine: 'Example similar to what I want', type: 'textarea', rows: 2 },
        ],
      },
    ],
  },

  linksStep: {
    id: 'links',
    title: 'Where I find you',
    mineTitle: 'My contacts',
    intro: 'I don’t need your number — the conversation already opens from your WhatsApp. Just tell me where I can see more of your work.',
    questions: [
      { key: 'clientName', label: 'Your name or your business name', mine: 'Name', type: 'text', required: true },
      { key: 'instagram', label: 'Your Instagram or another network where I can see your work', mine: 'Instagram / socials', help: '@yourusername', type: 'text' },
      { key: 'otherLinks', label: 'Any other link that helps me get to know you?', mine: 'Other links', help: 'website, portfolio, YouTube, your Google profile...', type: 'text' },
      { key: 'email', label: 'Email', mine: 'Email', type: 'text' },
    ],
  },
}
