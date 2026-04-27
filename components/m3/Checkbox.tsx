'use client'

import { createComponent } from '@lit/react'
import React from 'react'
import '@material/web/checkbox/checkbox.js'
import { MdCheckbox } from '@material/web/checkbox/checkbox.js'

export const Checkbox = createComponent({
  tagName: 'md-checkbox',
  elementClass: MdCheckbox,
  react: React,
  events: { onChange: 'change' },
})
