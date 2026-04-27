'use client'

import { createComponent } from '@lit/react'
import React from 'react'
import '@material/web/icon/icon.js'
import { MdIcon } from '@material/web/icon/icon.js'

export const Icon = createComponent({
  tagName: 'md-icon',
  elementClass: MdIcon,
  react: React,
})

/*
 * Usage: wrap a Material Symbols icon name in <Icon>
 *   <Icon>home</Icon>
 *   <Icon>settings</Icon>
 *
 * Requires the Material Symbols font — loaded in globals.css or layout.
 * Add to <head>:
 *   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded" />
 * Or via next/font (see layout.tsx).
 */
