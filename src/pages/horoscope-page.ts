import { expect, test, type Locator, type Page } from '@playwright/test';

import type { ZodiacSign } from '../test-data/zodiac-signs';

export class HoroscopePage {
  readonly backToAllSignsLink: Locator;

  constructor(private readonly page: Page) {
    this.backToAllSignsLink = page.getByRole('link', { name: '← All signs' });
  }

  async open(sign: ZodiacSign): Promise<void> {
    await test.step(`Open the ${sign.name} daily forecast`, async () => {
      await this.page.goto(`/horoscope/${sign.slug}`);
    });
  }

  async expectLoaded(sign: ZodiacSign): Promise<void> {
    await test.step(`Verify the ${sign.name} forecast contract`, async () => {
      await expect(this.page).toHaveURL(new RegExp(`/horoscope/${sign.slug}/?$`));
      await expect(this.page.getByRole('heading', { level: 1, name: sign.name })).toBeVisible();
      await expect(this.page.getByText(sign.dateRange, { exact: true })).toBeVisible();
      await expect(this.backToAllSignsLink).toHaveAttribute('href', '/today');
      await expect(
        this.page.getByRole('complementary', {
          name: `Subscribe to daily horoscope (${sign.name})`,
        }),
      ).toBeVisible();
    });
  }
}
