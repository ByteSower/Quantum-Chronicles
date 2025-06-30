import type { NarrativeNode } from '../types';

export const nodes: NarrativeNode[] = [
  {
    nodeId: 'partVI:intro',
    text: `**Part VI: The Fractured Timeline**

As the collective human unconscious grappled with the Shapers' ultimatum, reality itself began to fracture. The Fragment's influence had grown beyond containment, creating temporal instabilities that threatened to tear apart the fabric of causality.

Past, present, and future began to bleed together around the Antarctic site. Research team members encountered earlier versions of themselves, while satellite feeds showed the ice sheet in various states of melting and reformation simultaneously.`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partVI:temporalChaos' }]
  },
  {
    nodeId: 'partVI:temporalChaos',
    text: `Dr. Evasco found herself experiencing multiple timeline streams simultaneously. In one, she had never become a linguist but remained a child prodigy painting impossible geometries. In another, humanity had never discovered the Fragment, remaining blissfully unaware of their cosmic heritage.

But most disturbing was the timeline where the original proto-human activation had succeeded—where humanity had become junior partners in the Shaper empire, perfectly content and utterly stagnant for ten thousand years.

The Fragment was showing humanity the consequences of each possible choice by manifesting alternate realities where those choices had already been made. Time had become a teaching tool, and the lesson was terrifying in its implications.`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partVI:convergencePoint' }]
  },
  {
    nodeId: 'partVI:convergencePoint',
    text: `Amari Kessler, her phase-shifted nature now allowing her to move freely between timeline streams, served as a bridge between the fractured realities. She witnessed the Ordo Aeturnum succeeding in their restoration attempt, the Veil successfully destroying all Shaper technology, and the Choir transcending physical existence entirely.

Each timeline felt equally real, equally valid, and equally horrifying in its own way. The Fragment was forcing humanity to confront the truth that there were no perfect solutions—only choices and their consequences.

As the timeline fractures reached critical mass, threatening to shatter reality permanently, Dr. Evasco realized that the real test was not about choosing the correct path. It was about choosing at all, accepting responsibility for the consequences, and moving forward despite uncertainty.`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partVI:synthesis' }]
  },
  {
    nodeId: 'partVI:synthesis',
    text: `In a moment of unprecedented clarity, the three primary Echo-Aware individuals—Dr. Evasco, Amari Kessler, and even Elias Soriat—found themselves in direct mental contact across all timeline streams simultaneously.

Together, they realized that the Shapers' final lesson was about synthesis rather than selection. The three paths were not mutually exclusive but rather components of a larger choice: to accept the responsibility of conscious evolution.

Humanity could restore, destroy, and transcend simultaneously by choosing to become guardians of cosmic evolution rather than its victims or its masters. The Fragment wasn't offering power—it was offering responsibility on a cosmic scale.

As this realization crystallized across the fractured timelines, reality began to reconvene around a new possibility that the Shapers themselves had never imagined.

*(More chapters unlocking soon — stay tuned!)*`,
    choices: [{ choiceText: 'Return to the Core Story', nextNodeId: 'ft_synthesis' }]
  }
];

export const segmentId = 'forgottenTruth_partVI';
