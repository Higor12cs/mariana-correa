# Guia de conteúdo — marianacorrea.com.br

Guia para quem vai **trocar textos e imagens** do site. Não é preciso saber programar:
tudo o que está aqui é abrir um arquivo, achar o trecho e substituir.

Quem for mexer na estrutura, no visual ou nas animações deve ler o [GUIA.md](./GUIA.md).

---

## 1. Onde mora cada coisa

| Quero mudar | Abra este arquivo |
| --- | --- |
| E-mail, redes sociais, cidade | `src/data/site.ts` |
| Números (6+, 40+, 10+) | `src/data/site.ts` |
| Lista de serviços (títulos, textos, badges) | `src/data/site.ts` |
| Itens do menu | `src/data/site.ts` |
| Textos da home | `src/pages/index.astro` |
| Textos da página Sobre | `src/pages/sobre.astro` |
| Textos da lista de projetos | `src/pages/projetos/index.astro` |
| Conteúdo de um projeto | `src/content/projetos/<nome-do-projeto>.md` |
| Imagens | `public/img/` |

Depois de qualquer alteração é preciso publicar o site de novo (build + deploy).

---

## 2. Regras de imagem

Valem para todas as imagens do site.

- **Formato:** `.webp` para imagens do site, `.jpg` só para as imagens de
  compartilhamento (as que aparecem no WhatsApp e no LinkedIn).
- **Qualidade:** exporte WebP em qualidade ~84.
- **Peso:** tente ficar abaixo de 300 KB por imagem. Acima disso o site fica lento.
- **Nome do arquivo:** sem acento, sem espaço, sem letra maiúscula.
  Use hífen: `salvi-clinica-cover.webp`. Nome errado quebra a imagem.
- **Onde salvar:** dentro de `public/img/`. O caminho escrito no site sempre
  começa em `/img/...` (sem o `public`).
- **Substituir uma imagem:** se o arquivo novo tiver **exatamente o mesmo nome**
  do antigo, é só sobrescrever. Nada mais precisa ser alterado.
- **Corte:** o site recorta a imagem para preencher o espaço (`object-cover`).
  Deixe respiro nas bordas para o assunto não ser cortado.

### Tabela-resumo de tamanhos

| Imagem | Proporção | Tamanho para exportar | Onde aparece |
| --- | --- | --- | --- |
| Retrato da Mariana | 3:4 (vertical) | 1200 × 1600 px | Home (seção Sobre) e página Sobre |
| Capa de projeto | ~10:9 | 1200 × 1080 px | Card da lista de projetos e preview do hover |
| Imagem de abertura do projeto | 16:9 | 1920 × 1080 px | Faixa larga no topo do case |
| Imagem de galeria do projeto | 16:9 | 1920 × 1080 px | Galeria do case e faixa horizontal da home |
| Compartilhamento do site | 1200 × 630 px | 1200 × 630 px | Link do site no WhatsApp/LinkedIn |
| Compartilhamento de projeto | 1200 × 630 px | 1200 × 630 px | Link do case no WhatsApp/LinkedIn |

> O retrato atual (`public/img/mariana-retrato.webp`) está em 507 × 793 px, que é
> baixo. Assim que houver uma foto em resolução maior, exporte em 1200 × 1600 px
> com o mesmo nome de arquivo e substitua.

---

## 3. Home (`src/pages/index.astro`)

As seções na ordem em que aparecem.

### 3.1 Topo (hero)

Sem imagem. O verde que se move ao fundo é um gradiente, não um arquivo.

| Elemento | Conteúdo hoje | Onde mudar | Limite sugerido |
| --- | --- | --- | --- |
| Assinatura | `MARIANA//CORRÊA` | `index.astro` | fixo |
| Linha à direita | `Estrategista de Marcas \| Publicitária \| Direção Criativa` | `site.ts` → `papel` | até 60 caracteres |
| Frase principal | "O próximo nível da sua marca começa onde o óbvio termina." | `index.astro` | até 70 caracteres |

