import { expect, type Locator, type Page } from '@playwright/test';

export class SampleReaderPage {
  readonly pages: Locator;
  readonly downloadLink: Locator;
  readonly backToSampleLink: Locator;

  constructor(private readonly page: Page) {
    this.pages = page.locator('main img[alt^="CORE Report sample — page "]');
    this.downloadLink = page.getByRole('link', { name: 'Download PDF' });
    this.backToSampleLink = page.getByRole('link', { name: 'Back to sample' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle('Sample Reader — Darrow Code');
    await expect(this.backToSampleLink).toBeVisible();
  }
}
