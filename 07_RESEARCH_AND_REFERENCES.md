# PESU Academy Styles — Research Notes and References

**Research snapshot:** 6 November 2026. Browser APIs, store rules and competitor listings can change; re-check before implementation and release.

## 1. Competitive context: PESU-MAX

The existing PESU-MAX extension is directly relevant and makes it important not to position this product as the first theme/dark-mode extension.

- Firefox Add-ons listing describes PESU-MAX as an extension to make PESU Academy easier to use. The listing describes parallel slide downloads, attendance calculation, SGPA and CGPA calculation. The listing page returned version 3.0.6 and an update date of 2 October 2026 when reviewed. It lists access to PESU Academy and other hosts, and states developer-reported data categories including authentication information, personally identifying information and website content. This is the listing's disclosure, not an independent audit of the extension's code or behavior.
  - https://addons.mozilla.org/en-US/firefox/addon/pesu-max/
- A PESU community Reddit post dated 6 October 2026 describes an appearance update including themes/colours, fonts, better icons and a better material table. Student replies discuss usability issues and follow-up fixes. This is useful community evidence, not a complete technical inventory.
  - https://www.reddit.com/r/PESU/comments/1wyxadr/pesu_max_appearance_update/
- A third-party plugin-statistics page reported Chrome listing observations around 2 November 2026. Treat third-party user-count estimates as approximate and not as verified adoption metrics.
  - https://www.pluginstats.com/plugins/chrome/pesu-max

**Positioning implication:** PESU Academy Styles should compete on comprehensive theme-pack quality, consistent page coverage, live preview/revert, per-page appearance, accessibility, careful CSS scope and local-first privacy. It should not copy PESU-MAX's calculator, downloader or academic utility scope.

## 2. Official technical references

### WXT

- WXT describes support for Chrome, Firefox, Edge, Safari and Chromium-based browsers, and support for MV2/MV3 build targets.
  - https://wxt.dev/
- WXT browser-target guide explains separate browser builds using `wxt -b chrome` and `wxt -b firefox`, and notes default manifest-version behavior by target. Do not rely on defaults without inspecting generated manifests.
  - https://wxt.dev/guide/essentials/target-different-browsers.html
- WXT manifest configuration guide explains generated manifests and per-browser permission configuration.
  - https://wxt.dev/guide/essentials/config/manifest.html
- WXT entrypoints guide describes background entrypoints and generated background output.
  - https://wxt.dev/guide/essentials/entrypoints

### Chrome extensions

- Content scripts: https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts
- Permissions declaration: https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions
- Manifest V3 overview: https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3

### Mozilla / Firefox WebExtensions

- Content scripts, isolated worlds and limits: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts
- Manifest content_scripts: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/content_scripts
- Scripting API: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/scripting
- Storage API: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage
- Background manifest behavior: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/background
- Extension CSP: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_Security_Policy

**Important browser detail:** MDN currently documents that Chrome uses `background.service_worker` for Manifest V3, while Firefox does not support that property and uses background scripts/event pages. Cross-browser Manifest V3 support may require both `scripts` and `service_worker` declarations or target-specific generated manifests. Verify WXT output and real-browser behavior before selecting the final strategy.

## 3. Privacy and safety design implications

- Request only the target portal's verified host permission.
- Use extension storage for preference data; do not collect portal data.
- Do not access cookies, credentials, OTPs or academic data.
- Default to isolated-world content scripts; don't use MAIN world without a reviewed requirement.
- Do not execute remote theme code or arbitrary imported scripts.
- Treat portal DOM and messages as untrusted.

## 4. Vibe Coding Engineering methodology used

The supplied *Vibe Coding Engineering: A Professional Guide to Building Software with AI Agents*, Second Edition, 2026, is the workflow source for this project.

Relevant sections reviewed:

- Chapter 1, pp. 5–8: three risk lanes; reduce agent autonomy as blast radius grows; high-impact security and authorization boundaries require human-led/review-only decisions.
- Chapter 2, pp. 9–12: professional loop, definition of done and explicit stop condition.
- Chapters 3–5, pp. 15–23: problem evidence, executable product brief, onboarding and validation.
- Chapter 6, pp. 26–27: design reference as source of truth; define layout, typography, color, shape, components, states, motion, responsive behavior and content; inspect, screenshot and iterate.
- Chapter 7, pp. 28–30: context engineering, concise AGENTS.md, source-of-truth docs and tool/skill review.
- Chapter 8, pp. 31–32: read-only reconnaissance, confirm commands and package manager, baseline checks, secrets and repository state.
- Chapters 9–11, pp. 35–40: bounded build prompts, architecture/data boundaries and parallel-agent constraints.
- Chapters 12–13, pp. 43–49: independent tests, verification ladder, visual QA, accessibility and performance.
- Chapters 14–15, pp. 52–56: application security and coding-agent trust boundaries.
- Chapter 16, pp. 59–60: release gates, preview/review/deploy/smoke/observe and rollback.
- Appendix A, pp. 77–79: nine-stage lifecycle with human/agent responsibilities and gates.
- Appendix B, pp. 80–84: prompt templates for product brief, read-only reconnaissance, feature clarification, bounded planning, implementation slice, visual correction, evidence-based debugging, independent testing, diff review and security threat model.
- Appendix C, pp. 86–87: autonomy/approval matrix and PASS/FAIL/NOT RUN/BLOCKED status vocabulary.

The visual design checklist and loop on printed pages 26–27 were also inspected as rendered PDF pages. The build-method state-design table on printed page 36 emphasizes loading, success, empty, error, disabled, partial/offline and permission-denied states. These rules are incorporated into the PRD and prompts.

## 5. Evidence vocabulary

Use the guide's status terms exactly:

- **PASS:** a check actually ran or was directly verified and met its stated condition.
- **FAIL:** a check ran and did not meet the condition.
- **NOT RUN:** no check was performed; explain why.
- **BLOCKED:** a dependency, permission or environment prevented the check.

Never treat an agent's “done” message as proof of a release gate.
