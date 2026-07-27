import { expect, test } from '../../src/fixtures/test';

test.describe('mobile storefront', () => {
  test('keeps the primary experience visible without horizontal overflow', async ({
    app,
    page,
  }) => {
    await app.home.open();

    await expect(app.home.heroHeading).toBeVisible();
    await expect(app.home.productSelectorHeading).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(hasHorizontalOverflow).toBe(false);
  });
});
