import { test } from '@playwright/test';

import type { TarotIntakeDialog } from '../components/tarot-intake-dialog';
import type { HomePage } from '../pages/home-page';

export class TarotIntakeFlow {
  constructor(
    private readonly homePage: HomePage,
    private readonly intakeDialog: TarotIntakeDialog,
  ) {}

  async openWithoutSubmittingCustomerData(): Promise<void> {
    await test.step('Reach the Tarot intake boundary without checkout', async () => {
      await this.homePage.open();
      await this.homePage.openTarotIntake();
      await this.intakeDialog.expectReadyForInput();
    });
  }
}
