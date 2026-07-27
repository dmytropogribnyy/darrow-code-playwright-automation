import type { Page } from '@playwright/test';

import { AlmanacIntakeDialog } from '../components/almanac-intake-dialog';
import { IntakeDialog } from '../components/intake-dialog';
import { SiteHeader } from '../components/site-header';
import { TarotIntakeDialog } from '../components/tarot-intake-dialog';
import { AlmanacIntakeFlow } from '../flows/almanac-intake-flow';
import { CoreIntakeFlow } from '../flows/core-intake-flow';
import { SampleReportFlow } from '../flows/sample-report-flow';
import { TarotIntakeFlow } from '../flows/tarot-intake-flow';
import { DailyHoroscopePage } from '../pages/daily-horoscope-page';
import { HomePage } from '../pages/home-page';
import { HoroscopePage } from '../pages/horoscope-page';
import { SamplePage } from '../pages/sample-page';

export class DarrowApp {
  readonly home: HomePage;
  readonly header: SiteHeader;
  readonly intake: IntakeDialog;
  readonly almanacIntake: AlmanacIntakeDialog;
  readonly tarotIntake: TarotIntakeDialog;
  readonly dailyHoroscope: DailyHoroscopePage;
  readonly horoscope: HoroscopePage;
  readonly sample: SamplePage;
  readonly coreIntake: CoreIntakeFlow;
  readonly almanacIntakeFlow: AlmanacIntakeFlow;
  readonly tarotIntakeFlow: TarotIntakeFlow;
  readonly sampleReport: SampleReportFlow;

  constructor(page: Page) {
    this.home = new HomePage(page);
    this.header = new SiteHeader(page);
    this.intake = new IntakeDialog(page);
    this.almanacIntake = new AlmanacIntakeDialog(page);
    this.tarotIntake = new TarotIntakeDialog(page);
    this.dailyHoroscope = new DailyHoroscopePage(page);
    this.horoscope = new HoroscopePage(page);
    this.sample = new SamplePage(page);
    this.coreIntake = new CoreIntakeFlow(this.home, this.intake);
    this.almanacIntakeFlow = new AlmanacIntakeFlow(this.home, this.almanacIntake);
    this.tarotIntakeFlow = new TarotIntakeFlow(this.home, this.tarotIntake);
    this.sampleReport = new SampleReportFlow(this.sample);
  }
}
