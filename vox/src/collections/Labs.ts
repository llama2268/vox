import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { isAdmin } from '../access/isAdmin'

export const Labs: CollectionConfig = {
    slug: 'labs',
    access: {
        create: isAdmin,
        delete: isAdmin,
        read: anyone,
        update: isAdmin,
    },
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'institution'],
    },
    fields: [
        {
            name: 'name',
            type: 'text',
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
            name: 'principalInvestigators',
            type: 'relationship',
            relationTo: 'users',
            hasMany: true,
            filterOptions: {
                type: {
                    equals: 'pi',
                },
            },
        },
        {
            name: 'students',
            type: 'relationship',
            relationTo: 'users',
            hasMany: true,
            filterOptions: {
                type: {
                    equals: 'student',
                },
            },
        },
        {
            name: 'description',
            type: 'richText',
        },
        {
            name: 'labImage',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'researchAreas',
            type: 'array',
            fields: [
                {
                    name: 'area',
                    type: 'text',
                },
            ],
        },
        {
            name: 'department',
            type: 'text',
        },
        {
            name: 'institution',
            type: 'text',
            required: true,
        },
        {
            name: 'location',
            type: 'group',
            fields: [
                {
                    name: 'building',
                    type: 'text',
                },
                {
                    name: 'room',
                    type: 'text',
                },
                {
                    name: 'address',
                    type: 'text',
                },
            ],
        },
        {
            name: 'contactEmail',
            type: 'email',
        },
        {
            name: 'website',
            type: 'text',
        },
        {
            name: 'established',
            type: 'date',
        },
    ],
}
