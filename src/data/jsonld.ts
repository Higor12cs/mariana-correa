import { redesPublicadas, servicos, site } from './site';

const absoluta = (caminho: string) => new URL(caminho, site.url).href;

export const pessoa = {
  '@type': 'Person',
  '@id': `${site.url}/#mariana`,
  name: site.nome,
  jobTitle: site.papelSeo,
  description: site.descricao,
  url: site.url,
  email: `mailto:${site.email}`,
  image: absoluta('/img/mariana-retrato.webp'),
  address: { '@type': 'PostalAddress', addressCountry: 'BR' },
  knowsAbout: servicos.map((servico) => servico.titulo),
  ...(redesPublicadas.length ? { sameAs: redesPublicadas.map((rede) => rede.url) } : {}),
};

export const website = {
  '@type': 'WebSite',
  '@id': `${site.url}/#site`,
  url: site.url,
  name: site.nome,
  inLanguage: 'pt-BR',
  description: site.descricao,
  publisher: { '@id': pessoa['@id'] },
};

export const grafoBase = (nos: Record<string, unknown>[]) => [
  { '@context': 'https://schema.org', '@graph': nos },
];

export const trilha = (itens: { nome: string; url: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: itens.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.nome,
    item: absoluta(item.url),
  })),
});

export const projetoComoObra = (dados: {
  titulo: string;
  resumo: string;
  ano: string;
  segmento: string;
  servicos: string[];
  capa: string;
  url: string;
}) => ({
  '@type': 'CreativeWork',
  '@id': `${absoluta(dados.url)}#obra`,
  name: dados.titulo,
  headline: dados.titulo,
  description: dados.resumo,
  url: absoluta(dados.url),
  image: absoluta(dados.capa),
  inLanguage: 'pt-BR',
  dateCreated: dados.ano,
  genre: dados.segmento,
  keywords: dados.servicos.join(', '),
  creator: { '@id': pessoa['@id'] },
  isPartOf: { '@id': website['@id'] },
});
