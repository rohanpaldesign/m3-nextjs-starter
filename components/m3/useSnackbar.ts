'use client'

import { useState, useCallback } from 'react'

interface SnackbarState {
  open: boolean
  message: string
  action?: string
  onAction?: () => void
}

interface UseSnackbarReturn {
  snackbarProps: SnackbarState & { onClose: () => void }
  showSnackbar: (message: string, options?: { action?: string; onAction?: () => void }) => void
  hideSnackbar: () => void
}

/*
 * Manages Snackbar state so you don't have to wire it manually.
 *
 * Usage in a 'use client' component:
 *
 *   const { snackbarProps, showSnackbar } = useSnackbar()
 *
 *   // Show it anywhere:
 *   showSnackbar('Changes saved')
 *   showSnackbar('Item deleted', { action: 'Undo', onAction: () => restore() })
 *
 *   // In JSX — render once at the bottom of the page or in the root layout:
 *   <Snackbar {...snackbarProps} />
 */
export function useSnackbar(): UseSnackbarReturn {
  const [state, setState] = useState<SnackbarState>({
    open: false,
    message: '',
  })

  const showSnackbar = useCallback((
    message: string,
    options?: { action?: string; onAction?: () => void },
  ) => {
    setState({ open: true, message, action: options?.action, onAction: options?.onAction })
  }, [])

  const hideSnackbar = useCallback(() => {
    setState(s => ({ ...s, open: false }))
  }, [])

  return {
    snackbarProps: { ...state, onClose: hideSnackbar },
    showSnackbar,
    hideSnackbar,
  }
}
