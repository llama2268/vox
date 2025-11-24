import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'

import { contactForm as contactFormData } from './contact-form'
import { contact as contactPageData } from './contact-page'
import { home } from './home'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { imageHero1 } from './image-hero-1'

const collections: CollectionSlug[] = [
  'media',
  'pages',
  'forms',
  'form-submissions',
  'search',
]

const globals: GlobalSlug[] = ['header', 'footer']


// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {
          navItems: [],
        },
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Seeding media...`)

  const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] = await Promise.all([
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post1.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post2.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post3.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp',
    ),
  ])

  const [image1Doc, image2Doc, image3Doc, imageHomeDoc] = await Promise.all([
    payload.create({
      collection: 'media',
      data: image1,
      file: image1Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image2Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image3Buffer,
    }),
    payload.create({
      collection: 'media',
      data: imageHero1,
      file: hero1Buffer,
    }),
  ])


  payload.logger.info(`— Seeding contact form...`)

  const contactForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: contactFormData,
  })

  payload.logger.info(`— Seeding pages...`)

  const [_, contactPage] = await Promise.all([
    payload.create({
      collection: 'pages',
      depth: 0,
      data: home({ heroImage: imageHomeDoc, metaImage: image2Doc }),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: contactPageData({ contactForm: contactForm }),
    }),
  ])

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Articles',
              url: '/articles',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Labs',
              url: '/labs',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'People',
              url: '/people',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Journals',
              url: '/journals',
            },
          },
          {
            link: {
              type: 'reference',
              label: 'Contact',
              reference: {
                relationTo: 'pages',
                value: contactPage.id,
              },
            },
          },
        ],
      },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Admin',
              url: '/admin',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Source Code',
              newTab: true,
              url: 'https://github.com/payloadcms/payload/tree/main/templates/website',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Payload',
              newTab: true,
              url: 'https://payloadcms.com/',
            },
          },
        ],
      },
    }),
  ])

  payload.logger.info(`— Seeding VOX-specific data...`)

  // Delete existing VOX data
  payload.logger.info(`— Clearing VOX collections...`)
  await Promise.all([
    payload.db.deleteMany({ collection: 'users', req, where: {} }),
    payload.db.deleteMany({ collection: 'labs', req, where: {} }),
    payload.db.deleteMany({ collection: 'journals', req, where: {} }),
    payload.db.deleteMany({ collection: 'articles', req, where: {} }),
  ])

  // Create demo admin user for journal editors
  payload.logger.info(`— Creating demo admin user...`)
  const demoAuthor = await payload.create({
    collection: 'users',
    data: {
      type: 'admin',
      firstName: 'Demo',
      lastName: 'Admin',
      email: 'demo-admin@example.com',
      password: 'password',
    },
  })

  // Import VOX seed data
  const { users: usersData } = await import('./users-data')
  const { labs: labsData } = await import('./labs-data')
  const { journal: journalData } = await import('./journal-data')
  const { articles: articlesData } = await import('./articles-data')

  // Create users (PIs and students)
  payload.logger.info(`— Creating researchers...`)
  const userData = usersData()
  const createdUsers = await Promise.all(
    userData.map((user, index) =>
      payload.create({
        collection: 'users',
        data: {
          ...user,
          email: `${user.firstName.toLowerCase()}.${user.lastName.toLowerCase()}@example.com`,
          password: 'password',
        },
      })
    )
  )

  const piIds = createdUsers.filter(u => u.type === 'pi').map(u => u.id)
  const studentIds = createdUsers.filter(u => u.type === 'student').map(u => u.id)

  // Create labs
  payload.logger.info(`— Creating labs...`)
  const labData = labsData({ pis: piIds, students: studentIds })
  const createdLabs = await Promise.all(
    labData.map(lab =>
      payload.create({
        collection: 'labs',
        data: lab,
      })
    )
  )

  // Update users with lab affiliations
  payload.logger.info(`— Updating user affiliations...`)
  await Promise.all([
    // PI 1 -> Lab 1
    payload.update({
      collection: 'users',
      id: piIds[0],
      data: { affiliation: [createdLabs[0].id] },
    }),
    // PI 2 -> Lab 2
    payload.update({
      collection: 'users',
      id: piIds[1],
      data: { affiliation: [createdLabs[1].id] },
    }),
    // PI 3 -> Lab 3
    payload.update({
      collection: 'users',
      id: piIds[2],
      data: { affiliation: [createdLabs[2].id] },
    }),
    // Students -> their respective labs
    ...studentIds.slice(0, 2).map(id =>
      payload.update({
        collection: 'users',
        id,
        data: { affiliation: [createdLabs[0].id] },
      })
    ),
    ...studentIds.slice(2, 4).map(id =>
      payload.update({
        collection: 'users',
        id,
        data: { affiliation: [createdLabs[1].id] },
      })
    ),
    ...studentIds.slice(4, 6).map(id =>
      payload.update({
        collection: 'users',
        id,
        data: { affiliation: [createdLabs[2].id] },
      })
    ),
  ])

  // Create journal
  payload.logger.info(`— Creating journal...`)
  const voxJournal = await payload.create({
    collection: 'journals',
    data: journalData([demoAuthor.id]),
  })

  // Create articles
  payload.logger.info(`— Creating articles...`)
  const articleData = articlesData({
    userIds: createdUsers.map(u => u.id),
    journalId: voxJournal.id,
    labIds: createdLabs.map(l => l.id),
  })

  await Promise.all(
    articleData.map(article =>
      payload.create({
        collection: 'articles',
        data: article,
      })
    )
  )

  payload.logger.info('Seeded database successfully!')
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}
