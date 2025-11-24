import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import { ArticleCard, type ArticleCardData } from '@/components/ArticleCard'
import type { Journal, User } from '@/payload-types'

type Args = {
    params: Promise<{
        slug: string
    }>
}

export default async function JournalDetailPage({ params }: Args) {
    const { slug } = await params
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
        collection: 'journals',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
        limit: 1,
    })

    const journal = result.docs[0] as Journal | undefined

    if (!journal) {
        notFound()
    }

    // Fetch articles for this journal
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
                    journal: {
                        equals: journal.id,
                    },
                },
            ],
        },
        depth: 1,
        limit: 50,
        sort: '-publishedDate',
    })

    // Group articles by volume and issue
    const articlesByVolume = articles.docs.reduce(
        (acc, article) => {
            const vol = article.volume || 'Uncategorized'
            if (!acc[vol]) acc[vol] = {}
            const iss = article.issue || 'No Issue'
            if (!acc[vol][iss]) acc[vol][iss] = []
            acc[vol][iss].push(article)
            return acc
        },
        {} as Record<string, Record<string, typeof articles.docs>>,
    )

    const editors = (journal.editors || []).filter(
        (editor): editor is User => typeof editor !== 'number',
    )

    return (
        <div className="container py-24">
            <div className="max-w-6xl mx-auto">
                {/* Journal Header */}
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{journal.name}</h1>
                    {journal.issn && (
                        <p className="text-lg text-muted-foreground mb-6">ISSN: {journal.issn}</p>
                    )}
                </header>

                {/* Journal Description */}
                {journal.description && (
                    <section className="mb-12">
                        <RichText data={journal.description} enableGutter={false} />
                    </section>
                )}

                {/* Scope */}
                {journal.scope && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4">Scope</h2>
                        <RichText data={journal.scope} enableGutter={false} />
                    </section>
                )}

                {/* Editors */}
                {editors.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4">Editorial Board</h2>
                        <div className="space-y-2">
                            {editors.map((editor) => (
                                <div key={editor.id}>
                                    <a
                                        href={`/people/${editor.id}`}
                                        className="text-primary hover:underline font-medium"
                                    >
                                        {editor.firstName} {editor.lastName}
                                    </a>
                                    {editor.title && (
                                        <span className="text-muted-foreground ml-2">— {editor.title}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Articles by Volume/Issue */}
                <section>
                    <h2 className="text-2xl font-bold mb-6">Published Articles</h2>

                    {Object.keys(articlesByVolume).length === 0 ? (
                        <p className="text-muted-foreground">No articles published yet.</p>
                    ) : (
                        <div className="space-y-12">
                            {Object.entries(articlesByVolume)
                                .sort(([a], [b]) => b.localeCompare(a))
                                .map(([volume, issues]) => (
                                    <div key={volume}>
                                        <h3 className="text-xl font-bold mb-6 text-primary">
                                            Volume {volume}
                                        </h3>
                                        <div className="space-y-8">
                                            {Object.entries(issues)
                                                .sort(([a], [b]) => b.localeCompare(a))
                                                .map(([issue, articleList]) => (
                                                    <div key={issue}>
                                                        <h4 className="text-lg font-semibold mb-4">Issue {issue}</h4>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {articleList.map((article) => (
                                                                <ArticleCard
                                                                    key={article.id}
                                                                    article={article as ArticleCardData}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
    const { slug } = await params
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
        collection: 'journals',
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
    })

    const journal = result.docs[0]

    if (!journal) {
        return {
            title: 'Journal Not Found',
        }
    }


    return {
        title: `${journal.name} | VOX`,
    }
}
