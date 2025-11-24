import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { PageHeader } from '@/components/PageHeader'
import { PersonCard, type PersonCardData } from '@/components/PersonCard'

export default async function PeoplePage() {
    const payload = await getPayload({ config: configPromise })

    const people = await payload.find({
        collection: 'users',
        depth: 1,
        limit: 100,
        sort: 'lastName',
    })

    // Group by type
    const pis = people.docs.filter((person) => person.type === 'pi')
    const students = people.docs.filter((person) => person.type === 'student')
    const admins = people.docs.filter((person) => person.type === 'admin')

    return (
        <div className="container py-24">
            <PageHeader
                title="People"
                description="Meet the researchers and scholars in our community"
            />

            {/* Principal Investigators */}
            {pis.length > 0 && (
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6">Principal Investigators</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pis.map((person) => (
                            <PersonCard key={person.id} person={person as PersonCardData} />
                        ))}
                    </div>
                </section>
            )}

            {/* Students */}
            {students.length > 0 && (
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6">Students & Researchers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {students.map((person) => (
                            <PersonCard key={person.id} person={person as PersonCardData} />
                        ))}
                    </div>
                </section>
            )}

            {/* Admins (optional) */}
            {admins.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold mb-6">Administration</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {admins.map((person) => (
                            <PersonCard key={person.id} person={person as PersonCardData} />
                        ))}
                    </div>
                </section>
            )}

            {people.docs.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No people found.</p>
                </div>
            )}
        </div>
    )
}

export const metadata: Metadata = {
    title: 'People | VOX',
    description: 'Meet the researchers and scholars in our community',
}
