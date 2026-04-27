# m3-nextjs-starter

Material Design 3 design system for Next.js. Reusable across projects.

## Stack
- Next.js 14 App Router
- @material/web 2.x — Google's official M3 web components (Lit-based)
- @lit/react — React wrappers via createComponent()
- Roboto Flex — M3 typeface via next/font/google
- No Tailwind, no shadcn, no MUI

## Key decisions
- All @material/web wrappers live in components/m3/ and require 'use client'
- transpilePackages in next.config.js handles the Lit SSR issue
- CSS custom properties use --md-sys-color-* naming (read natively by @material/web)
- NavigationDrawer, TopAppBar, Card are custom (not in @material/web) but use the same tokens

## Using in another project
Copy components/m3/ and the --md-sys-color-* block from app/globals.css.
Add transpilePackages to next.config.js.
Install: npm install @material/web @lit/react lit

## M3 token reference
globals.css defines the full dark scheme from seed #6750A4.
To change theme: update the hex values in :root — all @material/web components and custom components update automatically.
