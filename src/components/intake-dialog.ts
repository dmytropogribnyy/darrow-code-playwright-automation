import { expect, type Locator, type Page } from '@playwright/test';

export class IntakeDialog {
  readonly root: Locator;
  readonly firstNameInput: Locator;
  readonly emailInput: Locator;
  readonly confirmEmailInput: Locator;
  readonly dateOfBirthInput: Locator;
  readonly birthCityInput: Locator;
  readonly checkoutButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.root = page.getByRole('dialog');
    this.firstNameInput = this.root.getByLabel('First name');
    this.emailInput = this.root.getByLabel('Email', { exact: true });
    this.confirmEmailInput = this.root.getByLabel('Confirm email');
    this.dateOfBirthInput = this.root.getByLabel('Date of birth');
    this.birthCityInput = this.root.getByLabel('Birth city + country');
    this.checkoutButton = this.root.getByRole('button', {
      name: /Unlock My CORE Report/,
    });
    this.closeButton = this.root.getByRole('button', { name: 'Close' });
  }

  async expectReadyForInput(): Promise<void> {
    await expect(this.root).toBeVisible();
    await expect(this.firstNameInput).toBeEditable();
    await expect(this.emailInput).toBeEditable();
    await expect(this.confirmEmailInput).toBeEditable();
    await expect(this.dateOfBirthInput).toBeEditable();
    await expect(this.birthCityInput).toBeEditable();
    await expect(this.checkoutButton).toBeVisible();
  }
}
