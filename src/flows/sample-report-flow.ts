import { test } from '@playwright/test';

import type { SamplePage } from '../pages/sample-page';
import type { SampleReaderPage } from '../pages/sample-reader-page';

export class SampleReportFlow {
  constructor(
    private readonly samplePage: SamplePage,
    private readonly sampleReaderPage: SampleReaderPage,
  ) {}

  async openCoreReader(): Promise<void> {
    await test.step('Open the complete public CORE sample reader', async () => {
      await this.samplePage.open();
      await this.samplePage.openCoreReader();
      await this.sampleReaderPage.expectLoaded();
    });
  }
}
