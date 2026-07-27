import AxeBuilder from '@axe-core/playwright';

import { expect, test } from '../../src/fixtures/test';

test.describe('accessibility', { tag: '@a11y' }, () => {
  test('has no automatically detectable WCAG A/AA violations in main content', async ({
    app,
    page,
  }) => {
    await app.home.open();

    const results = await new AxeBuilder({ page })
      .include('main')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });
});
