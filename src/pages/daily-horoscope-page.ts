import { expect, type Locator, type Page } from '@playwright/test';

export class DailyHoroscopePage {
  readonly heading: Locator;
  readonly ariesForecastLink: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', {
      level: 1,
      name: "Today's Sky",
    });
    this.ariesForecastLink = page.locator('a[href="/horoscope/aries"]');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle(/Free Daily Horoscope by Zodiac Sign/);
    await expect(this.heading).toBeVisible();
    await expect(this.ariesForecastLink).toBeVisible();
  }
}
