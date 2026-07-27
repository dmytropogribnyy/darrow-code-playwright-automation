import { expect, type Locator, type Page } from '@playwright/test';

export class SiteHeader {
  readonly root: Locator;
  readonly dailyHoroscopeLink: Locator;
  readonly sampleLink: Locator;
  readonly geomagneticStatus: Locator;

  constructor(private readonly page: Page) {
    this.root = page.getByRole('banner');
    this.dailyHoroscopeLink = this.root.getByRole('link', {
      name: 'Daily Horoscope',
    });
    this.sampleLink = this.root.getByRole('link', {
      name: /See a sample/,
    });
    this.geomagneticStatus = this.root.getByLabel(/^Geomagnetic Kp index \d+, /);
  }

  geomagneticStatusFor(kp: number, label: string): Locator {
    return this.root.getByLabel(`Geomagnetic Kp index ${kp}, ${label}`);
  }

  async openDailyHoroscope(): Promise<void> {
    await expect(this.dailyHoroscopeLink).toBeVisible();
    await this.dailyHoroscopeLink.click();
    await expect(this.page).toHaveURL(/\/today$/);
  }
}
