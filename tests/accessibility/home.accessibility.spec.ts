import AxeBuilder from '@axe-core/playwright';

import { expect, test } from '../../src/fixtures/test';

test.describe('accessibility', { tag: '@a11y' }, () => {
  test('has no unexpected WCAG A/AA violations in main content', async ({ app, page }) => {
    await app.home.open();

    const results = await new AxeBuilder({ page })
      .include('main')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    const knownProductViolations = results.violations.filter(
      (violation) =>
        violation.id === 'aria-prohibited-attr' &&
        violation.nodes.every((node) => node.html.includes('aria-label="5 out of 5 stars"')),
    );
    const unexpectedViolations = results.violations.filter(
      (violation) => !knownProductViolations.includes(violation),
    );

    test.info().annotations.push({
      type: 'known-product-issue-baseline',
      description: 'DC-A11Y-001: testimonial rating labels require a semantic role.',
    });
    await test.info().attach('known-product-accessibility-violations', {
      body: Buffer.from(JSON.stringify(knownProductViolations, null, 2)),
      contentType: 'application/json',
    });

    expect(unexpectedViolations).toEqual([]);
  });
});
