'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const defaultNavItems = [
    { link: { type: 'custom', url: '/', label: 'Home', newTab: false } },
    {
      link: { type: 'custom', url: '#', label: 'About Us', newTab: false },
      children: [
        { link: { type: 'custom', url: '#who-we-are', label: 'Who We Are', newTab: false } },
        { link: { type: 'custom', url: '#timeline', label: 'Our Timeline', newTab: false } },
      ]
    },
    { link: { type: 'custom', url: '/labs', label: 'Research Teams', newTab: false } },
    { link: { type: 'custom', url: '/journals', label: 'VOX Equity Journal', newTab: false } },
  ]

  const navItems = defaultNavItems
  const headerData = { ...data, navItems }

  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  const isHome = pathname === '/'

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <>
      {/* Top Banner */}
      <div className={isHome ? 'bg-[#1B174E]/80 backdrop-blur-sm py-2 text-center text-sm text-white' : 'bg-[#F8F3EB] border-b border-[#CFDAEE] py-2 text-center text-sm'}>
        <span className={isHome ? 'font-medium text-white' : 'font-medium text-[#1B174E]'}>
           Now Accepting Applications for Spring 2026!{' '}
        </span>
        <Link href="/apply" className={isHome ? 'font-semibold underline ml-1 text-[#F99534]' : 'font-semibold underline hover:text-[#5C6DAD] ml-1 text-[#1B174E]'}>
          Apply Now
        </Link>
      </div>

      {isHome ? (
        <header {...(theme ? { 'data-theme': theme } : {})} className="absolute inset-x-0 top-8 z-20">
          <div className="container py-6 flex justify-between items-center">
            <Link href="/">
              <Logo loading="eager" priority="high" className="invert dark:invert-0 w-28 max-w-none" />
            </Link>
            <HeaderNav data={headerData as any} isHome />
          </div>
        </header>
      ) : (
        <header className="container relative z-20 bg-[#F8F3EB]" {...(theme ? { 'data-theme': theme } : {})}>
          <div className="py-6 flex justify-between items-center">
            <Link href="/">
              <Logo loading="eager" priority="high" className="invert dark:invert-0 w-28 max-w-none" />
            </Link>
            <HeaderNav data={headerData as any} />
          </div>
        </header>
      )}
    </>
  )
}
