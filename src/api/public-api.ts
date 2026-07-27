import type { APIRequestContext, APIResponse } from '@playwright/test';

import { buildInfoSchema, type BuildInfo } from '../contracts/build-info';

export type PublicSample = 'love' | 'money' | 'body' | 'year' | 'style' | 'place';

type JsonContract<T> = {
  response: APIResponse;
  body: T;
};

export class PublicApi {
  constructor(private readonly request: APIRequestContext) {}

  async getBuildInfo(): Promise<JsonContract<BuildInfo>> {
    const response = await this.request.get('/api/public/build-info');
    const payload: unknown = await response.json();

    return {
      response,
      body: buildInfoSchema.parse(payload),
    };
  }

  async getSitemap(): Promise<JsonContract<string>> {
    const response = await this.request.get('/sitemap.xml');

    return {
      response,
      body: await response.text(),
    };
  }

  async getHomePage(): Promise<JsonContract<string>> {
    const response = await this.request.get('/');

    return {
      response,
      body: await response.text(),
    };
  }

  async getRobots(): Promise<JsonContract<string>> {
    const response = await this.request.get('/robots.txt');

    return {
      response,
      body: await response.text(),
    };
  }

  async getSamplePdf(sample: PublicSample): Promise<JsonContract<Buffer>> {
    const response = await this.request.get(`/samples/darrow-code-${sample}-sample.pdf`);

    return {
      response,
      body: await response.body(),
    };
  }
}
