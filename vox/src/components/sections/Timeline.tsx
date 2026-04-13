import React from 'react'
import { Container } from '@/components/ui/container'

const TimelineCard = ({
  number,
  title,
  duration,
  description,
  isLast = false
}: {
  number: number,
  title: string,
  duration: string,
  description: string,
  isLast?: boolean
}) => (
  <div className="relative flex flex-col items-center md:flex-row md:items-start md:w-full group">

    {/* Connector Line - Desktop */}
    {!isLast && (
      <div className="hidden md:block absolute top-[28px] left-[50%] right-[-50%] h-[2px] bg-[#CFDAEE] z-0" />
    )}

    {/* Connector Line - Mobile */}
    {!isLast && (
      <div className="md:hidden absolute top-[56px] bottom-[-24px] left-[28px] w-[2px] bg-[#CFDAEE] z-0" />
    )}

    {/* Content */}
    <div className="flex flex-row md:flex-col items-start w-full gap-4 md:gap-0 relative z-10 bg-[#F8F3EB] md:bg-transparent p-2 md:p-0">

      {/* Number Badge */}
      <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#1B174E] border-4 border-[#CFDAEE] flex items-center justify-center text-xl font-bold text-white shadow-sm md:mx-auto md:mb-6 z-10 transition-transform group-hover:scale-110 group-hover:border-[#5C6DAD]">
        {number}
      </div>

      {/* Text Content */}
      <div className="bg-white border border-[#CFDAEE] p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow w-full md:mt-2 h-full min-h-[220px] flex flex-col">
        <div className="bg-[#CFDAEE] -mx-6 -mt-6 p-3 mb-4 rounded-t-lg text-center border-b border-[#CFDAEE]">
            <h3 className="font-subhead text-lg text-[#1B174E]">{number}. {title}</h3>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#5C6DAD] mt-1">{duration}</div>
        </div>

        <p className="text-sm md:text-base text-[#231F20]/80 leading-relaxed flex-grow font-body">
          {description}
        </p>
      </div>

    </div>
  </div>
)

export const TimelineSection: React.FC = () => {
    const steps = [
        {
            title: "Recruit",
            duration: "Week 1",
            description: "Students apply through a competitive process. We evaluate passion, commitment, and alignment with health equity research goals."
        },
        {
            title: "Match",
            duration: "Week 2",
            description: "Applicants are matched with PIs and assembled into research teams based on shared interests and complementary strengths."
        },
        {
            title: "Train",
            duration: "Weeks 2–4",
            description: "Teams begin with foundational modules on research ethics, methodology, literature review, and health equity frameworks."
        },
        {
            title: "Research",
            duration: "Weeks 5–16",
            description: "Teams work with their PI through a structured cycle — from research question to data collection to analysis to findings."
        },
        {
            title: "Publish",
            duration: "Weeks 17–20",
            description: "Each team produces a conference-ready presentation and publishable manuscript for the VOX Equity Journal and external publications."
        },
        {
            title: "Amplify",
            duration: "Weeks 21+",
            description: "Research is presented at institutional symposia, professional conferences, and through VOX's publication platform to drive real-world impact."
        }
    ]

  return (
    <section id="timeline" className="py-24 bg-[#F8F3EB] relative">
      <Container>
        <div className="text-center mb-16">
            <h2 className="font-headline text-3xl md:text-5xl tracking-tight mb-4 text-[#1B174E]">Timeline</h2>
            <div className="w-16 h-1 bg-[#F99534] mx-auto rounded-full mb-4" />
            <p className="text-[#5C6DAD] text-lg max-w-2xl mx-auto font-body">
                A semester-long journey from recruitment to real-world impact.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 md:gap-4 relative">
            {steps.map((step, index) => (
                <TimelineCard
                    key={index}
                    number={index + 1}
                    title={step.title}
                    duration={step.duration}
                    description={step.description}
                    isLast={index === steps.length - 1}
                />
            ))}
        </div>
      </Container>
    </section>
  )
}
