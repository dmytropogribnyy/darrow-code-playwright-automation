import { expect, test } from '../../src/fixtures/test';

test.describe('standalone product intake boundaries', { tag: ['@e2e', '@production-safe'] }, () => {
  test('Almanac reaches its disabled checkout boundary with empty fields', async ({ app }) => {
    await app.almanacIntakeFlow.openWithoutSubmittingCustomerData();

    await expect(app.almanacIntake.firstNameInput).toHaveValue('');
    await expect(app.almanacIntake.emailInput).toHaveValue('');
    await expect(app.almanacIntake.confirmEmailInput).toHaveValue('');
    await expect(app.almanacIntake.eventLocationInput).toHaveValue('');
    await expect(app.almanacIntake.checkoutButton).toBeDisabled();

    await app.almanacIntake.closeButton.click();
    await expect(app.almanacIntake.root).toBeHidden();
  });

  test('Tarot reaches its question boundary without entering or submitting data', async ({
    app,
  }) => {
    await app.tarotIntakeFlow.openWithoutSubmittingCustomerData();

    await expect(app.tarotIntake.firstNameInput).toHaveValue('');
    await expect(app.tarotIntake.emailInput).toHaveValue('');
    await expect(app.tarotIntake.questionInput).toHaveValue('');

    await app.tarotIntake.closeButton.click();
    await expect(app.tarotIntake.root).toBeHidden();
  });
});