A frase principal é quebrada em três linhas escritas à mão, porque cada linha sobe
sozinha na animação. Se trocar a frase, redistribua as linhas mantendo o formato:

```html
<span class="reveal-line"><span>primeira linha</span></span>
<span class="reveal-line"><span>segunda linha</span></span>
<span class="reveal-line"><span>terceira linha</span></span>
```

Não remova o `<span>` de dentro: ele é o que faz o texto subir.

### 3.2 Números e manifesto (fundo preto)

| Elemento | Conteúdo hoje | Onde mudar |
| --- | --- | --- |
| Números | 6+ anos de experiência / 40+ marcas desenvolvidas / 10+ segmentos explorados | `site.ts` → `numeros` |
| Título | "Criando marcas disruptivas e inconfundíveis na percepção." | `index.astro` |
| Parágrafo | texto sobre visão de negócio e estratégia | `index.astro` |
| Botão | "Conheça a trajetória" → leva para `/sobre` | `index.astro` |

Nos números: `valor` é o número grande, `rotulo` é a legenda embaixo.
Mantenha o rótulo com até 24 caracteres para não quebrar em três linhas.
A palavra em verde no título é a que está dentro de `<em>`.

### 3.3 Faixa verde rolante

Lista de especialidades que passa deslizando. Fica em `index.astro`, na linha
`const especialidades = [...]`. Hoje: Branding, Identidade Visual, Naming,
Direção Criativa, Estratégia. Use de 4 a 7 itens curtos.

### 3.4 Projetos

Lista os projetos automaticamente, na ordem do campo `ordem` de cada arquivo em
`src/content/projetos/`. Não há nada para editar aqui: mexa nos projetos.

No computador, ao passar o mouse sobre uma linha aparece a **capa** daquele projeto
flutuando. É o arquivo `<projeto>-cover.webp`.

### 3.5 Faixa horizontal (fundo preto)

| Elemento | Conteúdo hoje | Onde mudar |
| --- | --- | --- |
| Linha pequena verde | "Da estratégia à aplicação" | `index.astro`, propriedade `eyebrow` |
| Título | "A marca fora do papel" | `index.astro`, propriedade `titulo` |
| Imagens | montadas automaticamente | arquivos dos projetos |

As imagens dessa faixa **não são escolhidas à mão**: o site junta a imagem de
abertura e as imagens de galeria de todos os projetos publicados. Para trocar o
que aparece aqui, troque as imagens dos projetos. Para incluir mais peças, adicione
mais itens na `galeria` de um projeto.

### 3.6 Serviços (fundo preto)

Tudo em `site.ts` → `servicos`. Cada serviço tem quatro campos:

```js
{
  numero: '01',
  titulo: 'Branding',
  descricao: 'Texto de duas a três linhas.',
  itens: ['Badge 1', 'Badge 2', 'Badge 3', 'Badge 4'],
}
```

- `numero` — mantenha a sequência 01, 02, 03, 04.
- `titulo` — até 22 caracteres (é um título grande).
- `descricao` — de 120 a 260 caracteres funciona bem.
- `itens` — as bolinhas com borda. Use 3 a 5, cada uma com até 24 caracteres.

Para acrescentar um quinto serviço, copie um bloco inteiro e mude o `numero`.
A seção se ajusta sozinha.

### 3.7 Sobre (resumo)

| Elemento | Onde mudar |
| --- | --- |
| Foto | `public/img/mariana-retrato.webp` — vertical 3:4, 1200 × 1600 px |
| Título em três linhas | `index.astro` |
| Três parágrafos | `index.astro` |
| Botão "Ler mais" | `index.astro` |

O texto desta seção é o mesmo da página `/sobre`. **Ao trocar aqui, troque também
em `src/pages/sobre.astro`** — são dois arquivos diferentes.

### 3.8 Contato (fundo preto)

| Elemento | Onde mudar |
| --- | --- |
| Título | `index.astro` |
| E-mail | `site.ts` → `email` |
| Redes | `site.ts` → `redes` |

