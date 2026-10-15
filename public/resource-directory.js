import {DISCORD_URL} from './start-here.js';
// Resource Cache content. Edit this collection to maintain the directory.
export const resourceDirectory={
  "title": "The Resource Cache",
  "kicker": "NECROMUNDA NORTHWEST // PUBLIC ARCHIVE",
  "tagline": "Useful intelligence from across the underhive.",
  "intro": [
    "No gang survives on its own. From official rules and printable references to campaign management, hobby guides, and community vox channels, this directory collects resources worth keeping close at hand.",
    "Whether you're running your first skirmish, arbitrating a campaign, or putting together something the Guilders would rather not know about, there's probably somebody out there who's already done some of the legwork.",
    "These resources belong to their respective creators. Follow the links, credit their work, and share what you find."
  ],
  "sections": [
    {
      "id": "official",
      "number": "01",
      "title": "Official Dispatches",
      "kicker": "Official Games Workshop resources",
      "intro": [
        "The first place to look when the rules change. Official downloads, FAQs, and errata take precedence over community interpretations. Start here before settling a rules dispute or preparing for a new campaign."
      ],
      "items": [
        {
          "id": "official-downloads",
          "title": "Warhammer Community — Necromunda Downloads",
          "type": "Official rules and downloads",
          "creator": "",
          "creatorHref": "",
          "description": [
            "Official FAQs, errata, and downloadable rules from Games Workshop. Keep an eye on this page for corrections and additional material supporting the current edition."
          ],
          "notes": [],
          "action": "Access official downloads",
          "href": "https://www.warhammer-community.com/en-gb/downloads/necromunda/",
          "prominence": "Official source"
        }
      ]
    },
    {
      "id": "references",
      "number": "02",
      "title": "Field References",
      "kicker": "Community-created game aids",
      "intro": [
        "Not every situation calls for another trip through the rulebook. These community-maintained references help keep games moving, but should be read alongside the official rules, particularly when editions change."
      ],
      "items": [
        {
          "id": "n26-quick-reference",
          "title": "N26 Quick Reference Sheets",
          "type": "Printable reference sheets",
          "creator": "u/JP_miniatures",
          "creatorHref": "https://www.reddit.com/user/JP_miniatures/",
          "description": [
            "Player-made quick-reference sheets covering core mechanics and other rules that tend to interrupt play. The original Reddit thread provides context, creator credit, and access to the creator's files and updates."
          ],
          "notes": [
            "Creator credit: u/JP_miniatures. Files remain hosted by their creator."
          ],
          "action": "View sheets and original thread",
          "href": "https://www.reddit.com/r/necromunda/comments/1vq2imc/necromunda_2026_quick_reference_sheets/",
          "prominence": "N26 table aid"
        },
        {
          "id": "n26-tcrepo-reference",
          "title": "N26 Rules Reference — Tabletop Campaign Repository",
          "type": "Printable rules reference",
          "creator": "mylonelydeer",
          "creatorHref": "",
          "description": [
            "An alternative quick-reference resource for Necromunda 2026, with versions intended for table use. Another option for keeping essential mechanics beside the battlefield."
          ],
          "notes": [],
          "action": "View reference sheet",
          "href": "https://tcrepo.com/downloads/necromunda-n26-rules-reference/",
          "prominence": ""
        }
      ]
    },
    {
      "id": "tools",
      "number": "03",
      "title": "Gang & Campaign Tools",
      "kicker": "Independent community projects",
      "intro": [
        "Building a gang is one thing. Keeping track of injuries, advances, equipment, credits, and a rapidly deteriorating campaign is another. These tools help handle the administration so players can concentrate on the fighting."
      ],
      "items": [
        {
          "id": "mundamanager",
          "title": "MundaManager",
          "type": "Gang and campaign management",
          "creator": "",
          "creatorHref": "",
          "description": [
            "A digital gang and campaign manager for working with rosters and campaign progression. Useful for players who prefer an online record of their gang's ongoing story."
          ],
          "notes": [
            "The site currently opens at its sign-in page."
          ],
          "action": "Open MundaManager",
          "href": "https://www.mundamanager.com/",
          "prominence": ""
        },
        {
          "id": "gyrinx",
          "title": "Gyrinx",
          "type": "Gang and campaign management",
          "creator": "",
          "creatorHref": "",
          "description": [
            "A community platform for creating gangs and running Necromunda campaigns. Explore its supported formats and available tools to see whether it fits your group's rules and campaign setup."
          ],
          "notes": [],
          "action": "Open Gyrinx",
          "href": "https://gyrinx.app/",
          "prominence": ""
        },
        {
          "id": "yaktribe",
          "title": "YakTribe",
          "type": "Gang tools, forums, and community files",
          "creator": "",
          "creatorHref": "",
          "description": [
            "A long-established home for Necromunda gang tools, community discussions, and player-created material. Its forums and archives are especially useful for finding campaign ideas, scenarios, conversions, and material from earlier editions. Verify which edition an individual tool supports before using it for N26."
          ],
          "notes": [
            "The linked gang tools are explicitly labelled for legacy Necromunda. Check the edition before using them for N26."
          ],
          "action": "Visit YakTribe",
          "href": "https://yaktribe.games/necromunda",
          "prominence": ""
        }
      ]
    },
    {
      "id": "community",
      "number": "04",
      "title": "Community Vox Channels",
      "kicker": "Discord communities and discussion",
      "intro": [
        "The underhive is considerably more interesting with other people in it. Find opponents, share conversions, ask questions, trade campaign stories, or lurk in the sump until something catches your attention."
      ],
      "items": [
        {
          "id": "necronw-discord",
          "title": "Necromunda Northwest",
          "type": "Community Discord",
          "creator": "",
          "creatorHref": "",
          "description": [
            "A gathering place for Necromunda players across the Pacific Northwest and beyond. Connect with fellow hobbyists, share your gangs and battlefields, discuss house rules and solo play, and help build the regional scene.",
            "New players, veteran Arbitrators, and curious Kill Team converts are welcome."
          ],
          "notes": [],
          "action": "Join NecroNW Discord",
          "href": DISCORD_URL,
          "prominence": "Our community"
        },
        {
          "id": "sump-city-radio",
          "title": "Sump City Radio",
          "type": "Community Discord / podcast community",
          "creator": "",
          "creatorHref": "",
          "description": [
            "Join the community around Sump City Radio for Necromunda discussion, hobby projects, terrain, and the characters who make the underhive worth exploring. A place for hobby conversation beyond your local gaming group."
          ],
          "notes": [],
          "action": "Join Sump City Radio",
          "href": "https://discord.com/invite/S6dmDQh3W",
          "prominence": ""
        },
        {
          "id": "reddit-necromunda",
          "title": "r/Necromunda",
          "type": "Reddit community",
          "creator": "",
          "creatorHref": "",
          "description": [
            "The wider Reddit community for Necromunda. Find rules discussions, new releases, painted gangs, terrain builds, and player-created resources. Useful for finding existing answers to common questions or sharing your latest conversion."
          ],
          "notes": [],
          "action": "Visit r/Necromunda",
          "href": "https://www.reddit.com/r/necromunda/",
          "prominence": ""
        }
      ]
    },
    {
      "id": "inspiration",
      "number": "05",
      "title": "Further Reading & Inspiration",
      "kicker": "Guides, scenarios, and hobby material",
      "intro": [
        "There is more to Necromunda than remembering the rules. These archives cover campaign design, alternative scenarios, hobby projects, and the broader narrative possibilities of the setting."
      ],
      "items": [
        {
          "id": "necromunday",
          "title": "Necromunday — Tabletop Battles / Goonhammer",
          "type": "Guides, commentary, and campaign inspiration",
          "creator": "",
          "creatorHref": "",
          "description": [
            "A collection of Necromunda articles, including gang guides, rules commentary, campaign advice, and homebrew material. Start here for broader discussion of how the game works at the table and ideas for making campaigns more interesting. Check publication dates when reading rules advice written for earlier editions."
          ],
          "notes": [],
          "action": "Read Necromunday",
          "href": "https://www.tabletopbattles.com/category/core-games/necromunda/",
          "prominence": ""
        },
        {
          "id": "tcrepo-archive",
          "title": "Tabletop Campaign Repository",
          "type": "Community downloads and scenarios",
          "creator": "",
          "creatorHref": "",
          "description": [
            "A community archive of scenarios, alternative rules, campaign supplements, and printable resources. Useful for Arbitrators looking for additional missions or inspiration for their own campaign material."
          ],
          "notes": [],
          "action": "Browse Necromunda downloads",
          "href": "https://tcrepo.com/downloads/category/game-systems/necromunda/",
          "prominence": ""
        },
        {
          "id": "card-creator",
          "title": "Necromunda Card Creator",
          "type": "Community creative tool",
          "creator": "Barry Sheppard",
          "creatorHref": "",
          "description": [
            "A browser-based tool for creating custom Necromunda-style cards. Handy for homebrew tactics, scenario effects, campaign resources, or other table-ready aids."
          ],
          "notes": [],
          "action": "Create a card",
          "href": "https://barrysheppard.github.io/necromunda-card-creator/index.html",
          "prominence": ""
        },
        {
          "id": "spalanz",
          "title": "Spalanz — Necromunda Resources",
          "type": "Historical rules and article index",
          "creator": "",
          "creatorHref": "",
          "description": [
            "An index of supplementary Necromunda material, including historical scenarios and articles associated with White Dwarf and Warhammer Community. Particularly useful for discovering older material that could be adapted to a contemporary narrative campaign. Some links and rules predate N26, so check their availability and applicability."
          ],
          "notes": [],
          "action": "Explore the archive",
          "href": "https://spalanz.com/necromunda-resources/",
          "prominence": ""
        }
      ]
    }
  ],
  "closing": {
    "title": "Contribute to the Cache",
    "paragraphs": [
      "The underhive is always changing. Good tools get updated, old links disappear, and somebody inevitably builds a better way to handle a rule nobody can agree on.",
      "Found a useful resource we're missing? Created a scenario, reference sheet, or tool you think other players should know about? Bring it to the Necromunda Northwest Discord."
    ],
    "emphasis": "The best resources come from the people who play. Help keep the cache stocked.",
    "action": "Share a resource on Discord",
    "href": DISCORD_URL,
    "disclaimer": "Necromunda Northwest is an independent, unofficial fan project and is not affiliated with or endorsed by Games Workshop. External resources remain the work of their respective creators. Fan-made rules and references may not reflect the current official rules."
  }
};
