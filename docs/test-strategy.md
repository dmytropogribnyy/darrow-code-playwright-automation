# Test strategy

## Goal

Provide fast, trustworthy release evidence for the public Darrow Code customer experience while
keeping production tests read-only and free from customer, payment, email, or AI-generation side
effects.

## Test layers

| Layer         | Purpose                                                      | Current example                                |
| ------------- | ------------------------------------------------------------ | ---------------------------------------------- |
| API contract  | Verify public service and asset boundaries without a browser | Build, SEO/security, robots, sitemap, PDF      |
| UI smoke      | Prove critical public navigation in every browser engine     | Horoscope and sample-catalog journeys          |
| Integration   | Make an external dependency deterministic and observable     | Mocked NOAA Kp response rendered in the header |
| Resilience    | Prove external-service failures degrade safely               | NOAA outage with empty and stale caches        |
| End to end    | Exercise real journeys to a safe or public completion point  | CORE intake boundary and 24-page sample reader |
| Accessibility | Detect common WCAG A/AA issues on the principal content      | axe-core scan of the home page                 |
| Visual        | Detect unintended high-value component presentation drift    | Almanac and Tarot product cards                |
| Mobile        | Verify a representative handset layout and overflow guard    | Pixel 7 project                                |

## Fixture model

- `DarrowApp` supplies page objects, component objects, and domain flows to browser tests.
- `PublicApi` supplies typed public-contract operations to API tests without creating a browser.
- The auto production-safety fixture records same-origin requests and fails any public production
  test that attempts `POST`, `PUT`, `PATCH`, or `DELETE`.
- Built-in Playwright contexts preserve per-test isolation; shared setup uses a local `beforeEach`
  only when every test in a focused group needs the same starting page.
- Multi-page journeys return a new page object for the popup instead of rebinding the original
  fixture page.
- One typed zodiac dataset feeds 12 independently reported route checks without duplicating test
  logic.

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

## Accessibility baseline

New axe-core WCAG A/AA violations fail CI. A currently known live-product issue is retained through
a narrowly matched baseline and emitted as a report annotation plus JSON evidence. The baseline
must match the rule and exact affected markup; entire axe rules are never disabled. See the
[known-product issue register](known-product-issues.md).

## Visual baseline

Visual checks target two product regions rather than a full dynamic page. A fixed 1280×720 viewport,
light color scheme, loaded web fonts/images, disabled motion, hidden notification overlays, and CSS
pixel scaling reduce environmental noise. The 1% pixel-ratio tolerance is intentionally narrow:
copy, layout, imagery, or pricing changes still require review and an explicit baseline update.

## CI policy

- Pull requests: typecheck, lint, formatting, API contracts, and tagged Chromium smoke.
- Main: the fast quality gate plus the full browser, mobile, integration, end-to-end, and
  accessibility suite.
- Scheduled: the same full suite runs daily to detect browser-engine or live-product drift.
- Failure evidence: trace on first retry, screenshot on failure, retained failure video, HTML and
  JUnit reports.

Retries produce diagnostic evidence; they never convert a flaky failure into an accepted result.

The current suite is intentionally too small to benefit from distributed sharding. When execution
time becomes material, the full workflow can move to a shard matrix with blob reports and a merged
HTML report without changing test architecture.
