import type { Page } from '@playwright/test';

import { IntakeDialog } from '../components/intake-dialog';
import { SiteHeader } from '../components/site-header';
import { CoreIntakeFlow } from '../flows/core-intake-flow';
import { SampleReportFlow } from '../flows/sample-report-flow';
import { DailyHoroscopePage } from '../pages/daily-horoscope-page';
import { HomePage } from '../pages/home-page';
import { SamplePage } from '../pages/sample-page';
import { SampleReaderPage } from '../pages/sample-reader-page';

export class DarrowApp {
  readonly home: HomePage;
  readonly header: SiteHeader;
  readonly intake: IntakeDialog;
  readonly dailyHoroscope: DailyHoroscopePage;
  readonly sample: SamplePage;
  readonly sampleReader: SampleReaderPage;
  readonly coreIntake: CoreIntakeFlow;
  readonly sampleReport: SampleReportFlow;

  constructor(page: Page) {
    this.home = new HomePage(page);
    this.header = new SiteHeader(page);
    this.intake = new IntakeDialog(page);
    this.dailyHoroscope = new DailyHoroscopePage(page);
    this.sample = new SamplePage(page);
    this.sampleReader = new SampleReaderPage(page);
    this.coreIntake = new CoreIntakeFlow(this.home, this.intake);
    this.sampleReport = new SampleReportFlow(this.sample, this.sampleReader);
  }
}
