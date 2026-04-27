'use client'

import React, { useEffect, useRef } from 'react'

export interface SnackbarProps {
  open: boolean
  message: string
  action?: string
  onAction?: () => void
  onClose?: () => void
  duration?: number
  className?: string
  style?: React.CSSProperties
}

export function Snackbar({ open, message, action, onAction, onClose, duration = 4000, className, style }: SnackbarProps) {
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (open) {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        onCloseRef.current?.()
      }, duration)
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [open, duration])

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={className}
      style={{
        position: 'fixed',
        bottom: open ? '24px' : '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        minWidth: '288px',
        maxWidth: '560px',
        padding: '0 16px',
        height: '48px',
        borderRadius: 'var(--md-sys-shape-corner-extra-small)',
        backgroundColor: 'var(--md-sys-color-inverse-surface)',
        color: 'var(--md-sys-color-inverse-on-surface)',
        boxShadow: 'var(--md-sys-elevation-level3)',
        opacity: open ? 1 : 0,
        transition: 'bottom 0.3s cubic-bezier(0.2, 0, 0, 1), opacity 0.3s cubic-bezier(0.2, 0, 0, 1)',
        pointerEvents: open ? 'auto' : 'none',
        ...style,
      }}
    >
      <span
        style={{
          flex: 1,
          fontSize: '14px',
          lineHeight: '20px',
          letterSpacing: '0.25px',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        {message}
      </span>

      {action && (
        <button
          onClick={() => {
            onAction?.()
            onClose?.()
          }}
          style={{
            background: 'none',
            border: 'none',
            padding: '0 8px',
            height: '100%',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.1px',
            color: 'var(--md-sys-color-inverse-primary)',
            fontFamily: 'inherit',
          }}
        >
          {action}
        </button>
      )}
    </div>
  )
}

/*
 * Usage — manage open state with useState:
 *
 *   const [snackbar, setSnackbar] = useState({ open: false, message: '' })
 *
 *   // Show it:
 *   setSnackbar({ open: true, message: 'Changes saved' })
 *
 *   // In JSX:
 *   <Snackbar
 *     open={snackbar.open}
 *     message={snackbar.message}
 *     action="Undo"
 *     onAction={() => handleUndo()}
 *     onClose={() => setSnackbar(s => ({ ...s, open: false }))}
 *   />
 *
 * Best practice: render at the root layout level so it appears above all content.
 */
