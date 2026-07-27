import { expect, type Locator, type Page } from '@playwright/test';

export class TarotIntakeDialog {
  readonly root: Locator;
  readonly firstNameInput: Locator;
  readonly emailInput: Locator;
  readonly questionInput: Locator;
  readonly checkoutButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.root = page.getByRole('dialog', { name: 'Ask your question' });
    this.firstNameInput = this.root.getByRole('textbox', {
      name: 'Your first name',
    });
    this.emailInput = this.root.getByRole('textbox', { name: 'you@example.com' });
    this.questionInput = this.root.getByRole('textbox', {
      name: 'What do you want clarity on?',
    });
    this.checkoutButton = this.root.getByRole('button', {
      name: 'Continue to checkout · $3.99',
    });
    this.closeButton = this.root.getByRole('button', { name: 'Close' });
  }

  async expectReadyForInput(): Promise<void> {
    await expect(this.root).toBeVisible();
    await expect(this.firstNameInput).toBeEditable();
    await expect(this.emailInput).toBeEditable();
    await expect(this.questionInput).toBeEditable();
    await expect(this.root.getByRole('button', { name: 'Decision / Crossroads' })).toBeVisible();
    await expect(this.checkoutButton).toBeVisible();
  }
}
