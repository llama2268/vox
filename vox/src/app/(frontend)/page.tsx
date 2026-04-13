import type { Metadata } from 'next'
import React from 'react'
import { Link } from '@/components/ui/typography'
import { Logo } from '@/components/Logo/Logo'
import { WhoWeAreSection } from '@/components/sections/WhoWeAre'
import { PillarsSection } from '@/components/sections/Pillars'
import { TimelineSection } from '@/components/sections/Timeline'
import { JournalSection } from '@/components/sections/Journal'
import { ContactSection } from '@/components/sections/Contact'

export default async function HomePage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
                <section
                    className="relative text-white pt-24 pb-32 md:pt-32 md:pb-48 overflow-hidden bg-cover bg-center min-h-[440px] md:min-h-[680px]"
                    style={{ backgroundImage: "url('/media/vox_background.jpg')", backgroundPosition: 'center 20%' }}
                    >
                 {/* Premium Background Effects */}
                 <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#5C6DAD]/20 blur-3xl" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#1B174E]/40 blur-3xl" />
                 </div>

                <div className="container relative z-10 text-center">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex justify-center mb-8">
                            <Logo loading="eager" priority="high" className="w-48 md:w-[360px] h-auto max-w-none" />
                        </div>

                        {/* Badge / Pill */}
                        <div className="flex justify-center mb-6">
                            <a
                                href="https://thevoicesof.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-5 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-sm font-medium text-white hover:bg-white/25 transition-colors"
                            >
                                A Voices of Equity Initiative
                            </a>
                        </div>

                        <h1 className="font-headline text-3xl md:text-5xl lg:text-6xl tracking-tight text-white mb-6 leading-[1.1] drop-shadow-lg">
                            Empowering the next generation of health equity researchers
                        </h1>

                        <p className="text-lg md:text-xl font-body text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                            VOX Equity bridges the gap between undergraduate curiosity and faculty-led research, providing the structure, mentorship, and platform to transform student passion into impactful scholarship.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                href="/apply"
                                className="px-8 py-4 bg-[#F99534] text-white rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:bg-[#e8862a]"
                            >
                                Apply Now
                            </Link>
                            <Link
                                href="#who-we-are"
                                className="px-8 py-4 border border-white/40 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors backdrop-blur-sm"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <WhoWeAreSection />
            <PillarsSection />
            <TimelineSection />
            <JournalSection />
            <ContactSection />
        </div>
    )
}


export const metadata: Metadata = {
    title: 'VOX Equity Think Tank | Health Equity Research',
    description:
        'VOX Equity empowers the next generation of health equity researchers by bridging undergraduate curiosity with faculty-led research.',
}
