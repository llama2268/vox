import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { PageHeader } from '@/components/PageHeader'
import { JournalCard, type JournalCardData } from '@/components/JournalCard'

export default async function JournalsPage() {
    const payload = await getPayload({ config: configPromise })

    const journals = await payload.find({
        collection: 'journals',
        depth: 1,
        limit: 50,
        sort: 'name',
    })

    return (
        <div className="container py-24">
            <PageHeader
                title="Journals"
                description="Browse our collection of academic journals"
            />

            {journals.docs.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No journals available yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {journals.docs.map((journal) => (
                        <JournalCard key={journal.id} journal={journal as JournalCardData} />
                    ))}
                </div>
            )}
        </div>
    )
}

export const metadata: Metadata = {
    title: 'Journals | VOX',
    description: 'Browse our collection of academic journals',
}
