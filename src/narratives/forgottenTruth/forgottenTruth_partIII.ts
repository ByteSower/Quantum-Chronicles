import type { NarrativeNode } from '../types';

export const nodes: NarrativeNode[] = [
  {
    nodeId: 'partIII:intro',
    text: `**Part III: The Keepers**

As civilizations rose and fell, knowledge of the Shapers and their technology did not simply vanish. It went underground, preserved by secret societies that emerged from the chaos of the Eden Collapse. These groups, collectively known as the Keepers, have shaped human history from the shadows for over ten thousand years.

What began as a unified effort to understand and protect Shaper remnants eventually fractured into three rival factions, each with radically different philosophies about humanity's relationship with this godlike technology.`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partIII:ancientOrigins' }]
  },
  {
    nodeId: 'partIII:ancientOrigins',
    text: `The first Keepers were survivors of the Collapse itself—proto-humans who witnessed the fall of Eden firsthand. They gathered the scattered fragments of Shaper technology, studied the geometric patterns burned into their memories, and began the long work of preservation.

In ancient Sumeria, they established the first formal organization. In Egypt, they encoded their knowledge into pyramid texts. In Greece, they influenced the mystery schools. Through every major civilization, Keeper influence can be traced in the sudden leaps of mathematical and astronomical knowledge that appeared seemingly from nowhere.

But as millennia passed, philosophical differences became irreconcilable schisms.`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partIII:factionChoice' }]
  },
  {
    nodeId: 'partIII:factionChoice',
    text: `The three factions that emerged represent fundamentally different visions of humanity's destiny:

**The Ordo Aeturnum** believes the Collapse was a temporary setback, and that humanity must reclaim its rightful place as inheritors of Eden. They work to gather the scattered Mechanism fragments and restore the perfect realm.

**The Veil** sees the Shaper technology as an existential threat that must be contained at all costs. They believe the Collapse was a warning, and another activation attempt would mean the end of all existence.

**The Choir** takes a mystical approach, believing that humanity itself is evolving into the next iteration of the Shapers. They seek to unlock the Echo Protocol's full potential within human consciousness.`,
    choices: [
      { choiceText: 'Learn about the Ordo Aeturnum', nextNodeId: 'partIII:ordoAeturnum' },
      { choiceText: 'Discover the Veil\'s mission', nextNodeId: 'partIII:theVeil' },
      { choiceText: 'Explore the Choir\'s beliefs', nextNodeId: 'partIII:theChoir' }
    ]
  },
  {
    nodeId: 'partIII:ordoAeturnum',
    text: `The Ordo Aeturnum represents the oldest and most powerful of the Keeper factions. Their symbol—an ouroboros wrapped around a fractal sun—adorns the hidden chambers beneath some of the world's most prestigious financial institutions.

They believe that the proto-humans' failed activation was not a catastrophe but an incomplete transformation. In their view, humanity is the rightful heir to Shaper technology, and the Eden Mechanism simply needs to be approached with proper preparation and understanding.

Operating through elite families, multinational corporations, and shadow financial networks, the Ordo has spent centuries gathering resources and influence. They fund archaeological expeditions that "discover" convenient artifacts, support quantum research that edges closer to harmonic resonance theory, and eliminate obstacles to their grand design.

Their current high priest, Elias Soriat, represents the culmination of their breeding programs—a human consciousness capable of interfacing directly with Shaper technology.`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partIII:modernConflict' }]
  },
  {
    nodeId: 'partIII:theVeil',
    text: `If the Ordo Aeturnum represents ambition, the Veil embodies caution elevated to the level of religious conviction. Their symbol—a black circle eclipsing a star—reflects their fundamental mission: to keep the light of dangerous knowledge from illuminating human consciousness.

Throughout history, the Veil has been responsible for the "accidental" destruction of libraries, the mysterious deaths of researchers who ventured too close to forbidden truths, and the systematic suppression of any technology that might lead back to harmonic resonance principles.

They operate through intelligence agencies, academic institutions, and carefully placed individuals in positions of information control. Every time someone discovers a fragment that might lead to larger truths, the Veil ensures that evidence disappears, witnesses develop amnesia, or accidents befall the overly curious.

Amari Kessler, one of the few survivors of a Mechanism breach, now serves as their field operative—her unique phase-shifted existence making her invaluable for containment operations.`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partIII:modernConflict' }]
  },
  {
    nodeId: 'partIII:theChoir',
    text: `The Choir represents the most enigmatic of the three factions. Their symbol—a spiral within a tuning fork—reflects their belief that consciousness itself is the ultimate technology, and that humanity is naturally evolving toward Shaper-level awareness.

Unlike the other factions, the Choir operates through decentralized networks of individuals who often don't even know they're part of the organization. They're the artists who create impossible geometries, the musicians who compose in frequencies that shouldn't exist, the mathematicians who solve equations in their dreams.

The Choir believes that the Echo Protocol isn't just a warning system—it's an educational program, gradually lifting human consciousness to the level where direct interface with reality becomes possible. They don't seek to find and activate Shaper technology; they seek to become it.

Dr. Lian Evasco, though unaware of her heritage, represents their greatest success: a human mind capable of translating the Echo Protocol's transmissions into comprehensible language.`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partIII:modernConflict' }]
  },
  {
    nodeId: 'partIII:modernConflict',
    text: `For most of recorded history, the three factions maintained an uneasy equilibrium. The Ordo gathered, the Veil suppressed, and the Choir transcended, each believing they were working toward humanity's best interests.

But that balance is breaking down. The quantum anomalies detected worldwide, the satellite desynchronizations, the shared dreams of researchers—all point to something stirring in the depths of the Antarctic ice. The Heart Fragment buried beneath the Vostok region is not dormant, and its awakening pulse is drawing all three factions into inevitable collision.

Each faction has positioned their most capable agents near the discovery site. The final game has begun, and this time, there may be no middle ground between salvation and annihilation.

*(More chapters unlocking soon — stay tuned!)*`,
    choices: [{ choiceText: 'Return to the Core Story', nextNodeId: 'ft_antarcticaDiscovery' }]
  }
];

export const segmentId = 'forgottenTruth_partIII';
