const defaultBaseUrl = 'https://darrowcode.com';

function normalizeBaseUrl(value: string): string {
  const url = new URL(value);

  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error(`BASE_URL must use http or https, received ${url.protocol}`);
  }

  return url.toString().replace(/\/$/, '');
}

export const baseUrl = normalizeBaseUrl(process.env['BASE_URL'] ?? defaultBaseUrl);
