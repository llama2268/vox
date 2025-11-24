import type { Lab } from '@/payload-types'

export const labs = (userIds: { pis: number[]; students: number[] }): Omit<Lab, 'id' | 'updatedAt' | 'createdAt'>[] => [
    {
        name: 'Cognitive Neuroscience Lab',
        slug: 'cognitive-neuroscience-lab',
        institution: 'University Research Institute',
        department: 'Department of Psychology',
        description: {
            root: {
                type: 'root',
                children: [
                    {
                        type: 'paragraph',
                        children: [
                            {
                                type: 'text',
                                text: 'Investigating the neural mechanisms underlying human cognition, memory, and decision-making processes. Our lab focuses on understanding how the brain processes information, forms memories, and makes decisions. We use a combination of behavioral experiments, neuroimaging (fMRI, EEG), and computational modeling to investigate these processes.',
                                version: 1,
                            },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                    },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
            },
        },
        principalInvestigators: [userIds.pis[0]],
        students: [userIds.students[0], userIds.students[1]],
        researchAreas: [
            { area: 'Cognitive Neuroscience' },
            { area: 'Memory Systems' },
            { area: 'Decision Making' },
        ],
        location: {
            building: 'Building A',
            room: '301',
            address: '123 Research Drive',
        },
        website: 'https://cogneurolab.example.com',
        contactEmail: 'coglab@example.com',
    },
    {
        name: 'Computational Biology Lab',
        slug: 'computational-biology-lab',
        institution: 'University Research Institute',
        department: 'Department of Biology',
        description: {
            root: {
                type: 'root',
                children: [
                    {
                        type: 'paragraph',
                        children: [
                            {
                                type: 'text',
                                text: 'Developing computational methods to analyze biological data and understand complex biological systems. We develop and apply computational and statistical methods to analyze large-scale biological data. Our research spans genomics, proteomics, and systems biology, with a focus on understanding disease mechanisms and drug discovery.',
                                version: 1,
                            },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                    },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
            },
        },
        principalInvestigators: [userIds.pis[1]],
        students: [userIds.students[2], userIds.students[3]],
        researchAreas: [
            { area: 'Bioinformatics' },
            { area: 'Systems Biology' },
            { area: 'Machine Learning' },
        ],
        location: {
            building: 'Building B',
            room: '205',
            address: '123 Research Drive',
        },
        website: 'https://compbiolab.example.com',
        contactEmail: 'compbio@example.com',
    },
    {
        name: 'Social Psychology Research Group',
        slug: 'social-psychology-research-group',
        institution: 'University Research Institute',
        department: 'Department of Psychology',
        description: {
            root: {
                type: 'root',
                children: [
                    {
                        type: 'paragraph',
                        children: [
                            {
                                type: 'text',
                                text: 'Exploring social behavior, group dynamics, and interpersonal relationships through experimental and field studies. Our research examines how people think about, influence, and relate to one another. We investigate topics such as prejudice, persuasion, group behavior, and social cognition using experimental methods and field studies.',
                                version: 1,
                            },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                    },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
            },
        },
        principalInvestigators: [userIds.pis[2]],
        students: [userIds.students[4], userIds.students[5]],
        researchAreas: [
            { area: 'Social Psychology' },
            { area: 'Group Dynamics' },
            { area: 'Behavioral Science' },
        ],
        location: {
            building: 'Building C',
            room: '410',
            address: '123 Research Drive',
        },
        website: 'https://socialpsychlab.example.com',
        contactEmail: 'socialpsych@example.com',
    },
]
