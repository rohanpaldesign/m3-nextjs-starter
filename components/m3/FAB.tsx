'use client'

import { createComponent } from '@lit/react'
import React from 'react'
import '@material/web/fab/fab.js'
import '@material/web/fab/branded-fab.js'
import { MdFab }        from '@material/web/fab/fab.js'
import { MdBrandedFab } from '@material/web/fab/branded-fab.js'

export const FAB = createComponent({
  tagName: 'md-fab',
  elementClass: MdFab,
  react: React,
  events: { onClick: 'click' },
})

export const BrandedFAB = createComponent({
  tagName: 'md-branded-fab',
  elementClass: MdBrandedFab,
  react: React,
  events: { onClick: 'click' },
})

/*
 * FAB sizes: size="small" | "medium" (default) | "large"
 * FAB variants: variant="primary" | "secondary" | "tertiary" | "surface"
 *
 * Usage:
 *   <FAB label="Compose" variant="primary">
 *     <span slot="icon" className="material-symbols-rounded">edit</span>
 *   </FAB>
 *
 *   <FAB size="small" aria-label="Add">
 *     <span slot="icon" className="material-symbols-rounded">add</span>
 *   </FAB>
 */
