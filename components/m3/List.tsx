'use client'

import { createComponent } from '@lit/react'
import React from 'react'
import '@material/web/list/list.js'
import '@material/web/list/list-item.js'
import { MdList }     from '@material/web/list/list.js'
import { MdListItem } from '@material/web/list/list-item.js'

export const List = createComponent({
  tagName: 'md-list',
  elementClass: MdList,
  react: React,
})

export const ListItem = createComponent({
  tagName: 'md-list-item',
  elementClass: MdListItem,
  react: React,
  events: { onClick: 'click' },
})
