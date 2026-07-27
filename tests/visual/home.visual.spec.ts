import path from 'node:path';

import { expect, test } from '../../src/fixtures/test';

const visualSnapshotStyles = path.join(process.cwd(), 'tests/visual/visual-snapshot.css');

test.use({ viewport: { width: 1280, height: 720 } });

test.describe('home product visuals', { tag: '@visual' }, () => {
  test.beforeEach(async ({ app, page }) => {
    await app.home.open();
    await page.evaluate(async () => document.fonts.ready);
  });

  test('Almanac product card matches the reviewed visual baseline', async ({ app }) => {
    await expect(app.home.almanacImage).toBeVisible();
    await expect(app.home.almanacImage).toHaveJSProperty('complete', true);

    await expect(app.home.almanacRegion).toHaveScreenshot('almanac-product-card.png', {
      stylePath: visualSnapshotStyles,
    });
  });

  test('Tarot product card matches the reviewed visual baseline', async ({ app }) => {
    await expect(app.home.tarotImage).toBeVisible();
    await expect(app.home.tarotImage).toHaveJSProperty('complete', true);

    await expect(app.home.tarotRegion).toHaveScreenshot('tarot-product-card.png', {
      stylePath: visualSnapshotStyles,
    });
  });
});
