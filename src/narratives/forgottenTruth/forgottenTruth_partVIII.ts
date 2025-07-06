import type { NarrativeNode } from '../types';

export const nodes: NarrativeNode[] = [
  {
    nodeId: 'partVIII:intro',
    text: `**Part VIII: The Ones Who Shaped**

In the final phase of the transformation, Dr. Evasco made contact with individual Shaper consciousnesses preserved within the Fragment. These were not the collective voice she had been translating, but distinct personalities who had chosen to remain available as guides for emerging species.

What she learned from them revolutionized everything humanity thought they understood about consciousness, evolution, and their place in the cosmic order.`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partVIII:shaperIndividuals' }]
  },
  {
    nodeId: 'partVIII:shaperIndividuals',
    text: `The Shapers revealed that they themselves had once faced the same choice now confronting humanity. They had been the fourth species to discover Mechanism technology, inheriting it from their predecessors who had transcended beyond reach.

Each species had made different choices. The first had sought power and destroyed themselves. The second had hidden from responsibility and stagnated. The third had transcended so completely they became irrelevant to material existence.

The Shapers had attempted a synthesis similar to humanity's choice, but had focused too heavily on perfection rather than growth. Their Eden had become a beautiful prison, preventing the very evolution it was meant to foster.`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partVIII:cycleBreaking' }]
  },
  {
    nodeId: 'partVIII:cycleBreaking',
    text: `"You are the first species to understand that consciousness evolution requires accepting imperfection," the lead Shaper consciousness explained to Dr. Evasco. "We created Eden to solve the problems of existence. You have chosen to embrace those problems as opportunities for growth."

The Shapers had been waiting eons for a species that could break the cycle—neither seeking power, avoiding responsibility, nor transcending beyond relevance, but instead choosing conscious engagement with the universe's evolutionary process.

Humanity's synthesis approach meant they could serve as bridges between transcendent consciousnesses and emerging species, maintaining contact across all levels of development. They would be the cosmic teachers that the universe had been waiting for.`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partVIII:newBeginnings' }]
  },
  {
    nodeId: 'partVIII:newBeginnings',
    text: `As the final transmissions concluded, the Antarctic Fragment began a new phase of operation. Rather than pulsing with urgent energy, it settled into a steady, welcoming rhythm—a beacon that would guide other developing species toward the same choice humanity had made.

Dr. Evasco, Amari Kessler, and Elias Soriat found themselves fundamentally changed by the experience. They retained their individual personalities and human connections, but now possessed awareness that spanned cosmic scales and timelines.

Around the world, the transformation continued. Humanity was evolving not into something beyond human nature, but into a fuller expression of what human nature had always had the potential to become.`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partVIII:epilogue' }]
  },
  {
    nodeId: 'partVIII:epilogue',
    text: `**Epilogue: The Garden Regrown**

Years later, as humanity began its first conscious interventions with developing species on distant worlds, Dr. Evasco often reflected on the irony of their situation. They had gained access to godlike technology not by conquering it, but by accepting the responsibility that came with it.

The Eden Mechanism fragments remained active across the galaxy, but they no longer represented temptation or threat. They had become what they were always meant to be: tools for teaching consciousness evolution to species ready to make the choice between power and responsibility.

Humanity had not regained the garden of Eden. They had become the gardeners of a universe flowering with consciousness, tending the growth of awareness wherever it emerged.

The Forgotten Truth had been remembered, not as history to be restored, but as wisdom to be applied. And in that remembering, the universe itself had begun to evolve toward something unprecedented: a cosmic community of conscious gardeners, each species learning from and teaching the others in an endless dance of growth and transformation.

The Echo Protocol still broadcasts, but its message has changed. Where once it warned of dangers and offered choices, now it simply says: "Welcome to the garden. Here is how we tend it together."`,
    choices: [{ choiceText: 'Complete Your Journey', nextNodeId: 'partVIII:storyComplete' }]
  },
  {
    nodeId: 'partVIII:storyComplete',
    text: `**Journey Complete**

You have experienced the full span of "The Forgotten Truth" - from the initial discovery of quantum consciousness manipulation to humanity's transformation into cosmic gardeners. Your choices have shaped not just your path through the story, but the very nature of humanity's future.

Thank you for experiencing this quantum narrative. Your journey continues to resonate through the choice matrices, influencing future iterations of the story.

*More stories and expanded chapters are coming soon to Quantum Chronicles!*`,
    choices: [{ choiceText: 'Return to the Core Story', nextNodeId: 'ft_finalTranscendence' }],
    feedbackHook: {
      milestone: 'story_completion',
      delay: 2000
    }
  }
];

export const segmentId = 'forgottenTruth_partVIII';
