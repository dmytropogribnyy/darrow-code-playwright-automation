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
        (violation.id === 'aria-prohibited-attr' &&
          violation.nodes.every((node) => node.html.includes('aria-label="5 out of 5 stars"'))) ||
        (violation.id === 'color-contrast' &&
          violation.nodes.every((node) =>
            [
              'href="/sample"',
              'href="/sample#chapters"',
              'Each chapter is its own private PDF.',
            ].some((signature) => node.html.includes(signature)),
          )),
    );
    const unexpectedViolations = results.violations.filter(
      (violation) => !knownProductViolations.includes(violation),
    );

    test.info().annotations.push({
      type: 'known-product-issue-baseline',
      description: 'DC-A11Y-001 and DC-A11Y-002: reviewed live-product accessibility findings.',
    });
    await test.info().attach('known-product-accessibility-violations', {
      body: Buffer.from(JSON.stringify(knownProductViolations, null, 2)),
      contentType: 'application/json',
    });

    expect(unexpectedViolations).toEqual([]);
  });
});
