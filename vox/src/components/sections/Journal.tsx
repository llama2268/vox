import React from 'react'
import { Container } from '@/components/ui/container'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'

export const JournalSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#1B174E] text-white relative isolate overflow-hidden">
        {/* Subtle texture/gradient */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,rgba(92,109,173,0.2),transparent)]" />

        <Container>
            <div className="max-w-4xl mx-auto text-center space-y-10">

                {/* Logo Area */}
                <div className="flex flex-col items-center justify-center gap-4">
                     <div className="w-20 h-20 bg-[#5C6DAD]/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm border border-[#5C6DAD]/30">
                        <BookOpen className="w-10 h-10 text-[#CFDAEE]" />
                     </div>
                     <h2 className="font-headline text-4xl md:text-6xl tracking-tighter text-[#F8F3EB]">
                        VOX Equity Journal
                     </h2>
                     <div className="w-16 h-1 bg-[#F99534] mx-auto rounded-full" />
                </div>

                <div className="text-lg md:text-xl leading-relaxed text-[#CFDAEE] space-y-6">
                    <p>
                        The <span className="text-white font-medium">VOX Equity Journal</span> is a peer-reviewed, student-led publication at the intersection of research and real-world impact.
                    </p>
                    <p>
                        By highlighting innovative, data-driven work from emerging scholars, this journal not only advances the academic understanding of health disparities but also informs the community-based initiatives of VOX Equity chapters across the country. Each contribution reflects a commitment to bridging research with advocacy — empowering students to drive evidence-based solutions, support local engagement, and shape the future of health equity through education, activism, and policy insight.
                    </p>
                </div>

                <div className="pt-8">
                     <p className="text-2xl font-subhead text-[#F99534] mb-8">
                        Inaugural issue coming Fall 2026.
                     </p>

                     <Link
                        href="#contact"
                        className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-[#1B174E] bg-[#F8F3EB] hover:bg-white rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                     >
                        Contact Us
                     </Link>
                </div>

            </div>
        </Container>
    </section>
  )
}
