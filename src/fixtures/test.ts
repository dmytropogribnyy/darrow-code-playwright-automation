import { expect, test as base, type Request } from '@playwright/test';

import { DarrowApp } from '../app/darrow-app';
import { baseUrl } from '../config/environment';

type DarrowFixtures = {
  app: DarrowApp;
  productionSafety: void;
};

export const test = base.extend<DarrowFixtures>({
  app: async ({ page }, use) => {
    await use(new DarrowApp(page));
  },
  productionSafety: [
    async ({ page }, use) => {
      const productionOrigin = new URL('https://darrowcode.com').origin;
      const targetOrigin = new URL(baseUrl).origin;
      const unsafeRequests: string[] = [];

      const recordUnsafeProductionRequest = (request: Request): void => {
        const method = request.method();
        const url = new URL(request.url());

        if (
          targetOrigin === productionOrigin &&
          url.origin === productionOrigin &&
          !['GET', 'HEAD', 'OPTIONS'].includes(method)
        ) {
          unsafeRequests.push(`${method} ${url.pathname}`);
        }
      };

      page.on('request', recordUnsafeProductionRequest);
      await use();
      page.off('request', recordUnsafeProductionRequest);

      expect(
        unsafeRequests,
        'Public production tests must remain read-only and side-effect free',
      ).toEqual([]);
    },
    { auto: true },
  ],
});

export { expect } from '@playwright/test';
