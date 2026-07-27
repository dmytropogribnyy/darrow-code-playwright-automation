import { test } from '@playwright/test';

import type { AlmanacIntakeDialog } from '../components/almanac-intake-dialog';
import type { HomePage } from '../pages/home-page';

export class AlmanacIntakeFlow {
  constructor(
    private readonly homePage: HomePage,
    private readonly intakeDialog: AlmanacIntakeDialog,
  ) {}

  async openWithoutSubmittingCustomerData(): Promise<void> {
    await test.step('Reach the Almanac intake boundary without checkout', async () => {
      await this.homePage.open();
      await this.homePage.openAlmanacIntake();
      await this.intakeDialog.expectReadyForInput();
    });
  }
}