O e-mail escrito em `site.ts` aparece em quatro lugares ao mesmo tempo: contato,
rodapé, menu e página Sobre. Trocar num lugar só resolve todos.

---

## 4. Página de projetos (`src/pages/projetos/index.astro`)

| Elemento | Onde mudar |
| --- | --- |
| Título "PROJETOS" | o próprio arquivo |
| Frase de apresentação | o próprio arquivo |
| Cards | automáticos, vêm dos arquivos de projeto |

Cada card mostra a **capa** (1200 × 1080 px), o título, o `resumo` e as badges do
campo `servicos`.

---

## 5. Página de um projeto (case)

Cada projeto é um arquivo em `src/content/projetos/`. O nome do arquivo vira o
endereço: `salvi-clinica.md` → `/projetos/salvi-clinica`.

O arquivo tem duas partes. A de cima, entre os `---`, são as informações fixas:

```markdown
---
titulo: "Salví Clínica"
cliente: "Salví Clínica"
segmento: "Saúde e Estética"
ano: "2025"
servicos: ["Naming", "Branding", "Identidade Visual"]
resumo: "Frase curta que aparece no card e no Google."
ordem: 1
destaque: true
rascunho: false
cor: "#4A2739"
capa: "/img/projetos/salvi-clinica-cover.webp"
og: "/img/projetos/salvi-clinica-og.jpg"
imagemIntro: "/img/projetos/salvi-clinica-01.webp"
galeria:
  - src: "/img/projetos/salvi-clinica-02.webp"
    alt: "Descrição do que aparece na imagem"
---
```

| Campo | O que é | Cuidado |
| --- | --- | --- |
| `titulo` | nome do projeto | aparece enorme no topo, até 24 caracteres |
| `segmento` | área do cliente | aparece na lista e na ficha |
| `ano` | entre aspas | `"2025"`, não `2025` |
| `servicos` | badges do case | 2 a 4 itens |
| `resumo` | uma frase | 90 a 160 caracteres, é o que o Google mostra |
| `ordem` | posição na lista | número; menor aparece primeiro |
| `rascunho` | `true` esconde o projeto do site | útil para deixar pronto sem publicar |
| `cor` | cor do topo do case | cor **escura** da marca do cliente; o texto por cima é claro |
| `capa` | card e preview | 1200 × 1080 px |
| `og` | compartilhamento | 1200 × 630 px, em `.jpg` |
| `imagemIntro` | faixa larga do topo | 1920 × 1080 px |
| `galeria` | imagens do final | 1920 × 1080 px cada, quantas quiser |

Sempre preencha o `alt` de cada imagem da galeria com a descrição do que se vê.
É o que uma pessoa cega ouve e o que o Google lê.

A parte de baixo do arquivo é o texto do case, escrito normalmente:

```markdown
## Contexto

Texto corrido.

## Estratégia

Mais texto.

- item de lista
- outro item
```

`##` vira um título grande. Item de lista ganha o `//` verde automaticamente.

### Passo a passo: projeto novo

1. Exporte as imagens com o nome do projeto na frente:
   `nome-do-projeto-cover.webp` (1200 × 1080),
   `nome-do-projeto-01.webp` (1920 × 1080),
   `nome-do-projeto-02.webp` (1920 × 1080).
2. Salve as três em `public/img/projetos/`.
3. Gere a imagem de compartilhamento a partir da capa (comando no
   [GUIA.md](./GUIA.md), seção 7) e salve como `nome-do-projeto-og.jpg`.
4. Copie um arquivo `.md` existente de `src/content/projetos/`, renomeie para
   `nome-do-projeto.md` e troque os campos e o texto.
5. Ajuste o `ordem` para a posição desejada.
6. Publique o site.

Não é preciso cadastrar o projeto em lugar nenhum: ele entra sozinho na home, na
lista de projetos, na faixa horizontal e no "próximo projeto" dos outros cases.

---

## 6. Página Sobre (`src/pages/sobre.astro`)

