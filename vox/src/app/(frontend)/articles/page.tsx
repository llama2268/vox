import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { PageHeader } from '@/components/PageHeader'
import { ArticleCard, type ArticleCardData } from '@/components/ArticleCard'

export default async function ArticlesPage() {
    const payload = await getPayload({ config: configPromise })

    const articles = await payload.find({
        collection: 'articles',
        depth: 1,
        limit: 50,
        sort: '-publishedDate',
        where: {
            _status: {
                equals: 'published',
            },
        },
    })

    return (
        <div className="container py-24">
            <PageHeader
                title="Articles"
                description="Browse our collection of published research articles"
            />

            {articles.docs.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No articles published yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.docs.map((article) => (
                        <ArticleCard key={article.id} article={article as ArticleCardData} />
                    ))}
                </div>
            )}
        </div>
    )
}

export const metadata: Metadata = {
    title: 'Articles | VOX',
    description: 'Browse published research articles',
}
