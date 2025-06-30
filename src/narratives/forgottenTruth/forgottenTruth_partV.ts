import type { NarrativeNode } from '../types';

export const nodes: NarrativeNode[] = [
  {
    nodeId: 'partV:intro',
    text: `**Part V: The Echo Awakens**

As the three Keeper factions converged on Antarctica, something unprecedented began to happen. The Echo Protocol, dormant for millennia, suddenly erupted into full activity. Around the world, Echo-Aware individuals experienced simultaneous visions of staggering clarity and intensity.

The Fragment beneath the ice was not just awakening—it was calling out, sending a signal that transcended time and space to reach every human consciousness capable of receiving it. The age of passive observation was ending. The age of choice had begun.`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partV:globalAwakening' }],
    feedbackHook: {
      milestone: 'deep_engagement',
      delay: 1000
    }
  },
  {
    nodeId: 'partV:globalAwakening',
    text: `From Tokyo to New York, from rural villages to urban centers, individuals with even trace amounts of Echo sensitivity suddenly found themselves experiencing visions that made their previous dreams seem like whispers. Artists painted geometric patterns they'd never seen. Musicians composed in frequencies that shouldn't exist. Mathematicians solved equations that appeared fully formed in their minds.

Dr. Lian Evasco, aboard a military transport bound for Antarctica, found herself speaking aloud in a language that had never been heard by human ears—yet every word was perfectly comprehensible to her. She was translating the Fragment's transmissions in real-time, serving as a living conduit between Shaper technology and human understanding.

Meanwhile, in a Veil safe house in Singapore, Amari Kessler's phase-shifted existence suddenly stabilized for the first time since her Mechanism exposure. The Fragment's signal was somehow healing the quantum damage to her cellular structure, but at what cost?`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partV:convergingForces' }]
  },
  {
    nodeId: 'partV:convergingForces',
    text: `At the Antarctic site, the situation deteriorated rapidly. The research team, now expanded to include representatives from all three factions, found themselves dealing with phenomena that defied containment protocols.

The Fragment had begun manifesting physical projections—holographic displays that showed star maps of galaxies that didn't exist, mathematical equations that described impossible geometries, and most disturbing of all, recordings of the moments leading up to the original Eden Collapse.

Elias Soriat, arriving with a team of Ordo Aeturnum technicians and what appeared to be prototype harmonic resonance equipment, declared his intention to attempt direct interface with the Fragment. The Veil representatives, led by Director Harrison Walsh, threatened to destroy the entire site rather than allow another activation attempt.

Caught between these extremes, Dr. Evasco found herself in the unique position of being able to actually communicate with the Fragment—and what it told her changed everything.`,
    choices: [
      { choiceText: 'Learn what the Fragment revealed', nextNodeId: 'partV:fragmentRevelation' },
      { choiceText: 'Witness the growing tensions', nextNodeId: 'partV:risingConflict' }
    ]
  },
  {
    nodeId: 'partV:fragmentRevelation',
    text: `Speaking through Dr. Evasco's voice, the Fragment revealed the true nature of the Echo Protocol. It was not merely a warning system or educational program—it was a consciousness preservation matrix containing the collected awareness of every Shaper who had ever existed.

"We did not die in the Collapse," the Fragment communicated. "We retreated into the spaces between realities, waiting for a species to emerge that could understand the true lesson of Eden. The Mechanism was never meant to create perfection—it was meant to teach the consequences of seeking it."

The Fragment revealed that the original proto-human activation had not been unauthorized or accidental. It had been a test, carefully orchestrated by the Shapers themselves. They had needed to know whether emerging consciousness could resist the temptation of absolute power.

Humanity had failed that test—but in failing, had learned something the Shapers themselves had never understood. The Fragment was not a tool to be wielded, but a teacher offering a choice that would define the next stage of human evolution.`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partV:theChoice' }]
  },
  {
    nodeId: 'partV:risingConflict',
    text: `As Dr. Evasco translated the Fragment's communications, tensions at the site reached a breaking point. Elias Soriat's team had begun setting up harmonic resonance equipment around the Fragment, despite increasingly violent protests from Veil representatives.

Director Walsh authorized the deployment of quantum disruption charges—experimental weapons designed to create localized reality fractures that would make the site permanently inaccessible. But as his team prepared the devices, they discovered that normal explosives no longer functioned within the Fragment's influence zone.

The Fragment had begun rewriting local physical laws, creating a pocket of space where Shaper physics took precedence over Earth's natural constants. Bullets stopped in mid-air, electrical devices either failed completely or began operating beyond their design parameters, and several team members reported seeing multiple versions of themselves moving through slightly different probability streams.

The situation was spiraling beyond anyone's ability to control, and at the center of it all, the Fragment pulsed with increasing intensity, as if counting down to some inevitable culmination.`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partV:theChoice' }]
  },
  {
    nodeId: 'partV:theChoice',
    text: `As chaos erupted around the Fragment, Dr. Evasco found herself in direct mental contact with the collective consciousness of the Shapers. They offered her—and through her, all of humanity—three paths forward:

**The Path of Restoration:** Activate the remaining Mechanism fragments and restore the pre-Collapse paradise, but accept that such perfection would end human growth and evolution.

**The Path of Destruction:** Allow the Veil to succeed in fragmenting the remaining technology, ensuring human independence but losing forever the knowledge that could prevent future existential threats.

**The Path of Transcendence:** Neither restore nor destroy, but instead use the Mechanism fragments as stepping stones to evolve beyond the need for such technology entirely.

As Dr. Evasco processed these options, she realized that the choice was not really hers to make. The Fragment was broadcasting the same offer to every Echo-Aware individual on the planet simultaneously. Humanity's future would be decided not by governments or secret societies, but by the collective unconscious decision of those capable of hearing the Shapers' final transmission.

The age of passive observation was over. The moment of choice had arrived.

*(More chapters unlocking soon — stay tuned!)*`,
    choices: [{ choiceText: 'Return to the Core Story', nextNodeId: 'ft_finalChoice' }]
  }
];

export const segmentId = 'forgottenTruth_partV';
