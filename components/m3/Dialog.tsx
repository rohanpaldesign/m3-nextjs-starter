'use client'

import { createComponent } from '@lit/react'
import React from 'react'
import '@material/web/dialog/dialog.js'
import { MdDialog } from '@material/web/dialog/dialog.js'

export const Dialog = createComponent({
  tagName: 'md-dialog',
  elementClass: MdDialog,
  react: React,
  events: {
    onOpen:   'open',
    onClose:  'close',
    onCancel: 'cancel',
  },
})
