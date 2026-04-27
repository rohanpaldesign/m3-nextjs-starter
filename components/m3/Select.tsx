'use client'

import { createComponent } from '@lit/react'
import React from 'react'
import '@material/web/select/filled-select.js'
import '@material/web/select/outlined-select.js'
import '@material/web/select/select-option.js'
import { MdFilledSelect }   from '@material/web/select/filled-select.js'
import { MdOutlinedSelect } from '@material/web/select/outlined-select.js'
import { MdSelectOption }   from '@material/web/select/select-option.js'

export const FilledSelect = createComponent({
  tagName: 'md-filled-select',
  elementClass: MdFilledSelect,
  react: React,
  events: { onChange: 'change' },
})

export const OutlinedSelect = createComponent({
  tagName: 'md-outlined-select',
  elementClass: MdOutlinedSelect,
  react: React,
  events: { onChange: 'change' },
})

export const SelectOption = createComponent({
  tagName: 'md-select-option',
  elementClass: MdSelectOption,
  react: React,
})
