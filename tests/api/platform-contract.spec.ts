import { expect, test } from '../../src/fixtures/api-test';

type StructuredDataNode = {
  '@type'?: string;
  name?: string;
  url?: string;
};

function structuredDataNodes(html: string): StructuredDataNode[] {
  const documents = [
    ...html.matchAll(/<script type="application\/ld\+json">(.+?)<\/script>/gs),
  ].map(
    ([, payload]) =>
      JSON.parse(payload ?? '{}') as StructuredDataNode & {
        '@graph'?: StructuredDataNode[];
      },
  );

  return documents.flatMap((document) => document['@graph'] ?? [document]);
}

test.describe('public SEO and security contracts', { tag: ['@api', '@seo', '@security'] }, () => {
  test('publishes indexable metadata and structured organization data', async ({ publicApi }) => {
    const { response, body } = await publicApi.getHomePage();
    const nodes = structuredDataNodes(body);

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/html');
    expect(body).toContain('<title>AI Horoscope &amp; Tarot Readings | Darrow Code</title>');
    expect(body).toMatch(
      /<meta name="description" content="Private AI-powered horoscope, birth chart and Tarot readings/,
    );
    expect(body).not.toMatch(/<meta name="robots" content="[^"]*noindex/i);
    expect(nodes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          '@type': 'Organization',
          name: 'Darrow Code',
          url: 'https://darrowcode.com/',
        }),
        expect.objectContaining({
          '@type': 'WebSite',
          name: 'Darrow Code',
          url: 'https://darrowcode.com/',
        }),
      ]),
    );
  });

  test('serves transport hardening headers and crawler boundaries', async ({ publicApi }) => {
    const [{ response: homeResponse }, { response: robotsResponse, body: robots }] =
      await Promise.all([publicApi.getHomePage(), publicApi.getRobots()]);
    const headers = homeResponse.headers();

    expect(homeResponse.status()).toBe(200);
    expect(headers['strict-transport-security']).toContain('max-age=31536000');
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');

    expect(robotsResponse.status()).toBe(200);
    expect(robotsResponse.headers()['content-type']).toContain('text/plain');
    expect(robots).toContain('Allow: /');
    expect(robots).toContain('Disallow: /admin');
    expect(robots).toContain('Disallow: /account');
    expect(robots).toContain('Disallow: /result/');
    expect(robots).toContain('Sitemap: https://darrowcode.com/sitemap.xml');
  });
});
