'use client'

import { createComponent } from '@lit/react'
import React from 'react'
import '@material/web/radio/radio.js'
import { MdRadio } from '@material/web/radio/radio.js'

export const Radio = createComponent({
  tagName: 'md-radio',
  elementClass: MdRadio,
  react: React,
  events: { onChange: 'change' },
})

/*
 * Usage: wrap in a <label> for accessible radio groups.
 *   <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
 *     <Radio name="group" value="a" /> Option A
 *   </label>
 * All radios with the same `name` are linked automatically by the browser.
 */
