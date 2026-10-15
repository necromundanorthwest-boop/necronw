import {newPosts} from './posts.js';
export {blogFeature} from './posts.js';
// Add records to these collections to extend the hubs without changing navigation.
export const scenarios=[{id:'the-hunt',title:'The Hunt',subtitle:'Ambull variant',mode:'Solo',status:'Available',version:'N26 · fan-made variant',opponent:'Ambull / Brawler',description:'Search the dark. Cover your crew. Survive the thing searching for you. A solo search-and-ambush scenario with a translated Ambull profile.',download:'/resources/the-hunt-ambull.pdf',format:'PDF · 5 pages',integration:'Manual scenario play. Scenario automation is not yet integrated with NECROMUND:AI.'}];
export const resources=[{id:'necromund-ai',title:'NECROMUND:AI',version:'3.3.1',status:'Available',href:'/apps/necromund-ai/',guide:'/resources/necromund-ai-v3-3-1-guide.md',description:'A decision-support companion for solo and cooperative games. Configure fighters, follow action priorities, and resolve the tabletop facts yourself.'}];
export const articles=[
 ...newPosts,
 {id:'start-here',category:'Northwest Dispatch',title:'Good games start at the table.',dek:'A first look at Necromunda Northwest: practical tools, solo encounters and a place for the local scene.',readTime:'2 min',status:'Preview draft',body:[['A practical home for underhive play','Necromunda Northwest brings useful play aids into one place. The purpose is straightforward: help players get models onto the table, whether that means running a solo encounter, finding a missing special die, or sharing a finished gang.'],['Start with a tool','The Dice Roller works in your browser with standard, scatter, Firepower, Injury and vehicle dice. Results stay visible until you roll again. Tap a result to hold it, then reroll the rest when the rules allow. The face reference explains exactly what each die can produce.'],['Try a solo encounter','The Solo Play hub connects to NECROMUND:AI and the downloadable Ambull variant of The Hunt. The scenario is a fan-made procedure; the app supports decisions. Measurements, line of sight, legal actions and rules resolution remain with the player.'],['Make room for the Northwest','Future field notes will cover solo play, Kill Team-to-gang conversions, playtests and the Pacific Northwest scene. The photo archive now opens with seven tabletop photographs: industrial encounters, elevated platforms and vehicle collisions. This alpha is the starting point.']]},
 {id:'roller-guide',category:'Underhive Alone',title:'A special die, without the special dice.',dek:'Scatter directions, held results and transparent face tables. A quick guide to the browser roller.',readTime:'3 min',status:'Preview draft',body:[['Choose, roll, resolve','Choose a die type and quantity, then press Roll. D6 and D3 pools show a total; D66 generates two independent D6 digits. Firepower reports hit symbols and Ammo symbols separately. Resolve their effect with the rules you are using.'],['Read a scatter result','Keep the device aligned with your agreed table direction before rolling. Zero degrees points toward the top of the screen and angles run clockwise. Each result has an independent direction. A Hit still includes an arrow for rules that specifically require one; it is otherwise a Hit. The roller does not calculate scatter distance.'],['Hold only when appropriate','Tap any result to hold it. Reroll unheld keeps those results intact; Roll fresh discards every hold and starts a new pool. Holds are a convenience, not permission to reroll. Recent rolls remain in the current browser tab and can be cleared.'],['Know what is being rolled','The browser uses Web Crypto randomness with rejection sampling, so each face has an equal chance. Special results keep the repeated faces of the physical dice. Open Face reference to inspect the full distribution. No accounts, uploads or game-state automation are required by the roller.']]}
];
export const plannedArticles=[{category:'Declassified',title:'Model-by-model gang conversions',description:'Model-by-model conversion guides. In preparation.'},{category:'Field Test',title:'Into the dark: running The Hunt',description:'Playtest notes and lessons from the table. In preparation.'}];
// User-supplied photos; titles retain original filenames. Photographer credit is omitted until supplied.
// Add future photos with permissionConfirmed, descriptive alt text, dimensions, and optional tags/credit.
export const photos=[
  {
    "id": "into-the-dark",
    "title": "Into the Dark",
    "src": "/assets/gallery/into-the-dark.webp",
    "thumbnail": "/assets/gallery/into-the-dark-thumb.webp",
    "width": 2227,
    "height": 2227,
    "alt": "Overhead view of a miniature in a recessed industrial chamber, surrounded by metal walkways and yellow-and-black hazard stripes.",
    "category": "Games",
    "tags": [
      "Games",
      "Terrain"
    ],
    "credit": "",
    "permissionConfirmed": true
  },
  {
    "id": "from-the-shadows",
    "title": "From the Shadows",
    "src": "/assets/gallery/from-the-shadows.webp",
    "thumbnail": "/assets/gallery/from-the-shadows-thumb.webp",
    "width": 2204,
    "height": 2204,
    "alt": "Two painted miniatures beside a raised metal platform in a narrow industrial passage.",
    "category": "Games",
    "tags": [
      "Games",
      "Terrain"
    ],
    "credit": "",
    "permissionConfirmed": true
  },
  {
    "id": "after-the-objective",
    "title": "After the objective",
    "src": "/assets/gallery/after-the-objective.webp",
    "thumbnail": "/assets/gallery/after-the-objective-thumb.webp",
    "width": 2461,
    "height": 2461,
    "alt": "Miniature fighters on different levels of pipe-filled industrial terrain, with green markers on the platforms.",
    "category": "Games",
    "tags": [
      "Games",
      "Terrain"
    ],
    "credit": "",
    "permissionConfirmed": true
  },
  {
    "id": "sneaking-around",
    "title": "Sneaking Around",
    "src": "/assets/gallery/sneaking-around.webp",
    "thumbnail": "/assets/gallery/sneaking-around-thumb.webp",
    "width": 2270,
    "height": 2270,
    "alt": "A miniature on a narrow walkway among railings, pipes and large industrial tanks.",
    "category": "Games",
    "tags": [
      "Games",
      "Terrain"
    ],
    "credit": "",
    "permissionConfirmed": true
  },
  {
    "id": "the-squareoff",
    "title": "The Squareoff",
    "src": "/assets/gallery/the-squareoff.webp",
    "thumbnail": "/assets/gallery/the-squareoff-thumb.webp",
    "width": 2570,
    "height": 2570,
    "alt": "Two painted miniature fighters facing one another on a round elevated platform surrounded by pipes and gantries.",
    "category": "Games",
    "tags": [
      "Games"
    ],
    "credit": "",
    "permissionConfirmed": true
  },
  {
    "id": "pileup",
    "title": "Pileup",
    "src": "/assets/gallery/pileup.webp",
    "thumbnail": "/assets/gallery/pileup-thumb.webp",
    "width": 2776,
    "height": 2776,
    "alt": "Three weathered armored miniature vehicles clustered together on a sandy tabletop battlefield.",
    "category": "Games",
    "tags": [
      "Games",
      "Vehicles"
    ],
    "credit": "",
    "permissionConfirmed": true
  },
  {
    "id": "tbone",
    "title": "TBone",
    "src": "/assets/gallery/tbone.webp",
    "thumbnail": "/assets/gallery/tbone-thumb.webp",
    "width": 3001,
    "height": 3001,
    "alt": "An armored miniature vehicle positioned at a right angle to a grey tanker on the tabletop.",
    "category": "Games",
    "tags": [
      "Games",
      "Vehicles"
    ],
    "credit": "",
    "permissionConfirmed": true
  }
];
