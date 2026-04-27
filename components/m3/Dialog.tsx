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
    onOpening: 'open',    // fires when dialog starts to open (before animation)
    onOpened:  'opened',  // fires when dialog has fully opened (after animation)
    onClosing: 'close',   // fires when dialog starts to close (before animation)
    onClosed:  'closed',  // fires when dialog has fully closed (after animation)
    onCancel:  'cancel',  // fires when dialog is cancelled (Escape key or cancel button)
  },
})

/*
 * Usage: control open state via the `open` prop.
 *
 *   const [open, setOpen] = useState(false)
 *
 *   <FilledButton onClick={() => setOpen(true)}>Open dialog</FilledButton>
 *
 *   <Dialog open={open} onClosed={() => setOpen(false)}>
 *     <span slot="headline">Confirm action</span>
 *     <span slot="content">Are you sure you want to continue?</span>
 *     <div slot="actions">
 *       <TextButton onClick={() => setOpen(false)}>Cancel</TextButton>
 *       <FilledButton onClick={() => { doAction(); setOpen(false) }}>Confirm</FilledButton>
 *     </div>
 *   </Dialog>
 *
 * Use onClosed (not onClosing) to update state — it fires after the exit animation.
 */
