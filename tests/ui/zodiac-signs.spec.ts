import { expect, test } from '../../src/fixtures/test';
import { zodiacSigns } from '../../src/test-data/zodiac-signs';

test.describe('zodiac forecast routes', { tag: ['@ui', '@data-driven'] }, () => {
  for (const sign of zodiacSigns) {
    test(`${sign.name} exposes its public daily forecast contract`, async ({ app }) => {
      await app.horoscope.open(sign);
      await app.horoscope.expectLoaded(sign);
      await expect(app.horoscope.backToAllSignsLink).toBeVisible();
    });
  }
});
