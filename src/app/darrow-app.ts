import type { Page } from '@playwright/test';

import { IntakeDialog } from '../components/intake-dialog';
import { SiteHeader } from '../components/site-header';
import { CoreIntakeFlow } from '../flows/core-intake-flow';
import { HomePage } from '../pages/home-page';

export class DarrowApp {
  readonly home: HomePage;
  readonly header: SiteHeader;
  readonly intake: IntakeDialog;
  readonly coreIntake: CoreIntakeFlow;

  constructor(page: Page) {
    this.home = new HomePage(page);
    this.header = new SiteHeader(page);
    this.intake = new IntakeDialog(page);
    this.coreIntake = new CoreIntakeFlow(this.home, this.intake);
  }
}
