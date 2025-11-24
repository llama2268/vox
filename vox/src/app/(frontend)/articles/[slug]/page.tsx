import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import { formatAuthors } from '@/utilities/formatAuthors'
import type { Article } from '@/payload-types'

type Args = {
    params: Promise<{
        slug: string
    }>
}

export default async function ArticlePage({ params }: Args) {
    const { slug } = await params
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
        collection: 'articles',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
        limit: 1,
    })

    const article = result.docs[0] as Article | undefined

    if (!article) {
        notFound()
    }

    const authorsList = formatAuthors(article.authors as any[])

    return (
        <div className="container py-24">
            <article className="max-w-4xl mx-auto">
                {/* Article Header */}
                <header className="mb-12 pb-8 border-b border-border">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{article.title}</h1>

                    {authorsList && (
                        <p className="text-lg text-foreground/80 mb-4">{authorsList}</p>
                    )}

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        {article.publishedDate && (
                            <div>
                                <span className="font-medium">Published:</span>{' '}
                                {new Date(article.publishedDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </div>
                        )}
                        {article.doi && (
                            <div>
                                <span className="font-medium">DOI:</span>{' '}
                                <a
                                    href={`https://doi.org/${article.doi}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    {article.doi}
                                </a>
                            </div>
                        )}
                        {article.volume && (
                            <div>
                                <span className="font-medium">Volume:</span> {article.volume}
                            </div>
                        )}
                        {article.issue && (
                            <div>
                                <span className="font-medium">Issue:</span> {article.issue}
                            </div>
                        )}
                    </div>
                </header>

                {/* Abstract */}
                {article.abstract && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4">Abstract</h2>
                        <div className="prose dark:prose-invert max-w-none">
                            <p className="text-foreground/90">{article.abstract}</p>
                        </div>
                    </section>
                )}

                {/* Keywords */}
                {article.keywords && article.keywords.length > 0 && (
                    <section className="mb-12">
                        <h3 className="text-lg font-semibold mb-3">Keywords</h3>
                        <div className="flex flex-wrap gap-2">
                            {article.keywords.map((kw, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-primary/10 text-primary rounded-md text-sm"
                                >
                                    {kw.keyword}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Main Content */}
                {article.content && (
                    <section className="mb-12">
                        <RichText data={article.content} enableGutter={false} />
                    </section>
                )}

                {/* Citations */}
                {article.citations && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4">References</h2>
                        <RichText data={article.citations} enableGutter={false} />
                    </section>
                )}

                {/* Supplementary Materials */}
                {article.supplementaryMaterials && article.supplementaryMaterials.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4">Supplementary Materials</h2>
                        <ul className="space-y-2">
                            {article.supplementaryMaterials.map((material, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <span className="text-primary">📎</span>
                                    <span>{material.description || `Supplementary Material ${idx + 1}`}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* PDF Download */}
                {article.pdfVersion && typeof article.pdfVersion !== 'number' && (
                    <section className="mb-12 p-6 bg-muted rounded-lg">
                        <a
                            href={article.pdfVersion.url || '#'}
                            download
                            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            Download PDF
                        </a>
                    </section>
                )}
            </article>
        </div>
    )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
    const { slug } = await params
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
        collection: 'articles',
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
    })

    const article = result.docs[0]

    if (!article) {
        return {
            title: 'Article Not Found',
        }
    }

    return {
        title: `${article.title} | VOX`,
        description: article.abstract || undefined,
    }
}
