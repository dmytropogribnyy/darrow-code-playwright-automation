import { expect, test } from '../../src/fixtures/api-test';

test.describe('public API and static contracts', { tag: '@api' }, () => {
  test('exposes a typed, non-cached build sentinel', async ({ publicApi }) => {
    const { response, body } = await publicApi.getBuildInfo();

    expect(response.status()).toBe(200);
    expect(response.headers()['cache-control']).toContain('no-store');
    expect(body.build_marker).not.toHaveLength(0);
    expect(body.anthropic_stream.first_event_timeout_active_ms).toBeGreaterThan(0);
  });

  test('publishes a public-only sitemap', async ({ publicApi }) => {
    const { response, body } = await publicApi.getSitemap();

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toMatch(/xml/);
    expect(body).toContain('<loc>https://darrowcode.com/</loc>');
    expect(body).not.toContain('/admin');
    expect(body).not.toContain('/result/');
  });

  test('serves a valid public sample PDF', async ({ publicApi }) => {
    const { response, body } = await publicApi.getSamplePdf('love');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/pdf');
    expect(body.subarray(0, 5).toString()).toBe('%PDF-');
  });
});
