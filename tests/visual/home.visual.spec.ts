import path from 'node:path';

import type { Locator } from '@playwright/test';

import { expect, test } from '../../src/fixtures/test';

const visualSnapshotStyles = path.join(process.cwd(), 'tests/visual/visual-snapshot.css');

test.use({ viewport: { width: 1280, height: 720 } });

async function expectImageReady(image: Locator): Promise<void> {
  await image.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      image.evaluate(
        (element) =>
          (element as HTMLImageElement).complete && (element as HTMLImageElement).naturalWidth > 0,
      ),
    )
    .toBe(true);
}

test.describe('home product visuals', { tag: '@visual' }, () => {
  test.beforeEach(async ({ app, page }) => {
    await app.home.open();
    await page.evaluate(async () => document.fonts.ready);
  });

  test('Almanac product card matches the reviewed visual baseline', async ({ app }) => {
    await expectImageReady(app.home.almanacImage);

    await expect(app.home.almanacRegion).toHaveScreenshot('almanac-product-card.png', {
      stylePath: visualSnapshotStyles,
    });
  });

  test('Tarot product card matches the reviewed visual baseline', async ({ app }) => {
    await expectImageReady(app.home.tarotImage);

    await expect(app.home.tarotRegion).toHaveScreenshot('tarot-product-card.png', {
      stylePath: visualSnapshotStyles,
    });
  });
});
