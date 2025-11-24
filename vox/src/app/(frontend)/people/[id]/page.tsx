import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import { ArticleCard, type ArticleCardData } from '@/components/ArticleCard'
import { Media } from '@/components/Media'
import type { User, Lab } from '@/payload-types'
import Link from 'next/link'

type Args = {
    params: Promise<{
        id: string
    }>
}

export default async function PersonProfilePage({ params }: Args) {
    const { id } = await params
    const payload = await getPayload({ config: configPromise })

    const person = await payload.findByID({
        collection: 'users',
        id: parseInt(id),
        depth: 2,
    }) as User

    if (!person) {
        notFound()
    }

    // Fetch articles by this person
    const articles = await payload.find({
        collection: 'articles',
        where: {
            and: [
                {
                    _status: {
                        equals: 'published',
                    },
                },
                {
                    authors: {
                        contains: person.id,
                    },
                },
            ],
        },
        depth: 1,
        limit: 20,
        sort: '-publishedDate',
    })

    const fullName = `${person.firstName} ${person.lastName}`
    const roleLabel =
        person.type === 'pi'
            ? 'Principal Investigator'
            : person.type === 'student'
                ? 'Student'
                : 'Admin'

    const affiliations = (person.affiliation || []).filter(
        (aff): aff is Lab => typeof aff !== 'number',
    )

    return (
        <div className="container py-24">
            <div className="max-w-5xl mx-auto">
                {/* Profile Header */}
                <header className="mb-12 flex flex-col md:flex-row gap-8 items-start">
                    {person.profileImage && typeof person.profileImage !== 'number' && (
                        <div className="flex-shrink-0">
                            <div className="w-48 h-48 rounded-full overflow-hidden">
                                <Media
                                    resource={person.profileImage}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex-1">
                        <h1 className="text-4xl md:text-5xl font-bold mb-2">{fullName}</h1>
                        {person.title && (
                            <p className="text-xl text-muted-foreground mb-3">{person.title}</p>
                        )}
                        <p className="text-lg text-primary font-medium mb-4">{roleLabel}</p>

                        {/* External Links */}
                        <div className="flex flex-wrap gap-4">
                            {person.website && (
                                <a
                                    href={person.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary hover:underline"
                                >
                                    Website
                                </a>
                            )}
                            {person.orcid && (
                                <a
                                    href={`https://orcid.org/${person.orcid}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary hover:underline"
                                >
                                    ORCID
                                </a>
                            )}
                            {person.googleScholar && (
                                <a
                                    href={person.googleScholar}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary hover:underline"
                                >
                                    Google Scholar
                                </a>
                            )}
                        </div>
                    </div>
                </header>

                {/* Bio */}
                {person.bio && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4">Biography</h2>
                        <RichText data={person.bio} enableGutter={false} />
                    </section>
                )}

                {/* Research Interests */}
                {person.researchInterests && person.researchInterests.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4">Research Interests</h2>
                        <div className="flex flex-wrap gap-2">
                            {person.researchInterests.map((interest, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-primary/10 text-primary rounded-md text-sm"
                                >
                                    {interest.interest}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Affiliations */}
                {affiliations.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4">Affiliations</h2>
                        <div className="space-y-2">
                            {affiliations.map((lab) => (
                                <div key={lab.id}>
                                    <Link
                                        href={`/labs/${lab.slug}`}
                                        className="text-primary hover:underline font-medium"
                                    >
                                        {lab.name}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Publications */}
                {articles.docs.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold mb-6">Publications</h2>
                        <div className="space-y-4">
                            {articles.docs.map((article) => (
                                <ArticleCard key={article.id} article={article as ArticleCardData} />
                            ))}
                        </div>
                    </section>
                )}

                {articles.docs.length === 0 && (
                    <section>
                        <h2 className="text-2xl font-bold mb-6">Publications</h2>
                        <p className="text-muted-foreground">No publications yet.</p>
                    </section>
                )}
            </div>
        </div>
    )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
    const { id } = await params
    const payload = await getPayload({ config: configPromise })

    try {
        const person = await payload.findByID({
            collection: 'users',
            id: parseInt(id),
        })

        const fullName = `${person.firstName} ${person.lastName}`

        return {
            title: `${fullName} | VOX`,
            description: person.title || undefined,
        }
    } catch {
        return {
            title: 'Person Not Found',
        }
    }
}
