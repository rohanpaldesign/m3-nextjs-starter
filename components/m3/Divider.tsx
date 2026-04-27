'use client'

import { createComponent } from '@lit/react'
import React from 'react'
import '@material/web/divider/divider.js'
import { MdDivider } from '@material/web/divider/divider.js'

export const Divider = createComponent({
  tagName: 'md-divider',
  elementClass: MdDivider,
  react: React,
})
