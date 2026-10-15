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
