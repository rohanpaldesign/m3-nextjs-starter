'use client'

import { createComponent } from '@lit/react'
import React from 'react'
import '@material/web/slider/slider.js'
import { MdSlider } from '@material/web/slider/slider.js'

export const Slider = createComponent({
  tagName: 'md-slider',
  elementClass: MdSlider,
  react: React,
  events: {
    onInput:  'input',
    onChange: 'change',
  },
})
