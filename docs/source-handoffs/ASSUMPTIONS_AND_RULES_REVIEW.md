# Assumptions and rules review

## Sources

The recovered v3.1 source and the uploaded v3.1 documentation were inspected first. The implementation brief is authoritative for custom Dead Signal behavior. The supplied Hive Secundus PDF was checked at the Underhive Gloom / Terror section (printed pp. 127–128), the Malstrain force-building section (printed p. 148), and related reinforcement text. The image-only Malstrain material was rendered and checked, including the Tyramite entry (printed p. 57). No stat cards or substantial publication text are embedded in this release.

## Explicit custom choices

- Dead Signal uses eight actor slots (four initial, four reserve) with replenishing reserves. The user-requested custom rule returns all three Malstrain types after Out of Action; this is broader than the book’s returning Brood Scum rule. No full MP force is generated.
- First reinforcement phase is the end of round 1. Alert 0–1 only admits Brood Scum.
- The unlocked Genestealer uses a wave slot in the End Phase following discovery; it is not an additional bonus wave. Later Alert-3 phases revert to one eligible actor after the first two-actor surge.
- The UI offers manual Alert raises for scenario events. No unprovided noise trigger is invented.
- Search / Recover / Extract use one player-confirmed normal action. Their brief's Basic terminology is displayed alongside the existing engine's Single vocabulary; core N26 action definitions are unchanged.
- Transfer is explicitly a custom handoff action performed by the receiving fighter in confirmed base contact. Drop is a report of a tabletop event and consumes no automatically assigned action.
- Physical D6 mode determines the secret lazily rather than revealing a manual preassignment to the solo player. Its probability is equivalent for this two-relay network.
- Actor names and archetypes are preset by fighter type/loadout: Brood Scum Stalkers are Brawlers, Brood Scum Gunners are Marksmen, Tyramites and Genestealers are Brawlers. Equipment labels are concise references, not complete profiles. User edits survive recycling; review equipment and named skills before play.

## Source distinctions and limits

The supplied Hive Secundus publication and photographed Malstrain gang list serve different force contexts. The latter shows a Tyramite leash entry, while Secundus requires Tyramites to be assigned to Brood Scum. The app records the association and asks the player to resolve the applicable legal position and leash restrictions. It does not merge profiles or automatically apply one context's rules to the other.

Existing N26 rule assumptions remain in `UNRESOLVED_RULES_V3.md`. This release does not certify or revise all pre-existing core rules. Terror outcomes are reported to the user; because the baseline has no explicit Broken status, the scenario records a pending player-confirmed condition rather than constructing duplicate Broken rules.

“The Hunt” was not implemented as a runtime scenario in the recovered source. Its existing website download and content are not changed by this app release. The library does not offer an unimplemented playable entry.

Runtime version 1 supports one secret search network and one actor-linked artifact. Adding arbitrary multiple carried objects, custom event scripting, full MP generation or a campaign controller requires extending the schema and tests. This is intentional scope, not a completed campaign system.

Balance is unvalidated by physical tabletop play. The force and seven-round limit are engine-test values. Automated tests confirm transitions and integration, not game balance or every placement exception.
