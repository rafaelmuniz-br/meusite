# Relatório do projeto — rafaelmuniz (currículo pessoal)

> Documento interno de contexto para sessões futuras de IA (Claude Code ou outra).
> **Não faz parte do site publicado** — vive fora de `app/` e `public/`, então nunca é
> servido/buildado para visitantes. Não referenciar isso pra clientes.

Currículo/site pessoal de Rafael Muniz, construído em Nuxt 3 (Vue 3) do zero nesta
conversa, ao longo de várias sessões. Serve como cartão de visita profissional — não é
o "produto site institucional para clientes" (esse é outro negócio dele, documentado em
`C:\Dev\freelancing\myCRM\docs\`).

## Stack e comandos

- Nuxt 4.5 (usa a estrutura `app/` como srcDir, padrão do Nuxt 4), Vue 3.5, TypeScript.
- Hospedagem alvo: Netlify (`netlify.toml` já configurado: `npm run generate` →
  `.output/public`). **Nada foi publicado ainda** — só testado em `localhost` (porta 3000
  via `npm run dev`). Nunca fazer deploy sem o Rafael pedir explicitamente.
- `npm run build` (SSR build) e `npm run generate` (estático, o que realmente vai pro
  Netlify) devem rodar limpos antes de considerar qualquer mudança "pronta".
- Node local roda em `nvm4w`; `npm install` às vezes falha com um erro esquisito do
  arborist ("Cannot read properties of null (reading 'edgesOut')") — nesse caso usar
  `npm install --legacy-peer-deps`.

## Identidade visual

Monocromática, escura, editorial — `app/assets/css/main.css` define as variáveis:
`--color-bg: #090909`, `--color-bg-sidebar: #080808`, `--color-bg-elevated: #101010`,
`--color-text: #f2f2f0` (off-white), `--color-text-secondary: #9a9a9a`,
`--color-text-tertiary: #5f5f5f`, `--color-border` / `--color-border-strong` (branco em
baixa opacidade), `--color-accent: #ffffff`. Fonte única: Inter (Google Fonts, carregada
via `<link>` no `nuxt.config.ts`, sem pacote de fonte instalado).

**Regra de ouro repetida várias vezes pelo Rafael ao longo do projeto**: manter essa
paleta preto/branco/cinza em qualquer novo componente. Cor de verdade só aparece onde é
dado funcional (as cores do portfólio, os swatches do seletor de cor) — nunca como
decoração da UI em si (botões, tabs, bordas continuam monocromáticos mesmo dentro do
seletor de cor).

## Estrutura de páginas

Multi-página (não é mais single-page-com-âncoras como a primeira versão):

- `/` (`pages/index.vue`) — "Sobre mim" + Portfólio + CTA final.
- `/contato` (`pages/contato.vue`) — intro + `ContactMethods.vue` (email/telefone/
  LinkedIn como cards) + `ContactForm.vue` (nome + mensagem → link `wa.me`, formulário
  **simples**, não confundir com o modal grande — ver seção própria abaixo).
- `/experiencia` (`pages/experiencia.vue`) — Experiência Profissional + Habilidades
  Técnicas juntas na mesma página.
- `/politicas-e-termos` (`pages/politicas-e-termos.vue`) — Política de Privacidade,
  Termos de Uso, **Portfólio e Projetos Desenvolvidos** (cláusula jurídica pedida pelo
  Rafael em 30/08/2026: os projetos do portfólio são demonstração técnica, sem vínculo
  societário/parceria; marcas/logos de terceiros seguem dos titulares; titular pode
  pedir revisão/remoção pelo canal de contato), Aviso de Cookies — num acordeão nativo
  (`<details>`, componente `PolicyAccordion.vue`) — funciona sem JS.

Todos os textos ficam centralizados em `app/data/resume.ts` (perfil, contatos, idiomas
removidos depois — ver changelog, formação, resumo, experiências, portfólio,
habilidades, frase do preloader) e `app/data/policies.ts`.

## Layout: sidebar + main (`layouts/resume.vue`)

`politicas-e-termos.vue` usa `layouts/default.vue` (só conteúdo + `SiteFooter.vue`, sem
sidebar). As outras 3 páginas usam `layouts/resume.vue`: sidebar fixa à esquerda (foto,
nome, contatos, formação numa linha só, menu, e — **desde 31/08/2026** — o link
"Políticas e Termos" no fim do `.sidebar__inner` (empurrado pra baixo por
`margin-top:auto`; o "© ANO Rafael Muniz" chegou a ficar aqui junto mas o Rafael
pediu pra tirar, deixando só o link) + área principal à direita. O `<SiteFooter />` foi
**removido do `layouts/resume.vue`** nessa data; ele só existe agora na página de
Políticas e Termos (que não tem sidebar pra encaixar o rodapé).

- Desktop (`min-width: 901px`): `flex-direction: row`, sidebar `width: 30%` com
  `min-width:300px` / `max-width:400px`, `position: sticky`. Área principal usa
  `flex:1` e **preenche todo o espaço restante** (sem `max-width` limitando — isso foi
  um pedido explícito do Rafael depois de reclamar que sobrava vazio à direita).
- Mobile: empilha normalmente, sidebar vira topo da página.

**Menu lateral (`SidebarNav.vue`)**: 3 itens — Portfólio (`to: '/'`), Contato
(`to: '/contato'`), Experiência (`to: '/experiencia'`). (O link "Políticas e Termos" agora vive no rodapé DENTRO da sidebar — ver seção acima.)
O item ativo é definido só por
`route.path === item.to`, **não por scroll-spy**. Isso já foi tentado com
`IntersectionObserver` e quebrou (a faixa de detecção de scroll não fazia sentido quando
cada item do menu aponta pra uma página inteira, não uma seção de uma página só) — não
reintroduzir esse padrão aqui sem necessidade real.

## Portfólio (`PortfolioSection.vue` + `PortfolioCard.vue`)

5 projetos reais em `resume.ts` (`portfolio` array): People Equipamentos, A TARDE
Educação, Ferreira Muniz Imóveis, Espaço Psique e Vida, Royale Soluções Industriais.
As descrições foram reescritas (30/08/2026) no formato "Desenvolvimento de website
institucional para X, com foco em … e experiência responsiva para dispositivos móveis"
— foco nas **atividades de desenvolvimento** do Rafael, sem afirmar vínculo
societário/parceria/representação (alinhado à cláusula "Portfólio e Projetos
Desenvolvidos" em `policies.ts`). O nome fantasia continua sendo o título do card.

Cada item tem também um campo `status` — texto curto em **itálico**, cor terciária,
renderizado logo abaixo da descrição (`.portfolio-card__status`). Valores atuais
(30/08/2026): "Projeto contratado" (People, Ferreira Muniz) e "Em formalização"
(A TARDE, Espaço Psique, Royale). É o estágio comercial do case. O `<p>` só aparece
se `status` estiver preenchido. A descrição do Royale foi encurtada ~2 linhas nesse
mesmo pedido pra abrir espaço pro status sem esticar o card.

Decisão de design importante: cada card usa **logo + cor de fundo sólida** (campos
`logo`, `bgColor`, `logoScale` opcional em cada item), **não** foto/screenshot do site.
Logos ficam em `public/portfolio/logos/` — SVG quando disponível (evita ficar borrado ao
redimensionar; ex. FMI usa o SVG oficial do cliente, não o favicon 32×32 que tinha ficado
borrado numa versão anterior). A logo do People Equipamentos (`people-equipamentos.svg`)
foi editada à mão pra remover um fundo quadrado branco que sobrava atrás do círculo — se
essa logo for trocada no futuro, prestar atenção nesse detalhe.

Mecânica do card (pedida explicitamente com base na referência
`atardeeducacao.netlify.app/eventos`):
- Desktop (hover real, `@media (hover:hover) and (pointer:fine)`): dois painéis
  empilhados (`position:absolute`), crossfade de opacidade no hover — **não** é slide.
- Mobile/touch: carrossel horizontal **nativo** via `overflow-x:auto` +
  `scroll-snap-type:x mandatory` — **sem nenhum JS de drag/pointer-events**. Uma versão
  anterior usava `pointer events` manuais e foi explicitamente rejeitada ("o navegador já
  distingue toque de arraste sozinho").
- Animação de entrada: fade + slide-up via `IntersectionObserver`, delay escalonado por
  índice (90ms).
- Grid com `align-items:stretch` pra cards da mesma altura na fileira. O link
  "Visitar site" fica colado no rodapé do card via `margin-top:auto` nele (antes era
  `flex:1` na descrição — mudou quando o `status` entrou entre descrição e link).

Já teve um campo de busca (`<input type="search">` filtrando por nome/descrição) no
topo da seção — **removido em 30/08/2026** a pedido do Rafael (só 5 projetos, não
justificava).

## Experiência (`ExperienceSection.vue` + `ExperienceItem.vue`)

Cada experiência em `resume.ts` (`experiences` array) tem: `period`, `duration`
opcional ("6 meses" / "2 anos" / "1 ano"), `role`, `company` (pode ser `''` — no
Freelancer o `—` some), `summary` (uma frase, sempre visível) e `highlights[]`
(lista detalhada dentro de um `<details>` nativo com o toggle "Atividades e
resultados" + chevron que gira no `[open]`, mesmo padrão do `PolicyAccordion`). Isso
foi pedido pelo Rafael em 30/08/2026 pra "não ficar pesado para os olhos": colapsado
mostra só título + resumo, o detalhe fica sob demanda.

Os `highlights` foram escritos no **método XYZ** (Google / Laszlo Bock — "resultado
primeiro, depois como foi feito"), usando **só números reais** que o Rafael passou
(≈90% dos CFCs da Bahia, sistema legado 20+ anos, dezenas de chamados/dia, durações).
Não inventar métricas novas se ele pedir pra ajustar o texto. Correções factuais que
ele fez nesse pedido e que já estão no dado: (1) tirou "sozinho" do 1º bullet do
A TARDE; (2) A TARDE agora menciona a proposta de julho/2026 de um site novo (o que
está no portfólio) em análise pra substituir o institucional; (3) Freelancer virou
"Janeiro 2025 – Atual" porque ele continua pegando freela mesmo no A TARDE.

## Preloader (`SignaturePreloader.vue`)

Passou por duas versões: primeiro um fade-in de letras/palavras, depois virou uma
**animação de "digitação" estilo terminal** (pedido explícito): revela
`System.out.println("Rafael Muniz");` caractere por caractere (fonte monoespaçada do
sistema, sem webfont nova), com prompt `>` e cursor piscando, barra de progresso
sincronizada. Texto vem de `preloaderPhrase` em `resume.ts`. Roda 1x por sessão
(`sessionStorage`), respeita `prefers-reduced-motion`, nunca trava (timers de segurança
removem o overlay mesmo se algo falhar).

## Formulário grande: "Solicitação de Projeto" (o recurso mais complexo do site)

Diferente do formulário simples de `/contato`, existe um **segundo formulário**, bem
maior, aberto como popup a partir do botão "Descrever projeto" no CTA da home
(`ContactCta.vue` — tem 2 botões: "Enviar mensagem" leva pra `/contato`, "Descrever
projeto" abre o modal). **Os dois formulários coexistem por decisão explícita do
Rafael** — não remover nenhum dos dois.

### Por que esse formulário existe

Baseado nos prompts reais de trabalho do Rafael, lidos diretamente de
`C:\Dev\freelancing\myCRM\docs\prompt-desenvolvimento-site.md` (prompts A/B que ele usa
pra especificar o desenvolvimento de site de um cliente) e `negocio-e-contrato.md`
(modelo de negócio — nicho, precificação, "Site Profissional" R$2.500). A ideia: em vez
do cliente escrever um textão desorganizado no WhatsApp, ele preenche esse formulário e o
Rafael recebe tudo já estruturado.

### Arquitetura (reescrita orientada a dados — 30/08/2026)

O formulário serve, como **função principal**, pra virar um briefing que o Rafael
transforma num prompt de desenvolvimento. Por isso: perguntas detalhadas, que ramificam
conforme a escolha do cliente, e **zero pergunta técnica** (hospedagem, domínio,
linguagem...) — o cliente só descreve o problema/desejo, a parte técnica é do Rafael.
Referência do que o prompt de site precisa: `myCRM/docs/prompt-desenvolvimento-site.md`
(Prompt A/B) e `negocio-e-contrato.md`.

- `composables/useProjectRequestModal.ts` — singleton reativo (`isOpen`/`open()`/`close()`).
- **`data/projectRequest.ts`** — TODO o conteúdo + o modelo. `Question` (`type: 'text' |
  'textarea' | 'toggle' | 'tags' | 'color' | 'logo'`, `key`, `label` [voz do Rafael],
  `mine?` [voz do cliente, pra mensagem], `help?`, `required?`, `toggleLabels?`,
  `options?` p/ tags, `reveal?` p/ pergunta-filha do toggle) e `Step` (`id`, `title`,
  `mineTitle?`, `intro?`, `questions[]`). Exports: `serviceTypes`,
  `siteSteps`, `genericSteps` (whatsapp/instagram/sistema/suporte/outro), `tiktokServices`
  (os 15), `tiktokToolDetails` (perguntas por ferramenta), `tiktokChannelStep`,
  `linksStep`, `isAnswered()`, `serviceLabel()`, `tiktokLabel()`.
  **Editar/adicionar pergunta = mudança só neste arquivo.**
- **`components/ProjectRequestQuestionStep.vue`** — renderer genérico de um `Step`.
  Recebe `step` + `askedEarlier: Set<string>`; para cada pergunta ainda não perguntada,
  renderiza o input do `type` certo. Usa `[id="prm-q-<key>"]` nos campos e
  `[data-prm-shake="<key>"]` nos toggles/tags/grade (pro shake). `color` → embute
  `<ProjectRequestColorSwatches :field="key">`; `logo` → embute `ProjectRequestLogoQuestion`.
- **`components/ProjectRequestModal.vue`** — estado = `{ serviceType, answers: {} }`
  (mapa plano chave→valor; `form.answers.tiktokTools` guarda os ids de ferramenta).
  `flow` computed monta as etapas: `[onboarding, service]` + (site → `siteSteps` |
  tiktok → `[tiktok-tools, ...uma etapa por ferramenta escolhida, tiktokChannelStep]` |
  genérico → `genericSteps[s]`) + `linksStep` + `review`.
  - **"Perguntar uma vez"**: `keysBefore(idx)` = chaves já perguntadas em etapas
    anteriores; `askedEarlier` esconde do render qualquer pergunta cujo `key` já
    apareceu antes (a primeira ocorrência no fluxo "ganha"). Ex.: `clientName` /
    `instagram` são pedidos na 1ª etapa que os contém e **não reaparecem** na etapa
    final "Onde eu te encontro".
  - **Auto-skip**: `stepEmpty(idx)` — se todas as perguntas de uma etapa já foram
    feitas antes, `goNext`/`goBack` pulam ela (nunca aparece etapa vazia).
  - **`canProceed`**: só o essencial trava — `serviceType` (etapa service),
    `tiktokTools.length` (etapa tools), ou toda pergunta `required` e visível
    respondida. `required` hoje: `clientName`, `whatYouDo`, `siteStory`, `siteServices`,
    e a pergunta-problema de cada serviço (`waProblem`, `igProblem`, `sysProblem`,
    `supProblem`, `otherNeed`, `sup.problema`).
  - `provide('projectRequest', { form, goNext, goBack, flow })`.
  - **Fecha ao navegar**: no desktop o overlay do modal só cobre a área principal
    (`left: clamp(...)`), então a sidebar continua clicável com o modal aberto. Um
    `watch(() => route.fullPath)` chama `resetAndClose()` quando a rota muda — senão o
    modal fica por cima escondendo a página nova (bug reportado 31/08/2026).
- **`components/ProjectRequestReview.vue`** — `buildMessage()` genérico: percorre
  `ctx.flow.value` (menos onboarding/service/tiktok-tools/review), por etapa com
  respostas emite `*Título da etapa*` + `Rótulo: resposta` (com `seen` Set pro mesmo
  dedup do UI). Cabeçalho: `Olá, Rafael! Tenho interesse em *<serviço>*.` + (TikTok)
  lista das ferramentas. Abre `wa.me/{numero}?text=...`.
  - **VOZ (31/08/2026)**: a mensagem é o CLIENTE falando com o Rafael, então usa
    `Question.mine` / `Step.mineTitle` (1ª pessoa — "O que eu faço", "Minha história",
    "Meus contatos") em vez do `label`/`title` do formulário (2ª pessoa — "O que você
    faz", que é o Rafael perguntando). Se `mine` faltar, `msgLabel()` cai pro label
    enxuto (corta antes do `?`/`:`/2ª frase). A frase de logo também é 1ª pessoa
    ("Logo: já tenho, envio o arquivo pelo WhatsApp").
- `ProjectRequestSiteBasics/SiteContent/SiteReferences/GenericNeed/Contact` **foram
  removidos** — o renderer genérico + os dados fazem tudo.

### Perguntas — resumo por trilha

- **Site** (5 etapas): "O que você faz" (nome, o que faz, cidade, tem site?) · "O
  objetivo do site" (metas em tags, ação desejada, público, sensação em 3 palavras) ·
  "Sua história e seus serviços" (história=seção Sobre, serviços, diferenciais) ·
  "Conteúdo e portfólio" (portfólio, depoimentos, o que já tem pronto) · "A cara do
  site" (cores, logo, referências que gosta + por quê, o que evitar).
- **TikTok**: etapa de multi-seleção dos 15 serviços → **uma etapa por serviço marcado**
  com perguntas próprias (`tiktokToolDetails`) → "Sobre você e seu canal" (nome, sobre
  as LIVEs, vibe, cores, logo, referência, revenda, ferramentas atuais). "Suporte
  Técnico para LIVE" é um dos 15 e tem a pergunta-problema `required`.
- **WhatsApp / Instagram / Sistema / Suporte / Outro** — 1 etapa cada, com a
  pergunta-problema `required` + perguntas de contexto (tom, exemplos reais, frequência,
  o que "resolvido" significa pra ele...).
- **"Onde eu te encontro"** (final, compartilhada) — só mostra o que ainda não foi
  perguntado: Instagram, outros links, e-mail. Nome já veio antes.

### Layout do popup

- Layout do popup: `position:fixed` cobrindo a tela toda no mobile; no desktop
  (`min-width:901px`), `left: clamp(300px, 30vw, 400px)` — a mesma fórmula de 3 pontos
  que define a largura da sidebar, garantindo que o modal comece exatamente onde ela
  termina, sem JS de medição. Isso mantém a sidebar visível à esquerda enquanto o modal
  ocupa o resto.

### Animações do formulário (30/08/2026)

Pedido do Rafael: melhorar a UX de preenchimento com animação. **Regra que se firmou
aqui:** tudo feito com `@keyframes` CSS puros que rodam na MONTAGEM do elemento (via
`:key` / `v-if`) — **sem `<Transition>` / `<TransitionGroup>` do Vue**. Motivo: o
`<Transition>` depende de `requestAnimationFrame` + `transitionend` pra trocar as
classes `-enter-from`/`-enter-to`; em ambientes que não renderizam frames (ex.: o
preview headless do Claude Code) isso **trava o elemento invisível** (`opacity:0`
preso). `@keyframes` na montagem não tem essa coreografia de classes. As classes/keyframes
vivem em `app/assets/css/main.css` (bloco "Solicitação de projeto") porque precisam ser
globais (cruzam componentes-filho); o `@media (prefers-reduced-motion: reduce)` global
já zera tudo.

O que tem (A–H do pedido):
- **A. Troca de etapa** — a nova etapa entra deslizando (`.prm-step-in-fwd` /
  `.prm-step-in-back`, direção definida por `stepDir` no goNext/goBack). A anterior é
  desmontada na hora (sem animação de saída — `:key` no `.prm-step`).
- **B. Entrada escalonada** — `.prm-stagger > * > *` com `animation-delay` por
  `:nth-child` (a classe `prm-stagger` fica no wrapper `.prm-step`, alvo são os blocos
  de cada componente-etapa).
- **C. Campo condicional** — os `v-if` de campo dependente (reveal de um toggle,
  dica/ideia de logo) são `<div class="prm-reveal">` que anima `prm-reveal-in` ao
  montar. Sem `<Transition>`, saída imediata.
- **D. Abrir o modal** — `.prm-overlay` + `.prm-panel` animam ao montar (fechar é
  imediato; o `setTimeout(300)` do `resetAndClose` continua pra resetar o form).
- **E. Seleção** — `prm-pop` (escala 1→0.86→1, à prova de frame congelado porque
  começa e termina em `scale(1)`) nos swatches de cor e no check dos cards de TikTok;
  `:active { transform: scale(...) }` nos cards de serviço/TikTok. Chips de cor: `prm-fade-up` ao montar.
- **F. Barra de progresso** — `progressPulse` (ref + `setTimeout 700ms`) dispara um
  brilho `::after` que atravessa a barra ao concluir etapa; "Etapa X de Y" e o título
  re-animam via `:key` + `.prm-meta-anim`.
- **G. Campo obrigatório** — o botão "Próximo" **não usa `:disabled`**; fica
  `.prm-btn--blocked` (opacidade baixa) mas clicável, e `attemptNext()` no
  `ProjectRequestModal.vue` faz `shake()` (classe `prm-shake`) + foco no primeiro campo
  obrigatório vazio. Alvo por `missingFieldSelector()` → `[id="prm-q-<key>"]` (atributo,
  não `#id`, porque chaves de TikTok têm `.` — ex. `sup.problema`) ou
  `[data-prm-shake="<key>"]` nos toggles/tags/grade.
- **H. Revisão** — o `<pre>` virou `<div>` com um `<span class="prm-review__line">` por
  linha (`messageLines` computed), cada um com `animation-delay` inline crescente. **A
  mensagem do WhatsApp continua vindo de `buildMessage()` direto** (não das spans), então
  o texto real não é afetado pelo `{{ line || ' ' }}` das linhas vazias.

**Nota de verificação:** o *feel* (timing, amplitude) não pôde ser conferido no preview
headless (não roda frames de animação). O fluxo/estrutura foi validado com as animações
neutralizadas. Se o Rafael pedir ajuste de timing, mexer só nos `@keyframes`/durations
em `main.css`.

### Seletor de cores (`ProjectRequestColorSwatches.vue`) — passou por 3 iterações

Renderizado pelo `ProjectRequestQuestionStep` sempre que há uma pergunta `type: 'color'`
(hoje: "A cara do site" da trilha Site e "Sobre você e seu canal" do TikTok). Prop
`field` = a chave em `form.answers` que guarda o array de hex (o renderer também põe um
`<input>` de observação livre em `form.answers.colorsNote`). Histórico de retrabalho
(relevante pra não repetir os mesmos erros):

1. V1: lista simples de 14 cores nomeadas com texto livre — rejeitada, "aspecto
   amador".
2. V2: pedido explícito de usar **`@nuxt/ui`** (`<UColorPicker>`,
   https://ui.nuxt.com/docs/components/color-picker) pra uma aba "Cor precisa" com
   gradiente arrastável, inspirado numa imagem de referência (visual tipo Figma/Linear:
   abas, grade de swatches em rampa de matiz×luminosidade, hex input). Isso trouxe
   `@nuxt/ui` + `tailwindcss` como dependências novas — **decisão importante**: o
   Tailwind foi importado **sem o preflight** (`@import 'tailwindcss/theme' layer(theme);
   @import 'tailwindcss/utilities' layer(utilities); @import '@nuxt/ui';` em
   `main.css`), justamente pra não resetar elementos HTML no site inteiro (o preflight
   do Tailwind conflitaria com o CSS próprio já escrito). `app.vue` precisou ser
   envolvido com `<UApp>` (exigido pelo Nuxt UI). **Não adicionar preflight depois sem
   testar o site inteiro de novo** — já foi verificado que essa configuração atual não
   quebra nada, mas é frágil se alguém "simplificar" o import do Tailwind sem saber
   disso.
3. V3 (atual): a grade de swatches virou uma **rampa gerada por código** (função
   `hslToHex` no próprio componente) — 7 tons de cinza + 5 linhas de matiz×luminosidade
   × 11 colunas = 62 amostras, em quadrados pequenos sem legenda, bem mais parecida com
   a referência visual do Rafael do que a lista curada da v1.

Estado atual da UI: duas abas ("Amostras" / "Cor precisa") com o **mesmo estilo dos
botões Sim/Não** (fundo preto + borda quando inativo, fundo branco + texto escuro
quando ativo/selecionado — esse par de cores invertido foi um pedido explícito do
Rafael, replicado nos toggles e tags do `ProjectRequestQuestionStep.vue` e nos tabs
de cor). Painel "Selecionadas" fica **ao lado** (direita, não embaixo), sempre visível
nas duas abas. Cada cor é um chip clicável — clicar no chip inteiro remove a cor.
No **desktop** os chips são `flex-flow: column wrap` com `max-height` ~10.5rem → 5 por
coluna, e ao passar disso abre nova coluna à direita (pedido do Rafael, 31/08/2026;
`.prm-color-selected` tem `min-width:112px / max-width:210px` pra caber até 2 colunas
sem estourar). No mobile volta a ser `row wrap`. O tamanho geral do seletor está
capado (`.prm-color-picker { max-width: 440px }`) pra não ficar gigante.
Mensagem final mostra só o hex de cada cor.

### Textos dos tipos de serviço

Rótulos curtos por pedido explícito: "Site", "WhatsApp", "Instagram", "TikTok",
"Sistema", "Suporte", "Outro". Ver `serviceTypes` em `data/projectRequest.ts`. Todo o
resto do conteúdo (perguntas, etapas, opções de tags) também vive nesse arquivo — é
onde o Rafael edita se quiser mudar/adicionar pergunta.

O botão "Descrever projeto" no `ContactCta.vue` **não tem mais o ícone do WhatsApp** ao
lado do texto (removido a pedido — o botão só abre o modal, não vai direto pro WhatsApp;
o ícone confundia). O botão "Enviar via WhatsApp" dentro da revisão do modal e o do
`ContactForm.vue` simples continuam com o ícone, porque esses de fato abrem o `wa.me`.

## Assets ainda pendentes / cuidados

- `public/profile.jpg` já foi adicionado (foto real).
- `public/portfolio/logos/` já tem os 5 logos reais.
- `public/og-image.png` e `public/favicon.svg`: "R" branco em fundo preto, gerados
  localmente (não são fotos reais, são texto renderizado). **`og:image` no
  `nuxt.config.ts` usa caminho relativo** (`/og-image.png`) — precisa virar URL absoluta
  assim que o domínio de produção existir, porque o WhatsApp exige URL absoluta pra
  mostrar a prévia do link.
- Descrições do portfólio foram reescritas em 30/08/2026 (foco nas atividades de
  desenvolvimento) — não são mais placeholder. Os títulos seguem o nome fantasia de
  cada cliente.

## Preferências de trabalho do Rafael (reforçadas várias vezes)

- Nunca fazer deploy sem ele mandar explicitamente — só localhost/dev.
- Preferir solução nativa do navegador a JS customizado sempre que der (exemplo: o
  carrossel do portfólio no mobile).
- Cores e textos exatos que ele passa (hex, frases) devem ser usados literalmente, não
  "adaptados" — a não ser que ele diga pra manter a estética do site.
- Testar de verdade no navegador (console, interações, responsivo) antes de reportar
  como pronto — vários bugs reais só apareceram assim (não só "parece que compilou").
- Rodar `npm run build` (e às vezes `npm run generate`) depois de qualquer mudança
  visual, antes de considerar concluído.
