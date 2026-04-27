'use client'

import { createComponent } from '@lit/react'
import React from 'react'
import '@material/web/badge/badge.js'
import { MdBadge } from '@material/web/badge/badge.js'

export const Badge = createComponent({
  tagName: 'md-badge',
  elementClass: MdBadge,
  react: React,
})

/*
 * Badge renders as a small indicator. Place it alongside (or inside) an icon button.
 * Use the `value` prop for a numbered badge, or omit for a dot badge.
 *
 * Usage (dot badge):
 *   <div style={{ position: 'relative', display: 'inline-flex' }}>
 *     <IconButton aria-label="Notifications">
 *       <span className="material-symbols-rounded">notifications</span>
 *     </IconButton>
 *     <Badge style={{ position: 'absolute', top: 4, right: 4 }} />
 *   </div>
 *
 * Usage (numbered badge):
 *   <div style={{ position: 'relative', display: 'inline-flex' }}>
 *     <IconButton aria-label="Messages">
 *       <span className="material-symbols-rounded">chat</span>
 *     </IconButton>
 *     <Badge value="12" style={{ position: 'absolute', top: 4, right: 4 }} />
 *   </div>
 */
