import { test } from '@playwright/test';

import type { HomePage } from '../pages/home-page';
import type { IntakeDialog } from '../components/intake-dialog';

export class CoreIntakeFlow {
  constructor(
    private readonly homePage: HomePage,
    private readonly intakeDialog: IntakeDialog,
  ) {}

  async openWithoutSubmittingCustomerData(): Promise<void> {
    await test.step('Reach the CORE intake boundary without checkout', async () => {
      await this.homePage.open();
      await this.homePage.selectCoreReport();
      await this.homePage.openSelectedProductIntake();
      await this.intakeDialog.expectReadyForInput();
    });
  }
}
