import React from 'react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-[#F8F3EB] border-t border-[#CFDAEE]">
      <Container>
        <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="font-headline text-3xl tracking-tight mb-4 text-[#1B174E]">Contact Us</h2>
            <div className="w-16 h-1 bg-[#F99534] mx-auto rounded-full mb-4" />
            <p className="text-[#231F20]/70 font-body">
                Have questions about the program, applications, or partnership opportunities? Reach out to us.
            </p>
        </div>

        <div className="max-w-xl mx-auto bg-white p-8 rounded-xl border border-[#CFDAEE] shadow-sm">
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-[#1B174E]">Name</label>
                        <input type="text" id="name" className="w-full px-4 py-2 border border-[#CFDAEE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#5C6DAD]/50 bg-[#F8F3EB]" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-[#1B174E]">Email</label>
                        <input type="email" id="email" className="w-full px-4 py-2 border border-[#CFDAEE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#5C6DAD]/50 bg-[#F8F3EB]" placeholder="your@email.com" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-[#1B174E]">Subject</label>
                    <input type="text" id="subject" className="w-full px-4 py-2 border border-[#CFDAEE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#5C6DAD]/50 bg-[#F8F3EB]" placeholder="How can we help?" />
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-[#1B174E]">Message</label>
                    <textarea id="message" rows={4} className="w-full px-4 py-2 border border-[#CFDAEE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#5C6DAD]/50 resize-none bg-[#F8F3EB]" placeholder="Tell us more..." />
                </div>

                <Button type="submit" size="lg" className="w-full bg-[#1B174E] hover:bg-[#1B174E]/90 text-white">
                    Send Message
                </Button>
            </form>
        </div>
      </Container>
    </section>
  )
}
