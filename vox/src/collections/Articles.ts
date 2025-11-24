import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { isAdmin } from '../access/isAdmin'

export const Articles: CollectionConfig = {
    slug: 'articles',
    versions: {
        drafts: true,
    },
    access: {
        create: authenticated,
        delete: isAdmin,
        read: authenticated,
        update: authenticated,
    },
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'status', 'updatedAt'],
    },
    hooks: {
        beforeChange: [
            ({ data, operation }) => {
                if (operation === 'create' || operation === 'update') {
                    if (data.status === 'ready_for_review' && !data.submittedDate) {
                        data.submittedDate = new Date().toISOString()
                    }
                    if (data.status === 'published' && !data.publishedDate) {
                        data.publishedDate = new Date().toISOString()
                    }
                }
                return data
            },
        ],
    },
    fields: [
        {
            name: 'title',
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
                        if (!value && data?.title) {
                            return data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
                        }
                        return value
                    },
                ],
            },
        },
        {
            name: 'authors',
            type: 'relationship',
            relationTo: 'users',
            hasMany: true,
            required: true,
        },
        {
            name: 'correspondingAuthor',
            type: 'relationship',
            relationTo: 'users',
            required: true,
        },
        {
            name: 'lab',
            type: 'relationship',
            relationTo: 'labs',
        },
        {
            name: 'journal',
            type: 'relationship',
            relationTo: 'journals',
        },
        {
            name: 'abstract',
            type: 'textarea',
        },
        {
            name: 'content',
            type: 'richText',
        },
        {
            name: 'keywords',
            type: 'array',
            fields: [
                {
                    name: 'keyword',
                    type: 'text',
                },
            ],
        },
        {
            name: 'doi',
            type: 'text',
            label: 'DOI',
        },
        {
            name: 'publishedDate',
            type: 'date',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'submittedDate',
            type: 'date',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'status',
            type: 'select',
            defaultValue: 'draft',
            options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Ready for Review', value: 'ready_for_review' },
                { label: 'Under Review', value: 'under_review' },
                { label: 'Changes Requested', value: 'changes_requested' },
                { label: 'Approved', value: 'approved' },
                { label: 'Ready for Publishing', value: 'ready_for_publishing' },
                { label: 'Published', value: 'published' },
                { label: 'Rejected', value: 'rejected' },
            ],
            required: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'reviews',
            type: 'array',
            access: {
                read: ({ req: { user } }) => {
                    if (user?.type === 'admin') return true
                    // Authors should probably see reviews unless confidential?
                    // For now restricting to admin.
                    return false
                },
                update: ({ req: { user } }) => user?.type === 'admin',
            },
            fields: [
                {
                    name: 'reviewer',
                    type: 'relationship',
                    relationTo: 'users',
                },
                {
                    name: 'reviewDate',
                    type: 'date',
                },
                {
                    name: 'decision',
                    type: 'select',
                    options: [
                        { label: 'Approve', value: 'approve' },
                        { label: 'Request Changes', value: 'request_changes' },
                        { label: 'Reject', value: 'reject' },
                    ],
                },
                {
                    name: 'comments',
                    type: 'richText',
                },
                {
                    name: 'confidentialNotes',
                    type: 'richText',
                },
            ],
        },
        {
            name: 'changeRequests',
            type: 'array',
            fields: [
                {
                    name: 'requestedBy',
                    type: 'relationship',
                    relationTo: 'users',
                },
                {
                    name: 'requestDate',
                    type: 'date',
                },
                {
                    name: 'changes',
                    type: 'richText',
                },
                {
                    name: 'resolved',
                    type: 'checkbox',
                },
                {
                    name: 'resolvedDate',
                    type: 'date',
                },
            ],
        },
        {
            name: 'assignedReviewers',
            type: 'relationship',
            relationTo: 'users',
            hasMany: true,
            access: {
                read: ({ req: { user } }) => user?.type === 'admin',
                update: ({ req: { user } }) => user?.type === 'admin',
            },
        },
        {
            name: 'volume',
            type: 'text',
        },
        {
            name: 'issue',
            type: 'text',
        },
        {
            name: 'pages',
            type: 'group',
            fields: [
                {
                    name: 'start',
                    type: 'text',
                },
                {
                    name: 'end',
                    type: 'text',
                },
            ],
        },
        {
            name: 'citations',
            type: 'richText',
        },
        {
            name: 'supplementaryMaterials',
            type: 'array',
            fields: [
                {
                    name: 'file',
                    type: 'upload',
                    relationTo: 'media',
                },
                {
                    name: 'description',
                    type: 'text',
                },
            ],
        },
        {
            name: 'pdfVersion',
            type: 'upload',
            relationTo: 'media',
        },
    ],
}
