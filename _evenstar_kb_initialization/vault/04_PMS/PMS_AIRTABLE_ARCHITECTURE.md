---
type: "proposed-design"
status: "proposed"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PMS"]
aliases: []
tags: ["evenstar", "proposed-design"]
sources: ["[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#3. Airtable as PMS Application Layer|PMS — 3. Airtable as PMS Application Layer]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#4. One PMS Base Per Project|PMS — 4. One PMS Base Per Project]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#5. Project Provisioning|PMS — 5. Project Provisioning]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#7. Recommended Airtable Tables|PMS — 7. Recommended Airtable Tables]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#14. Airtable Interfaces|PMS — 14. Airtable Interfaces]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#16. PSS Base vs PMS Base|PMS — 16. PSS Base vs PMS Base]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#25. Portfolio View|PMS — 25. Portfolio View]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#26. Template Strategy|PMS — 26. Template Strategy]]"]
---

# PMS Airtable architecture

Accepted: Airtable is the first PMS application/workspace layer, and its base is separate from the PSS Engineering Register.

Preferred proposal: one PMS base per project, linked by Project UUID and provisioned from a versioned template. Benefits cited are project boundaries, permissions, project-specific Interfaces, manageable records and archiving. A portfolio layer would aggregate across projects instead of collapsing all domains into one universal base.

Recommended tables and Interfaces are starting points. Actual provisioning API support, template copying, schema migration, limits and permission mapping must be checked when implementation is authorized. No base has been created by this work.

## Related notes

- [[PMS_HOME]]
- [[PMS_TEMPLATES]]
- [[PMS_PORTFOLIO]]
- [[OQ-010]]
- [[OQ-011]]

## Source

- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#3. Airtable as PMS Application Layer|PMS — 3. Airtable as PMS Application Layer]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#4. One PMS Base Per Project|PMS — 4. One PMS Base Per Project]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#5. Project Provisioning|PMS — 5. Project Provisioning]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#7. Recommended Airtable Tables|PMS — 7. Recommended Airtable Tables]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#14. Airtable Interfaces|PMS — 14. Airtable Interfaces]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#16. PSS Base vs PMS Base|PMS — 16. PSS Base vs PMS Base]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#25. Portfolio View|PMS — 25. Portfolio View]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#26. Template Strategy|PMS — 26. Template Strategy]]

## Related requirements

- [[INT-REQ-002]]
