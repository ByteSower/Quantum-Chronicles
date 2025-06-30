import type { NarrativeNode } from '../types';

export const nodes: NarrativeNode[] = [
  {
    nodeId: 'partIV:intro',
    text: `**Part IV: The Antarctic Discovery**

Deep beneath three kilometers of ice, near the mysterious Vostok Subglacial Lake, lies a secret that will reshape everything humanity believes about its past and future. The discovery happened by accident—or so the official reports claim.

In reality, the Ordo Aeturnum had been funding ice-core research for decades, following orbital anomaly data that suggested something massive lay buried in the Antarctic wastes. When their carefully placed research team finally breached the ice barrier, they found something that defied all explanation.`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partIV:theDiscovery' }]
  },
  {
    nodeId: 'partIV:theDiscovery',
    text: `The first sign was the heat signature—a steady thermal bloom emanating from what should have been frozen rock. As the drilling team penetrated deeper, their instruments registered impossible readings: geometric structures that bent light around corners, spaces that were larger inside than outside, and a persistent harmonic vibration that made sensitive equipment malfunction.

Dr. Sarah Chen, the expedition leader, noted in her final log entry: "The architecture down here follows no earthly principles. It's as if someone built a cathedral for giants, then folded it through dimensions we don't have names for."

When the team finally broke through into the chamber itself, they found the Heart Fragment.`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partIV:heartFragment' }]
  },
  {
    nodeId: 'partIV:heartFragment',
    text: `The Heart Fragment is a crystalline structure roughly the size of a city block, but its apparent dimensions shift depending on the viewing angle. It pulses with an inner light that registers on no known spectrum, casting shadows that move independently of any light source.

The fragment is not quite alive, but neither is it entirely mechanical. It responds to human presence, particularly to individuals with Echo awareness. When Dr. Evasco's assistant, Marcus Webb, approached within fifty meters, the Fragment's pulse rate doubled, and complex geometric patterns began manifesting in the ice around it.

Most disturbing of all, the research team began experiencing shared dreams—visions of a world that existed before the ice, before the continents took their current shapes, before humanity learned to walk upright.`,
    choices: [
      { choiceText: 'Explore the shared dreams', nextNodeId: 'partIV:sharedVisions' },
      { choiceText: 'Learn about the quantum effects', nextNodeId: 'partIV:quantumAnomalies' }
    ]
  },
  {
    nodeId: 'partIV:sharedVisions',
    text: `The dreams began subtly—team members reporting unusually vivid sleep patterns, awakening with memories of places they'd never been. But as exposure to the Fragment continued, the visions became more coherent and shared.

They dreamed of the unfallen world: vast crystal spires that sang in harmony, beings of light moving through spaces where physics worked differently, gardens of living geometry that responded to pure thought. These were not random fantasies but memories—racial memories encoded in human DNA by the Echo Protocol.

Dr. Chen's team began to understand that they weren't just excavating an artifact. They were uncovering a transmission station that was actively downloading the collective memory of an extinct civilization directly into their minds.

Some team members found the experience transcendent. Others, like geologist Dr. Reeves, suffered complete psychological breakdown after receiving what he described as "ten thousand years of history in ten seconds."`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partIV:emergingConflict' }]
  },
  {
    nodeId: 'partIV:quantumAnomalies',
    text: `The Fragment's influence extends far beyond the immediate excavation site. Satellite arrays in low Earth orbit began registering temporal distortions—atomic clocks that should synchronize to the nanosecond started showing variance of up to several minutes.

GPS systems near the Antarctic continent became unreliable, sometimes showing positions that placed users hundreds of kilometers from their actual location. More troubling, some satellites recorded timestamps that preceded their own launch dates.

Dr. Petrov, the expedition's quantum physicist, measured localized gravity fluctuations around the Fragment that suggested it was somehow manipulating the fabric of spacetime itself. His final report, classified immediately upon transmission, concluded: "This technology operates on principles that make our understanding of physics look like cave paintings."

The Fragment wasn't just responding to human presence—it was actively reshaping reality in its immediate vicinity to more closely match the original Eden parameters.`,
    choices: [{ choiceText: 'Continue...', nextNodeId: 'partIV:emergingConflict' }]
  },
  {
    nodeId: 'partIV:emergingConflict',
    text: `Word of the discovery could not be contained long. Despite the Ordo Aeturnum's efforts to maintain secrecy, the quantum anomalies were too widespread to hide. The Veil's monitoring stations detected the distortions within hours, while Choir-affiliated researchers worldwide began reporting unprecedented Echo Protocol activity.

Within seventy-two hours of the Fragment's exposure, all three Keeper factions had teams en route to Antarctica. The site, ostensibly under international scientific protection, became a powder keg of competing agendas.

The Ordo Aeturnum, having financed the discovery, claimed primary research rights. The Veil demanded immediate containment protocols. The Choir sent Dr. Lian Evasco herself, believing her unique linguistic abilities might allow direct communication with the Fragment.

As these forces converged on the most remote place on Earth, the Fragment's pulse rate continued to increase, and the boundary between dream and reality began to blur for everyone within a hundred-kilometer radius.

*(More chapters unlocking soon — stay tuned!)*`,
    choices: [{ choiceText: 'Return to the Core Story', nextNodeId: 'ft_characterFocus' }]
  }
];

export const segmentId = 'forgottenTruth_partIV';
