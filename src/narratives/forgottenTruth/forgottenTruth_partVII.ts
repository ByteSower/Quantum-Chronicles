import type { NarrativeNode } from '../types';

export const nodes: NarrativeNode[] = [
  {
    nodeId: 'partVII:intro',
    text: `**Part VII: The New Guardians**

As reality reconverged around the synthesis realization, a new paradigm emerged. Humanity would not restore Eden, nor would they destroy the Mechanism fragments. Instead, they would evolve into something the universe had never seen before: a species capable of conscious cosmic stewardship.

The Fragment, no longer pulsing with urgent intensity, began transmitting detailed technical specifications. Not for weapons or tools of power, but for monitoring systems, reality stabilizers, and consciousness evolution matrices.`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partVII:newRoles' }]
  },
  {
    nodeId: 'partVII:newRoles',
    text: `The three Keeper factions found their ancient rivalries suddenly irrelevant. The Ordo Aeturnum's resources and influence, the Veil's containment expertise, and the Choir's transcendent insights were all necessary components of humanity's new role.

Dr. Evasco became the first Translator, developing methods for teaching harmonic language to others. Amari Kessler's phase-shifted nature made her the ideal Probability Guardian, able to monitor and stabilize quantum uncertainties. Even Elias Soriat, his ambitions transformed by contact with genuine Shaper consciousness, accepted the role of Resource Coordinator.

Together, they began establishing the infrastructure for humanity's new cosmic responsibility: preventing other species from repeating the mistakes that led to the Eden Collapse.`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partVII:globalTransformation' }]
  },
  {
    nodeId: 'partVII:globalTransformation',
    text: `Around the world, Echo-Aware individuals reported similar transformative experiences. The Echo Protocol, no longer a warning signal, became an educational network. Ancient monuments revealed their true purpose as consciousness amplification nodes. Hidden Shaper fragments worldwide activated as teaching tools rather than weapons.

Humanity began developing abilities that had never existed before: collective decision-making processes that transcended individual ego, technological development guided by cosmic ethical principles, and expansion into space motivated by stewardship rather than conquest.

The change was not universal—many humans remained unaware of the transformation occurring around them. But those who were aware found themselves part of a growing network of consciousness that spanned the planet.`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partVII:cosmicNetwork' }]
  },
  {
    nodeId: 'partVII:cosmicNetwork',
    text: `As humanity's new abilities developed, they began detecting signals from other parts of the galaxy. The Shapers had not been unique—consciousness evolution was a common phase in cosmic development, but few species successfully navigated the transition.

Most either destroyed themselves in pursuit of power, or transcended physical existence so completely that they lost connection with developing civilizations. Humanity's synthesis approach was allowing them to maintain both cosmic awareness and material engagement.

The Fragment transmitted coordinates to other Mechanism sites throughout the galaxy, each one a test that other species had failed. Humanity's new mission became clear: serve as consciousness midwives for emerging civilizations, helping them navigate the same choice that had nearly destroyed both the Shapers and humanity itself.

The age of human isolation was ending. The age of cosmic gardening had begun.

*(More chapters unlocking soon — stay tuned!)*`,
    choices: [{ choiceText: 'Return to the Core Story', nextNodeId: 'ft_cosmicGardeners' }]
  }
];

export const segmentId = 'forgottenTruth_partVII';
