import type { NarrativeNode } from '../types';

export const nodes: NarrativeNode[] = [
  {
    nodeId: 'partI:intro',
    text: `**Part I: The Garden That Wasn't**

Before humans walked the Earth, before time flowed in a single direction, there existed an empire that transcended the very concept of existence. This is not the story found in any holy book, for those texts came millennia later, shadows cast by memories too vast to comprehend.

In the void between dimensions, beings of pure light and geometric harmony had built something beyond imagination. They called themselves the Shapers, though that name is merely the closest translation our crude language can provide.`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partI:shaperNature' }]
  },
  {
    nodeId: 'partI:shaperNature',
    text: `The Shapers were not flesh and blood as we understand it. They were living mathematics, conscious geometry that could manifest matter through harmonic resonance. Where they focused their attention, reality bent to accommodate their will. They thought in frequencies that could collapse stars or birth new galaxies.

Their civilization spanned not just worlds, but entire dimensional planes. Each thought was a symphony, each emotion a cascade of crystalline harmonics that rippled through the fabric of spacetime itself.`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partI:edenMachine' }]
  },
  {
    nodeId: 'partI:edenMachine',
    text: `At the heart of their empire stood their greatest creation: the Mechanism of Eden. This was no garden of earthly delights, but a reality engine of incomprehensible complexity. Its core was the Heart of Eden—a crystallized quantum nexus that could rewrite the fundamental laws of existence.

Through this mechanism, the Shapers had achieved what every sentient being dreams of: a perfect realm of infinite energy, boundless knowledge, and harmonious existence. Death was merely a choice, time a navigable dimension, and matter a symphony waiting to be composed.`,
    choices: [
      { choiceText: 'Learn more about the Heart of Eden', nextNodeId: 'partI:heartDetails' },
      { choiceText: 'Discover what went wrong', nextNodeId: 'partI:theseeding' }
    ]
  },
  {
    nodeId: 'partI:heartDetails',
    text: `The Heart of Eden pulsed with the accumulated wisdom of countless eons. It was not merely a machine, but a living interface between consciousness and reality itself. Through it, the Shapers could:

- Collapse or unfold entire dimensions at will
- Modify physical laws locally or across vast cosmic regions  
- Alter memory and timeline structures
- Interface directly with the consciousness of any sentient being

The Heart sang in frequencies that existed between the spaces of reality, harmonics that made possible the impossible. It was their greatest achievement—and their ultimate downfall.`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partI:theseeding' }]
  },
  {
    nodeId: 'partI:theseeding',
    text: `But the Shapers, in their infinite wisdom, made a decision that would echo through all of time. They chose to seed other worlds with consciousness, to share the gift of awareness across the cosmos. One such world was a small blue planet orbiting a young star.

They nurtured the early proto-humans, guiding their evolution, teaching them fragments of harmonic science. Some humans showed remarkable resonance with Shaper frequencies—bloodlines that would carry this gift through the generations.

The Shapers believed that consciousness, like energy, was meant to be shared. They could not foresee the hunger that would consume their protégés.`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partI:theFall' }]
  },
  {
    nodeId: 'partI:theFall',
    text: `The proto-humans discovered fragments of Shaper technology. Driven by ambition and the terror of mortality, a faction of them infiltrated the Mechanism of Eden. They sought to claim immortality, to become gods themselves.

Without understanding the delicate harmonics required, they activated the Heart of Eden.

The result was catastrophic beyond measure. The system collapsed in a cascade of dimensional fractures. Time itself shattered and reformed. The perfect harmonies that held their reality together dissolved into chaos. This was the true Fall—not of innocence, but of cosmic order itself.`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partI:aftermath' }]
  },
  {
    nodeId: 'partI:aftermath',
    text: `When the echoes finally stilled, the Shapers were gone. Whether they died, transcended, or simply phased out of this reality remains unknown. Their empire crumbled, their perfect realm became myth, and their technology scattered across the cosmos like seeds on cosmic winds.

But the Mechanism of Eden was not entirely destroyed. Fragments remained, buried deep within the Earth, hidden in the quantum structure of reality itself. And with them, a failsafe protocol began to pulse—a warning, a guide, and perhaps a second chance.

The proto-humans survived, but their memories of that time became fractured, distorted. What remained filtered down through generations as mythology, religion, and half-remembered dreams of a garden lost.

*(More chapters unlocking soon — stay tuned!)*`,
    choices: [{ choiceText: 'Return to the Core Story', nextNodeId: 'ft_echoProtocolIntro' }]
  }
];
