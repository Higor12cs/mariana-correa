import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const corpo = `User-agent: *
Allow: /

Sitemap: ${new URL('sitemap-index.xml', site)}
`;

  return new Response(corpo, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
