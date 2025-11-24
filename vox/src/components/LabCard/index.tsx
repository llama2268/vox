'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'

import type { Lab, User } from '@/payload-types'

export type LabCardData = Pick<Lab, 'slug' | 'name' | 'researchAreas'> & {
    principalInvestigators?: (number | User)[]
}

export const LabCard: React.FC<{
    className?: string
    lab: LabCardData
}> = ({ className, lab }) => {
    const { card, link } = useClickableCard({})
    const { slug, name, researchAreas, principalInvestigators } = lab

    const piNames = principalInvestigators
        ?.filter((pi): pi is User => typeof pi !== 'number')
        .map((pi) => `${pi.firstName} ${pi.lastName}`)
        .join(', ')

    const href = `/labs/${slug}`

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

                {piNames && (
                    <p className="text-sm font-medium text-muted-foreground mb-3">
                        PI: {piNames}
                    </p>
                )}

                {researchAreas && researchAreas.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {researchAreas.slice(0, 3).map((area, idx) => (
                            <span
                                key={idx}
                                className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md"
                            >
                                {area.area}
                            </span>
                        ))}
                        {researchAreas.length > 3 && (
                            <span className="text-xs px-2 py-1 text-muted-foreground">
                                +{researchAreas.length - 3} more
                            </span>
                        )}
                    </div>
                )}
            </div>
        </article>
    )
}
