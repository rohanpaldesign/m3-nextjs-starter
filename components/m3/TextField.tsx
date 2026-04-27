'use client'

import { createComponent } from '@lit/react'
import React from 'react'
import '@material/web/textfield/filled-text-field.js'
import '@material/web/textfield/outlined-text-field.js'
import { MdFilledTextField }   from '@material/web/textfield/filled-text-field.js'
import { MdOutlinedTextField } from '@material/web/textfield/outlined-text-field.js'

export const FilledTextField = createComponent({
  tagName: 'md-filled-text-field',
  elementClass: MdFilledTextField,
  react: React,
  events: {
    onInput:  'input',
    onChange: 'change',
  },
})

export const OutlinedTextField = createComponent({
  tagName: 'md-outlined-text-field',
  elementClass: MdOutlinedTextField,
  react: React,
  events: {
    onInput:  'input',
    onChange: 'change',
  },
})
