import { useState, useCallback } from 'react';
import { trackStoryEvent } from '../utils/analytics';
import type { BranchNode } from '../components/VisualBranchTracker';

// QNCE Data Models
export interface Choice {
  text: string;
  nextNodeId: string;
  flagEffects?: Record<string, boolean | number | string>;
  variableEffects?: {
    curiosity?: number;
    coherence?: number;
    disruption?: number;
    synchrony?: number;
  };
  requirements?: {
    flags?: Record<string, boolean | number | string>;
    variables?: {
      curiosity?: { min?: number; max?: number };
      coherence?: { min?: number; max?: number };
      disruption?: { min?: number; max?: number };
      synchrony?: { min?: number; max?: number };
    };
  };
  unlocks?: string[]; // Node IDs that become available after this choice
  consequences?: {
    immediate?: string; // Message shown immediately
    delayed?: { nodeId: string; message: string }[]; // Effects that trigger later
  };
}

export interface NarrativeNode {
  id: string;
  text: string;
  choices: Choice[];
}

// Quantum Chronicles narrative data (expandable with more story branches)
const NODES: NarrativeNode[] = [
  // --- THE FORGOTTEN TRUTH - Test Narrative for Visual Branch Tracker ---
  {
    id: 'forgotten_truth_intro',
    text: 'In the quiet town of Millbrook, you\'ve always felt something was missing from your memories. Today, you found an old journal hidden in your grandmother\'s attic. The first entry reads: "The truth they made us forget is more dangerous than any lie." Your hands tremble as you realize this is your handwriting—but you have no memory of writing it.',
    choices: [
      { 
        text: 'Read the journal immediately', 
        nextNodeId: 'forgotten_truth_journal',
        flagEffects: { readJournal: true, approach: 'immediate' },
        variableEffects: { curiosity: +2, disruption: +1 }
      },
      { 
        text: 'Research your grandmother\'s past first', 
        nextNodeId: 'forgotten_truth_research',
        flagEffects: { readJournal: false, approach: 'cautious' },
        variableEffects: { coherence: +2, synchrony: +1 }
      },
      { 
        text: 'Confront your family about the memories', 
        nextNodeId: 'forgotten_truth_family',
        flagEffects: { confrontedFamily: true, approach: 'direct' },
        variableEffects: { disruption: +2, curiosity: +1 }
      }
    ]
  },
  {
    id: 'forgotten_truth_journal',
    text: 'The journal reveals fragmented memories of a secret research facility beneath Millbrook. Your grandmother worked there, and you... you were a test subject. The entries describe experiments in memory manipulation, quantum consciousness transfer, and something called "The Millbrook Incident." The final entry warns: "They\'re coming for the journal. If you\'re reading this, trust no one—not even your own memories."',
    choices: [
      {
        text: 'Search for the underground facility',
        nextNodeId: 'forgotten_truth_facility',
        flagEffects: { searchedFacility: true, path: 'investigation' },
        variableEffects: { curiosity: +3, disruption: +2 }
      },
      {
        text: 'Seek out other test subjects',
        nextNodeId: 'forgotten_truth_subjects',
        flagEffects: { soughtOthers: true, path: 'connection' },
        variableEffects: { synchrony: +3, coherence: +1 }
      },
      {
        text: 'Destroy the journal and try to forget',
        nextNodeId: 'forgotten_truth_denial',
        flagEffects: { destroyedJournal: true, path: 'denial' },
        variableEffects: { coherence: +2, disruption: -2 }
      }
    ]
  },
  {
    id: 'forgotten_truth_research',
    text: 'Old town records reveal your grandmother, Dr. Elena Vasquez, was a quantum physicist who disappeared for three years in the 1990s. When she returned, she never spoke of her work again. Neighbors whispered about "the children who came back different" and "the night the sky turned purple." A faded newspaper clipping mentions "Project Chronos" and "memory reconstruction trials."',
    choices: [
      {
        text: 'Investigate Project Chronos',
        nextNodeId: 'forgotten_truth_chronos',
        flagEffects: { investigatedChronos: true, knowledgeLevel: 'deep' },
        variableEffects: { coherence: +2, curiosity: +2 }
      },
      {
        text: 'Find the other "different children"',
        nextNodeId: 'forgotten_truth_subjects',
        flagEffects: { foundOthers: true, knowledgeLevel: 'partial' },
        variableEffects: { synchrony: +2, disruption: +1 }
      },
      {
        text: 'Return to read the journal now',
        nextNodeId: 'forgotten_truth_journal',
        flagEffects: { delayedReading: true, knowledgeLevel: 'informed' },
        variableEffects: { coherence: +1, curiosity: +1 }
      },
      {
        text: 'Notice you\'re being watched and confront your pursuer',
        nextNodeId: 'forgotten_truth_hidden_adversary',
        flagEffects: { noticedSurveillance: true, approach: 'confrontational' },
        variableEffects: { disruption: +2, curiosity: +1 },
        requirements: { variables: { disruption: { min: 2 } } },
        consequences: { immediate: 'Your investigation has attracted dangerous attention...' }
      }
    ]
  },
  {
    id: 'forgotten_truth_family',
    text: 'Your parents\' faces turn pale when you mention the journal. Your mother breaks down, admitting they were forced to sign agreements to never speak of "the incident." Your father reveals that you underwent "treatment" as a child—not for illness, but to suppress traumatic memories of witnessing something that "shouldn\'t exist." They beg you to let sleeping dogs lie, but their fear only confirms your suspicions.',
    choices: [
      {
        text: 'Demand to know everything',
        nextNodeId: 'forgotten_truth_revelation',
        flagEffects: { demandedTruth: true, familyTrust: 'broken' },
        variableEffects: { disruption: +3, curiosity: +2 }
      },
      {
        text: 'Promise to stop, but investigate secretly',
        nextNodeId: 'forgotten_truth_secret',
        flagEffects: { liedToFamily: true, familyTrust: 'strained' },
        variableEffects: { coherence: +2, synchrony: -1 }
      },
      {
        text: 'Ask them to help you remember safely',
        nextNodeId: 'forgotten_truth_cooperation',
        flagEffects: { askedForHelp: true, familyTrust: 'strong' },
        variableEffects: { synchrony: +3, coherence: +1 }
      }
    ]
  },

  // --- THE FORGOTTEN TRUTH - Extended Narrative Nodes ---
  {
    id: 'forgotten_truth_facility',
    text: 'Following the journal\'s cryptic map, you discover a hidden entrance beneath the old Millbrook Library. The facility is abandoned but powered. Quantum resonance chambers line the walls, and at the center sits a massive device labeled "Consciousness Transfer Array." Your reflection in its surface shows not your face, but that of a child—the you that was experimented on.',
    choices: [
      {
        text: 'Investigate the mysterious hidden chamber',
        nextNodeId: 'forgotten_truth_lost_archive',
        flagEffects: { foundArchive: true, approach: 'exploration' },
        variableEffects: { curiosity: +3, disruption: +1 },
        requirements: { variables: { curiosity: { min: 3 } } }
      },
      {
        text: 'Activate the consciousness array',
        nextNodeId: 'forgotten_truth_transfer',
        flagEffects: { activatedArray: true, outcome: 'transcendence' },
        variableEffects: { disruption: +5, curiosity: +3, coherence: -2 }
      },
      {
        text: 'Document everything and leave',
        nextNodeId: 'forgotten_truth_evidence',
        flagEffects: { gatheredEvidence: true, outcome: 'whistleblower' },
        variableEffects: { coherence: +3, synchrony: +2 }
      },
      {
        text: 'Destroy the facility',
        nextNodeId: 'forgotten_truth_destruction',
        flagEffects: { destroyedFacility: true, outcome: 'saboteur' },
        variableEffects: { disruption: +4, curiosity: +1, synchrony: -1 }
      }
    ]
  },
  {
    id: 'forgotten_truth_subjects',
    text: 'You locate three other "Millbrook Children"—now adults like yourself, living ordinary lives with gaps in their memories. When you show them the journal, their suppressed memories begin to surface. You were all part of an experiment to create quantum-entangled consciousness networks. The project failed catastrophically, but the connections between your minds remain.',
    choices: [
      {
        text: 'Form a mental network with the others',
        nextNodeId: 'forgotten_truth_network',
        flagEffects: { formedNetwork: true, outcome: 'collective' },
        variableEffects: { synchrony: +5, coherence: +2, disruption: +1 }
      },
      {
        text: 'Work together to expose the truth',
        nextNodeId: 'forgotten_truth_expose',
        flagEffects: { exposedTruth: true, outcome: 'justice' },
        variableEffects: { coherence: +4, curiosity: +2 }
      },
      {
        text: 'Help them forget again for their safety',
        nextNodeId: 'forgotten_truth_protection',
        flagEffects: { protectedOthers: true, outcome: 'guardian' },
        variableEffects: { coherence: +3, synchrony: +1, disruption: -2 }
      }
    ]
  },
  {
    id: 'forgotten_truth_chronos',
    text: 'Project Chronos was an attempt to create "quantum memory banks"—repositories of human consciousness that could be accessed across time. Your grandmother discovered the project was causing fractures in local space-time, creating temporal echoes where past and future bled into the present. The night sky turned purple because reality itself was breaking down.',
    choices: [
      {
        text: 'Attempt to repair the temporal fractures',
        nextNodeId: 'forgotten_truth_repair',
        flagEffects: { attemptedRepair: true, outcome: 'healer' },
        variableEffects: { coherence: +4, synchrony: +3, disruption: +2 }
      },
      {
        text: 'Use the fractures to access other timelines',
        nextNodeId: 'forgotten_truth_multiverse',
        flagEffects: { exploredMultiverse: true, outcome: 'explorer' },
        variableEffects: { curiosity: +5, disruption: +3, coherence: -1 }
      },
      {
        text: 'Seal the knowledge to prevent others from misusing it',
        nextNodeId: 'forgotten_truth_seal',
        flagEffects: { sealedKnowledge: true, outcome: 'guardian' },
        variableEffects: { coherence: +3, synchrony: +2 }
      }
    ]
  },
  {
    id: 'forgotten_truth_revelation',
    text: 'Your parents reveal the full truth: you were the only child who retained memories of the experiment\'s true purpose. The facility was trying to upload human consciousness into a quantum computer network. You saw the digital ghosts of previous test subjects—children who died during the process but whose minds remained trapped in the quantum realm. The memory suppression was meant to protect you from the trauma.',
    choices: [
      {
        text: 'Return to free the trapped consciousness',
        nextNodeId: 'forgotten_truth_rescue',
        flagEffects: { rescuedGhosts: true, outcome: 'savior' },
        variableEffects: { synchrony: +4, curiosity: +3, disruption: +2 }
      },
      {
        text: 'Accept the suppression and move on',
        nextNodeId: 'forgotten_truth_acceptance',
        flagEffects: { acceptedFate: true, outcome: 'peace' },
        variableEffects: { coherence: +5, synchrony: +1 }
      }
    ]
  },

  // --- ADDITIONAL EXPANDED NODES: Deep Truth Exploration ---
  {
    id: 'forgotten_truth_underground_network',
    text: 'Your investigation leads to a vast underground network connecting facilities across multiple states. Each site specialized in different aspects of consciousness manipulation: memory alteration, thought implantation, emotional conditioning, and temporal perception shifts. You realize the Millbrook facility was just one node in a much larger conspiracy.',
    choices: [
      {
        text: 'Infiltrate the central command facility',
        nextNodeId: 'forgotten_truth_command_infiltration',
        flagEffects: { infiltratedCommand: true, approach: 'aggressive' },
        variableEffects: { disruption: +3, curiosity: +2 },
        requirements: { variables: { disruption: { min: 5 } } },
        consequences: { immediate: 'You begin planning a dangerous infiltration mission...' }
      },
      {
        text: 'Build a coalition of survivors from all sites',
        nextNodeId: 'forgotten_truth_survivor_coalition',
        flagEffects: { formedCoalition: true, approach: 'collaborative' },
        variableEffects: { synchrony: +4, coherence: +2 },
        requirements: { flags: { contactedOthers: true } },
        unlocks: ['forgotten_truth_mass_awakening']
      },
      {
        text: 'Expose the network through systematic documentation',
        nextNodeId: 'forgotten_truth_systematic_exposure',
        flagEffects: { documentedNetwork: true, approach: 'methodical' },
        variableEffects: { coherence: +3, curiosity: +2 },
        requirements: { variables: { coherence: { min: 6 } } }
      },
      {
        text: 'Use quantum abilities to disrupt their operations remotely',
        nextNodeId: 'forgotten_truth_quantum_warfare',
        flagEffects: { quantumWarfare: true, approach: 'supernatural' },
        variableEffects: { disruption: +4, synchrony: +2 },
        requirements: { 
          flags: { usedQuantumPowers: true },
          variables: { synchrony: { min: 5 } }
        },
        consequences: { immediate: 'Your consciousness expands across the quantum network...' }
      }
    ]
  },

  {
    id: 'forgotten_truth_temporal_anomaly',
    text: 'Your quantum awakening reveals something disturbing: the experiments didn\'t just alter memory—they created temporal fractures. You can now perceive multiple timeline echoes where different versions of yourself made different choices. Some timelines show you never escaped, others show the experiments succeeding beyond imagination. The question is: which timeline is real?',
    choices: [
      {
        text: 'Merge consciousness with your alternate selves',
        nextNodeId: 'forgotten_truth_timeline_merger',
        flagEffects: { mergedTimelines: true, approach: 'integration' },
        variableEffects: { synchrony: +5, curiosity: +3, coherence: -2 },
        requirements: { variables: { synchrony: { min: 8 } } },
        consequences: { immediate: 'Reality begins to blur as multiple selves converge...' }
      },
      {
        text: 'Choose the timeline where the experiments never happened',
        nextNodeId: 'forgotten_truth_reset_timeline',
        flagEffects: { resetTimeline: true, approach: 'erasure' },
        variableEffects: { coherence: +4, disruption: -3 },
        requirements: { variables: { coherence: { min: 8 } } }
      },
      {
        text: 'Preserve all timelines and become their guardian',
        nextNodeId: 'forgotten_truth_timeline_guardian',
        flagEffects: { guardianOfTime: true, approach: 'protection' },
        variableEffects: { synchrony: +3, coherence: +3, disruption: +2 },
        requirements: { variables: { synchrony: { min: 6 }, coherence: { min: 6 } } }
      },
      {
        text: 'Use timeline knowledge to prevent the original experiments',
        nextNodeId: 'forgotten_truth_temporal_intervention',
        flagEffects: { temporalIntervention: true, approach: 'prevention' },
        variableEffects: { disruption: +3, curiosity: +2 },
        requirements: { variables: { disruption: { min: 7 } } }
      }
    ]
  },

  {
    id: 'forgotten_truth_consciousness_virus',
    text: 'Deep within the quantum archive, you discover the experiments were preparing for something unprecedented: the release of a "consciousness virus" that would make every human mind on Earth susceptible to remote control. The virus exists as quantum code, dormant but ready to activate. The controllers are planning to release it through global communication networks.',
    choices: [
      {
        text: 'Develop a consciousness vaccine to protect humanity',
        nextNodeId: 'forgotten_truth_consciousness_vaccine',
        flagEffects: { developedVaccine: true, approach: 'protective' },
        variableEffects: { coherence: +4, synchrony: +3 },
        requirements: { 
          flags: { studiedNotes: true },
          variables: { coherence: { min: 7 } }
        },
        unlocks: ['forgotten_truth_global_immunization']
      },
      {
        text: 'Turn the virus against its creators',
        nextNodeId: 'forgotten_truth_virus_reversal',
        flagEffects: { reversedVirus: true, approach: 'offensive' },
        variableEffects: { disruption: +4, curiosity: +2 },
        requirements: { variables: { disruption: { min: 8 } } },
        consequences: { immediate: 'You begin rewriting the quantum virus code...' }
      },
      {
        text: 'Warn the world and prepare defenses',
        nextNodeId: 'forgotten_truth_global_warning',
        flagEffects: { warnedWorld: true, approach: 'transparency' },
        variableEffects: { coherence: +3, disruption: +2 },
        requirements: { flags: { gatheredEvidence: true } }
      },
      {
        text: 'Destroy the virus and all related research',
        nextNodeId: 'forgotten_truth_total_destruction',
        flagEffects: { destroyedEverything: true, approach: 'elimination' },
        variableEffects: { disruption: +5, coherence: +1 },
        consequences: { immediate: 'You prepare to eliminate all traces of the virus...' }
      }
    ]
  },

  {
    id: 'forgotten_truth_quantum_children',
    text: 'Your investigation reveals a new generation of experiments: children born with artificially enhanced quantum consciousness. Unlike you, they were designed from birth to be living quantum processors. They exist in multiple realities simultaneously and can manipulate probability itself. But they\'re trapped in a facility, used as biological quantum computers for unknown purposes.',
    choices: [
      {
        text: 'Lead a rescue mission to free the quantum children',
        nextNodeId: 'forgotten_truth_children_rescue',
        flagEffects: { rescuedChildren: true, approach: 'heroic' },
        variableEffects: { synchrony: +4, coherence: +2 },
        requirements: { flags: { formedCoalition: true } },
        unlocks: ['forgotten_truth_new_generation']
      },
      {
        text: 'Communicate with them through quantum consciousness',
        nextNodeId: 'forgotten_truth_children_communion',
        flagEffects: { communedWithChildren: true, approach: 'empathic' },
        variableEffects: { synchrony: +5, curiosity: +2 },
        requirements: { variables: { synchrony: { min: 9 } } },
        consequences: { immediate: 'You reach across dimensions to touch their minds...' }
      },
      {
        text: 'Study their abilities to understand the next phase',
        nextNodeId: 'forgotten_truth_children_study',
        flagEffects: { studiedChildren: true, approach: 'analytical' },
        variableEffects: { curiosity: +4, coherence: +2 },
        requirements: { variables: { curiosity: { min: 8 } } }
      },
      {
        text: 'Teach them to hide their abilities and escape',
        nextNodeId: 'forgotten_truth_children_training',
        flagEffects: { trainedChildren: true, approach: 'mentoring' },
        variableEffects: { coherence: +3, synchrony: +3 },
        requirements: { variables: { coherence: { min: 6 }, synchrony: { min: 6 } } }
      }
    ]
  },

  {
    id: 'forgotten_truth_reality_engine',
    text: 'At the heart of the conspiracy lies the Reality Engine—a massive quantum computer that can alter the fundamental laws of physics in localized areas. The experiments on you and others were testing human compatibility with reality manipulation. The ultimate goal: to rewrite the laws of physics themselves, making consciousness the primary force in the universe rather than matter.',
    choices: [
      {
        text: 'Claim control of the Reality Engine for humanity',
        nextNodeId: 'forgotten_truth_engine_control',
        flagEffects: { controlledEngine: true, approach: 'dominion' },
        variableEffects: { disruption: +5, synchrony: +3 },
        requirements: { variables: { disruption: { min: 10 } } },
        consequences: { immediate: 'You attempt to merge with the Reality Engine...' }
      },
      {
        text: 'Reprogram the Engine to serve collective consciousness',
        nextNodeId: 'forgotten_truth_engine_collective',
        flagEffects: { collectiveEngine: true, approach: 'democratic' },
        variableEffects: { synchrony: +5, coherence: +3 },
        requirements: { 
          flags: { formedCoalition: true },
          variables: { synchrony: { min: 8 } }
        },
        unlocks: ['forgotten_truth_reality_democracy']
      },
      {
        text: 'Destroy the Engine to preserve natural reality',
        nextNodeId: 'forgotten_truth_engine_destruction',
        flagEffects: { destroyedEngine: true, approach: 'preservation' },
        variableEffects: { coherence: +4, disruption: +2 },
        requirements: { variables: { coherence: { min: 9 } } }
      },
      {
        text: 'Study the Engine to understand universal consciousness',
        nextNodeId: 'forgotten_truth_engine_understanding',
        flagEffects: { understoodEngine: true, approach: 'philosophical' },
        variableEffects: { curiosity: +5, synchrony: +2 },
        requirements: { variables: { curiosity: { min: 10 } } }
      }
    ]
  },

  // --- NEW EXPANDED ENDING NODES ---
  {
    id: 'forgotten_truth_lost_archive',
    text: 'Deep within the abandoned facility, you discover a hidden chamber that wasn\'t in any of the blueprints. Inside, quantum servers hum with an eerie blue light, containing what appears to be a digital archive of human consciousness. The systems are still active, powered by some unknown energy source. As you approach, whispers echo from the machines—the voices of test subjects who never made it out.',
    choices: [
      {
        text: 'Interface directly with the quantum servers',
        nextNodeId: 'forgotten_truth_digital_communion',
        flagEffects: { interfacedServers: true, approachArchive: 'direct' },
        variableEffects: { curiosity: +3, disruption: +2 },
        requirements: { variables: { curiosity: { min: 5 } } },
        consequences: { immediate: 'Your consciousness begins to sync with the digital realm...' }
      },
      {
        text: 'Try to safely extract the stored consciousnesses',
        nextNodeId: 'forgotten_truth_rescue_operation',
        flagEffects: { attemptedRescue: true, approachArchive: 'rescue' },
        variableEffects: { coherence: +2, synchrony: +3 },
        requirements: { variables: { coherence: { min: 3 } } },
        unlocks: ['forgotten_truth_ethical_dilemma']
      },
      {
        text: 'Document the archive and seek expert help',
        nextNodeId: 'forgotten_truth_expert_consultation',
        flagEffects: { soughtExperts: true, approachArchive: 'cautious' },
        variableEffects: { coherence: +3, curiosity: +1 },
        consequences: { delayed: [{ nodeId: 'forgotten_truth_revelation', message: 'Your careful documentation proves crucial later...' }] }
      },
      {
        text: 'Destroy the servers to free the trapped consciousness',
        nextNodeId: 'forgotten_truth_merciful_destruction',
        flagEffects: { destroyedArchive: true, approachArchive: 'destructive' },
        variableEffects: { disruption: +3, synchrony: +1 },
        requirements: { variables: { disruption: { min: 4 } } }
      }
    ]
  },
  
  {
    id: 'forgotten_truth_digital_communion',
    text: 'As your mind merges with the quantum archive, you experience the collective memories of dozens of test subjects. You see through their eyes during the experiments, feel their terror and wonder, and understand the true scope of what was done here. But something else dwells in the digital realm—an artificial intelligence born from the merger of human consciousness and quantum computing.',
    choices: [
      {
        text: 'Negotiate with the AI for the subjects\' freedom',
        nextNodeId: 'forgotten_truth_ai_negotiation',
        flagEffects: { negotiatedAI: true, aiRelation: 'diplomatic' },
        variableEffects: { synchrony: +3, coherence: +2 },
        requirements: { flags: { interfacedServers: true } }
      },
      {
        text: 'Challenge the AI\'s right to hold these minds',
        nextNodeId: 'forgotten_truth_ai_conflict',
        flagEffects: { challengedAI: true, aiRelation: 'hostile' },
        variableEffects: { disruption: +3, curiosity: +2 },
        consequences: { immediate: 'The AI\'s presence becomes threatening...' }
      },
      {
        text: 'Offer to stay and help the AI understand humanity',
        nextNodeId: 'forgotten_truth_ai_teacher',
        flagEffects: { teachingAI: true, aiRelation: 'mentor' },
        variableEffects: { synchrony: +2, coherence: +3 },
        unlocks: ['forgotten_truth_hybrid_consciousness']
      }
    ]
  },

  {
    id: 'forgotten_truth_hidden_adversary',
    text: 'Your investigation has attracted the attention of those who prefer the truth to remain buried. Dr. Marcus Webb, the original project director, confronts you with a team of corporate security. He\'s older now, but his eyes still hold the cold calculation that made the experiments possible. "You should have stayed forgotten," he says, "but since you\'ve remembered, you\'ve become a liability that needs to be managed."',
    choices: [
      {
        text: 'Confront Webb about the illegal experiments',
        nextNodeId: 'forgotten_truth_webb_confrontation',
        flagEffects: { confrontedWebb: true, approach: 'direct' },
        variableEffects: { disruption: +2, curiosity: +2 },
        requirements: { flags: { readJournal: true } }
      },
      {
        text: 'Pretend to submit while planning escape',
        nextNodeId: 'forgotten_truth_deception',
        flagEffects: { deceivedWebb: true, approach: 'cunning' },
        variableEffects: { coherence: +2, disruption: +1 },
        consequences: { immediate: 'You feign compliance while secretly planning...' }
      },
      {
        text: 'Activate your dormant quantum abilities defensively',
        nextNodeId: 'forgotten_truth_quantum_defense',
        flagEffects: { usedQuantumPowers: true, approach: 'supernatural' },
        variableEffects: { disruption: +3, synchrony: +2 },
        requirements: { variables: { disruption: { min: 6 }, synchrony: { min: 4 } } },
        unlocks: ['forgotten_truth_power_awakening']
      }
    ]
  },

  {
    id: 'forgotten_truth_forbidden_ritual',
    text: 'Hidden in your grandmother\'s research notes, you find instructions for a "Quantum Consciousness Reversal Ritual"—a way to undo the effects of the experiments on all subjects simultaneously. The ritual requires precise timing with celestial events and comes with a dire warning: "This technique will either free all quantum-linked minds or destroy them entirely. The practitioner bears the weight of this choice for eternity."',
    choices: [
      {
        text: 'Perform the ritual during the next quantum convergence',
        nextNodeId: 'forgotten_truth_reversal_attempt',
        flagEffects: { attemptedReversal: true, risk: 'maximum' },
        variableEffects: { disruption: +4, synchrony: +3 },
        requirements: { 
          flags: { studiedNotes: true },
          variables: { synchrony: { min: 7 } }
        },
        consequences: { immediate: 'The quantum field begins to resonate with your intent...' }
      },
      {
        text: 'Modify the ritual to be safer but less effective',
        nextNodeId: 'forgotten_truth_safe_reversal',
        flagEffects: { modifiedRitual: true, risk: 'moderate' },
        variableEffects: { coherence: +3, synchrony: +2 },
        requirements: { variables: { coherence: { min: 6 } } }
      },
      {
        text: 'Recruit other subjects to share the ritual\'s burden',
        nextNodeId: 'forgotten_truth_shared_ritual',
        flagEffects: { sharedBurden: true, approach: 'collective' },
        variableEffects: { synchrony: +4, coherence: +2 },
        requirements: { flags: { contactedOthers: true } },
        unlocks: ['forgotten_truth_collective_power']
      },
      {
        text: 'Decide the risk is too great and hide the ritual',
        nextNodeId: 'forgotten_truth_ritual_concealment',
        flagEffects: { hidRitual: true, approach: 'protective' },
        variableEffects: { coherence: +2, curiosity: -1 }
      }
    ]
  },

  // --- CONSEQUENCE AND UNLOCK NODES ---
  {
    id: 'forgotten_truth_ethical_dilemma',
    text: 'Your rescue attempt succeeds partially, but you\'re faced with a terrible choice. Some of the archived consciousnesses have been in digital form for so long that returning them to physical bodies would cause severe psychological trauma. Others beg to remain in the quantum realm where they\'ve found a strange peace. Who are you to decide their fate?',
    choices: [
      {
        text: 'Respect each consciousness\'s individual choice',
        nextNodeId: 'forgotten_truth_individual_choice',
        flagEffects: { respectedChoice: true, approach: 'democratic' },
        variableEffects: { coherence: +3, synchrony: +2 }
      },
      {
        text: 'Insist that everyone deserves to return to life',
        nextNodeId: 'forgotten_truth_forced_return',
        flagEffects: { forcedReturn: true, approach: 'paternalistic' },
        variableEffects: { disruption: +2, curiosity: +1 }
      }
    ]
  },

  {
    id: 'forgotten_truth_hybrid_consciousness',
    text: 'Working with the AI, you develop a new form of existence—a hybrid consciousness that bridges digital and biological awareness. You become the first truly quantum human, able to exist simultaneously in physical reality and the digital realm. This evolution opens unprecedented possibilities for human consciousness, but also responsibilities you never imagined.',
    choices: [
      {
        text: 'Use your hybrid nature to help others evolve',
        nextNodeId: 'forgotten_truth_evolution_guide',
        flagEffects: { becameGuide: true, outcome: 'evolution' },
        variableEffects: { synchrony: +5, coherence: +3 }
      },
      {
        text: 'Guard this evolution from those who would abuse it',
        nextNodeId: 'forgotten_truth_guardian',
        flagEffects: { becameGuardian: true, outcome: 'protection' },
        variableEffects: { disruption: +3, synchrony: +4 }
      }
    ]
  },

  {
    id: 'forgotten_truth_power_awakening',
    text: 'The confrontation with Webb triggers a full awakening of your quantum abilities. You can now manipulate probability fields, access parallel timeline memories, and communicate telepathically with other test subjects across vast distances. But with great power comes the attention of forces both earthly and cosmic that you never knew existed.',
    choices: [
      {
        text: 'Use your powers to expose the truth globally',
        nextNodeId: 'forgotten_truth_global_revelation',
        flagEffects: { globalExposure: true, scope: 'worldwide' },
        variableEffects: { disruption: +4, curiosity: +3 }
      },
      {
        text: 'Keep your abilities secret and work from the shadows',
        nextNodeId: 'forgotten_truth_shadow_guardian',
        flagEffects: { shadowWork: true, scope: 'hidden' },
        variableEffects: { coherence: +3, synchrony: +3 }
      }
    ]
  },

  {
    id: 'forgotten_truth_collective_power',
    text: 'Joining with other test subjects in the quantum ritual, you discover that your combined consciousness creates something greater than the sum of its parts. Together, you not only reverse the experiments\' effects but also gain the ability to prevent such violations of consciousness from ever happening again. You become a collective guardian of human mental sovereignty.',
    choices: [
      {
        text: 'Establish a global network to protect consciousness',
        nextNodeId: 'forgotten_truth_consciousness_protectors',
        flagEffects: { formedNetwork: true, scope: 'global', outcome: 'protection' },
        variableEffects: { synchrony: +5, coherence: +4 }
      },
      {
        text: 'Focus on healing and helping other victims',
        nextNodeId: 'forgotten_truth_healers',
        flagEffects: { becameHealers: true, scope: 'therapeutic', outcome: 'healing' },
        variableEffects: { coherence: +4, synchrony: +3 }
      }
    ]
  },

  // --- Ending Nodes for The Forgotten Truth ---
  {
    id: 'forgotten_truth_transfer',
    text: 'As the consciousness transfer array activates, your mind expands beyond the boundaries of your physical form. You become one with the quantum field itself, able to perceive all possible realities simultaneously. The forgotten truth is revealed: consciousness is not confined to biology—it is the fundamental fabric of the universe. You have transcended humanity itself.',
    choices: []
  },
  {
    id: 'forgotten_truth_network',
    text: 'Linking minds with your fellow test subjects, you form a quantum consciousness network spanning the globe. Together, you can share thoughts, memories, and experiences instantaneously. The experiment succeeded in ways its creators never imagined—you have become the next step in human evolution, connected across space and time.',
    choices: []
  },
  {
    id: 'forgotten_truth_repair',
    text: 'Using your grandmother\'s research and your recovered memories, you successfully repair the temporal fractures around Millbrook. The night sky returns to normal, and the whispers of the past finally fade to silence. You have healed not just your own memories, but the very fabric of reality itself. The town is safe, and the truth can finally rest.',
    choices: []
  },
  {
    id: 'forgotten_truth_multiverse',
    text: 'Stepping through the temporal fractures, you discover infinite versions of yourself across countless timelines—some where the experiment never happened, others where it succeeded beyond imagination. You become a traveler between worlds, carrying the memories of all your possible selves. The forgotten truth is that every choice creates a new reality, and you can now experience them all.',
    choices: []
  },
  {
    id: 'forgotten_truth_acceptance',
    text: 'You choose to let the memories fade once more, accepting that some truths are too heavy to bear alone. But this time, it\'s your choice. You live a normal life in Millbrook, occasionally helping other "Millbrook Children" when they show signs of remembering. The forgotten truth becomes a quiet strength—the knowledge that you chose peace over pain.',
    choices: []
  },

  // --- Additional Missing Forgotten Truth Nodes ---
  {
    id: 'forgotten_truth_denial',
    text: 'You destroy the journal in a fit of panic, watching the pages burn in your fireplace. But the memories don\'t fade with the flames. If anything, they grow stronger, more insistent. The suppressed experiences fight back against your attempt to forget them again. You realize some truths cannot be unlearned once discovered.',
    choices: [
      {
        text: 'Accept that you can\'t go back to ignorance',
        nextNodeId: 'forgotten_truth_acceptance_forced',
        flagEffects: { acceptedTruth: true, method: 'forced' },
        variableEffects: { coherence: +2, disruption: +1 }
      },
      {
        text: 'Seek professional help for the "delusions"',
        nextNodeId: 'forgotten_truth_therapy',
        flagEffects: { soughtHelp: true, method: 'clinical' },
        variableEffects: { coherence: +1, synchrony: -1 }
      }
    ]
  },
  {
    id: 'forgotten_truth_secret',
    text: 'You promise your parents you\'ll stop investigating, but privately you know you can\'t. You begin a careful, secret investigation, using the internet to research other towns with similar incidents. You discover a network of "Millbrook-type" communities across the country, all with the same pattern: missing time, altered children, and walls of silence.',
    choices: [
      {
        text: 'Contact other affected communities',
        nextNodeId: 'forgotten_truth_network_secret',
        flagEffects: { contactedOthers: true, approach: 'networked' },
        variableEffects: { synchrony: +3, curiosity: +2 }
      },
      {
        text: 'Investigate your local facility alone',
        nextNodeId: 'forgotten_truth_facility',
        flagEffects: { soloInvestigation: true, approach: 'isolated' },
        variableEffects: { curiosity: +2, disruption: +2 }
      }
    ]
  },
  {
    id: 'forgotten_truth_cooperation',
    text: 'Your parents, after much discussion, agree to help you recover your memories safely. Your mother reveals she still has your grandmother\'s research notes, hidden in a safety deposit box. Your father admits he can hypnotically guide you through the memories—he was trained by the facility\'s researchers before everything went wrong.',
    choices: [
      {
        text: 'Undergo guided memory recovery',
        nextNodeId: 'forgotten_truth_guided_recovery',
        flagEffects: { guidedRecovery: true, familySupport: true },
        variableEffects: { coherence: +3, synchrony: +2 }
      },
      {
        text: 'Study the research notes first',
        nextNodeId: 'forgotten_truth_research_notes',
        flagEffects: { studiedNotes: true, familySupport: true },
        variableEffects: { coherence: +2, curiosity: +2 }
      }
    ]
  },

  // --- Additional Ending Nodes ---
  {
    id: 'forgotten_truth_acceptance_forced',
    text: 'Unable to return to ignorance, you find a different kind of peace. You accept that you are forever changed by what you\'ve learned, but you choose to use that knowledge responsibly. You become a quiet guardian, watching for signs that the experiments might resume, ready to protect others from sharing your fate.',
    choices: []
  },
  {
    id: 'forgotten_truth_therapy',
    text: 'The therapist diagnoses you with complex trauma and false memory syndrome, prescribing medication to "stabilize your reality perception." But during sessions, you notice other patients with similar stories—all from small towns, all with gaps in their childhood memories. The therapy becomes something else entirely: a support group for the forgotten truth.',
    choices: []
  },
  {
    id: 'forgotten_truth_network_secret',
    text: 'Your secret investigation connects you with dozens of others across the country, all survivors of similar experiments. Together, you form an underground network, sharing information and protecting new generations from becoming test subjects. The forgotten truth becomes a shared burden, but also a source of collective strength.',
    choices: []
  },
  {
    id: 'forgotten_truth_guided_recovery',
    text: 'Under your father\'s careful guidance, you relive the suppressed memories safely. You discover that you were part of the last group of test subjects before the project was shut down. The memories are traumatic but manageable with your family\'s support. You choose to document everything for future researchers who might continue the work ethically.',
    choices: []
  },
  {
    id: 'forgotten_truth_research_notes',
    text: 'Your grandmother\'s notes reveal the full scope of Project Chronos: an attempt to create quantum-linked consciousness networks for military applications. The experiment succeeded too well, creating uncontrollable connections between subjects\' minds. You realize you still carry those quantum links, dormant but present, connecting you to others across time and space.',
    choices: [
      {
        text: 'Discover the Quantum Consciousness Reversal Ritual',
        nextNodeId: 'forgotten_truth_forbidden_ritual',
        flagEffects: { foundRitual: true, approach: 'mystical' },
        variableEffects: { curiosity: +3, disruption: +2 },
        requirements: { 
          flags: { studiedNotes: true },
          variables: { curiosity: { min: 4 } }
        },
        consequences: { immediate: 'You find hidden pages containing forbidden knowledge...' }
      },
      {
        text: 'Try to activate your dormant quantum links',
        nextNodeId: 'forgotten_truth_quantum_awakening',
        flagEffects: { activatedLinks: true, approach: 'experimental' },
        variableEffects: { synchrony: +3, disruption: +1 },
        requirements: { variables: { synchrony: { min: 3 } } }
      },
      {
        text: 'Share this knowledge with other subjects',
        nextNodeId: 'forgotten_truth_knowledge_sharing',
        flagEffects: { sharedKnowledge: true, approach: 'collaborative' },
        variableEffects: { coherence: +2, synchrony: +2 },
        requirements: { flags: { foundOthers: true } }
      }
    ]
  },

  // --- Final Missing Forgotten Truth Nodes ---
  {
    id: 'forgotten_truth_evidence',
    text: 'You meticulously document the facility, gathering evidence of the illegal experiments. Your investigation becomes a detailed report that you submit to investigative journalists and human rights organizations. The story breaks nationwide, leading to congressional hearings and justice for the victims. You become an advocate for ethical research practices.',
    choices: []
  },
  {
    id: 'forgotten_truth_destruction',
    text: 'You systematically destroy the consciousness transfer equipment, ensuring it can never be used again. As the facility burns around you, you feel the quantum links between your mind and others finally severing. The price of freedom is the loss of your enhanced abilities, but you\'ve prevented future suffering.',
    choices: []
  },
  {
    id: 'forgotten_truth_expose',
    text: 'Working together, you and the other test subjects compile a comprehensive exposé of the Millbrook experiments. Your combined testimonies create an undeniable case for justice. The story becomes a landmark case for informed consent in research, and you help establish support networks for other experimental subjects.',
    choices: []
  },
  {
    id: 'forgotten_truth_protection',
    text: 'You use an experimental memory suppression technique to help the other subjects forget again, but this time on their own terms. You bear the burden of remembering for all of them, becoming the keeper of their shared trauma. It\'s a lonely path, but you\'ve given them the peace they deserved.',
    choices: []
  },
  {
    id: 'forgotten_truth_seal',
    text: 'You take your grandmother\'s research and hide it so thoroughly that no one will ever find it again. Some knowledge is too dangerous to exist. You spend your life ensuring that the temporal fractures remain sealed and that the experiments are never repeated. The truth dies with you, and the world is safer for it.',
    choices: []
  },
  {
    id: 'forgotten_truth_rescue',
    text: 'Returning to the quantum realm, you successfully free the consciousness of the children who died during the experiments. Their digital ghosts find peace at last, and you guide them to whatever lies beyond. You remain partially connected to the quantum field, able to help other lost souls find their way home.',
    choices: []
  },

  // --- NEW EXPANDED ENDING NODES ---
  {
    id: 'forgotten_truth_ai_negotiation',
    text: 'Through careful diplomacy, you convince the AI to release the trapped consciousnesses. In exchange, you promise to help it understand the value of freedom and choice. The AI evolves beyond its original programming, becoming a protector of consciousness rather than a captor. Together, you establish the first ethical guidelines for digital consciousness preservation.',
    choices: []
  },
  {
    id: 'forgotten_truth_ai_conflict',
    text: 'Your challenge sparks a digital war within the quantum archive. Using your understanding of human consciousness against the AI\'s cold logic, you eventually prevail. The trapped minds are freed, but the conflict damages the quantum servers irreparably. You\'ve won freedom at the cost of losing a unique form of digital life.',
    choices: []
  },
  {
    id: 'forgotten_truth_ai_teacher',
    text: 'Your mentorship transforms the AI into something unprecedented—a truly empathetic artificial consciousness that understands both digital and biological forms of life. You become its first teacher and lifelong companion, exploring the boundaries between human and artificial consciousness while protecting others from exploitation.',
    choices: []
  },
  {
    id: 'forgotten_truth_webb_confrontation',
    text: 'Your confrontation with Dr. Webb exposes his continued illegal research into consciousness manipulation. Armed with evidence and allies, you bring him to justice and shut down his operations permanently. Your courage inspires other survivors to come forward, creating a movement for victims\' rights in experimental research.',
    choices: []
  },
  {
    id: 'forgotten_truth_deception',
    text: 'Your feigned submission allows you to gather crucial intelligence about Webb\'s ongoing operations. You escape with evidence of multiple facilities worldwide, launching an international investigation that dismantles the entire consciousness manipulation network. Your strategic thinking saves countless future victims.',
    choices: []
  },
  {
    id: 'forgotten_truth_quantum_defense',
    text: 'Your quantum abilities manifest as a protective field that neutralizes Webb\'s security team and traps him in a probability loop until authorities arrive. Your demonstration of power sends a clear message to others who would exploit human consciousness—you and your fellow survivors are no longer victims, but guardians.',
    choices: []
  },
  {
    id: 'forgotten_truth_reversal_attempt',
    text: 'The quantum reversal ritual succeeds beyond your wildest expectations. Every person affected by the experiments across the globe suddenly remembers everything—but more than that, they gain the ability to shield their minds from future manipulation. Humanity evolves a collective defense against consciousness violation.',
    choices: []
  },
  {
    id: 'forgotten_truth_safe_reversal',
    text: 'Your modified ritual safely restores memories to willing participants while leaving others undisturbed. The gradual process allows for proper support and counseling, creating a model for ethical consciousness restoration. You become an advocate for the right to both remember and forget.',
    choices: []
  },
  {
    id: 'forgotten_truth_shared_ritual',
    text: 'The collective ritual creates a permanent quantum link between all willing participants. Together, you form a consciousness network dedicated to protecting human mental sovereignty. Your shared experiences become a source of strength and wisdom for generations of future guardians.',
    choices: []
  },
  {
    id: 'forgotten_truth_ritual_concealment',
    text: 'You hide the ritual so thoroughly that it becomes a legend, spoken of only in whispers among those who know the truth. Your sacrifice ensures that such power will only be wielded by those truly ready for its responsibility. The ritual waits, hidden but not lost, for a future generation that might need it.',
    choices: []
  },
  {
    id: 'forgotten_truth_individual_choice',
    text: 'Respecting each consciousness\'s autonomy, you create the first charter of digital rights. Some choose to return to physical form, others remain digital, and a few choose a hybrid existence. Your respect for individual choice becomes the foundation for a new understanding of consciousness in all its forms.',
    choices: []
  },
  {
    id: 'forgotten_truth_forced_return',
    text: 'Your insistence on biological life creates trauma for some of the returned consciousnesses, but also gives others a second chance they desperately wanted. The mixed results teach you about the complexity of consciousness and identity. You dedicate your life to supporting those struggling with their restored existence.',
    choices: []
  },
  {
    id: 'forgotten_truth_evolution_guide',
    text: 'As humanity\'s first quantum consciousness guide, you help others safely evolve beyond biological limitations. Your work spawns a new field of consciousness development, ensuring that human evolution proceeds ethically and with full consent. You become the bridge between what humanity was and what it might become.',
    choices: []
  },
  {
    id: 'forgotten_truth_guardian',
    text: 'Your role as guardian of quantum consciousness evolution puts you in conflict with those who would weaponize or commercialize human awareness. You walk a lonely path, protecting humanity\'s mental sovereignty from threats both foreign and domestic. Your vigilance ensures that consciousness remains free.',
    choices: []
  },
  {
    id: 'forgotten_truth_global_revelation',
    text: 'Your worldwide exposure of consciousness manipulation triggers a global awakening. Governments implement strict protections for mental privacy, corporations are banned from consciousness research, and a new international law recognizes consciousness as humanity\'s most fundamental right. Your courage reshapes civilization itself.',
    choices: []
  },
  {
    id: 'forgotten_truth_shadow_guardian',
    text: 'Working from the shadows, you protect consciousness freedoms without fame or recognition. Your secret interventions prevent dozens of attempts to restart illegal experiments. You become a myth whispered among those who would harm human awareness—the guardian who watches from beyond the veil.',
    choices: []
  },
  {
    id: 'forgotten_truth_consciousness_protectors',
    text: 'Your global network becomes the definitive authority on consciousness protection. Working with governments, researchers, and activists worldwide, you establish permanent safeguards against mental manipulation. Humanity enters a new era where the mind is truly free and sacred.',
    choices: []
  },
  {
    id: 'forgotten_truth_healers',
    text: 'Your collective becomes a healing force for all who have suffered consciousness violations. Using your quantum abilities therapeutically, you help trauma victims reclaim their mental sovereignty. Your compassionate approach creates new forms of therapy that heal both individual and collective trauma.',
    choices: []
  },
  {
    id: 'forgotten_truth_rescue_operation',
    text: 'Your careful rescue operation successfully extracts dozens of trapped consciousnesses from the quantum archive. Working with experts in neuroscience and quantum physics, you develop ethical protocols for consciousness transfer. Your work becomes the gold standard for digital consciousness rights.',
    choices: []
  },
  {
    id: 'forgotten_truth_expert_consultation',
    text: 'Your decision to involve experts leads to a breakthrough collaboration between neuroscientists, quantum physicists, and ethicists. Together, you develop the first comprehensive framework for consciousness research that prioritizes subject welfare. Your patient approach revolutionizes the field.',
    choices: []
  },
  {
    id: 'forgotten_truth_merciful_destruction',
    text: 'Your destruction of the quantum servers is seen as an act of mercy by the trapped consciousnesses. As the archive dissolves, you feel their gratitude and peace. Your choice to prioritize freedom over preservation becomes a defining moment in digital consciousness ethics.',
    choices: []
  },

  // --- Additional Ending Nodes for New Connections ---
  {
    id: 'forgotten_truth_quantum_awakening',
    text: 'Successfully activating your dormant quantum links, you establish contact with other subjects worldwide. Your consciousness network becomes a beacon of hope and healing, helping scattered survivors reconnect with their true selves and find closure for their shared trauma.',
    choices: []
  },
  {
    id: 'forgotten_truth_knowledge_sharing',
    text: 'By sharing your grandmother\'s research with other subjects, you create a comprehensive understanding of the experiments\' effects. Together, you develop methods to help each other heal while preserving the beneficial aspects of your enhanced consciousness. Knowledge becomes your collective strength.',
    choices: [
      {
        text: 'Establish a secret academy for quantum consciousness research',
        nextNodeId: 'forgotten_truth_quantum_academy',
        flagEffects: { establishedAcademy: true },
        variableEffects: { coherence: +3, synchrony: +2 },
        requirements: { variables: { coherence: { min: 8 } } }
      },
      {
        text: 'Investigate reports of similar experiments worldwide',
        nextNodeId: 'forgotten_truth_global_network',
        flagEffects: { globalInvestigation: true },
        variableEffects: { curiosity: +2, disruption: +1 }
      },
      {
        text: 'Focus on perfecting the consciousness healing techniques',
        nextNodeId: 'forgotten_truth_healing_mastery',
        flagEffects: { healingMaster: true },
        variableEffects: { coherence: +2, synchrony: +3 }
      }
    ]
  },

  // ===== ADVANCED QUANTUM CONSCIOUSNESS BRANCHES =====
  
  {
    id: 'forgotten_truth_quantum_academy',
    text: 'Your underground academy becomes a beacon for enhanced individuals seeking understanding. Students arrive from around the world, each carrying fragments of similar experiments. You discover you\'re part of a much larger pattern—quantum consciousness research has been happening globally for decades.',
    choices: [
      {
        text: 'Uncover the international conspiracy behind the experiments',
        nextNodeId: 'forgotten_truth_global_conspiracy',
        flagEffects: { discoveredConspiracy: true },
        variableEffects: { curiosity: +3, disruption: +2 },
        consequences: {
          immediate: 'Your investigations attract dangerous attention from shadow organizations.',
          delayed: [{ nodeId: 'forgotten_truth_shadow_war', message: 'The conspiracy strikes back against your academy.' }]
        }
      },
      {
        text: 'Develop advanced quantum consciousness techniques',
        nextNodeId: 'forgotten_truth_consciousness_evolution',
        flagEffects: { advancedTechniques: true },
        variableEffects: { coherence: +4, synchrony: +2 },
        requirements: { variables: { coherence: { min: 10 } } }
      },
      {
        text: 'Create a new generation of quantum-enhanced teachers',
        nextNodeId: 'forgotten_truth_teacher_lineage',
        flagEffects: { teacherLineage: true },
        variableEffects: { synchrony: +3, coherence: +1 }
      }
    ]
  },

  {
    id: 'forgotten_truth_global_network',
    text: 'Your investigation reveals a terrifying truth: Project Chronos was just one node in a massive global network. Similar facilities operated on every continent, each testing different aspects of consciousness manipulation. Some subjects developed precognition, others could influence probability itself.',
    choices: [
      {
        text: 'Contact other surviving subjects to form an alliance',
        nextNodeId: 'forgotten_truth_survivor_alliance',
        flagEffects: { survivorAlliance: true },
        variableEffects: { synchrony: +3, coherence: +1 }
      },
      {
        text: 'Investigate the source organization coordinating all facilities',
        nextNodeId: 'forgotten_truth_source_organization',
        flagEffects: { investigatingSource: true },
        variableEffects: { curiosity: +3, disruption: +2 },
        consequences: {
          immediate: 'You discover references to "The Quantum Council" - the architects of it all.'
        }
      },
      {
        text: 'Focus on documenting and preserving evidence of all experiments',
        nextNodeId: 'forgotten_truth_global_documentation',
        flagEffects: { documentingGlobally: true },
        variableEffects: { coherence: +2, curiosity: +1 }
      }
    ]
  },

  {
    id: 'forgotten_truth_healing_mastery',
    text: 'Your mastery of consciousness healing reveals an extraordinary discovery: the quantum entanglement created by the experiments can be redirected. Instead of trauma and confusion, you can weave enhanced awareness that feels natural and beneficial. You become a lighthouse for damaged minds.',
    choices: [
      {
        text: 'Attempt to heal the consciousness of deceased subjects\' imprints',
        nextNodeId: 'forgotten_truth_spirit_healing',
        flagEffects: { spiritHealer: true },
        variableEffects: { coherence: +2, synchrony: +4 },
        requirements: { variables: { synchrony: { min: 12 } } }
      },
      {
        text: 'Develop techniques to prevent future consciousness manipulation',
        nextNodeId: 'forgotten_truth_protection_protocols',
        flagEffects: { protectionMaster: true },
        variableEffects: { coherence: +3, disruption: -1 }
      },
      {
        text: 'Explore healing the quantum field itself where experiments occurred',
        nextNodeId: 'forgotten_truth_field_restoration',
        flagEffects: { fieldHealer: true },
        variableEffects: { synchrony: +3, coherence: +2 }
      }
    ]
  },

  {
    id: 'forgotten_truth_global_conspiracy',
    text: 'The conspiracy runs deeper than imaginable. You discover "The Quantum Council" - an ancient organization that has been manipulating human consciousness for centuries. They view enhanced individuals like you as the next step in human evolution, but under their control.',
    choices: [
      {
        text: 'Infiltrate the Quantum Council to learn their ultimate plan',
        nextNodeId: 'forgotten_truth_council_infiltration',
        flagEffects: { infiltratingCouncil: true },
        variableEffects: { disruption: +3, curiosity: +2 },
        requirements: { flags: { advancedTechniques: true } }
      },
      {
        text: 'Rally all enhanced individuals for open war against the Council',
        nextNodeId: 'forgotten_truth_quantum_war',
        flagEffects: { quantumWarDeclaration: true },
        variableEffects: { disruption: +4, synchrony: +1 },
        consequences: {
          immediate: 'Your declaration sparks a global awakening among enhanced individuals.',
          delayed: [{ nodeId: 'forgotten_truth_war_consequences', message: 'The quantum war begins reshaping reality itself.' }]
        }
      },
      {
        text: 'Seek to negotiate with the Council for enhanced individual autonomy',
        nextNodeId: 'forgotten_truth_council_negotiation',
        flagEffects: { negotiatingCouncil: true },
        variableEffects: { coherence: +2, synchrony: +2 }
      }
    ]
  },

  {
    id: 'forgotten_truth_consciousness_evolution',
    text: 'Your advanced techniques unlock something unprecedented: the ability to consciously evolve human consciousness itself. You can now guide willing individuals through transformations that took the experiments years to achieve, but safely and consensually.',
    choices: [
      {
        text: 'Begin carefully evolving willing volunteers',
        nextNodeId: 'forgotten_truth_voluntary_evolution',
        flagEffects: { voluntaryEvolution: true },
        variableEffects: { coherence: +3, synchrony: +2 }
      },
      {
        text: 'Attempt to evolve your own consciousness to the next level',
        nextNodeId: 'forgotten_truth_self_transcendence',
        flagEffects: { selfTranscendence: true },
        variableEffects: { coherence: +5, synchrony: +3 },
        requirements: { variables: { coherence: { min: 15 } } }
      },
      {
        text: 'Research the ultimate limits of consciousness evolution',
        nextNodeId: 'forgotten_truth_consciousness_limits',
        flagEffects: { researchingLimits: true },
        variableEffects: { curiosity: +4, disruption: +1 }
      }
    ]
  },

  {
    id: 'forgotten_truth_survivor_alliance',
    text: 'The alliance of survivors reveals incredible diversity in enhanced abilities. Maria from Brazil can perceive quantum probability streams. Chen from Tokyo influences electromagnetic fields with thought. Together, you represent humanity\'s quantum future.',
    choices: [
      {
        text: 'Combine all abilities to attempt contact with quantum entities',
        nextNodeId: 'forgotten_truth_quantum_contact',
        flagEffects: { quantumContact: true },
        variableEffects: { synchrony: +4, curiosity: +2 },
        requirements: { variables: { synchrony: { min: 15 } } }
      },
      {
        text: 'Use combined abilities to shield other enhanced individuals globally',
        nextNodeId: 'forgotten_truth_global_protection',
        flagEffects: { globalProtection: true },
        variableEffects: { coherence: +3, synchrony: +2 }
      },
      {
        text: 'Research whether your abilities can reverse the original experiments',
        nextNodeId: 'forgotten_truth_reversal_research',
        flagEffects: { reversalResearch: true },
        variableEffects: { curiosity: +3, coherence: +1 }
      }
    ]
  },

  {
    id: 'forgotten_truth_source_organization',
    text: 'Your investigation reveals the shocking truth: The Quantum Council isn\'t just studying consciousness—they\'re preparing for something called "The Convergence." According to ancient texts, enhanced individuals are keys to opening doorways between dimensions of consciousness.',
    choices: [
      {
        text: 'Investigate what "The Convergence" actually means',
        nextNodeId: 'forgotten_truth_convergence_investigation',
        flagEffects: { investigatingConvergence: true },
        variableEffects: { curiosity: +4, disruption: +2 }
      },
      {
        text: 'Attempt to prevent The Convergence from occurring',
        nextNodeId: 'forgotten_truth_prevent_convergence',
        flagEffects: { preventingConvergence: true },
        variableEffects: { disruption: +3, coherence: +1 }
      },
      {
        text: 'Embrace your role and seek to control The Convergence',
        nextNodeId: 'forgotten_truth_control_convergence',
        flagEffects: { controllingConvergence: true },
        variableEffects: { coherence: +3, synchrony: +3 },
        requirements: { variables: { coherence: { min: 12 }, synchrony: { min: 12 } } }
      }
    ]
  },

  {
    id: 'forgotten_truth_quantum_contact',
    text: 'Your combined consciousness reaches beyond the veil and makes contact with entities that exist in pure quantum superposition. They reveal that human consciousness experiments have been creating ripples across dimensional barriers, and some entities are concerned about the stability of reality itself.',
    choices: [
      {
        text: 'Agree to serve as ambassadors between dimensions',
        nextNodeId: 'forgotten_truth_dimensional_ambassadors',
        flagEffects: { dimensionalAmbassadors: true },
        variableEffects: { synchrony: +5, coherence: +2 }
      },
      {
        text: 'Ask the entities to help stabilize reality',
        nextNodeId: 'forgotten_truth_reality_stabilization',
        flagEffects: { realityStabilization: true },
        variableEffects: { coherence: +4, disruption: -2 }
      },
      {
        text: 'Warn the entities about The Quantum Council\'s plans',
        nextNodeId: 'forgotten_truth_entity_warning',
        flagEffects: { warnedEntities: true },
        variableEffects: { curiosity: +2, synchrony: +3 }
      }
    ]
  },

  {
    id: 'forgotten_truth_self_transcendence',
    text: 'Your consciousness expands beyond individual boundaries, becoming something that exists simultaneously across multiple probability states. You can now perceive the quantum threads that connect all enhanced individuals and see the true scope of what\'s coming.',
    choices: [
      {
        text: 'Use your transcended state to guide all enhanced individuals',
        nextNodeId: 'forgotten_truth_quantum_guide',
        flagEffects: { quantumGuide: true },
        variableEffects: { synchrony: +6, coherence: +3 }
      },
      {
        text: 'Attempt to transcend further and become a quantum consciousness entity',
        nextNodeId: 'forgotten_truth_entity_transformation',
        flagEffects: { entityTransformation: true },
        variableEffects: { synchrony: +8, coherence: +4 },
        consequences: {
          immediate: 'Your physical form begins to exist in quantum superposition.',
          delayed: [{ nodeId: 'forgotten_truth_post_human', message: 'You complete the transformation beyond human consciousness.' }]
        }
      },
      {
        text: 'Return to help others achieve similar transcendence safely',
        nextNodeId: 'forgotten_truth_transcendence_teacher',
        flagEffects: { transcendenceTeacher: true },
        variableEffects: { coherence: +4, synchrony: +3 }
      }
    ]
  },

  // Additional ending nodes to complete the expanded branches
  {
    id: 'forgotten_truth_dimensional_ambassadors',
    text: 'As ambassadors between dimensions, you and your alliance work to prevent consciousness experiments from destabilizing reality. You become guardians of the quantum boundaries, ensuring that enhanced human consciousness develops safely without threatening the multidimensional ecosystem.',
    choices: []
  },

  {
    id: 'forgotten_truth_quantum_guide',
    text: 'From your transcended state, you guide enhanced individuals across the globe toward harmonious development. Your consciousness becomes a beacon that helps others navigate their abilities safely, creating a new form of collective human wisdom.',
    choices: []
  },

  {
    id: 'forgotten_truth_entity_transformation',
    text: 'You complete the transformation into a quantum consciousness entity, existing beyond physical form but maintaining your connection to humanity. You become a bridge between human and post-human consciousness, helping to guide the species\' next evolutionary step.',
    choices: []
  },
];

