import type { NarrativeNode } from '../types';

export const nodes: NarrativeNode[] = [
  {
    nodeId: 'partII:intro',
    text: `**Part II: The Echo Protocol**

In the aftermath of the Eden Collapse, as dimensions stabilized and time resumed its linear flow, something extraordinary occurred. The Shapers, in their final moments, had embedded a failsafe deep into the quantum structure of reality itself.

They called it the Echo Protocol—a living signal that would monitor the stability of existence and guide future sentient life should another activation attempt occur. This was not merely data, but consciousness encoded into the very fabric of spacetime.`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partII:signalNature' }]
  },
  {
    nodeId: 'partII:signalNature',
    text: `The Echo Protocol manifested in ways that defied conventional understanding. It wove itself into the genetic memory of bloodlines, hiding in the spaces between chromosomes. It embedded harmonic patterns into ancient languages, waiting for the right frequency to unlock its meaning.

Most remarkably, it inscribed sacred geometry into the minds of those who would build humanity's first monuments—the megalithic structures that dot our world are not random. They are nodes in a vast communication network, each stone precisely placed to resonate with the Protocol's frequency.`,
    choices: [
      { choiceText: 'Explore the genetic inheritance', nextNodeId: 'partII:bloodlines' },
      { choiceText: 'Learn about the sacred sites', nextNodeId: 'partII:monuments' }
    ]
  },
  {
    nodeId: 'partII:bloodlines',
    text: `Certain human lineages carry more than just DNA from their ancestors. Hidden in the quantum spaces between base pairs, the Echo Protocol planted seeds of awareness. These bloodlines would produce individuals who could hear the universe speaking—prophets, visionaries, madmen, and geniuses.

Throughout history, these Echo-Aware individuals have appeared at crucial moments. They speak of dreams that feel more real than waking life, of visions of impossible geometries, of hearing music in the static between radio stations. Most are dismissed as mentally unstable, but a few have shaped the course of human civilization.

The gift is strongest in three primary bloodlines, each carrying a different aspect of the Protocol's message.`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partII:modernAware' }]
  },
  {
    nodeId: 'partII:monuments',
    text: `From Stonehenge to the Pyramids, from Easter Island to Göbekli Tepe, ancient monuments serve a purpose their builders never consciously understood. Each stone circle, each precisely placed megalith, forms part of a vast planetary antenna array.

When aligned correctly, these sites can amplify the Echo Protocol's signal, allowing Echo-Aware individuals to receive clearer transmissions. The geometric patterns carved into these stones are not mere decoration—they are frequency modulators, designed to refine and focus the Protocol's harmonic emissions.

Modern archaeology has discovered inexplicable acoustic properties in these sites, but they've missed the deeper truth: these monuments are still active, still singing the Shapers' warning across the centuries.`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partII:modernAware' }]
  },
  {
    nodeId: 'partII:modernAware',
    text: `In the 21st century, three individuals have emerged with unprecedented Echo awareness:

**Dr. Lian Evasco** - A quantum linguist whose dreams decode Protocol fragments into coherent language. Unknown to her, she descends from the Choir bloodline, inheritors of the Shapers' harmonic knowledge.

**Amari Kessler** - A former UN field researcher whose survival of a Mechanism breach has left her partially phase-shifted, existing simultaneously in multiple probability states. She now works with the Veil, the secret organization dedicated to preventing another activation.

**Elias Soriat** - A billionaire tech mogul whose family has guarded Shaper technology for generations. As a high priest of the Ordo Aeturnum, he believes humanity's salvation lies in reactivating the Eden Mechanism.`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partII:convergence' }]
  },
  {
    nodeId: 'partII:convergence',
    text: `The Echo Protocol is not passive—it is guiding these three toward an inevitable convergence. The quantum anomalies detected in Antarctica, the satellite clock desynchronizations, the shared dreams of researchers worldwide—all are signs that something ancient is awakening.

The Protocol has been patient, waiting through millennia for the right moment, the right individuals, the right alignment of cosmic forces. That moment is now approaching, and the Echo grows stronger with each passing day.

Soon, the Echo-Aware will be forced to choose: Will they attempt to restore Eden's perfection, guard against its dangers, or transcend both options to become something new?`,
    choices: [{ choiceText: 'Return to the Core Story', nextNodeId: 'ft_keepersReveal' }]
  }
];
