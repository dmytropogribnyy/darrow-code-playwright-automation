import { expect, test } from '../../src/fixtures/test';

test.describe('CORE report journey', { tag: ['@e2e', '@production-safe'] }, () => {
  test('reaches the intake boundary without checkout or data submission', async ({ app }) => {
    await app.coreIntake.openWithoutSubmittingCustomerData();

    await expect(app.intake.checkoutButton).toContainText('$7.99');
    await app.intake.closeButton.click();
    await expect(app.intake.root).toBeHidden();
  });
});
