import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { PageHeader } from '@/components/PageHeader'
import { LabCard, type LabCardData } from '@/components/LabCard'

export default async function LabsPage() {
    const payload = await getPayload({ config: configPromise })

    const labs = (await payload.find({
        collection: 'labs',
        depth: 1,
        limit: 50,
        sort: 'name',
    })).docs

    return (
        <div className="container py-24">
            <PageHeader
                title="Research Labs"
                description="Explore our network of innovative research laboratories"
            />

            {labs.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No labs available yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {labs.map((lab) => (
                        <LabCard key={lab.id} lab={lab as LabCardData} />
                    ))}
                </div>
            )}
        </div>
    )
}

export const metadata: Metadata = {
    title: 'Research Labs | VOX',
    description: 'Explore our network of innovative research laboratories',
}
