import { test as base } from '@playwright/test';

import { DarrowApp } from '../app/darrow-app';

type DarrowFixtures = {
  app: DarrowApp;
};

export const test = base.extend<DarrowFixtures>({
  app: async ({ page }, use) => {
    await use(new DarrowApp(page));
  },
});

export { expect } from '@playwright/test';
