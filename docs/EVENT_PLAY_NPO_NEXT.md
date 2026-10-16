# Event Play next iteration: NPO cards and Brood Scum loadouts

Status: implemented locally; 73 unit tests and Event Play browser checks pass. User adopted demo house prices on 16 October 2026 UTC.

## Confirmed scope
- Weapons only: total cost must be <=25 credits per Brood Scum. Fighter cost is excluded.
- Read-only fighter stat cards accessible from each fighter and a collapsed Event Play reference section, including reserve actors.
- Preserve the current engine, two relays, wave timing, action costs, victory/defeat and browser save key/origin/path.

## Source audit
User-supplied Malstrain Cards(1).pdf and Malstrain Roster(1).pdf contain fighter/weapon statistics but no item prices. Broodscum is an aggregate entry with many weapons and a 370 rating; that rating is not an individual weapon budget. No individual prices may be inferred from it.
The exports use an L column and numbered traits; retain their supplied labels pending rules-edition confirmation. Do not silently replace with older profiles. No Tyramite card is supplied. Do not substitute Alpha, Hermiatus or Coalescence for scenario actors.

## Adopted demo house price table (not official costs)
User-approved for the demo: stub gun 5; fighting knife 10; axe 10; maul 10; autopistol 10; laspistol 10; autogun 15; lasgun 15; sawn-off shotgun 15. Credits.
These values are explicitly adopted as scenario house prices.
Example candidates: autogun + knife 25; lasgun + stub gun 20; autopistol + axe 20; laspistol + maul 20; two autopistols 20; sawn-off shotgun + knife 25. Validate weapon slots, duplicates and equipment eligibility separately from budget.

## Recommended generation
Select from approved templates, separately for three Stalkers and three Gunners. Preserve the initial two/two role split and reserve one/one split. Generate all six at scenario initialization, including reserves. No randomization on render, reload, card opening, deployment or recycling. Store template ID, explicit weapon IDs/costs, catalog version and generated equipment on the actor/save. Recycled actors keep their original equipment and identity. Do not retrofit existing expeditions or reroll their placeholder equipment. An explicit operator choice may select a physical-model-compatible preset before initialization.

## Card UX
View stat card opens an accessible, dismissible reference panel; closing returns focus to its trigger. Show actor name, role, characteristics, assigned weapons, weapon budget, traits and source/version. Do not display the aggregate weapon list as one fighter's equipment. No action expenditure or activation changes. Cards and catalog ship in the cached app. Missing profiles are explicitly marked unavailable.

## Release gates
1. Demo house prices approved. Supplied card statistics retained; all templates use two distinct non-Unwieldy weapons.
2. Implement reference cards first; no engine changes for opening/closing.
3. Implement versioned generation and save handling as a separate bounded change.
4. Test every template <=25, unknown/negative/missing prices rejected, eligibility/slot validation, required role counts, reload and recycle stability, old-save compatibility, no state mutation from card controls.
5. Run existing source/build/browser checks; verify mobile card readability, keyboard focus, offline reload and physical-model matching. Publish only after checks pass.

## Validation record
73 source tests pass; production build passes. Event Play browser checks pass at 390/768/1280, including read-only card state and offline reload. Local Chromium was re-extracted after the cached executable crashed; software rendering enabled for checks. Physical tablet checks remain outstanding. No live publication performed.
