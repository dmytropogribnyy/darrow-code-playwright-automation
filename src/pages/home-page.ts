import { expect, test, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly heroHeading: Locator;
  readonly productSelectorHeading: Locator;
  readonly coreReportCard: Locator;
  readonly continueToIntakeButton: Locator;
  readonly almanacRegion: Locator;
  readonly almanacImage: Locator;
  readonly almanacIntakeButton: Locator;
  readonly tarotRegion: Locator;
  readonly tarotImage: Locator;
  readonly tarotIntakeButton: Locator;

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
    this.almanacRegion = page.getByRole('region', {
      name: 'ALMANAC — your best days, chosen for you',
    });
    this.almanacImage = this.almanacRegion.getByRole('img', {
      name: 'Moon phases and a zodiac wheel over a dawn horizon, with a golden path marking your best dates — Almanac',
    });
    this.almanacIntakeButton = this.almanacRegion.getByRole('button', {
      name: 'Create my almanac $4.99',
    });
    this.tarotRegion = page.getByRole('region', { name: 'Tarot Mirror' });
    this.tarotImage = this.tarotRegion.getByRole('img', {
      name: 'Three symbolic tarot cards under moon phases and golden celestial geometry.',
    });
    this.tarotIntakeButton = this.tarotRegion.getByRole('button', {
      name: 'Start Tarot Mirror — $3.99',
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

  async openAlmanacIntake(): Promise<void> {
    await test.step('Open the Almanac intake', async () => {
      await this.almanacIntakeButton.click();
    });
  }

  async openTarotIntake(): Promise<void> {
    await test.step('Open the Tarot Mirror intake', async () => {
      await this.tarotIntakeButton.click();
    });
  }
}
