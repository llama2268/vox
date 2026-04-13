'use client'

import React from 'react'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: { navItems: any[] }; isHome?: boolean }> = ({ data, isHome }) => {
  const navItems = data?.navItems || []
  const textColor = isHome ? 'text-white' : 'text-[#1B174E]'
  const hoverColor = 'hover:text-[#5C6DAD]'

  return (
    <nav className="flex gap-6 items-center">
      {navItems.map(({ link, children }, i) => {
        if (children && children.length > 0) {
          return (
            <div key={i} className="relative group">
              <button className={`flex items-center gap-1 text-sm font-medium ${textColor} ${hoverColor} transition-colors py-2`}>
                {link.label}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform group-hover:rotate-180"
                >
                  <path
                    d="M2.5 4.5L6 8L9.5 4.5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[200px]">
                <div className="bg-white border border-[#CFDAEE] rounded-md shadow-lg p-2 flex flex-col gap-1">
                  {children.map((child: any, j: number) => (
                    <CMSLink
                      key={j}
                      {...child.link}
                      appearance="inline"
                      className="block px-4 py-2 text-sm text-[#1B174E] hover:bg-[#CFDAEE]/50 rounded-sm transition-colors"
                    />
                  ))}
                </div>
              </div>
            </div>
          )
        }
        return <CMSLink key={i} {...link} appearance="link" className={`text-sm font-medium ${textColor} ${hoverColor} transition-colors`} />
      })}
    </nav>
  )
}
