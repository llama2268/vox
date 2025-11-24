import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { isAdmin } from '../../access/isAdmin'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: isAdmin,
    create: async ({ req }) => {
      // Allow initial admin creation if enabled and no admins exist
      if (process.env.ALLOW_INITIAL_ADMIN_CREATION === 'true') {
        const { payload } = req
        const admins = await payload.find({
          collection: 'users',
          where: {
            type: {
              equals: 'admin',
            },
          },
          limit: 1,
        })

        // If no admins exist, allow creation
        if (admins.docs.length === 0) {
          return true
        }
      }

      // Otherwise, only admins can create users
      return isAdmin({ req })
    },
    delete: isAdmin,
    read: authenticated,
    update: ({ req: { user } }) => {
      if ((user as any)?.type === 'admin') return true
      return {
        id: {
          equals: user?.id,
        },
      }
    },
  },
  admin: {
    defaultColumns: ['firstName', 'lastName', 'email', 'type'],
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'student',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Principal Investigator', value: 'pi' },
        { label: 'Student', value: 'student' },
      ],
      required: true,
      saveToJWT: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'bio',
      type: 'richText',
    },
    {
      name: 'researchInterests',
      type: 'array',
      fields: [
        {
          name: 'interest',
          type: 'text',
        },
      ],
    },
    {
      name: 'website',
      type: 'text',
    },
    {
      name: 'orcid',
      type: 'text',
      label: 'ORCID',
    },
    {
      name: 'googleScholar',
      type: 'text',
      label: 'Google Scholar',
    },
    // Affiliation will be a relationship field added later or we can add it now if Labs exists.
    // Since Labs doesn't exist yet, we might need to add it after Labs is created or use a string for now?
    // The design doc says `affiliation: [Lab]`.
    // I will add the relationship field, Payload allows circular dependencies if handled correctly or if we just define it.
    // But to be safe and avoid compilation errors if Labs isn't registered, I'll define it.
    // Actually, Payload resolves relationships by slug string, so it's fine even if the file isn't there yet, as long as it's registered in config eventually.
    {
      name: 'affiliation',
      type: 'relationship',
      relationTo: 'labs',
      hasMany: true,
    },
  ],
  timestamps: true,
}
