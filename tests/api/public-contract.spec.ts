import { expect, test } from '@playwright/test';

import { buildInfoSchema } from '../../src/contracts/build-info';

test.describe('public API and static contracts', () => {
  test('exposes a typed, non-cached build sentinel', async ({ request }) => {
    const response = await request.get('/api/public/build-info');

    expect(response.status()).toBe(200);
    expect(response.headers()['cache-control']).toContain('no-store');

    const payload: unknown = await response.json();
    const buildInfo = buildInfoSchema.parse(payload);

    expect(buildInfo.build_marker).not.toHaveLength(0);
    expect(buildInfo.anthropic_stream.first_event_timeout_active_ms).toBeGreaterThan(0);
  });

  test('publishes a public-only sitemap', async ({ request }) => {
    const response = await request.get('/sitemap.xml');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toMatch(/xml/);

    const sitemap = await response.text();
    expect(sitemap).toContain('<loc>https://darrowcode.com/</loc>');
    expect(sitemap).not.toContain('/admin');
    expect(sitemap).not.toContain('/result/');
  });

  test('serves a valid public sample PDF', async ({ request }) => {
    const response = await request.get('/samples/darrow-code-love-sample.pdf');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/pdf');

    const body = await response.body();
    expect(body.subarray(0, 5).toString()).toBe('%PDF-');
  });
});
