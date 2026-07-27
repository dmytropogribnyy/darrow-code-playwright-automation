# Known product issues

This register keeps accepted live-product findings visible without weakening the gate for new
regressions. A finding is baseline-eligible only when its rule and affected markup are matched
precisely. Broad rule exclusions are not allowed.

| ID          | Area            | Finding                                                                 | CI behavior                                               |
| ----------- | --------------- | ----------------------------------------------------------------------- | --------------------------------------------------------- |
| DC-A11Y-001 | Testimonials    | Star-rating `div` elements expose `aria-label` without a semantic role. | Attach evidence; fail if any other axe violation appears. |
| DC-A11Y-002 | Product catalog | Three text elements do not meet WCAG AA minimum color contrast.         | Attach evidence; fail if any other axe violation appears. |

## DC-A11Y-001

axe-core reports `aria-prohibited-attr` for testimonial rating containers whose markup includes
`aria-label="5 out of 5 stars"` on a generic `div`. The production fix is to expose an appropriate
semantic role or move the accessible label to an element that permits it.

The test baseline matches both the axe rule and the exact markup signature. Once the product fix is
deployed, the exception disappears naturally. It cannot hide the same rule on unrelated elements.

## DC-A11Y-002

axe-core reports `color-contrast` for the two sample links using `#8B6914` on `#F4EDD9`
(`4.35:1`, below the required `4.5:1`) and the chapter-description text using `#9CA3AF` on
`#F4EDD9` (`2.17:1`).

The baseline accepts this rule only when every affected node matches one of those three exact
content signatures. A contrast regression anywhere else remains an unexpected violation and fails
CI.
