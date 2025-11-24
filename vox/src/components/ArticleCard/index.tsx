'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'

import type { Article, User } from '@/payload-types'

export type ArticleCardData = Pick<Article, 'slug' | 'title' | 'abstract' | 'publishedDate'> & {
    authors?: (number | User)[]
}

export const ArticleCard: React.FC<{
    className?: string
    article: ArticleCardData
}> = ({ className, article }) => {
    const { card, link } = useClickableCard({})
    const { slug, title, abstract, authors, publishedDate } = article

    const authorNames = authors
        ?.filter((author): author is User => typeof author !== 'number')
        .map((author) => `${author.firstName} ${author.lastName}`)
        .join(', ')

    const href = `/articles/${slug}`

    return (
        <article
            className={cn(
                'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer hover:border-primary transition-colors',
                className,
            )}
            ref={card.ref}
        >
            <div className="p-6">
                <div className="prose dark:prose-invert max-w-none">
                    <h3 className="text-xl font-semibold mb-2">
                        <Link className="not-prose hover:text-primary transition-colors" href={href} ref={link.ref}>
                            {title}
                        </Link>
                    </h3>
                </div>

                {authorNames && (
                    <p className="text-sm text-muted-foreground mb-3">{authorNames}</p>
                )}

                {abstract && (
                    <p className="text-sm text-foreground/80 line-clamp-3 mb-3">
                        {abstract}
                    </p>
                )}

                {publishedDate && (
                    <p className="text-xs text-muted-foreground">
                        Published: {new Date(publishedDate).toLocaleDateString()}
                    </p>
                )}
            </div>
        </article>
    )
}
