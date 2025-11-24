import type { User } from '@/payload-types'

export const users = (): Omit<User, 'id' | 'updatedAt' | 'createdAt' | 'email' | 'password'>[] => [
    // Principal Investigators
    {
        type: 'pi',
        firstName: 'Sarah',
        lastName: 'Chen',
        title: 'Professor of Cognitive Neuroscience',
        bio: {
            root: {
                type: 'root',
                children: [
                    {
                        type: 'paragraph',
                        children: [
                            {
                                type: 'text',
                                text: 'Dr. Sarah Chen is a leading researcher in cognitive neuroscience with over 15 years of experience studying memory systems and decision-making processes. Her work has been published in top-tier journals and has received numerous awards.',
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
        researchInterests: [
            { interest: 'Memory consolidation' },
            { interest: 'Neural plasticity' },
            { interest: 'fMRI methods' },
        ],
        website: 'https://sarahchen.example.com',
        orcid: '0000-0001-2345-6789',
        googleScholar: 'https://scholar.google.com/citations?user=example1',
    },
    {
        type: 'pi',
        firstName: 'Michael',
        lastName: 'Rodriguez',
        title: 'Associate Professor of Computational Biology',
        bio: {
            root: {
                type: 'root',
                children: [
                    {
                        type: 'paragraph',
                        children: [
                            {
                                type: 'text',
                                text: 'Dr. Michael Rodriguez specializes in developing machine learning algorithms for biological data analysis. His research focuses on understanding disease mechanisms through computational approaches and has led to several breakthrough discoveries in cancer genomics.',
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
        researchInterests: [
            { interest: 'Bioinformatics' },
            { interest: 'Machine learning' },
            { interest: 'Cancer genomics' },
        ],
        website: 'https://mrodriguez.example.com',
        orcid: '0000-0002-3456-7890',
    },
    {
        type: 'pi',
        firstName: 'Jennifer',
        lastName: 'Park',
        title: 'Professor of Social Psychology',
        bio: {
            root: {
                type: 'root',
                children: [
                    {
                        type: 'paragraph',
                        children: [
                            {
                                type: 'text',
                                text: 'Dr. Jennifer Park is an expert in social cognition and group dynamics. Her research examines how social contexts influence individual behavior and decision-making, with applications to organizational psychology and public policy.',
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
        researchInterests: [
            { interest: 'Social cognition' },
            { interest: 'Group behavior' },
            { interest: 'Organizational psychology' },
        ],
        website: 'https://jpark.example.com',
        orcid: '0000-0003-4567-8901',
        googleScholar: 'https://scholar.google.com/citations?user=example3',
    },
    // Students
    {
        type: 'student',
        firstName: 'Emily',
        lastName: 'Thompson',
        title: 'PhD Candidate',
        bio: {
            root: {
                type: 'root',
                children: [
                    {
                        type: 'paragraph',
                        children: [
                            {
                                type: 'text',
                                text: 'Emily is a PhD candidate studying the neural mechanisms of episodic memory. Her dissertation focuses on how sleep affects memory consolidation using fMRI and behavioral experiments.',
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
        researchInterests: [
            { interest: 'Episodic memory' },
            { interest: 'Sleep and cognition' },
        ],
    },
    {
        type: 'student',
        firstName: 'David',
        lastName: 'Kim',
        title: 'PhD Student',
        bio: {
            root: {
                type: 'root',
                children: [
                    {
                        type: 'paragraph',
                        children: [
                            {
                                type: 'text',
                                text: 'David is investigating decision-making processes under uncertainty using computational modeling and behavioral experiments.',
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
        researchInterests: [
            { interest: 'Decision making' },
            { interest: 'Computational modeling' },
        ],
    },
    {
        type: 'student',
        firstName: 'Aisha',
        lastName: 'Patel',
        title: 'PhD Candidate',
        bio: {
            root: {
                type: 'root',
                children: [
                    {
                        type: 'paragraph',
                        children: [
                            {
                                type: 'text',
                                text: 'Aisha develops deep learning models for predicting protein structure and function from sequence data.',
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
        researchInterests: [
            { interest: 'Protein structure prediction' },
            { interest: 'Deep learning' },
        ],
    },
    {
        type: 'student',
        firstName: 'James',
        lastName: 'Wilson',
        title: 'PhD Student',
        bio: {
            root: {
                type: 'root',
                children: [
                    {
                        type: 'paragraph',
                        children: [
                            {
                                type: 'text',
                                text: 'James works on developing bioinformatics pipelines for analyzing single-cell RNA sequencing data.',
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
        researchInterests: [
            { interest: 'Single-cell genomics' },
            { interest: 'Bioinformatics' },
        ],
    },
    {
        type: 'student',
        firstName: 'Maria',
        lastName: 'Garcia',
        title: 'PhD Candidate',
        bio: {
            root: {
                type: 'root',
                children: [
                    {
                        type: 'paragraph',
                        children: [
                            {
                                type: 'text',
                                text: 'Maria studies the effects of social media on self-perception and group identity formation.',
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
        researchInterests: [
            { interest: 'Social media psychology' },
            { interest: 'Identity formation' },
        ],
    },
    {
        type: 'student',
        firstName: 'Robert',
        lastName: 'Lee',
        title: 'PhD Student',
        bio: {
            root: {
                type: 'root',
                children: [
                    {
                        type: 'paragraph',
                        children: [
                            {
                                type: 'text',
                                text: 'Robert investigates persuasion techniques and their effectiveness in different cultural contexts.',
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
        researchInterests: [
            { interest: 'Persuasion' },
            { interest: 'Cross-cultural psychology' },
        ],
    },
]
