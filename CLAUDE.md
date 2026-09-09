# marianacorrea.com.br

Portfólio da Mariana Corrêa. Astro 7 estático + Tailwind 4 + Lenis + GSAP.

## Leia primeiro

**[GUIA.md](./GUIA.md)** tem o contexto completo: identidade visual e tokens,
estrutura de pastas, como adicionar um projeto novo, como o sistema de animação
funciona e o que ainda é placeholder. Consulte antes de mexer em qualquer coisa.

**[CONTEUDO.md](./CONTEUDO.md)** é a especificação de imagens entregue à equipe da
cliente. Só tamanho, formato e enquadramento de imagem, em linguagem não técnica.
Atualize ao mudar convenção de imagem ou ao criar seção com imagem nova. Não
acrescente ali caminho de arquivo, trecho de código ou instrução de edição.

## Regras deste projeto

- **Não escreva comentários no código.** O contexto fica no GUIA.md.
- Tailwind 4 é configurado em CSS (`@theme` em `src/styles/global.css`). Não crie `tailwind.config.js`.
- Cores e fontes só via tokens do `@theme`. Nada de hex solto nos componentes.
- Conteúdo de projeto é markdown em `src/content/projetos/`. Não hardcode projeto em página.
- Textos institucionais e contato ficam em `src/data/site.ts`.
- Animação é declarativa por atributo (`data-reveal`, `data-cursor`, `data-parallax`...).
  A lógica toda vive em `src/scripts/motion.ts` — não espalhe `<script>` pelas páginas.
- Todo movimento novo precisa respeitar `prefers-reduced-motion`.
- O site é em português (pt-BR).

## Development

```
astro dev --background
```

Gerencie com `astro dev stop`, `astro dev status`, `astro dev logs`.
Valide com `npx astro check` e `npm run build` antes de entregar.

## Documentação

- https://docs.astro.build
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Fonts API](https://docs.astro.build/en/guides/fonts/)
- [Tailwind 4](https://tailwindcss.com/docs)
