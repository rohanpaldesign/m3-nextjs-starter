'use client'

import { createComponent } from '@lit/react'
import React from 'react'
import '@material/web/progress/linear-progress.js'
import '@material/web/progress/circular-progress.js'
import { MdLinearProgress }   from '@material/web/progress/linear-progress.js'
import { MdCircularProgress } from '@material/web/progress/circular-progress.js'

export const LinearProgress = createComponent({
  tagName: 'md-linear-progress',
  elementClass: MdLinearProgress,
  react: React,
})

export const CircularProgress = createComponent({
  tagName: 'md-circular-progress',
  elementClass: MdCircularProgress,
  react: React,
})
