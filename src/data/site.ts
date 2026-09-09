export const site = {
  nome: 'Mariana Corrêa',
  marca: 'M//C',
  papel: 'Estrategista de Marcas | Publicitária | Direção Criativa',
  papelSeo: 'Estrategista de Marcas e Direção Criativa',
  descricao:
    'Estrategista de marcas, publicitária e diretora de arte. Há mais de 6 anos transformando objetivos de negócio em soluções criativas, consistentes e relevantes.',
  url: import.meta.env.SITE.replace(/\/$/, ''),
  email: 'mariana.branddesigner@gmail.com',
  telefone: '',
  local: 'Brasil',
  og: {
    imagem: '/img/og.jpg',
    largura: 1200,
    altura: 630,
    tipo: 'image/jpeg',
    alt: 'Portfólio de Mariana Corrêa — estrategista de marcas, publicitária e direção criativa',
  },
  redes: [
    {
      nome: 'Instagram',
      url: 'https://instagram.com/marianacorrea.co',
      handle: '@marianacorrea.co',
      pendente: false,
    },
    {
      nome: 'LinkedIn',
      url: 'https://linkedin.com/in/mariana-correa20/',
      handle: 'in/mariana-correa20/',
      pendente: false,
    },
    { nome: 'Behance', url: 'https://behance.net/', handle: 'behance.net', pendente: true },
  ],
};

export const redesPublicadas = site.redes.filter((rede) => !rede.pendente);

export const navegacao = [
  { rotulo: 'Início', href: '/' },
  { rotulo: 'Projetos', href: '/projetos' },
  { rotulo: 'Sobre', href: '/sobre' },
  { rotulo: 'Contato', href: '/#contato' },
];

export const servicos = [
  {
    numero: '01',
    titulo: 'Branding',
    descricao:
      'Definição de posicionamento, promessa e diferenciais a partir do negócio e do público. É a etapa que decide o que a marca vai dizer, antes de decidir como ela vai parecer.',
    itens: ['Diagnóstico e imersão', 'Posicionamento', 'Arquitetura de marca', 'Estratégia'],
  },
  {
    numero: '02',
    titulo: 'Identidade Visual',
    descricao:
      'Símbolo, tipografia, cores e aplicações. A tradução da estratégia em uma expressão própria.',
    itens: ['Logotipo e símbolo', 'Sistema visual', 'Manual de marca', 'Aplicações'],
  },
  {
    numero: '03',
    titulo: 'Direção Criativa',
    descricao:
      'Condução criativa de campanhas institucionais e comerciais: conceito, referências visuais, direção de fotografia e acompanhamento da execução até a entrega.',
    itens: ['Conceito de campanha', 'Direção de fotografia', 'Key visuals', 'Social e digital'],
  },
  {
    numero: '04',
    titulo: 'Naming',
    descricao:
      'Nomes que dão significado e direção a marca. Pesquisa, estratégia de naming, territórios conceituais e desenvolvimento de nomes.',
    itens: ['Nomes', 'Personalidade', 'Significados', 'Conceitos'],
  },
];

export const numeros = [
  { valor: '6+', rotulo: 'anos de experiência' },
  { valor: '40+', rotulo: 'marcas desenvolvidas' },
  { valor: '10+', rotulo: 'segmentos explorados' },
];
