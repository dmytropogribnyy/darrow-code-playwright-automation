import { expect, type Locator, type Page } from '@playwright/test';

export class SamplePage {
  readonly heading: Locator;
  readonly coreReaderLink: Locator;
  readonly chapterSampleLinks: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', {
      level: 1,
      name: 'What a CORE Report looks like',
    });
    this.coreReaderLink = page.getByRole('link', {
      name: 'Read the full CORE sample →',
    });
    this.chapterSampleLinks = page.locator(
      'main a[href^="/samples/darrow-code-"][href$="-sample.pdf#page=1"]',
    );
  }

  async open(): Promise<void> {
    await this.page.goto('/sample');
    await this.expectLoaded();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle('Sample Report — Darrow Code');
    await expect(this.heading).toBeVisible();
    await expect(this.coreReaderLink).toBeVisible();
  }

  async openCoreReader(): Promise<Page> {
    const readerPagePromise = this.page.waitForEvent('popup');

    await this.coreReaderLink.click();

    const readerPage = await readerPagePromise;
    await readerPage.waitForLoadState('domcontentloaded');

    return readerPage;
  }
}
