'use client'

import React from 'react'

interface NavBarItem {
  label: string
  icon: string
  href: string
  badge?: number | string
}

interface NavigationBarProps {
  items: NavBarItem[]
  activeHref: string
  onNavigate?: (href: string) => void
  className?: string
  style?: React.CSSProperties
}

export function NavigationBar({ items, activeHref, onNavigate, className, style }: NavigationBarProps) {
  return (
    <nav
      aria-label="Main navigation"
      className={className}
      style={{
        width: '100%',
        height: '80px',
        backgroundColor: 'var(--md-sys-color-surface-container)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 'env(safe-area-inset-bottom)',
        ...style,
      }}
    >
      {items.map(item => {
        const isActive = activeHref === item.href
        return (
          <a
            key={item.href}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            aria-label={item.badge !== undefined ? `${item.label}, ${item.badge} new` : item.label}
            onClick={e => {
              if (onNavigate) {
                e.preventDefault()
                onNavigate(item.href)
              }
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              flex: 1,
              paddingTop: '12px',
              paddingBottom: '16px',
              textDecoration: 'none',
              color: isActive
                ? 'var(--md-sys-color-on-secondary-container)'
                : 'var(--md-sys-color-on-surface-variant)',
            }}
          >
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '64px',
                  height: '32px',
                  borderRadius: '9999px',
                  backgroundColor: isActive ? 'var(--md-sys-color-secondary-container)' : 'transparent',
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
              </div>

              {item.badge !== undefined && (
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '8px',
                    minWidth: '16px',
                    height: '16px',
                    borderRadius: '9999px',
                    backgroundColor: 'var(--md-sys-color-error)',
                    color: 'var(--md-sys-color-on-error)',
                    fontSize: '11px',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 4px',
                  }}
                >
                  {item.badge}
                </span>
              )}
            </div>

            <span
              style={{
                fontSize: '12px',
                lineHeight: '16px',
                fontWeight: isActive ? 700 : 500,
                letterSpacing: '0.5px',
              }}
            >
              {item.label}
            </span>
          </a>
        )
      })}
    </nav>
  )
}
