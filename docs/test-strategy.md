# Test strategy

## Goal

Provide fast, trustworthy release evidence for the public Darrow Code customer experience while
keeping production tests read-only and free from customer, payment, email, or AI-generation side
effects.

## Test layers

| Layer         | Purpose                                                      | Current example                                |
| ------------- | ------------------------------------------------------------ | ---------------------------------------------- |
| API contract  | Verify public service and asset boundaries without a browser | Build sentinel, sitemap, sample PDF            |
| UI smoke      | Prove critical public navigation in every browser engine     | Storefront → Daily Horoscope                   |
| Integration   | Make an external dependency deterministic and observable     | Mocked NOAA Kp response rendered in the header |
| End to end    | Exercise the real customer journey to its safe boundary      | Select CORE → open intake → stop before submit |
| Accessibility | Detect common WCAG A/AA issues on the principal content      | axe-core scan of the home page                 |
| Mobile        | Verify a representative handset layout and overflow guard    | Pixel 7 project                                |

## Production safety boundary

The default target is `https://darrowcode.com`. Tests may read public pages, public APIs, and public
sample PDFs. They may select products and open the intake form, but they must not:

- submit names, email addresses, birth data, or Tarot questions;
- create Stripe sessions or purchases;
- trigger report generation, PDF delivery, or outbound email;
- access account, protected report, administration, or customer-data routes;
- call paid AI providers.

Any future test that crosses this boundary must use an explicitly isolated non-production
environment, synthetic test identities, idempotent setup, and verified cleanup.

## Selector policy

Prefer user-visible contracts in this order:

1. accessible role and name;
2. associated label or stable test id;
3. stable public attribute.

CSS structure, XPath, positional selection, fixed sleeps, and force clicks are rejected by linting
or review.

## CI policy

- Pull requests: typecheck, lint, formatting, API contracts, and Chromium smoke.
- Main: the same quality gate after merge.
- Nightly: full browser, mobile, integration, end-to-end, and accessibility suite.
- Failure evidence: trace on first retry, screenshot on failure, retained failure video, HTML and
  JUnit reports.

Retries produce diagnostic evidence; they never convert a flaky failure into an accepted result.
