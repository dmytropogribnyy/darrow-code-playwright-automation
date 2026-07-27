import { expect, test } from '../../src/fixtures/test';

test.describe('public navigation', () => {
  test('loads the product storefront and opens Daily Horoscope @smoke', async ({ app, page }) => {
    await app.home.open();
    await expect(app.header.sampleLink).toBeVisible();

    await app.header.openDailyHoroscope();

    await expect(page).toHaveTitle(/Free Daily Horoscope by Zodiac Sign/);
    await expect(page.getByRole('heading', { level: 1, name: "Today's Sky" })).toBeVisible();
    await expect(page.getByRole('link', { name: /Aries/ })).toHaveAttribute(
      'href',
      '/horoscope/aries',
    );
  });
});
