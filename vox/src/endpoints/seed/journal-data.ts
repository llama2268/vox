import type { Journal } from '@/payload-types'

export const journal = (editorIds: number[]): Omit<Journal, 'id' | 'updatedAt' | 'createdAt'> => ({
    name: 'VOX: Journal of Interdisciplinary Research',
    slug: 'vox',
    issn: '2024-XXXX',
    description: {
        root: {
            type: 'root',
            children: [
                {
                    type: 'paragraph',
                    children: [
                        {
                            type: 'text',
                            text: 'VOX is a premier interdisciplinary journal publishing cutting-edge research across cognitive science, computational biology, and social psychology. We aim to foster collaboration and innovation across traditional disciplinary boundaries.',
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
    scope: {
        root: {
            type: 'root',
            children: [
                {
                    type: 'paragraph',
                    children: [
                        {
                            type: 'text',
                            text: 'VOX publishes original research articles, reviews, and perspectives that advance our understanding of complex phenomena through interdisciplinary approaches. We welcome submissions that:',
                            version: 1,
                        },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1,
                },
                {
                    type: 'list',
                    listType: 'bullet',
                    start: 1,
                    tag: 'ul',
                    children: [
                        {
                            type: 'listitem',
                            children: [
                                {
                                    type: 'text',
                                    text: 'Bridge multiple disciplines to address important research questions',
                                    version: 1,
                                },
                            ],
                            direction: 'ltr',
                            format: '',
                            indent: 0,
                            version: 1,
                        },
                        {
                            type: 'listitem',
                            children: [
                                {
                                    type: 'text',
                                    text: 'Employ rigorous methodologies and innovative analytical approaches',
                                    version: 1,
                                },
                            ],
                            direction: 'ltr',
                            format: '',
                            indent: 0,
                            version: 1,
                        },
                        {
                            type: 'listitem',
                            children: [
                                {
                                    type: 'text',
                                    text: 'Contribute to theoretical advancement and practical applications',
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
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
        },
    },
    editors: editorIds,
})
