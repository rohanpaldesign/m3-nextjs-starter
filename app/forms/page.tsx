'use client'

import React, { useRef, useState } from 'react'
import { OutlinedTextField, FilledTextField } from '@/components/m3/TextField'
import { FilledButton, OutlinedButton, TextButton } from '@/components/m3/Button'
import { FilledSelect, OutlinedSelect, SelectOption } from '@/components/m3/Select'
import { Checkbox } from '@/components/m3/Checkbox'
import { Radio } from '@/components/m3/Radio'
import { Switch } from '@/components/m3/Switch'
import { Slider } from '@/components/m3/Slider'
import { Snackbar } from '@/components/m3/Snackbar'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/m3/Card'
import { Divider } from '@/components/m3/Divider'

/*
 * Reading values from @material/web text fields:
 * The Lit element exposes a `value` property on the DOM node.
 * Access it via useRef — NOT React state on every keystroke.
 *
 * For real-time validation, use the `onInput` event instead.
 */

interface MdTextFieldElement extends HTMLElement {
  value: string
  error: boolean
  errorText: string
}

interface MdSelectElement extends HTMLElement {
  value: string
}

type SnackbarState = { open: boolean; message: string }

export default function FormsPage() {
  const emailRef  = useRef<MdTextFieldElement>(null)
  const passRef   = useRef<MdTextFieldElement>(null)
  const bioRef    = useRef<MdTextFieldElement>(null)
  const selectRef = useRef<MdSelectElement>(null)

  const [agreed, setAgreed]       = useState(false)
  const [plan, setPlan]           = useState('free')
  const [notifications, setNotifications] = useState(true)
  const [volume, setVolume]       = useState(50)
  const [snackbar, setSnackbar]   = useState<SnackbarState>({ open: false, message: '' })

  const showSnackbar = (message: string) => setSnackbar({ open: true, message })

  function validate(): boolean {
    const email = emailRef.current
    const pass  = passRef.current
    let valid = true

    if (!email?.value) {
      if (email) { email.error = true; email.errorText = 'Email is required' }
      valid = false
    } else if (!email.value.includes('@')) {
      email.error = true
      email.errorText = 'Enter a valid email address'
      valid = false
    } else {
      if (email) { email.error = false; email.errorText = '' }
    }

    if (!pass?.value || pass.value.length < 8) {
      if (pass) { pass.error = true; pass.errorText = 'Password must be at least 8 characters' }
      valid = false
    } else {
      if (pass) { pass.error = false; pass.errorText = '' }
    }

    return valid
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) {
      showSnackbar('Please fix the errors above')
      return
    }

    const data = {
      email:         emailRef.current?.value,
      password:      passRef.current?.value,
      bio:           bioRef.current?.value,
      plan:          selectRef.current?.value ?? plan,
      agreedToTerms: agreed,
      notifications,
      volume,
    }

    console.log('Form data:', data)
    showSnackbar('Account created successfully')
  }

  return (
    <main
      style={{
        maxWidth: '640px',
        margin: '0 auto',
        padding: '32px 24px',
        backgroundColor: 'var(--md-sys-color-background)',
        minHeight: '100vh',
      }}
    >
      <h1 className="md-headline-large" style={{ color: 'var(--md-sys-color-on-background)', marginBottom: '8px' }}>
        Form Patterns
      </h1>
      <p className="md-body-medium" style={{ color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '32px' }}>
        How to read values from @material/web components in React using useRef and event handlers.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <Card variant="elevated" style={{ marginBottom: '24px' }}>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
          </CardHeader>
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
              <OutlinedTextField
                ref={emailRef}
                label="Email address"
                type="email"
                autocomplete="email"
                style={{ width: '100%' }}
              />
              <OutlinedTextField
                ref={passRef}
                label="Password"
                type="password"
                autocomplete="new-password"
                supportingText="Minimum 8 characters"
                style={{ width: '100%' }}
              />
              <FilledTextField
                ref={bioRef}
                label="Bio"
                type="textarea"
                rows={3}
                style={{ width: '100%' }}
              />
            </div>
          </CardBody>
        </Card>

        <Card variant="elevated" style={{ marginBottom: '24px' }}>
          <CardHeader>
            <CardTitle>Plan</CardTitle>
          </CardHeader>
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
              {[
                { value: 'free',  label: 'Free',  desc: 'Up to 3 projects' },
                { value: 'pro',   label: 'Pro',   desc: 'Unlimited projects, priority support' },
                { value: 'team',  label: 'Team',  desc: 'Everything in Pro, plus team management' },
              ].map(option => (
                <label
                  key={option.value}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    color: 'var(--md-sys-color-on-surface)',
                  }}
                >
                  <Radio
                    name="plan"
                    value={option.value}
                    checked={plan === option.value}
                    onChange={() => setPlan(option.value)}
                  />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 500 }}>{option.label}</div>
                    <div style={{ fontSize: '12px', color: 'var(--md-sys-color-on-surface-variant)' }}>
                      {option.desc}
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <Divider style={{ margin: '16px 0' }} />

            <OutlinedSelect
              ref={selectRef}
              label="Billing cycle"
              style={{ width: '100%' }}
            >
              <SelectOption value="monthly">Monthly</SelectOption>
              <SelectOption value="annual">Annual (save 20%)</SelectOption>
            </OutlinedSelect>
          </CardBody>
        </Card>

        <Card variant="elevated" style={{ marginBottom: '24px' }}>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '8px' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
              >
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--md-sys-color-on-surface)' }}>
                    Email notifications
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--md-sys-color-on-surface-variant)' }}>
                    Receive updates about your account
                  </div>
                </div>
                <Switch
                  selected={notifications}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNotifications(e.target.checked)}
                />
              </label>

              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                  }}
                >
                  <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--md-sys-color-on-surface)' }}>
                    Notification volume
                  </span>
                  <span style={{ fontSize: '14px', color: 'var(--md-sys-color-on-surface-variant)' }}>
                    {volume}%
                  </span>
                </div>
                <Slider
                  min={0}
                  max={100}
                  value={volume}
                  onInput={(e: Event) => setVolume(Number((e.target as HTMLInputElement).value))}
                  style={{ width: '100%' }}
                />
              </div>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  cursor: 'pointer',
                  color: 'var(--md-sys-color-on-surface)',
                }}
              >
                <Checkbox
                  checked={agreed}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAgreed(e.target.checked)}
                />
                <span style={{ fontSize: '14px', lineHeight: '20px' }}>
                  I agree to the Terms of Service and Privacy Policy
                </span>
              </label>
            </div>
          </CardBody>
        </Card>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <TextButton type="button" onClick={() => showSnackbar('Cancelled')}>
            Cancel
          </TextButton>
          <OutlinedButton type="button" onClick={validate}>
            Validate
          </OutlinedButton>
          <FilledButton type="submit" disabled={!agreed}>
            Create account
          </FilledButton>
        </div>
      </form>

      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={() => setSnackbar(s => ({ ...s, open: false }))}
      />
    </main>
  )
}
