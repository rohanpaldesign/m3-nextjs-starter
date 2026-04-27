'use client'

import { createComponent } from '@lit/react'
import React from 'react'
import '@material/web/switch/switch.js'
import { MdSwitch } from '@material/web/switch/switch.js'

export const Switch = createComponent({
  tagName: 'md-switch',
  elementClass: MdSwitch,
  react: React,
  events: { onChange: 'change' },
})
