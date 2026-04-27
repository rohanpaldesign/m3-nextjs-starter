'use client'

import { createComponent } from '@lit/react'
import React from 'react'
import '@material/web/button/filled-button.js'
import '@material/web/button/outlined-button.js'
import '@material/web/button/text-button.js'
import '@material/web/button/tonal-button.js'
import '@material/web/button/elevated-button.js'
import { MdFilledButton }   from '@material/web/button/filled-button.js'
import { MdOutlinedButton } from '@material/web/button/outlined-button.js'
import { MdTextButton }     from '@material/web/button/text-button.js'
import { MdTonalButton }    from '@material/web/button/tonal-button.js'
import { MdElevatedButton } from '@material/web/button/elevated-button.js'

export const FilledButton = createComponent({
  tagName: 'md-filled-button',
  elementClass: MdFilledButton,
  react: React,
  events: { onClick: 'click' },
})

export const OutlinedButton = createComponent({
  tagName: 'md-outlined-button',
  elementClass: MdOutlinedButton,
  react: React,
  events: { onClick: 'click' },
})

export const TextButton = createComponent({
  tagName: 'md-text-button',
  elementClass: MdTextButton,
  react: React,
  events: { onClick: 'click' },
})

export const TonalButton = createComponent({
  tagName: 'md-tonal-button',
  elementClass: MdTonalButton,
  react: React,
  events: { onClick: 'click' },
})

export const ElevatedButton = createComponent({
  tagName: 'md-elevated-button',
  elementClass: MdElevatedButton,
  react: React,
  events: { onClick: 'click' },
})
