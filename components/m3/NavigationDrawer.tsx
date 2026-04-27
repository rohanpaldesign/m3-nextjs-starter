'use client'

import React, { useCallback } from 'react'

interface NavItem {
  label: string
  icon: string
  href: string
  badge?: number | string
}

interface NavigationDrawerProps {
  items: NavItem[]
  activeHref: string
  onNavigate?: (href: string) => void
  headline?: string
}

export function NavigationDrawer({ items, activeHref, onNavigate, headline }: NavigationDrawerProps) {
  const handleKeyDown = useCallback((e: React.KeyboardEvent, href: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onNavigate?.(href)
    }
  }, [onNavigate])

  return (
    <nav
      aria-label="Main navigation"
      style={{
        width: '360px',
        minWidth: '240px',
        height: '100%',
        backgroundColor: 'var(--md-sys-color-surface-container-low)',
        paddingTop: '12px',
        paddingBottom: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        flexShrink: 0,
      }}
    >
      {headline && (
        <div
          style={{
            paddingInline: '28px',
            paddingBlock: '16px',
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.1px',
            color: 'var(--md-sys-color-on-surface-variant)',
          }}
        >
          {headline}
        </div>
      )}

      {items.map(item => {
        const isActive = activeHref === item.href
        return (
          <a
            key={item.href}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            aria-label={item.badge !== undefined ? `${item.label}, ${item.badge} new` : undefined}
            onClick={e => {
              if (onNavigate) {
                e.preventDefault()
                onNavigate(item.href)
              }
            }}
            onKeyDown={e => handleKeyDown(e, item.href)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginInline: '12px',
              paddingInline: '16px',
              height: '56px',
              borderRadius: '9999px',
              textDecoration: 'none',
              cursor: 'pointer',
              backgroundColor: isActive ? 'var(--md-sys-color-secondary-container)' : 'transparent',
              color: isActive
                ? 'var(--md-sys-color-on-secondary-container)'
                : 'var(--md-sys-color-on-surface-variant)',
              transition: 'background-color 0.2s',
            }}
          >
            <span
              className="material-symbols-rounded"
              aria-hidden="true"
              style={{
                fontSize: '24px',
                fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              {item.icon}
            </span>

            <span
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: isActive ? 700 : 500,
                letterSpacing: '0.1px',
                flex: 1,
              }}
            >
              {item.label}
            </span>

            {item.badge !== undefined && (
              <span
                aria-hidden="true"
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  color: isActive
                    ? 'var(--md-sys-color-on-secondary-container)'
                    : 'var(--md-sys-color-on-surface-variant)',
                }}
              >
                {item.badge}
              </span>
            )}
          </a>
        )
      })}
    </nav>
  )
}
