import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'filled' | 'outlined'
}

const surfaceOverlay = {
  elevated: 'rgba(208, 188, 255, 0.05)',
  filled:   'transparent',
  outlined: 'transparent',
}

const cardStyles: Record<string, React.CSSProperties> = {
  elevated: {
    backgroundColor: 'var(--md-sys-color-surface-container-low)',
    boxShadow: 'var(--md-sys-elevation-level1)',
    border: 'none',
  },
  filled: {
    backgroundColor: 'var(--md-sys-color-surface-container-highest)',
    boxShadow: 'none',
    border: 'none',
  },
  outlined: {
    backgroundColor: 'var(--md-sys-color-surface)',
    boxShadow: 'none',
    border: '1px solid var(--md-sys-color-outline-variant)',
  },
}

export function Card({ variant = 'elevated', className, style, children, ...props }: CardProps) {
  return (
    <div
      style={{
        borderRadius: 'var(--md-sys-shape-corner-medium)',
        padding: '16px',
        color: 'var(--md-sys-color-on-surface)',
        position: 'relative',
        overflow: 'hidden',
        ...cardStyles[variant],
        ...style,
      }}
      className={className}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div style={{ marginBottom: '8px', ...style }} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ children, style, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      style={{
        fontSize: '16px',
        lineHeight: '24px',
        fontWeight: 500,
        letterSpacing: '0.15px',
        color: 'var(--md-sys-color-on-surface)',
        ...style,
      }}
      {...props}
    >
      {children}
    </h3>
  )
}

export function CardBody({ children, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      style={{
        fontSize: '14px',
        lineHeight: '20px',
        color: 'var(--md-sys-color-on-surface-variant)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardActions({ children, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'flex-end',
        marginTop: '16px',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
