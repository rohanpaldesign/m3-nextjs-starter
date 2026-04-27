'use client'

import { createComponent } from '@lit/react'
import React from 'react'
import '@material/web/iconbutton/icon-button.js'
import '@material/web/iconbutton/filled-icon-button.js'
import '@material/web/iconbutton/outlined-icon-button.js'
import '@material/web/iconbutton/filled-tonal-icon-button.js'
import { MdIconButton }           from '@material/web/iconbutton/icon-button.js'
import { MdFilledIconButton }     from '@material/web/iconbutton/filled-icon-button.js'
import { MdOutlinedIconButton }   from '@material/web/iconbutton/outlined-icon-button.js'
import { MdFilledTonalIconButton } from '@material/web/iconbutton/filled-tonal-icon-button.js'

export const IconButton = createComponent({
  tagName: 'md-icon-button',
  elementClass: MdIconButton,
  react: React,
  events: { onClick: 'click' },
})

export const FilledIconButton = createComponent({
  tagName: 'md-filled-icon-button',
  elementClass: MdFilledIconButton,
  react: React,
  events: { onClick: 'click' },
})

export const OutlinedIconButton = createComponent({
  tagName: 'md-outlined-icon-button',
  elementClass: MdOutlinedIconButton,
  react: React,
  events: { onClick: 'click' },
})

export const TonalIconButton = createComponent({
  tagName: 'md-filled-tonal-icon-button',
  elementClass: MdFilledTonalIconButton,
  react: React,
  events: { onClick: 'click' },
})
