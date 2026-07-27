import { test as base } from '@playwright/test';

import { PublicApi } from '../api/public-api';

type ApiFixtures = {
  publicApi: PublicApi;
};

export const test = base.extend<ApiFixtures>({
  publicApi: async ({ request }, use) => {
    await use(new PublicApi(request));
  },
});

export { expect } from '@playwright/test';
