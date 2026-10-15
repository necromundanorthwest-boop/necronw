# NECROMUND:AI v3.3 — Scenario Engine

## Boundaries

The v3.1 tactical resolver, activation engine, rule vocabulary and migration remain authoritative. `resolveWithScenario` passes a configured core mission to that resolver, then supplies scenario movement intent, target criteria and WHY context. It does not select a second combat action. Player-confirmed restrictions such as Reckless take precedence over target ranking.

The engine does not measure the table, determine sight, move models, roll combat dice or supply fighter profiles. The player reports legality, isolation, Nerve results, removals and placement.

## Files and interfaces

| Module | Responsibility |
|---|---|
| `src/scenarios/types.ts` | Definition, runtime, actor and result contracts |
| `src/scenarios/dead-signal.ts` | Scenario registry and Dead Signal configuration |
| `src/scenarios/runtime.ts` | Immutable state transitions, actions, waves, outcomes and tactical adapter |
| `src/scenarios/ScenarioPanel.tsx` | Scenario library, setup, public HUD, player confirmations, End Phase UI and result download |
| `src/scenarios/runtime.test.ts` | Runtime and tactical adapter tests |

`BattleState.scenario` is optional. All existing saves without it continue to work. A scenario stores its own player crew; the normal `fighters` array continues to represent the AI force. Player and AI IDs are stable, independent of ordering.

`initializeScenario(battle, definition, names, edge, mode)` snapshots the previous battle, creates the scenario crew and force, and resets the round to 1. Every runtime operation clones its input, validates prerequisites and returns the next battle. The App saves the whole battle under its existing localStorage key and snapshots it for Undo. `resetScenario` restores the exact pre-scenario battle; it does not clear storage globally.

## Data-driven behavior

Definitions describe objectives, a secret live objective, counters and labels, an actor-linked artifact, action eligibility categories, action effects, discovery events, stage-specific directives, reserve actor templates, wave bands, outcome conditions and achievements. Generic effect operations adjust counters, assign/drop/extract the artifact, unlock actors and change stages. No runtime branch selects behavior by `secundus-dead-signal`.

To add a compatible scenario, author a `ScenarioDefinition`, register it in `scenarioLibrary`, then add scenario tests. More complex scenarios may require extending the effect/condition vocabulary. The present runtime supports one carried artifact and one live-objective search network per scenario. Campaign progression, arbitrary multiple artifacts and MP force generation are future extensions, not implemented features.

## End Phase transaction

1. Finish any AI or player activation.
2. Enter the existing End Phase and confirm normal tabletop checks.
3. Process scenario conditions and the reinforcement wave.
4. Deploy queued actors with explicit legal-placement confirmation.
5. Advance to the next Priority Phase.

`lastEndRound` makes processing idempotent. Queued actors are removed from reserve immediately, but are only added to the AI roster after deployment is confirmed. Advancement is blocked while actors remain queued. A round-7 defeat is finalized without scheduling a useless final wave.

## Hidden state and persistence

Automatic mode fixes one live relay at setup. `publicScenario` omits hidden variables and the original battle snapshot; the HUD only shows Unknown / Resolved / Live. Offline D6 mode assigns the live relay lazily using the stated conditional table. Final results reveal the live relay when known.

This is a local solo aid, not secure competitive hidden information: a player inspecting browser storage or developer tools can discover automatic-mode secrets. No secret appears in the normal HUD or event log before discovery.

The existing v3 schema and storage key are retained. Normal view/tactical form choices are transient; a refreshed AI activation is resumed from the dashboard with fresh tabletop confirmations. Player activation state, End Phase processing and deployment queue are persisted. Undo restores application state; the player must reconcile physical pieces after an Undo.

## v3.3 reserve replenishment and version compatibility

Definitions can configure `reinforcement.recycleKinds`. `recordMalstrainOutOfAction(battle, actorId)` validates a deployed actor, retains its configured profile in `recycledProfiles`, counts the casualty, removes it from the live force, repairs Group Activation state and appends the template to reserve. Duplicate reports are rejected. `deployQueued` resets transient battle state while restoring the same stable ID and user-configured kit/archetype. Returning actors only become Ready in the next Priority Phase.

`definitionFor(id, version)` resolves either the current 1.1.0 definition or the retained 1.0.0 definition in `dead-signal-v1.ts`. Existing saves keep their three-relay, finite-reserve behavior; they are never silently remapped. Reset Scenario then initialize a new game to use two relays and recycling. The registry advertises only the current version.
