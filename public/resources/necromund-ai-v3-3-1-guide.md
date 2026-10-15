# NECROMUND:AI 3.3.1 — NecroNW public guide

Open the app from Solo Play → NECROMUND:AI. Quick Play resumes the current battle. Scenario Play opens the website library. Dead Signal launch preselects its setup without resetting a saved game. Use the app navigation to return to Scenario Library.

# NECROMUND:AI Version 3.1 — User Guide

NECROMUND:AI is an unofficial, mobile-first aid for choosing actions for an AI-controlled gang. It recommends intent and action priority; the player always confirms legality and resolves measurements, dice, terrain, and scenario rules with the official rulebook.

## Roster size

Version 3.1 supports any roster size, including an empty roster while setting up a gang.

- Tap **+ Add Fighter** on the dashboard to create a fighter.
- Configure the fighter, then tap **Save Fighter**. Leaving the new-fighter screen without saving discards the draft.
- Tap **Edit** on an existing fighter to change or delete it.
- An Activating fighter cannot be deleted until its activation is completed or undone.
- Additions and deletions are stored locally and included in Undo, recommendations, Group Activation eligibility, deployment guidance, and round resets.

## 1. Start a round

Every round follows **Priority Phase → Action Phase → End Phase**.

1. In Priority Phase, resolve Priority with the official rules.
2. Tap **AI** or **Opponent** to record who has Priority.
3. The app enters Action Phase and shows the current activation opportunity. Priority does not change during the round.

## 2. Alternate activation opportunities

When the opportunity is **AI**, activate any Ready fighter or use the recommendation. The recommendation is advisory.

When the opportunity is **Opponent**, resolve the opponent's opportunity at the table, then tap **Confirm Opponent Opportunity Complete**. The app returns the opportunity to the AI.

Fighters progress from **Ready → Activating → Activated**. A fighter becomes Activating as soon as its activation begins. **Undo** restores the most recent saved battle state.

## 3. Generate and resolve an action

1. Begin a Ready fighter's activation.
2. Confirm its status and effects.
3. Select the weapon being considered and update that weapon's Out of Ammo state.
4. Select only actions currently legal under the official rules.
5. Confirm whether useful melee or ranged opportunities exist.
6. Confirm a named rule or trait only when its timing applies.
7. Tap **Generate Action**.

The result shows the action, Single/Double/Free type, normal action cost, intent, target priorities, and decision path. Tap **Resolve / Continue** after resolving it at the table. Use **Update State** if the position changed, or **End Activation** when appropriate.

Ordinary actions cannot repeat in the same activation. Confirmed **Fast Shot** and **Rain of Blows** can provide their named exceptions. Charge supplies its core Free Fight. An **Assault** Free Shoot is offered only after Dash with the selected Assault weapon.

## 4. Action vocabulary

Single actions supported by the adviser include Move, Engage, Shoot, Reload, Interact, and Coup de Grâce. Double actions include Charge, Dash, Fight, Retreat, Aimed Shot, and Braced Shot. Status-specific choices include Crawl, Desperate Escape, Tend Wounds, and a player-confirmed status resolution option where applicable.

The app never invents legality. If an action is not legal now, leave it unselected.

## 5. Weapons and named rules

Edit a fighter to configure:

- Behaviour: Brawler, Marksman, or Adaptive
- Primary and secondary skill dispositions
- Weapon name and behavioural role: Melee, Sidearm, Ranged, or Support
- Weapon traits: Heavy, Assault, Reckless, Blast, or Template
- Named rules: Fast Shot, Rain of Blows, Overwatch, or Inspiring

Behavioural role guides the AI; it is separate from rules traits. Out of Ammo belongs to a specific weapon. Braced Shot checks the selected weapon for Heavy.

## 6. Group Activation

