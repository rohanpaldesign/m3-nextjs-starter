import React from 'react'

interface TopAppBarProps {
  title?: string
  navigationIcon?: React.ReactNode
  actions?: React.ReactNode
  variant?: 'center-aligned' | 'small' | 'medium' | 'large'
  className?: string
  style?: React.CSSProperties
}

export function TopAppBar({ title, navigationIcon, actions, variant = 'small', className, style }: TopAppBarProps) {
  const isCenterAligned = variant === 'center-aligned'
  const isMedium = variant === 'medium'
  const isLarge = variant === 'large'

  const height = isMedium ? '112px' : isLarge ? '152px' : '64px'

  return (
    <header
      className={className}
      style={{
        width: '100%',
        height,
        backgroundColor: 'var(--md-sys-color-surface-container)',
        color: 'var(--md-sys-color-on-surface)',
        display: 'flex',
        flexDirection: isMedium || isLarge ? 'column' : 'row',
        alignItems: isMedium || isLarge ? 'flex-start' : 'center',
        paddingInline: '4px',
        gap: '0',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {isMedium || isLarge ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '64px' }}>
            {navigationIcon && (
              <div style={{ padding: '8px' }}>{navigationIcon}</div>
            )}
            <div style={{ flex: 1 }} />
            {actions && (
              <div style={{ display: 'flex', alignItems: 'center', padding: '4px' }}>
                {actions}
              </div>
            )}
          </div>
          {title && (
            <h1
              style={{
                fontSize: isLarge ? '36px' : '28px',
                lineHeight: isLarge ? '44px' : '36px',
                fontWeight: 400,
                paddingInline: '16px',
                paddingBottom: isLarge ? '28px' : '24px',
              }}
            >
              {title}
            </h1>
          )}
        </>
      ) : (
        <>
          {navigationIcon && (
            <div style={{ padding: '8px' }}>{navigationIcon}</div>
          )}
          {title && (
            <h1
              style={{
                flex: isCenterAligned ? undefined : 1,
                margin: isCenterAligned ? 'auto' : undefined,
                fontSize: '22px',
                lineHeight: '28px',
                fontWeight: 400,
                paddingInline: isCenterAligned ? 0 : '4px',
              }}
            >
              {title}
            </h1>
          )}
          {!isCenterAligned && <div style={{ flex: 1 }} />}
          {actions && (
            <div style={{ display: 'flex', alignItems: 'center', padding: '4px' }}>
              {actions}
            </div>
          )}
        </>
      )}
    </header>
  )
}
