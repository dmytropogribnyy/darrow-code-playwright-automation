import { expect, test } from '../../src/fixtures/test';

test.describe('public sample experience', { tag: '@ui' }, () => {
  test.beforeEach(async ({ app }) => {
    await app.sample.open();
  });

  test(
    'publishes the CORE reader and all focused chapter samples',
    { tag: '@smoke' },
    async ({ app }) => {
      await expect(app.sample.chapterSampleLinks).toHaveCount(6);
    },
  );

  test('opens the complete 24-page CORE sample reader', async ({ app }) => {
    const sampleReader = await app.sampleReport.openCoreReader();

    await expect(sampleReader.pages).toHaveCount(24);
    await expect(sampleReader.downloadLink).toHaveAttribute(
      'href',
      '/samples/darrow-code-core-sample.pdf',
    );
  });
});