| Elemento | Conteúdo hoje | Onde mudar |
| --- | --- | --- |
| Título | MARIANA CORRÊA | o próprio arquivo |
| Linha abaixo do título | `site.papel` | `site.ts` |
| Foto | retrato vertical 3:4 | `public/img/mariana-retrato.webp` |
| Subtítulo em três linhas | Publicitária, Estrategista de Marca e Diretora de Arte. | o próprio arquivo |
| Três parágrafos de bio | igual aos da home | o próprio arquivo |
| Números | mesmos da home | `site.ts` → `numeros` |
| Faixa verde | Estratégia / Design / Visão de negócio | o próprio arquivo |
| Trajetória | três blocos com período, título e texto | o próprio arquivo, `const trajetoria` |
| Competências | lista de badges | o próprio arquivo, `const competencias` |
| Contato | e-mail | `site.ts` |

Na trajetória, cada bloco tem `periodo` (a etiqueta cinza da esquerda, até 24
caracteres), `titulo` (o texto grande) e `texto` (o parágrafo). Para acrescentar
uma etapa, copie um bloco inteiro.

---

## 7. Topo e rodapé (todas as páginas)

**Topo** (`src/components/Header.astro`): marca `M//C`, menu e e-mail.
Os itens do menu vêm de `site.ts` → `navegacao`.

**Rodapé** (`src/components/Footer.astro`):

| Elemento | Conteúdo hoje | Onde mudar |
| --- | --- | --- |
| Frase | "Estrategista de marcas, publicitária e diretora de arte." | `Footer.astro` |
| Navegação | mesma do menu | `site.ts` → `navegacao` |
| E-mail | mariana.branddesigner@gmail.com | `site.ts` → `email` |
| Redes | Instagram @marianacorrea.co e LinkedIn in/mariana-correa20/ | `site.ts` → `redes` |
| Cidade | Brasil | `site.ts` → `local` |

### Redes sociais

Cada rede em `site.ts` tem quatro campos:

```js
{ nome: 'Instagram', url: 'https://instagram.com/marianacorrea.co', handle: '@marianacorrea.co', pendente: false }
```

- `nome` — o rótulo.
- `url` — o endereço completo, com `https://`.
- `handle` — o usuário mostrado no rodapé.
- `pendente: true` — esconde a rede do site inteiro. É o caso do **Behance** hoje:
  ele não aparece em lugar nenhum enquanto não tiver um endereço real. Ao receber
  a URL, troque o `url`, o `handle` e mude para `pendente: false`.

---

## 8. Imagens de compartilhamento (WhatsApp, LinkedIn, Instagram)

São as imagens que aparecem quando alguém cola o link em algum lugar.

- Sempre **1200 × 630 px** e sempre em **`.jpg`** (WebP não funciona no
  WhatsApp nem no LinkedIn).
- Do site inteiro: `public/img/og.jpg`.
- De cada projeto: `public/img/projetos/<projeto>-og.jpg`.
- Se um projeto não tiver a sua, ele usa a do site.
- Deixe o assunto no centro: cada rede recorta de um jeito.
- Depois de trocar, o WhatsApp guarda a imagem antiga por um tempo. Para forçar a
  atualização, use o [Sharing Debugger](https://developers.facebook.com/tools/debug/)
  e o [Post Inspector](https://www.linkedin.com/post-inspector/).

---

## 9. Checklist antes de publicar

- [ ] Imagens em WebP, no tamanho da tabela da seção 2, abaixo de 300 KB
- [ ] Nome dos arquivos sem acento, espaço ou maiúscula
- [ ] Todo `alt` de imagem preenchido
- [ ] `og.jpg` gerado para projeto novo, em 1200 × 630
- [ ] Texto da seção Sobre igual na home e em `/sobre`
- [ ] `ano` e `resumo` entre aspas nos arquivos de projeto
- [ ] Acentos conferidos (Corrêa, estratégia, negócio)
- [ ] Site aberto no celular e no computador depois de publicar
