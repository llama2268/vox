import React from 'react'
import { Container } from '@/components/ui/container'

export const WhoWeAreSection: React.FC = () => {
  return (
    <section id="who-we-are" className="bg-[#F8F3EB] py-24 relative overflow-hidden">
      <Container>
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <div className="text-center md:text-left">
            <h2 className="font-headline text-3xl md:text-5xl tracking-tight mb-2 text-[#1B174E]">
              Who We Are
            </h2>
            <div className="w-16 h-1 bg-[#F99534] rounded-full mb-8 md:mx-0 mx-auto" />

            <div className="space-y-6 text-lg md:text-xl leading-relaxed text-[#231F20]">
              <p>
                We are the research think tank arm of{' '}
                <a href="https://thevoicesof.org" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#5C6DAD] hover:underline">
                  Voices of Equity
                </a>{' '}
                — a nationwide, student-led movement with over 50 chapters, thousands of engaged
                students, and a growing track record of fundraising and grant success.
              </p>

              <p>
                VOX Equity empowers the next generation of health equity researchers by bridging the
                gap between undergraduate curiosity and faculty-led research, providing the structure,
                mentorship, and platform to transform student passion into impactful scholarship.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-[#1B174E]/10 text-center">
            <p className="text-2xl md:text-3xl font-light italic text-[#5C6DAD] mb-8">
              Whether you&apos;re curious, committed, or just getting started — there&apos;s a place for
              you here.
            </p>

            <p className="text-xl font-subhead tracking-wide uppercase text-[#1B174E]">
              Together, this work defines VOX Equity.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
