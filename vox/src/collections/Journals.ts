import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { isAdmin } from '../access/isAdmin'

export const Journals: CollectionConfig = {
    slug: 'journals',
    access: {
        create: isAdmin,
        delete: isAdmin,
        read: anyone,
        update: isAdmin,
    },
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'issn'],
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            defaultValue: 'VOX',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                position: 'sidebar',
            },
            hooks: {
                beforeValidate: [
                    ({ value, data }) => {
                        if (!value && data?.name) {
                            return data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
                        }
                        return value
                    },
                ],
            },
        },
        {
            name: 'description',
            type: 'richText',
        },
        {
            name: 'issn',
            type: 'text',
            label: 'ISSN',
        },
        {
            name: 'coverImage',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'editors',
            type: 'relationship',
            relationTo: 'users',
            hasMany: true,
            filterOptions: {
                type: {
                    equals: 'admin',
                },
            },
        },
        {
            name: 'scope',
            type: 'richText',
        },
        {
            name: 'submissionGuidelines',
            type: 'richText',
        },
        {
            name: 'frequency',
            type: 'select',
            options: [
                { label: 'Monthly', value: 'monthly' },
                { label: 'Quarterly', value: 'quarterly' },
                { label: 'Biannually', value: 'biannually' },
                { label: 'Annually', value: 'annually' },
            ],
        },
        {
            name: 'openAccess',
            type: 'checkbox',
            defaultValue: true,
        },
    ],
}
