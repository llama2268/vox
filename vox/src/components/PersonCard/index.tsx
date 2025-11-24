'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'

import type { User, Media, Lab } from '@/payload-types'
import { Media as MediaComponent } from '@/components/Media'

export type PersonCardData = Pick<User, 'id' | 'firstName' | 'lastName' | 'title' | 'type'> & {
    profileImage?: (number | Media) | null
    affiliation?: (number | Lab)[] | null
}

export const PersonCard: React.FC<{
    className?: string
    person: PersonCardData
}> = ({ className, person }) => {
    const { card, link } = useClickableCard({})
    const { id, firstName, lastName, title, type, profileImage, affiliation } = person

    const fullName = `${firstName} ${lastName}`
    const href = `/people/${id}`

    const affiliationNames = affiliation
        ?.filter((aff): aff is Lab => typeof aff !== 'number')
        .map((aff) => aff.name)
        .join(', ')

    const roleLabel = type === 'pi' ? 'Principal Investigator' : type === 'student' ? 'Student' : 'Admin'

    return (
        <article
            className={cn(
                'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer hover:border-primary transition-colors',
                className,
            )}
            ref={card.ref}
        >
            <div className="p-6">
                {profileImage && typeof profileImage !== 'number' && (
                    <div className="mb-4 flex justify-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden">
                            <MediaComponent resource={profileImage} className="w-full h-full object-cover" />
                        </div>
                    </div>
                )}

                <div className="text-center">
                    <h3 className="text-lg font-semibold mb-1">
                        <Link className="hover:text-primary transition-colors" href={href} ref={link.ref}>
                            {fullName}
                        </Link>
                    </h3>

                    {title && (
                        <p className="text-sm text-muted-foreground mb-2">{title}</p>
                    )}

                    <p className="text-xs text-primary font-medium mb-3">{roleLabel}</p>

                    {affiliationNames && (
                        <p className="text-sm text-foreground/80 line-clamp-2">
                            {affiliationNames}
                        </p>
                    )}
                </div>
            </div>
        </article>
    )
}
