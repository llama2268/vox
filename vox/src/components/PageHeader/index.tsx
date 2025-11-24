import React from 'react'
import { cn } from '@/utilities/ui'

export const PageHeader: React.FC<{
    title: string
    description?: string
    className?: string
}> = ({ title, description, className }) => {
    return (
        <div className={cn('mb-12', className)}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            {description && (
                <p className="text-lg text-muted-foreground max-w-3xl">{description}</p>
            )}
        </div>
    )
}
