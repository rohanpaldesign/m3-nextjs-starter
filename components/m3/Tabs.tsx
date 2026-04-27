'use client'

import { createComponent } from '@lit/react'
import React from 'react'
import '@material/web/tabs/tabs.js'
import '@material/web/tabs/primary-tab.js'
import '@material/web/tabs/secondary-tab.js'
import { MdTabs }        from '@material/web/tabs/tabs.js'
import { MdPrimaryTab }  from '@material/web/tabs/primary-tab.js'
import { MdSecondaryTab } from '@material/web/tabs/secondary-tab.js'

export const Tabs = createComponent({
  tagName: 'md-tabs',
  elementClass: MdTabs,
  react: React,
  events: { onChange: 'change' },
})

export const PrimaryTab = createComponent({
  tagName: 'md-primary-tab',
  elementClass: MdPrimaryTab,
  react: React,
})

export const SecondaryTab = createComponent({
  tagName: 'md-secondary-tab',
  elementClass: MdSecondaryTab,
  react: React,
})
