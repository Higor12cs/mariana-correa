# Guia do projeto — marianacorrea.com.br

Portfólio da Mariana Corrêa (estrategista de marcas, designer e direção criativa).
Site estático em Astro, com scroll suave, cursor customizado e animações de entrada,
no espírito das referências enviadas pela cliente.

Este arquivo é a fonte de contexto para quem continuar o projeto — humano ou agente.

---

## 1. Stack

| Item | Versão | Observação |
| --- | --- | --- |
| Astro | 7.x | Output estático (`output: 'static'`, padrão) |
| Tailwind CSS | 4.x | Configuração CSS-first via `@theme` em `src/styles/global.css`. **Não existe `tailwind.config.js`** |
| Lenis | 1.x | Scroll suave |
| GSAP + ScrollTrigger | 3.x | Parallax, marquee e timeline do preloader |
| Fonts API do Astro | nativa | Fontes self-hosted, sem requisição ao Google |

Comandos:

```bash
npm run dev
```

```bash
npm run build
```

```bash
npx astro check
```

O `astro preview` roda em background: pare com `npx astro preview stop`.

---

## 2. Identidade visual

Extraída do PDF `Portfolio.pdf` da cliente. Tokens definidos em `src/styles/global.css`
dentro do bloco `@theme` — mexa **ali**, não espalhe hex pelo código.

| Token | Valor | Uso |
| --- | --- | --- |
| `--color-ink` | `#111111` | Fundo escuro, texto sobre claro |
| `--color-paper` | `#f4f4f2` | Fundo claro padrão |
| `--color-lime` | `#b7ea6e` | Acento — o verde da marca |
| `--color-lime-glow` | `#cdfd8f` | Núcleo dos gradientes radiais (`.glow`) |
| `--color-mist` | `#8a8a86` | Texto secundário |

Tipografia:

- **Display** (`font-display`, Archivo): títulos, sempre `font-weight: 300`, tracking negativo.
  Substitui a grotesca larga usada no PDF.
- **Texto** (`font-sans`, Plus Jakarta Sans): corpo, labels, navegação.

> As fontes originais da apresentação são licenciadas. Archivo + Plus Jakarta Sans são
> substitutos próximos e gratuitos. Para trocar pelas reais, edite o array `fonts` em
> `astro.config.mjs` (aceita provider `local` apontando para arquivos em `src/`).

Elementos de marca recorrentes:

- O símbolo `//` — componente `src/components/Slashes.astro` (SVG) e também usado como
  texto literal em separadores e no marquee.
- Marca reduzida `M//C` no header.
- Gradiente radial verde (`.glow`) como respiro nas seções de abertura.

Utilitárias próprias (em `global.css`): `.shell`, `.display-xl`, `.display-lg`,
`.display-md`, `.eyebrow`, `.lede`, `.rule`, `.glow`, `.prose-case`.

---

## 3. Estrutura

```
src/
  content/projetos/*.md     <- cada projeto é um arquivo markdown
  content.config.ts         <- schema (zod) da collection
  data/site.ts              <- nome, contato, redes, serviços, números
  components/
    Slashes.astro           <- símbolo //
    Cursor.astro            <- cursor customizado (markup)
    Preloader.astro         <- tela de entrada (só na home)
    Header.astro            <- header fixo + menu mobile
    Footer.astro
    Marquee.astro           <- faixa infinita
    ProjectIndex.astro      <- lista de projetos com preview no hover
  layouts/Base.astro        <- html, meta tags, fontes, slots
  scripts/motion.ts         <- TODA a lógica de animação
  pages/
    index.astro
    sobre.astro
    projetos/index.astro
    projetos/[...slug].astro
    404.astro
public/img/
  projetos/<slug>-cover.webp, <slug>-01.webp, <slug>-02.webp
  mariana-retrato.webp, og.webp
```

---

## 4. Adicionar um projeto novo

**Este é o fluxo principal de manutenção.** São dois passos.

### Passo 1 — imagens

Coloque em `public/img/projetos/` seguindo a convenção:

| Arquivo | Proporção sugerida | Onde aparece |
| --- | --- | --- |
| `<slug>-cover.webp` | ~4:3 (1200px de largura) | Card da listagem, preview no hover, OG image |
| `<slug>-01.webp` | 16:9 (1920px) | Faixa full-bleed logo abaixo do título no case |
| `<slug>-02.webp` | 16:9 (1920px) | Galeria (pode ter quantas quiser) |

