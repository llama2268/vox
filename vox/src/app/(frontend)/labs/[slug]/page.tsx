import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import { PersonCard, type PersonCardData } from '@/components/PersonCard'
import { ArticleCard, type ArticleCardData } from '@/components/ArticleCard'
import type { Lab, User } from '@/payload-types'

type Args = {
    params: Promise<{
        slug: string
    }>
}

export default async function LabDetailPage({ params }: Args) {
    const { slug } = await params
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
        collection: 'labs',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
        limit: 1,
    })

    const lab = result.docs[0] as Lab | undefined

    if (!lab) {
        notFound()
    }

    // Fetch articles from lab members
    const labMemberIds = [
        ...(lab.principalInvestigators || []),
        ...(lab.students || []),
    ]
        .filter((member): member is User => typeof member !== 'number')
        .map((member) => member.id)

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
                        in: labMemberIds,
                    },
                },
            ],
        },
        depth: 1,
        limit: 10,
        sort: '-publishedDate',
    })

    const pis = (lab.principalInvestigators || []).filter(
        (pi): pi is User => typeof pi !== 'number',
    )
    const students = (lab.students || []).filter(
        (student): student is User => typeof student !== 'number',
    )

    return (
        <div className="container py-24">
            <div className="max-w-6xl mx-auto">
                {/* Lab Header */}
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{lab.name}</h1>

                    {lab.researchAreas && lab.researchAreas.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {lab.researchAreas.map((area, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-primary/10 text-primary rounded-md text-sm font-medium"
                                >
                                    {area.area}
                                </span>
                            ))}
                        </div>
                    )}
                </header>

                {/* Lab Description */}
                {lab.description && (
                    <section className="mb-12">
                        <RichText data={lab.description} enableGutter={false} />
                    </section>
                )}

                {/* Principal Investigators */}
                {pis.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">Principal Investigators</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pis.map((pi) => (
                                <PersonCard key={pi.id} person={pi as PersonCardData} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Students */}
                {students.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">Lab Members</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {students.map((student) => (
                                <PersonCard key={student.id} person={student as PersonCardData} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Publications */}
                {articles.docs.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">Recent Publications</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {articles.docs.map((article) => (
                                <ArticleCard key={article.id} article={article as ArticleCardData} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Contact Information */}
                {(lab.website || lab.contactEmail || lab.location) && (
                    <section className="p-6 bg-muted rounded-lg">
                        <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                        <div className="space-y-2 text-foreground/80">
                            {lab.institution && (
                                <div>
                                    <span className="font-medium">Institution:</span> {lab.institution}
                                </div>
                            )}
                            {lab.department && (
                                <div>
                                    <span className="font-medium">Department:</span> {lab.department}
                                </div>
                            )}
                            {lab.website && (
                                <div>
                                    <span className="font-medium">Website:</span>{' '}
                                    <a
                                        href={lab.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline"
                                    >
                                        {lab.website}
                                    </a>
                                </div>
                            )}
                            {lab.contactEmail && (
                                <div>
                                    <span className="font-medium">Email:</span>{' '}
                                    <a href={`mailto:${lab.contactEmail}`} className="text-primary hover:underline">
                                        {lab.contactEmail}
                                    </a>
                                </div>
                            )}
                            {lab.location && (
                                <div>
                                    <span className="font-medium">Location:</span>{' '}
                                    {[lab.location.building, lab.location.room, lab.location.address]
                                        .filter(Boolean)
                                        .join(', ')}
                                </div>
                            )}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
    const { slug } = await params
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
        collection: 'labs',
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
    })

    const lab = result.docs[0]

    if (!lab) {
        return {
            title: 'Lab Not Found',
        }
    }

    return {
        title: `${lab.name} | VOX`,
    }
}
