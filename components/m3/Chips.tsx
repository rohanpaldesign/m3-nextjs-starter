'use client'

import { createComponent } from '@lit/react'
import React from 'react'
import '@material/web/chips/chip-set.js'
import '@material/web/chips/assist-chip.js'
import '@material/web/chips/filter-chip.js'
import '@material/web/chips/input-chip.js'
import '@material/web/chips/suggestion-chip.js'
import { MdChipSet }       from '@material/web/chips/chip-set.js'
import { MdAssistChip }    from '@material/web/chips/assist-chip.js'
import { MdFilterChip }    from '@material/web/chips/filter-chip.js'
import { MdInputChip }     from '@material/web/chips/input-chip.js'
import { MdSuggestionChip } from '@material/web/chips/suggestion-chip.js'

export const ChipSet = createComponent({
  tagName: 'md-chip-set',
  elementClass: MdChipSet,
  react: React,
})

export const AssistChip = createComponent({
  tagName: 'md-assist-chip',
  elementClass: MdAssistChip,
  react: React,
  events: { onClick: 'click' },
})

export const FilterChip = createComponent({
  tagName: 'md-filter-chip',
  elementClass: MdFilterChip,
  react: React,
  events: { onChange: 'change' },
})

export const InputChip = createComponent({
  tagName: 'md-input-chip',
  elementClass: MdInputChip,
  react: React,
  events: { onRemove: 'remove' },
})

export const SuggestionChip = createComponent({
  tagName: 'md-suggestion-chip',
  elementClass: MdSuggestionChip,
  react: React,
  events: { onClick: 'click' },
})
