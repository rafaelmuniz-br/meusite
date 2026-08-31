// Dicionário de strings curtas de interface (rótulos de botão, títulos de seção,
// textos de SEO...). Conteúdo "grande" (currículo, políticas, formulário) fica
// em resume.*.ts / policies.*.ts / form/*.ts.
//
// Uso: `const t = useT()` → `t('nav.portfolio')`. Suporta interpolação simples
// de `{chave}`: `t('prm.stepOf', { n: 2, total: 6 })`.

import type { Locale } from '~/composables/useLocale'

type Dict = Record<string, string>

const pt: Dict = {
  // Navegação / sidebar / rodapé
  'nav.aria': 'Seções da página',
  'nav.portfolio': 'Portfólio',
  'nav.contato': 'Contato',
  'nav.experiencia': 'Experiência',
  'footer.policies': 'Políticas e Termos',
  'footer.copy': '© {year} Rafael Muniz',
  'lang.aria': 'Idioma',

  // Contato (rótulos dos links)
  'contact.email': 'E-mail',
  'contact.phone': 'Telefone',
  'contact.linkedin': 'LinkedIn',

  // Home
  'summary.title': 'Sobre mim',
  'cta.title': 'Vamos conversar sobre o seu projeto?',
  'cta.send': 'Enviar mensagem',
  'cta.describe': 'Descrever projeto',
  'portfolio.title': 'Portfólio',
  'portfolio.visit': 'Visitar site',
  'portfolio.hoverHint': 'Passe o mouse para ver a foto',
  'portfolio.dragHint': 'Arraste para o lado para ver a foto',

  // Página de contato
  'contato.title': 'Contato',
  'contato.intro':
    'Tem um projeto em mente, um problema ou só quer trocar uma ideia sobre tecnologia? Entre em contato!',
  'contactForm.title': 'Envie uma mensagem',
  'contactForm.intro': 'Preencha os campos abaixo para iniciar uma conversa direto no WhatsApp.',
  'contactForm.name': 'Nome',
  'contactForm.message': 'Mensagem',
  'contactForm.nameError': 'Informe seu nome.',
  'contactForm.messageError': 'Escreva uma mensagem.',
  'contactForm.submit': 'Enviar via WhatsApp',
  'contactForm.waGreeting': 'Olá, me chamo {name}.',

  // Experiência / habilidades
  'experience.title': 'Experiência Profissional',
  'experience.details': 'Atividades e resultados',
  'skills.title': 'Habilidades Técnicas',

  // Políticas e termos
  'policies.title': 'Políticas e Termos',
  'policies.back': 'Voltar para o currículo',
  'policies.intro':
    'Este site é o currículo pessoal e online de Rafael Muniz. Aqui você encontra, de forma direta, o que ele faz com informações, como funciona o contato e o que rege o uso do conteúdo.',
  'policies.updated': 'Última atualização: {date}',

  // SEO
  'seo.homeTitle': 'Rafael Muniz — Desenvolvedor Fullstack',
  'seo.homeDesc':
    'Currículo profissional de Rafael Muniz, Desenvolvedor Fullstack com experiência em Vue.js, Nuxt, JavaScript, SQL e desenvolvimento web.',
  'seo.contatoTitle': 'Contato — Rafael Muniz',
  'seo.contatoDesc': 'Fale com Rafael Muniz diretamente pelo WhatsApp, e-mail ou LinkedIn.',
  'seo.experienciaTitle': 'Experiência e Habilidades — Rafael Muniz',
  'seo.experienciaDesc':
    'Experiência profissional e habilidades técnicas de Rafael Muniz, Desenvolvedor Fullstack.',
  'seo.policiesTitle': 'Políticas e Termos — Rafael Muniz',
  'seo.policiesDesc':
    'Política de Privacidade, Termos de Uso, Portfólio e Projetos Desenvolvidos e Aviso de Cookies do currículo online de Rafael Muniz.',
  'seo.ogLocale': 'pt_BR',

  // Formulário de solicitação de projeto (modal)
  'prm.ariaLabel': 'Solicitar projeto',
  'prm.close': 'Fechar',
  'prm.back': 'Voltar',
  'prm.next': 'Próximo',
  'prm.start': 'Começar',
  'prm.stepOf': 'Etapa {n} de {total}',
  'prm.serviceTitle': 'Que tipo de projeto você precisa?',
  'prm.tiktokToolsTitle': 'O que você quer pra sua LIVE?',
  'prm.reviewTitle': 'Revisão',
  'prm.serviceFallback': 'Projeto',
  'prm.tiktokStepIntro':
    'Nenhuma pergunta aqui é obrigatória — é só pra eu entender bem o que você imagina.',
  'prm.onboardingTitle': 'Vamos organizar seu projeto',
  'prm.onboardingP1':
    'São algumas etapas, conforme o que você escolher. <strong>Não precisa saber nada de tecnologia</strong> — você me conta o problema e o que você quer, do seu jeito, e a parte técnica é comigo.',
  'prm.onboardingP2':
    'Quanto mais detalhe você der, melhor eu consigo transformar isso no seu projeto. Só as perguntas mais importantes são obrigatórias; o resto você responde à vontade.',
  'prm.onboardingP3':
    'Nada é salvo em servidor nenhum: suas respostas só saem daqui quando você aperta "Enviar via WhatsApp" no final. Depois é só aguardar que eu te respondo por lá.',
  'prm.optional': '(opcional)',
  'prm.pickMany': '(marque quantas quiser)',
  'prm.otherDescribe': 'outro (descreva)',
  'prm.yes': 'Sim',
  'prm.no': 'Não',
  'prm.colorNote': 'ou descreva outra cor / observação',
  'prm.colorSamples': 'Amostras',
  'prm.colorPrecise': 'Cor precisa',
  'prm.colorSelected': 'Selecionadas',
  'prm.colorEmpty': 'Nenhuma cor ainda.',
  'prm.colorAdd': 'Adicionar cor',
  'prm.colorRemove': 'Remover {hex}',
  'prm.logoYes': 'Sim',
  'prm.logoNo': 'Ainda não',
  'prm.logoDefaultLabel': 'Você já tem uma logo?',
  'prm.logoHaveHint':
    'Perfeito — depois de enviar, é só me mandar o arquivo da sua logo pelo WhatsApp.',
  'prm.logoIdeaLabel': 'Tem alguma ideia pra logo?',
  'prm.logoIdeaPlaceholder':
    'símbolo, estilo, cores, referências que você gosta — ou deixe em branco e a gente desenvolve do zero',
  'prm.tiktokServicesIntro':
    'Escolha um ou mais. Pode ser desde só configurar sua transmissão até desenvolver uma ferramenta exclusiva pra você.',
  'prm.reviewIntro':
    'Confira o resumo antes de enviar. Você pode voltar pra ajustar qualquer coisa.',
  'prm.reviewSend': 'Enviar via WhatsApp',
  'prm.msgHello': 'Olá, Rafael! Tenho interesse em *{service}*.',
  'prm.msgTools': 'Ferramentas de LIVE: {tools}',
  'prm.msgLogoHave': 'já tenho, envio o arquivo pelo WhatsApp',
  'prm.msgLogoIdea': 'ainda não tenho — ideia: {idea}',
  'prm.msgLogoNone': 'ainda não tenho, quero desenvolver do zero',
}

