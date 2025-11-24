'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'

import type { Journal, User } from '@/payload-types'

export type JournalCardData = Pick<Journal, 'slug' | 'name' | 'issn'> & {
    editors?: (number | User)[]
}

export const JournalCard: React.FC<{
    className?: string
    journal: JournalCardData
}> = ({ className, journal }) => {
    const { card, link } = useClickableCard({})
    const { slug, name, issn, editors } = journal

    const editorNames = editors
        ?.filter((editor): editor is User => typeof editor !== 'number')
        .map((editor) => `${editor.firstName} ${editor.lastName}`)
        .join(', ')

    const href = `/journals/${slug}`

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
                            {name}
                        </Link>
                    </h3>
                </div>

                {issn && (
                    <p className="text-sm text-muted-foreground mb-3">ISSN: {issn}</p>
                )}

                {editorNames && (
                    <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Editors:</span> {editorNames}
                    </p>
                )}
            </div>
        </article>
    )
}