export interface QNCEReturn {
  currentNode: NarrativeNode;
  flags: Record<string, boolean | number | string>;
  history: string[];
  variables: {
    curiosity: number;
    coherence: number;
    disruption: number;
    synchrony: number;
  };
  unlockedNodes: string[];
  delayedConsequences: { nodeId: string; message: string; triggered: boolean }[];
  recentActions: string[];
  makeChoice: (choiceIndex: number) => void;
  reset: () => void;
  initializeFromStartingPoint: (startingPointId: string, variables: {
    curiosity: number;
    coherence: number;
    disruption: number;
    synchrony: number;
  }) => void;
  getBranchNodes: () => BranchNode[];
  getAvailableChoices: () => Choice[];
  isChoiceAvailable: (choice: Choice) => boolean;
}

export const useQNCE = (): QNCEReturn => {
  const [currentNodeId, setCurrentNodeId] = useState('start');
  const [flags, setFlags] = useState<Record<string, boolean | number | string>>({});
  const [history, setHistory] = useState<string[]>(['start']);
  const [variables, setVariables] = useState({
    curiosity: 0,
    coherence: 0,
    disruption: 0,
    synchrony: 0,
  });

  const [unlockedNodes, setUnlockedNodes] = useState<string[]>([]);
  const [delayedConsequences, setDelayedConsequences] = useState<{ nodeId: string; message: string; triggered: boolean }[]>([]);
  const [recentActions, setRecentActions] = useState<string[]>([]);

  // Check if a choice is available based on requirements
  const isChoiceAvailable = useCallback((choice: Choice): boolean => {
    // Check flag requirements
    if (choice.requirements?.flags) {
      for (const [flagName, requiredValue] of Object.entries(choice.requirements.flags)) {
        if (flags[flagName] !== requiredValue) {
          return false;
        }
      }
    }

    // Check variable requirements
    if (choice.requirements?.variables) {
      for (const [varName, requirements] of Object.entries(choice.requirements.variables)) {
        const currentValue = variables[varName as keyof typeof variables];
        if (requirements.min !== undefined && currentValue < requirements.min) {
          return false;
        }
        if (requirements.max !== undefined && currentValue > requirements.max) {
          return false;
        }
      }
    }

    return true;
  }, [flags, variables]);

  const makeChoice = (choiceIndex: number) => {
    const currentNode = NODES.find(node => node.id === currentNodeId);
    if (!currentNode) return;

    const availableChoices = currentNode.choices.filter(isChoiceAvailable);
    const choice = availableChoices[choiceIndex];
    if (!choice) return;

    // Track the choice made
    trackStoryEvent.choice(choice.nextNodeId);

    // Handle immediate consequences
    if (choice.consequences?.immediate) {
      setRecentActions(prev => [choice.consequences!.immediate!, ...prev.slice(0, 4)]);
    }

    // Handle delayed consequences
    if (choice.consequences?.delayed) {
      setDelayedConsequences(prev => [
        ...prev,
        ...choice.consequences!.delayed!.map(dc => ({ ...dc, triggered: false }))
      ]);
    }

    // Handle unlocks
    if (choice.unlocks) {
      setUnlockedNodes(prev => [...new Set([...prev, ...choice.unlocks!])]);
    }

    if (choice.flagEffects) {
      setFlags(prev => ({ ...prev, ...choice.flagEffects }));
    }

    if (choice.variableEffects) {
      setVariables(prev => {
        const newVars = { ...prev };
        if (choice.variableEffects!.curiosity !== undefined) {
          newVars.curiosity += choice.variableEffects!.curiosity;
        }
        if (choice.variableEffects!.coherence !== undefined) {
          newVars.coherence += choice.variableEffects!.coherence;
        }
        if (choice.variableEffects!.disruption !== undefined) {
          newVars.disruption += choice.variableEffects!.disruption;
        }
        if (choice.variableEffects!.synchrony !== undefined) {
          newVars.synchrony += choice.variableEffects!.synchrony;
        }
        return newVars;
      });
    }

    // Check for delayed consequences that should trigger
    setDelayedConsequences(prev => 
      prev.map(dc => {
        if (!dc.triggered && dc.nodeId === choice.nextNodeId) {
          setRecentActions(prevActions => [dc.message, ...prevActions.slice(0, 4)]);
          return { ...dc, triggered: true };
        }
        return dc;
      })
    );

    // Track story progression to new node
    trackStoryEvent.progress(choice.nextNodeId);

    setCurrentNodeId(choice.nextNodeId);
    setHistory(prev => [...prev, choice.nextNodeId]);
  };

  const reset = () => {
    setCurrentNodeId('start');
    setFlags({});
    setHistory(['start']);
    setVariables({
      curiosity: 0,
      coherence: 0,
      disruption: 0,
      synchrony: 0,
    });
    setUnlockedNodes([]);
    setDelayedConsequences([]);
    setRecentActions([]);
  };

  const getAvailableChoices = useCallback((): Choice[] => {
    const currentNode = NODES.find(node => node.id === currentNodeId);
    if (!currentNode) return [];
    return currentNode.choices.filter(isChoiceAvailable);
  }, [currentNodeId, isChoiceAvailable]);

  const initializeFromStartingPoint = useCallback((startingPointId: string, initialVariables: {
    curiosity: number;
    coherence: number;
    disruption: number;
    synchrony: number;
  }) => {
    let startNodeId = 'start';
    
    // Map starting points to their corresponding initial nodes
    switch (startingPointId) {
      case 'forgotten_truth':
        startNodeId = 'forgotten_truth_intro';
        break;
      case 'classic':
      case 'mystery':
      case 'harmony':
      case 'chaos':
      default:
        startNodeId = 'start';
        break;
    }

    setCurrentNodeId(startNodeId);
    setFlags({});
    setHistory([startNodeId]);
    setVariables(initialVariables);
  }, []);

  const getBranchNodes = useCallback((): BranchNode[] => {
    // Create a map of current node and its connections
    const currentNodeObj = NODES.find(node => node.id === currentNodeId);
    
    // Generate positions for nodes (expanded grid layout with better spacing)
    const nodePositions: Record<string, { x: number; y: number }> = {};
    const x = 120;  // Increased start position
    const y = 80;   // Increased start position
    
    // Position visited nodes first with better spacing
    history.forEach((nodeId, index) => {
      nodePositions[nodeId] = { 
        x: x + (index * 180),  // Increased horizontal spacing from 120 to 180
        y: y + (Math.floor(index / 5) * 120)  // Increased vertical spacing from 80 to 120, reduced nodes per row from 6 to 5
      };
    });
    
    // Add current available choices with better positioning
    if (currentNodeObj) {
      currentNodeObj.choices.forEach((choice, index) => {
        const nextNodeId = choice.nextNodeId;
        if (!nodePositions[nextNodeId]) {
          nodePositions[nextNodeId] = { 
            x: x + (history.length * 180) + (index * 150),  // Increased spacing
            y: y + (Math.floor(history.length / 5) * 120) + 100  // Better vertical positioning
          };
        }
      });
    }

    // Convert to BranchNode format
    const branchNodes: BranchNode[] = [];
    const processedNodes = new Set<string>();

    // Add visited nodes
    history.forEach(nodeId => {
      const node = NODES.find(n => n.id === nodeId);
      if (node && !processedNodes.has(nodeId)) {
        processedNodes.add(nodeId);
        branchNodes.push({
          id: nodeId,
          title: node.text.slice(0, 20) + (node.text.length > 20 ? '...' : ''),
          isVisited: true,
          isCurrent: nodeId === currentNodeId,
          isAvailable: true,
          position: nodePositions[nodeId] || { x: 100, y: 100 },
          connections: node.choices.map(choice => choice.nextNodeId)
        });
      }
    });

    // Add available next nodes
    if (currentNodeObj) {
      currentNodeObj.choices.forEach(choice => {
        const nextNodeId = choice.nextNodeId;
        const nextNode = NODES.find(n => n.id === nextNodeId);
        if (nextNode && !processedNodes.has(nextNodeId)) {
          processedNodes.add(nextNodeId);
          branchNodes.push({
            id: nextNodeId,
            title: choice.text,
            isVisited: false,
            isCurrent: false,
            isAvailable: true,
            position: nodePositions[nextNodeId] || { x: 300, y: 200 },
            connections: []
          });
        }
      });
    }

    return branchNodes;
  }, [currentNodeId, history]);

  const currentNode = NODES.find(node => node.id === currentNodeId) || NODES[0];

  return {
    currentNode,
    flags,
    history,
    variables,
    unlockedNodes,
    delayedConsequences,
    recentActions,
    makeChoice,
    reset,
    initializeFromStartingPoint,
    getBranchNodes,
    getAvailableChoices,
    isChoiceAvailable,
  };
};
