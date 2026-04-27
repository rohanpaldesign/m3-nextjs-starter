'use client'

import { createComponent } from '@lit/react'
import React from 'react'
import '@material/web/menu/menu.js'
import '@material/web/menu/menu-item.js'
import '@material/web/menu/sub-menu.js'
import { MdMenu }     from '@material/web/menu/menu.js'
import { MdMenuItem } from '@material/web/menu/menu-item.js'
import { MdSubMenu }  from '@material/web/menu/sub-menu.js'

export const Menu = createComponent({
  tagName: 'md-menu',
  elementClass: MdMenu,
  react: React,
  events: {
    onOpen:  'opened',
    onClose: 'closed',
  },
})

export const MenuItem = createComponent({
  tagName: 'md-menu-item',
  elementClass: MdMenuItem,
  react: React,
  events: { onClick: 'click' },
})

export const SubMenu = createComponent({
  tagName: 'md-sub-menu',
  elementClass: MdSubMenu,
  react: React,
})

/*
 * Menu must be anchored to a button via the `anchor` prop (matching the button's id).
 * The anchor element must have `id` and `popover-target` attributes.
 *
 * Usage:
 *   const anchorId = useId()
 *   <div style={{ position: 'relative' }}>
 *     <IconButton id={anchorId}>
 *       <span slot="icon" className="material-symbols-rounded">more_vert</span>
 *     </IconButton>
 *     <Menu anchor={anchorId}>
 *       <MenuItem>Edit</MenuItem>
 *       <MenuItem>Delete</MenuItem>
 *     </Menu>
 *   </div>
 */