During an AI opportunity, tap **Group Activation**. Select the initiator, the participants, and the player-confirmed Single/Double/Free cost applied to the initiator. The app holds the AI opportunity until every participant finishes. Confirm eligibility and Inspiring exceptions using the official rules.

## 7. End a round

Tap **Enter End Phase**, complete the table checklist, then tap **End Round and Begin Priority Phase**. The next round starts in Priority Phase; do not record its Priority during the previous End Phase.

## 8. Persistence and migration

Battle data is saved locally in the current browser. Version 2 data is migrated automatically. Ambiguous legacy concepts such as Versatile or generic rule hooks are not guessed; affected fighters receive a review note.

## 9. Limits

NECROMUND:AI does not calculate ranges, line of sight, templates, Blast placement, dice, damage, movement geometry, or scenario-specific legality. Resolve those with the legitimate rules and scenario materials.


# NECROMUND:AI v3.3.1 — Dead Signal quick guide

The tactical adviser still works as described in `USER_GUIDE_V3.md`. The scenario extension manages mission state beside a physical tabletop.

1. Choose **Dead Signal** from the Scenario Library. Name the player crew, choose an extraction edge and select automatic hidden assignment or the physical D6 table. Initialize the scenario; your previous battle is retained for Reset.
2. Review setup/environment reminders. Configure the four Brood Scum using your legitimate references; equipment placeholders are not complete game profiles. Mark any player Spyrer in the crew controls before its activation.
3. Resolve Priority and select AI or Opponent. During an AI opportunity, choose a Ready Malstrain or the recommendation, confirm normal tactical facts and Generate Action. The WHY output includes the scenario directive and target priorities. Resolve the actual mechanics yourself.
4. During an Opponent opportunity, choose a Ready player fighter. Confirm nearby eligible support or report its Nerve test. Resolve any reported condition with your rules. Confirm action eligibility, then Search Relay, Recover/Transfer the shard, or Extract. Record other normal actions with the tabletop-action button. Finish the player activation, then confirm the Opponent opportunity. If the AI has no Ready fighters, use Pass AI opportunity so remaining player fighters can continue.
5. Search corrupted relays to resolve them. The live relay gives the searching fighter the shard and begins HUNT. The HUD always shows round, stage, Alert, relays, shard and reserve/queue counts.
6. Use the crew controls to report Out of Action / removed fighters. Removing the carrier drops the shard automatically. Alternatively report Drop Shard under Scenario Events, then recover it with an eligible fighter. Transfer spends an action by the receiving fighter in confirmed base contact.
7. Finish any active fighter, Enter End Phase and confirm normal tabletop checks. Process Scenario End Phase once. Place each queued reinforcement legally and confirm deployment; assign a Brood Scum ID when the Tyramite arrives. Only then end the round.
8. Extract the shard at the declared edge before round 7 concludes. Results and achievements appear on the dashboard; download the JSON for your records. No campaign progression is performed.
9. Refresh resumes saved scenario state. A interrupted AI activation can be reopened using Resume AI activation. A saved End Phase queue can be resumed using Resume End Phase. Fresh tactical facts must be reconfirmed after a reload.
10. Undo restores the previous application snapshot; reconcile the physical board yourself. Reset Scenario restores the exact prior battle and configuration. Choose and initialize Dead Signal again to replay.

This release is an original NecroNW scenario with an engine-test force. The player resolves the official game rules, all legal placement, sights, distances, attacks and dice.

Malstrain casualties: press **Out of Action → Reserve** directly on the AI fighter card, tactical screen or action-result screen and confirm. The expandable casualty section remains available. Remove the model physically. Reserve rises by one; its later wave deployment restores the same configured archetype/equipment with fresh battle state. This applies to Scum, Tyramites and Genestealers. New games use two relay markers, Alpha and Beta. Existing 1.0.0 saves retain their earlier rules; Use **Restart with updated scenario** in the visible legacy-save notice to adopt the revision. This resets mission progress while preserving the previous global battle.
