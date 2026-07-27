import { expect, type Locator, type Page } from '@playwright/test';

export class AlmanacIntakeDialog {
  readonly root: Locator;
  readonly firstNameInput: Locator;
  readonly emailInput: Locator;
  readonly confirmEmailInput: Locator;
  readonly eventLocationInput: Locator;
  readonly checkoutButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.root = page.getByRole('dialog', { name: 'Create your Almanac' });
    this.firstNameInput = this.root.getByRole('textbox', {
      name: 'Your first name',
    });
    this.emailInput = this.root.getByRole('textbox', { name: 'you@example.com' });
    this.confirmEmailInput = this.root.getByRole('textbox', {
      name: 'Re-type your email',
    });
    this.eventLocationInput = this.root.getByRole('combobox', {
      name: 'City where it will take place',
    });
    this.checkoutButton = this.root.getByRole('button', {
      name: 'Continue to checkout $4.99',
    });
    this.closeButton = this.root.getByRole('button', { name: 'Close' });
  }

  async expectReadyForInput(): Promise<void> {
    await expect(this.root).toBeVisible();
    await expect(this.firstNameInput).toBeEditable();
    await expect(this.emailInput).toBeEditable();
    await expect(this.confirmEmailInput).toBeEditable();
    await expect(this.eventLocationInput).toBeEditable();
    await expect(this.root.getByRole('checkbox', { name: 'Wedding day' })).toBeVisible();
    await expect(this.checkoutButton).toBeDisabled();
  }
}
