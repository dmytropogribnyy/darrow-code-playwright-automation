import { expect, test } from '../../src/fixtures/test';

const noaaKpEndpoint = 'https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json';

test.describe('external data integration', () => {
  test('renders a deterministic geomagnetic status from a mocked NOAA response', async ({
    app,
    page,
  }) => {
    let requestCount = 0;

    await page.route(noaaKpEndpoint, async (route) => {
      requestCount += 1;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          ['time_tag', 'Kp'],
          ['2026-07-27T20:00:00Z', '6'],
        ]),
      });
    });

    await app.home.open();

    await expect.poll(() => requestCount).toBe(1);
    await expect(page.getByLabel('Geomagnetic Kp index 6, Storm G2')).toBeVisible();
  });
});
