import React from 'react'
import { Container } from '@/components/ui/container'

const pillars = [
  {
    title: 'Ignite Curiosity',
    description:
      'We recruit students who are passionate about health equity and provide foundational research training through a structured educational curriculum — transforming interest into inquiry.',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z" />
        <path d="M9 21h6" />
        <path d="M10 17v4" />
        <path d="M14 17v4" />
      </svg>
    ),
  },
  {
    title: 'Bridge Expertise',
    description:
      'We connect undergraduate researchers with established Principal Investigators across institutions, creating mentorship relationships that would otherwise be inaccessible.',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: 'Drive Impact',
    description:
      'We ensure every research team produces scholarship designed to generate actionable insights, advance health equity discourse, and inform real-world change.',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
]

export const PillarsSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#1B174E] relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(92,109,173,0.15),transparent_60%)]" />

      <Container>
        <div className="text-center mb-16 relative z-10">
          <h2 className="font-headline text-3xl md:text-5xl tracking-tight text-[#F8F3EB] mb-4">
            What Drives VOX Equity
          </h2>
          <div className="w-16 h-1 bg-[#F99534] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="bg-[#CFDAEE] rounded-xl p-8 flex flex-col items-start text-[#1B174E] transition-transform hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="w-16 h-16 rounded-lg bg-[#1B174E]/10 flex items-center justify-center mb-6 text-[#1B174E]">
                {pillar.icon}
              </div>
              <h3 className="font-subhead text-xl mb-4">{pillar.title}</h3>
              <p className="font-body text-[#1B174E]/80 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
