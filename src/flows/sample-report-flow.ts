import { test } from '@playwright/test';

import type { SamplePage } from '../pages/sample-page';
import { SampleReaderPage } from '../pages/sample-reader-page';

export class SampleReportFlow {
  constructor(private readonly samplePage: SamplePage) {}

  async openCoreReader(): Promise<SampleReaderPage> {
    return await test.step('Open the complete public CORE sample reader', async () => {
      await this.samplePage.open();
      const readerPage = await this.samplePage.openCoreReader();
      const sampleReader = new SampleReaderPage(readerPage);

      await sampleReader.expectLoaded();

      return sampleReader;
    });
  }
}
