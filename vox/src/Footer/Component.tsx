import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto bg-[#1B174E] text-white">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Brand column */}
          <div className="flex flex-col gap-4 max-w-sm">
            <Link className="flex items-center" href="/">
              <Logo className="brightness-0 invert" />
            </Link>
            <p className="text-sm text-[#CFDAEE]/80 leading-relaxed">
              VOX Equity is the research think tank arm of{' '}
              <a
                href="https://thevoicesof.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F99534] hover:underline"
              >
                Voices of Equity
              </a>
              .
            </p>
          </div>

          {/* Nav + controls */}
          <div className="flex flex-col-reverse items-start md:flex-row gap-6 md:items-center">
            <ThemeSelector />
            <nav className="flex flex-col md:flex-row gap-4">
              {navItems.map(({ link }, i) => {
                return <CMSLink className="text-[#CFDAEE] hover:text-white transition-colors text-sm" key={i} {...link} />
              })}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-[#CFDAEE]/60">
            &copy; 2026 VOX Equity Think Tank. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
