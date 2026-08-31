# Rafael Muniz — Currículo

Site de currículo profissional construído com Nuxt 3 (Vue 3), fiel ao design de
referência: layout escuro, editorial e minimalista, com sidebar fixa, seção de
experiências, portfólio de projetos e formulário de contato via WhatsApp.

## Instalação

```bash
npm install
```

## Rodar localmente

```bash
npm run dev
```

O site fica disponível em `http://localhost:3000`.

## Build de produção

```bash
npm run build
```

## Gerar site estático (usado no deploy)

```bash
npm run generate
```

A saída estática é gerada em `.output/public`.

## Deploy no Netlify

O arquivo `netlify.toml` já está configurado com:

- **Build command:** `npm run generate`
- **Publish directory:** `.output/public`

Basta conectar o repositório no Netlify — nenhuma configuração manual extra é
necessária.

## Estrutura do projeto

```
app/
├── app.vue                    # Preloader + <NuxtPage />
├── assets/css/main.css        # Variáveis de design e estilos globais
├── data/resume.ts             # Todo o conteúdo textual do currículo
├── components/
│   ├── ProfileSidebar.vue     # Coluna lateral (foto, nome, cargo)
│   ├── ContactInfo.vue        # Email / telefone / LinkedIn
│   ├── Languages.vue          # Idiomas
│   ├── Education.vue          # Formação
│   ├── ProfessionalSummary.vue
│   ├── ExperienceSection.vue
│   ├── ExperienceItem.vue
│   ├── PortfolioSection.vue   # Grid de projetos + busca
│   ├── PortfolioCard.vue      # Card individual (revela foto no hover)
│   ├── SkillsSection.vue      # Badges de habilidades técnicas
│   ├── ContactForm.vue        # Formulário que abre conversa no WhatsApp
│   └── SignaturePreloader.vue # Tela de abertura com assinatura animada
└── pages/index.vue            # Página única, monta sidebar + main
```

## Editando o conteúdo

Todos os textos (nome, contatos, experiências, portfólio, habilidades) ficam
em [`app/data/resume.ts`](app/data/resume.ts). Não é necessário mexer nos
componentes para atualizar informações.

### Foto de perfil

Adicione sua foto em `public/profile.jpg` (proporção 1:1). Enquanto o
arquivo não existir, a sidebar mostra automaticamente um fallback com as
iniciais "RM".

### Fotos do portfólio

Adicione capturas de tela em `public/portfolio/` seguindo os nomes definidos
em `resume.ts` (ex.: `jovem-jornalista.jpg`). Sem o arquivo, o card mostra um
fallback discreto com o nome do projeto.

## Notas de acessibilidade e performance

- HTML semântico, headings hierarquizados, links reais (`mailto:`, `tel:`,
  LinkedIn com `target="_blank"` + `rel="noopener noreferrer"`).
- Sem bibliotecas externas de animação — apenas CSS e Vue.
- Preloader respeita `prefers-reduced-motion` e nunca bloqueia o acesso ao
  conteúdo (timers de segurança removem o overlay mesmo em caso de falha).
