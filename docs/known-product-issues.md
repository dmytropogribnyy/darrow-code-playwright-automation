# Known product issues

This register keeps accepted live-product findings visible without weakening the gate for new
regressions. A finding is baseline-eligible only when its rule and affected markup are matched
precisely. Broad rule exclusions are not allowed.

| ID          | Area         | Finding                                                                 | CI behavior                                               |
| ----------- | ------------ | ----------------------------------------------------------------------- | --------------------------------------------------------- |
| DC-A11Y-001 | Testimonials | Star-rating `div` elements expose `aria-label` without a semantic role. | Attach evidence; fail if any other axe violation appears. |

## DC-A11Y-001

axe-core reports `aria-prohibited-attr` for testimonial rating containers whose markup includes
`aria-label="5 out of 5 stars"` on a generic `div`. The production fix is to expose an appropriate
semantic role or move the accessible label to an element that permits it.

The test baseline matches both the axe rule and the exact markup signature. Once the product fix is
deployed, the exception disappears naturally. It cannot hide the same rule on unrelated elements.
