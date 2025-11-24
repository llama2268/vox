import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { ArticleCard, type ArticleCardData } from '@/components/ArticleCard'
import Link from 'next/link'

export default async function HomePage() {
    const payload = await getPayload({ config: configPromise })

    // Fetch recent articles
    const articles = await payload.find({
        collection: 'articles',
        depth: 1,
        limit: 6,
        sort: '-publishedDate',
        where: {
            _status: {
                equals: 'published',
            },
        },
    })

    // Fetch statistics
    const [labsCount, peopleCount, articlesCount] = await Promise.all([
        payload.count({ collection: 'labs' }),
        payload.count({ collection: 'users' }),
        payload.count({
            collection: 'articles',
            where: { _status: { equals: 'published' } },
        }),
    ])

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary/10 via-background to-background py-24 md:py-32">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            VOX
                        </h1>
                        <p className="text-xl md:text-2xl text-foreground/80 mb-8">
                            A Platform for Academic Excellence
                        </p>
                        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
                            Discover cutting-edge research, connect with leading researchers, and explore
                            innovative labs pushing the boundaries of knowledge.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                href="/articles"
                                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                            >
                                Browse Articles
                            </Link>
                            <Link
                                href="/labs"
                                className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
                            >
                                Explore Labs
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-16 border-y border-border">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                                {articlesCount.totalDocs}
                            </div>
                            <div className="text-muted-foreground">Published Articles</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                                {labsCount.totalDocs}
                            </div>
                            <div className="text-muted-foreground">Research Labs</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                                {peopleCount.totalDocs}
                            </div>
                            <div className="text-muted-foreground">Researchers</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Articles Section */}
            <section className="py-24">
                <div className="container">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Articles</h2>
                            <p className="text-muted-foreground">
                                Explore the latest published research
                            </p>
                        </div>
                        <Link
                            href="/articles"
                            className="text-primary hover:underline font-medium hidden md:block"
                        >
                            View all articles →
                        </Link>
                    </div>

                    {articles.docs.length === 0 ? (
                        <div className="text-center py-12 bg-muted rounded-lg">
                            <p className="text-muted-foreground">No articles published yet.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {articles.docs.map((article) => (
                                    <ArticleCard key={article.id} article={article as ArticleCardData} />
                                ))}
                            </div>
                            <div className="text-center mt-8 md:hidden">
                                <Link
                                    href="/articles"
                                    className="text-primary hover:underline font-medium"
                                >
                                    View all articles →
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-muted">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Join Our Research Community
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Connect with researchers, explore innovative labs, and contribute to the
                            advancement of knowledge.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                href="/people"
                                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                            >
                                Meet Our Researchers
                            </Link>
                            <Link
                                href="/journals"
                                className="px-6 py-3 border border-border bg-background rounded-lg font-medium hover:bg-muted transition-colors"
                            >
                                View Journals
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export const metadata: Metadata = {
    title: 'VOX | Academic Research Platform',
    description:
        'Discover cutting-edge research, connect with leading researchers, and explore innovative labs.',
}
