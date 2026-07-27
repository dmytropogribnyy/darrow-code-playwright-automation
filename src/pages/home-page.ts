import { expect, test, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly heroHeading: Locator;
  readonly productSelectorHeading: Locator;
  readonly coreReportCard: Locator;
  readonly continueToIntakeButton: Locator;

  constructor(private readonly page: Page) {
    this.heroHeading = page.getByRole('heading', {
      level: 1,
      name: 'Your zodiac sign is only the surface.',
    });
    this.productSelectorHeading = page.getByRole('heading', {
      level: 2,
      name: 'Choose Your Birth Chart Report',
    });
    this.coreReportCard = page.getByRole('button', {
      name: /FOUNDATION\s+CORE Report/,
    });
    this.continueToIntakeButton = page.getByRole('button', {
      name: 'Continue to enter your birth data',
    });
  }

  async open(): Promise<void> {
    await test.step('Open the Darrow Code home page', async () => {
      await this.page.goto('/');
      await this.expectLoaded();
    });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle(/AI Horoscope & Tarot Readings/);
    await expect(this.heroHeading).toBeVisible();
    await expect(this.productSelectorHeading).toBeVisible();
  }

  async selectCoreReport(): Promise<void> {
    await test.step('Select the CORE report', async () => {
      await this.coreReportCard.click();
      await expect(this.coreReportCard).toHaveAttribute('aria-pressed', 'true');
      await expect(this.continueToIntakeButton).toBeVisible();
    });
  }

  async openSelectedProductIntake(): Promise<void> {
    await test.step('Open the selected product intake', async () => {
      await this.continueToIntakeButton.click();
    });
  }
}