const en: Dict = {
  'nav.aria': 'Page sections',
  'nav.portfolio': 'Portfolio',
  'nav.contato': 'Contact',
  'nav.experiencia': 'Experience',
  'footer.policies': 'Policies & Terms',
  'footer.copy': '© {year} Rafael Muniz',
  'lang.aria': 'Language',

  'contact.email': 'Email',
  'contact.phone': 'Phone',
  'contact.linkedin': 'LinkedIn',

  'summary.title': 'About me',
  'cta.title': 'Shall we talk about your project?',
  'cta.send': 'Send a message',
  'cta.describe': 'Describe your project',
  'portfolio.title': 'Portfolio',
  'portfolio.visit': 'Visit site',
  'portfolio.hoverHint': 'Hover to see the screenshot',
  'portfolio.dragHint': 'Swipe sideways to see the screenshot',

  'contato.title': 'Contact',
  'contato.intro':
    'Have a project in mind, a problem, or just want to chat about technology? Get in touch!',
  'contactForm.title': 'Send a message',
  'contactForm.intro': 'Fill in the fields below to start a conversation directly on WhatsApp.',
  'contactForm.name': 'Name',
  'contactForm.message': 'Message',
  'contactForm.nameError': 'Enter your name.',
  'contactForm.messageError': 'Write a message.',
  'contactForm.submit': 'Send via WhatsApp',
  'contactForm.waGreeting': 'Hi, my name is {name}.',

  'experience.title': 'Professional Experience',
  'experience.details': 'Activities and results',
  'skills.title': 'Technical Skills',

  'policies.title': 'Policies & Terms',
  'policies.back': 'Back to the résumé',
  'policies.intro':
    "This site is Rafael Muniz's personal online résumé. Here you'll find, in plain terms, what he does with information, how contact works and what governs the use of the content.",
  'policies.updated': 'Last updated: {date}',

  'seo.homeTitle': 'Rafael Muniz — Fullstack Developer',
  'seo.homeDesc':
    'Professional résumé of Rafael Muniz, a Fullstack Developer experienced in Vue.js, Nuxt, JavaScript, SQL and web development.',
  'seo.contatoTitle': 'Contact — Rafael Muniz',
  'seo.contatoDesc': 'Reach Rafael Muniz directly on WhatsApp, email or LinkedIn.',
  'seo.experienciaTitle': 'Experience and Skills — Rafael Muniz',
  'seo.experienciaDesc':
    'Professional experience and technical skills of Rafael Muniz, Fullstack Developer.',
  'seo.policiesTitle': 'Policies & Terms — Rafael Muniz',
  'seo.policiesDesc':
    "Privacy Policy, Terms of Use, Portfolio and Projects Developed, and Cookie Notice for Rafael Muniz's online résumé.",
  'seo.ogLocale': 'en_US',

  'prm.ariaLabel': 'Request a project',
  'prm.close': 'Close',
  'prm.back': 'Back',
  'prm.next': 'Next',
  'prm.start': 'Start',
  'prm.stepOf': 'Step {n} of {total}',
  'prm.serviceTitle': 'What kind of project do you need?',
  'prm.tiktokToolsTitle': 'What do you want for your LIVE?',
  'prm.reviewTitle': 'Review',
  'prm.serviceFallback': 'Project',
  'prm.tiktokStepIntro':
    "None of these questions are required — they just help me understand what you have in mind.",
  'prm.onboardingTitle': "Let's organize your project",
  'prm.onboardingP1':
    "It's a few steps, depending on what you choose. <strong>You don't need to know anything about technology</strong> — you tell me the problem and what you want, in your own words, and the technical part is on me.",
  'prm.onboardingP2':
    "The more detail you give, the better I can turn it into your project. Only the most important questions are required; answer the rest as you like.",
  'prm.onboardingP3':
    'Nothing is saved on any server: your answers only leave this form when you press "Send via WhatsApp" at the end. After that, just wait and I\'ll reply to you there.',
  'prm.optional': '(optional)',
  'prm.pickMany': '(pick as many as you like)',
  'prm.otherDescribe': 'other (describe)',
  'prm.yes': 'Yes',
  'prm.no': 'No',
  'prm.colorNote': 'or describe another color / note',
  'prm.colorSamples': 'Swatches',
  'prm.colorPrecise': 'Precise color',
  'prm.colorSelected': 'Selected',
  'prm.colorEmpty': 'No colors yet.',
  'prm.colorAdd': 'Add color',
  'prm.colorRemove': 'Remove {hex}',
  'prm.logoYes': 'Yes',
  'prm.logoNo': 'Not yet',
  'prm.logoDefaultLabel': 'Do you already have a logo?',
  'prm.logoHaveHint':
    "Perfect — after you send, just send me your logo file on WhatsApp.",
  'prm.logoIdeaLabel': 'Any idea for the logo?',
  'prm.logoIdeaPlaceholder':
    'symbol, style, colors, references you like — or leave it blank and we develop one from scratch',
  'prm.tiktokServicesIntro':
    'Pick one or more. It can range from just setting up your broadcast to building a tool exclusively for you.',
  'prm.reviewIntro': 'Check the summary before sending. You can go back to adjust anything.',
  'prm.reviewSend': 'Send via WhatsApp',
  'prm.msgHello': "Hi, Rafael! I'm interested in *{service}*.",
  'prm.msgTools': 'LIVE tools: {tools}',
  'prm.msgLogoHave': "I already have one, I'll send the file on WhatsApp",
  'prm.msgLogoIdea': "I don't have one yet — idea: {idea}",
  'prm.msgLogoNone': "I don't have one yet, I want to develop one from scratch",
}

export const ui: Record<Locale, Dict> = { pt, en }
