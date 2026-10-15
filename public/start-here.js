// Shared by the homepage and the permanent #/start-here page.
// Keep the invitation in one place for every NecroNW community link.
export const DISCORD_URL = 'https://discord.gg/qf9KP3KVk';

export function startHere({page = false} = {}) {
  const titleTag = page ? 'h1' : 'h2';
  return `<section class="start-here ${page ? 'start-here-page' : 'start-here-home'}" aria-labelledby="start-here-title">
    <p class="eyebrow"><span aria-hidden="true">↖</span> START HERE / NECROMUNDA NORTHWEST</p>
    <${titleTag} id="start-here-title" class="start-here-title">FIND YOUR PEOPLE.<br><span>GET A GAME GOING.</span></${titleTag}>
    <p class="start-here-intro">Necromunda Northwest connects players across the Pacific Northwest. New to the underhive, returning with an old gang, or looking for your next opponent? There’s a place for you here.</p>
    <div class="start-community">
      <p class="eyebrow">01 / THE LOCAL CONNECTION</p>
      <h3>Find people to play with.</h3>
      <p>Join the NecroNW Discord to meet other players, ask about games near you, and share what you’re building. New players and experienced Arbitrators are welcome.</p>
      <a class="button primary" href="${DISCORD_URL}" target="_blank" rel="noopener noreferrer">Join NecroNW Discord <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a>
      <details class="start-introduction">
        <summary>Not sure what to post?</summary>
        <p>A city or general area, your experience with the game, and what you’d like to play are enough to start.</p>
        <blockquote>“I’m in [area] and [new to Necromunda / returning to the game]. I’m interested in [a beginner game / skirmishes / a campaign]. Anyone nearby?”</blockquote>
      </details>
    </div>
    <div class="start-routes">
      <article>
        <p class="eyebrow">02 / START WITH THE MODELS</p>
        <h3>Plan your first gang.</h3>
        <p>Ask the community for help choosing a gang and putting a roster together. Already play Kill Team? Your models may have a second life in the underhive.</p>
        <a class="text-link" href="#/blog/kill-team-to-necromunda">From Kill Team to Necromunda <span aria-hidden="true">↗</span></a>
      </article>
      <article>
        <p class="eyebrow">03 / A TABLE OF ONE</p>
        <h3>Try a game on your own.</h3>
        <p>Explore solo scenarios and NECROMUND:AI, a companion that helps choose actions for the opposition. Bring your models, terrain, and rules to the table.</p>
        <a class="text-link" href="#/solo">Explore solo play <span aria-hidden="true">↗</span></a>
      </article>
    </div>
    <div class="start-table-tools">
      <p>Already at the table?</p>
      <a class="text-link" href="#/dice">Open the Dice Roller <span aria-hidden="true">↗</span></a>
      <a class="text-link" href="#/resources">Find rules references <span aria-hidden="true">↗</span></a>
    </div>
  </section>`;
}