Exporte em WebP, qualidade ~84. As imagens atuais foram extraídas do PDF da cliente.

### Passo 2 — markdown

Crie `src/content/projetos/<slug>.md`. O nome do arquivo vira a URL
(`/projetos/<slug>`). Copie a estrutura:

```markdown
---
titulo: "Nome do Projeto"
cliente: "Nome do Cliente"
segmento: "Segmento"
ano: "2026"
servicos: ["Naming", "Branding", "Identidade Visual"]
resumo: "Uma frase que aparece no card e na meta description."
ordem: 6
destaque: true
rascunho: false
cor: "#2B3A55"
capa: "/img/projetos/meu-projeto-cover.webp"
imagemIntro: "/img/projetos/meu-projeto-01.webp"
galeria:
  - src: "/img/projetos/meu-projeto-02.webp"
    alt: "Descrição do que aparece na imagem"
---

## Contexto

Texto corrido.

## Estratégia

Mais texto.

### Subtítulo pequeno

- Item de lista (o marcador vira `//` verde automaticamente)
- Outro item

## Identidade Visual

Fecha o case.
```

Campos do schema (`src/content.config.ts`):

- `ordem` — número que define a posição na listagem (crescente). Obrigatório.
- `cor` — cor de fundo do topo do case e do bloco "próximo projeto". Use uma cor
  escura da própria marca do cliente; o texto é sempre claro por cima.
- `rascunho: true` — esconde o projeto do site sem apagar o arquivo.
- `destaque` — hoje não filtra nada; está no schema para quando quiserem separar
  "selecionados" de "todos".

Não precisa registrar o projeto em lugar nenhum: as páginas usam `getCollection`
e o "próximo projeto" no fim de cada case circula pela lista automaticamente.

### Markdown disponível no corpo

Renderizado dentro de `.prose-case`: `##`, `###`, parágrafos, `**negrito**`,
listas e links já têm estilo. Para blocos mais elaborados (galerias no meio do texto,
citação em destaque), o caminho é converter o arquivo para `.mdx` — precisa instalar
`@astrojs/mdx` e mudar o `pattern` no `content.config.ts`.

---

## 5. Editar textos fixos

| O quê | Onde |
| --- | --- |
| Nome, e-mail, redes, cidade | `src/data/site.ts` → `site` |
| Itens do menu | `src/data/site.ts` → `navegacao` |
| Lista de serviços | `src/data/site.ts` → `servicos` |
| Números (6+ anos etc.) | `src/data/site.ts` → `numeros` |
| Manifesto / bio da home | `src/pages/index.astro` |
| Bio completa e trajetória | `src/pages/sobre.astro` |

---

## 6. Sistema de animação

Tudo em `src/scripts/motion.ts`, importado uma vez pelo `Base.astro`.
Você controla o comportamento **por atributo no HTML**, sem escrever JS:

| Atributo / classe | Efeito |
| --- | --- |
| `data-reveal` num container | Filhos com `.reveal-line` / `.fade-up` entram em cascata quando a seção aparece |
| `data-reveal="hero"` | Igual, mas espera o preloader terminar (use no topo das páginas) |
| `.reveal-line` + `<span>` interno | Texto sobe de baixo com máscara. **O `<span>` interno é obrigatório** |
| `.fade-up` | Sobe 28px com fade |
| `data-parallax="70"` | Deslocamento vertical no scroll. **O valor é em pixels de curso** |
| `data-blob` | Respiração lenta (deriva + escala) do gradiente verde do hero |
| `data-img` numa moldura | Imagem entra com clip-path abrindo + zoom de 1.3 → 1 |
| `data-skew` | Inclina levemente conforme a velocidade do scroll |
| `data-cursor="view" \| "link"` | Estado do cursor customizado |
| `data-horizontal` + `data-horizontal-track` | Seção pinada com scroll horizontal (ver `HorizontalGallery.astro`) |
| `data-marquee` + `data-speed` | Faixa infinita que acelera com o scroll |

### Armadilhas que já custaram tempo

- **GSAP sobrescreve o transform do Tailwind.** Se um elemento é centralizado com
  `-translate-x-1/2 -translate-y-1/2` e você anima `xPercent`/`yPercent`, a centralização
  é destruída (o GSAP lê esses valores como o estado inicial e os substitui). Anime `x`/`y`
  em pixels nesses casos. Foi exatamente por isso que o `data-parallax` passou a ser em px.
