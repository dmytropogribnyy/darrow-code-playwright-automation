import { expect, test } from '../../src/fixtures/test';

const noaaKpEndpoint = 'https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json';
const kpCacheKey = 'darrow.kp.v1';

test.describe('geomagnetic dependency resilience', { tag: '@resilience' }, () => {
  test('keeps the public journey usable when NOAA is unavailable and no cache exists', async ({
    app,
    page,
  }) => {
    let requestCount = 0;

    await page.addInitScript((cacheKey) => localStorage.removeItem(cacheKey), kpCacheKey);
    await page.route(noaaKpEndpoint, async (route) => {
      requestCount += 1;
      await route.fulfill({
        status: 503,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Service unavailable' }),
      });
    });

    await app.home.open();

    await expect.poll(() => requestCount).toBe(1);
    await expect(app.header.geomagneticStatus).toHaveCount(0);
    await expect(app.header.dailyHoroscopeLink).toBeVisible();
    await expect(app.header.sampleLink).toBeVisible();
  });

  test('retains a recent stale value when NOAA refresh fails', async ({ app, page }) => {
    let requestCount = 0;
    const cachedAt = Date.now() - 16 * 60 * 1000;

    await page.addInitScript(
      ({ cacheKey, fetchedAt }) => {
        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            kp: 4,
            label: 'Unsettled',
            tone: 'unsettled',
            fetchedAt,
          }),
        );
      },
      { cacheKey: kpCacheKey, fetchedAt: cachedAt },
    );
    await page.route(noaaKpEndpoint, async (route) => {
      requestCount += 1;
      await route.fulfill({
        status: 503,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Service unavailable' }),
      });
    });

    await app.home.open();

    await expect.poll(() => requestCount).toBe(1);
    await expect(app.header.geomagneticStatusFor(4, 'Unsettled')).toBeVisible();
  });
});
