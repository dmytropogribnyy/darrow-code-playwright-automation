import { expect, test } from '../../src/fixtures/test';

test.describe('public navigation', () => {
  test(
    'loads the product storefront and opens Daily Horoscope',
    { tag: ['@smoke', '@ui'] },
    async ({ app }) => {
      await app.home.open();
      await expect(app.header.sampleLink).toBeVisible();

      await app.header.openDailyHoroscope();
      await app.dailyHoroscope.expectLoaded();
    },
  );
});