- **`.reveal-line` usa `overflow: hidden` com padding em `em`.** O elemento que recebe a
  classe precisa ter o tamanho de fonte final. Se a classe ficar num `<div>` e o tamanho
  num `<span>` filho, os acentos são cortados.
- **Não pine um item de grid.** O GSAP embrulha o elemento num `pin-spacer` e quebra o
  layout. Onde precisar de coluna fixa, use `lg:sticky lg:top-32` (é o que a página de case faz).
- Todo o movimento é desligado em `prefers-reduced-motion: reduce`.
- O cursor customizado só existe em ponteiro fino (`hover: hover and pointer: fine`).
- O preloader aparece **uma vez por sessão** (`sessionStorage`) e só na home
  (`<Base intro>`). Para revê-lo, abra uma aba anônima.
- O header usa `mix-blend-difference`: ele se inverte sozinho sobre qualquer fundo,
  inclusive as cores variáveis dos cases. Não adicione lógica de tema pra ele.
- No mobile, o Lenis roda com `syncTouch` desligado (scroll nativo). Ligar isso dá o
  "peso" de locomotive no toque, mas é a causa mais comum de travamento no iOS.

### Decisões de movimento já testadas e recusadas

Não vale a pena refazer sem pedido explícito da cliente:

- **Hero pinado com scroll-hijack.** O hero é a capa do PDF: parado, com o wordmark e o
  papel na mesma linha, régua embaixo dos dois, `PORTFÓLIO` embaixo à esquerda e o `//`
  à direita. Já foram testados e recusados: cards de projeto subindo e convergindo,
  e trocar `PORTFÓLIO` por uma lista de disciplinas.
- **Botão redondo de "rolar"** no hero: lido como cara de template. Não tem CTA no hero.
- **Navbar com a marca aparecendo só depois do hero** e menu mobile com clip-path: testado
  e revertido. A navbar é sempre visível e some ao descer / volta ao subir.
- **Blobs sólidos com blur** no fundo do hero: estouraram a cor. O fundo usa gradiente
  radial (`.glow`) com deriva lenta.

O momento "locomotive" que ficou é a galeria horizontal pinada (`HorizontalGallery`),
no meio da home.

## 7. Pendências antes de publicar

Estes são placeholders — precisam dos dados reais da cliente:

- [ ] **E-mail** em `src/data/site.ts` (`contato@marianacorrea.com.br` é suposição)
- [ ] **URLs de Instagram / LinkedIn / Behance** — hoje apontam para a home de cada rede
- [ ] Telefone/WhatsApp, se ela quiser (campo `telefone` existe mas não é usado em lugar nenhum)
- [ ] Confirmar cidade/estado (`local` está como "Brasil")
- [ ] Confirmar o ano de cada projeto — foram inferidos do PDF
- [ ] Retrato em resolução maior: o atual foi extraído do PDF (507×793)

Ideias que ficaram fora do escopo: `@astrojs/sitemap` + `robots.txt`, formulário de
contato, versão em inglês, página de cada serviço.

---

## 8. Decisões tomadas (e por quê)

- **Imagens vieram do PDF.** As páginas do `Portfolio.pdf` são imagens de 1920×1080;
  foram extraídas em resolução nativa e recortadas. Os slides que tinham o painel de
  texto embutido (o fundo escuro com a descrição) **não** são usados como imagem do
  site — o texto vive no markdown, a imagem é só imagem.
- **Fontes self-hosted** pela Fonts API do Astro: sem requisição a terceiros e sem
  layout shift.
- **`z` vem de `astro/zod`**, não de `astro:content` — este último está deprecado
  e sai no Astro 8.
- **Sem comentários no código**, a pedido. O contexto mora aqui.
- **Os textos passaram pelo skill `humanizer`** (plugin `blader/humanizer`), que remove
  marcas de escrita de IA: travessões como conector universal, tríades forçadas, negrito
  decorativo, frases de efeito e inflação de significado. Ao escrever texto novo para o
  site, rode o mesmo skill. As frases da própria Mariana, tiradas do PDF, ficam como estão.
- **A seção de contato e o rodapé são um bloco escuro contínuo.** O rodapé não tem régua
  no topo e o gradiente verde do contato fica contido dentro da seção (se ele vazar, o
  `overflow-hidden` corta reto e a emenda aparece).
