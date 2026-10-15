# Secundus Protocol 001: Dead Signal

Version 1.1.0. Scenario ID: `secundus-dead-signal`.

An original NecroNW solo scenario and scenario-engine test force. It is not the Hive Secundus campaign.

## Setup

Use a recommended 3′ × 2′ board, six player fighters and two separated relays: Alpha and Beta. Declare an extraction edge before play. Any gang can participate; a Secundan Incursion crew is optional. Place four Brood Scum legally around the relay district. Reserve two Brood Scum, a Malstrain Tyramite and a Malstrain Genestealer. Configure models and equipment from legitimate rules/reference materials.

Automatic assignment conceals one fixed live relay. Alternatively, roll a physical D6 when first searching a relay: with two unknown relays, 1–3 finds the live one and 4–6 resolves a decoy; after a decoy, the other relay is guaranteed live. This conditional method gives each original relay an equal chance and keeps exactly one live relay.

## Environment

Underhive Gloom reminds the player of Visibility (6″) and the supplied Secundus exceptions for Spyrers and Malstrain Genestealers. Sight and equipment exceptions are resolved at the table.

Terror in the Dark asks at a non-Spyrer player's activation whether eligible friendly support is within 6″. Spyrers do not supply that support. If isolated, report the Nerve test. A failure prompts the player to resolve Broken with their rules and blocks scenario actions until the player confirms they are permitted. The app does not implement Broken movement, recovery or immunity rules.

## Search and Hunt

SEARCH RELAY is a scenario Basic / N26-facing Single action, consuming one normal player action after legality is confirmed. Each Basic scenario action may be used once per activation. A corrupted relay becomes Resolved and raises Alert by 1. A live relay becomes Live, gives its searching fighter the shard, changes the stage to HUNT, raises Alert to at least 2 and unlocks the Genestealer.

Alert labels are 0 Dormant, 1 Stirring, 2 Hunting and 3 Swarm. Searches and explicitly reported scenario events raise the counter; there is no automatic shooting/noise rule in this version.

The carrier may Extract with one confirmed normal action at the declared edge. A carrier removed from play automatically drops the shard; Drop Shard is also available to report a physical drop. Recover Shard assigns a fighter in base contact. Transfer Shard is an original optional handoff action: the receiving fighter spends one action while in confirmed base contact with the current carrier. It does not impersonate an official core action.

## Opponent intent

| Actor | SEARCH / HUNT directive | Target priorities |
|---|---|---|
| Brood Scum | GUARD / PURSUE | Unresolved relay threats during SEARCH; carrier and intervening defenders during HUNT |
| Tyramite | ISOLATE | Isolated fighter, carrier, closest viable target |
| Genestealer | HUNT | Carrier, closest eligible non-Spyrer, other viable target |

The existing Brawler / Marksman / Adaptive resolver chooses the actual action. Movement, target eligibility and all restrictions remain player-confirmed.

## Reinforcements

Beginning with round 1's End Phase, Alert 0–1 queues one reserve Brood Scum if available. Alert 2 queues one eligible reserve actor. The first End Phase at Alert 3 queues two eligible actors if available; later Alert-3 phases queue one.

Discovery guarantees the Genestealer in the next End Phase wave, consuming one wave slot. Other eligible actors are selected in definition order. Placement is confirmed manually before the round advances. The Tyramite must be assigned to a deployed Brood Scum ID; the player resolves leash/controller rules using the appropriate source. Use Malstrain Out of Action controls to remove a fighter and replenish the reserve. The scenario editor’s delete operation also reports Out of Action for registered Malstrain actors. Their stable IDs remain for historical associations. Out of Action Malstrain return to reserve and re-enter through a later wave. Stable actor IDs and configured equipment/archetypes are retained; status, conditions, action history and ammunition are refreshed on deployment. All three types recycle in this custom scenario.

## End and result

Extracting the shard wins immediately. Concluding round 7 without extraction, or reporting that no player fighters remain eligible/in play, loses. CLEAN EXTRACTION requires at least three player fighters in play when extracting. ARCHIVE SWEEP records both relay searches and can accompany a defeat without changing it.

The JSON result contains ID/version, outcome, round, search count, live relay if known, maximum Alert, shard and carrier status, final carrier, fighters remaining, achievements, reason and timestamp. It provides a future campaign input; no campaign advancement is performed.

## Preconfigured force and Out of Action

| Fighter type / loadout | Preset names | Archetype |
|---|---|---|
| Brood Scum, close-combat kit | Stalker 01–03 | Brawler |
| Brood Scum, lasgun | Gunner 01–03 | Marksman |
| Malstrain Tyramite | Stinger 01 | Brawler |
| Malstrain Genestealer | Hunter 01 | Brawler |

Reporting Out of Action removes the actor from the deployed AI force and appends it to reserve once. It cannot return during its current activation. If that round's wave has not yet been processed, it may be selected by that End Phase; otherwise it waits for a later wave. Existing wave size/Alert eligibility rules still apply. The initial Genestealer unlock guarantee fires only once; recycled Genestealers join the normal reserve order.

A group activation casualty advances to the next surviving participant, or releases the opportunity when no participants remain. Controller removals produce a tabletop rules reminder; they do not automatically remove a Tyramite or invent leash outcomes.
