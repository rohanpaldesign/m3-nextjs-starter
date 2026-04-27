'use client'

import {
  FilledButton, OutlinedButton, TextButton, TonalButton, ElevatedButton,
  FilledTextField, OutlinedTextField,
  Checkbox, Switch,
  LinearProgress, CircularProgress,
  ChipSet, AssistChip, FilterChip,
  Tabs, PrimaryTab,
  List, ListItem,
  Divider,
  Card, CardHeader, CardTitle, CardBody, CardActions,
} from '@/components/m3'

export default function ComponentGallery() {
  const section = (title: string, children: React.ReactNode) => (
    <section style={{ marginBottom: '48px' }}>
      <h2
        className="md-title-large"
        style={{
          color: 'var(--md-sys-color-on-surface)',
          marginBottom: '4px',
        }}
      >
        {title}
      </h2>
      <Divider style={{ marginBottom: '24px' }} />
      {children}
    </section>
  )

  return (
    <main
      style={{
        maxWidth: '960px',
        margin: '0 auto',
        padding: '32px 24px',
        backgroundColor: 'var(--md-sys-color-background)',
        minHeight: '100vh',
      }}
    >
      <h1
        className="md-headline-large"
        style={{ color: 'var(--md-sys-color-on-background)', marginBottom: '40px' }}
      >
        Component Gallery
      </h1>

      {section('Buttons', (
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <FilledButton>Filled</FilledButton>
          <TonalButton>Tonal</TonalButton>
          <OutlinedButton>Outlined</OutlinedButton>
          <TextButton>Text</TextButton>
          <ElevatedButton>Elevated</ElevatedButton>
          <FilledButton disabled>Disabled</FilledButton>
          <FilledButton>
            <span slot="icon" className="material-symbols-rounded" style={{ fontSize: '18px' }}>add</span>
            With Icon
          </FilledButton>
        </div>
      ))}

      {section('Text Fields', (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <OutlinedTextField label="Email address" type="email" style={{ width: '280px' }} />
          <OutlinedTextField label="Password" type="password" style={{ width: '280px' }} />
          <FilledTextField label="Filled field" style={{ width: '280px' }} />
          <OutlinedTextField label="With error" error errorText="Required" style={{ width: '280px' }} />
          <OutlinedTextField label="Supporting text" supportingText="Hint text here" style={{ width: '280px' }} />
        </div>
      ))}

      {section('Selection Controls', (
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--md-sys-color-on-surface)' }}>
            <Checkbox /> Checkbox
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--md-sys-color-on-surface)' }}>
            <Checkbox checked readOnly /> Checked
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--md-sys-color-on-surface)' }}>
            <Checkbox disabled /> Disabled
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', color: 'var(--md-sys-color-on-surface)' }}>
            <Switch /> Switch off
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', color: 'var(--md-sys-color-on-surface)' }}>
            <Switch selected /> Switch on
          </label>
        </div>
      ))}

      {section('Progress Indicators', (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p className="md-label-medium" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
              Linear — 40%
            </p>
            <LinearProgress value={0.4} style={{ width: '100%' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p className="md-label-medium" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
              Linear — Indeterminate
            </p>
            <LinearProgress indeterminate style={{ width: '100%' }} />
          </div>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <CircularProgress value={0.7} />
            <CircularProgress indeterminate />
          </div>
        </div>
      ))}

      {section('Chips', (
        <ChipSet>
          <AssistChip label="Assist chip" />
          <FilterChip label="Filter chip" />
          <FilterChip label="Selected" selected />
        </ChipSet>
      ))}

      {section('Tabs', (
        <Tabs>
          <PrimaryTab>Overview</PrimaryTab>
          <PrimaryTab>Details</PrimaryTab>
          <PrimaryTab>History</PrimaryTab>
        </Tabs>
      ))}

      {section('List', (
        <List style={{ maxWidth: '480px', borderRadius: '12px', backgroundColor: 'var(--md-sys-color-surface-container-low)' }}>
          <ListItem type="button" headline="Item one" supportingText="Supporting text" />
          <Divider />
          <ListItem type="button" headline="Item two" supportingText="Supporting text" />
          <Divider />
          <ListItem type="button" headline="Item three" />
        </List>
      ))}

      {section('Cards', (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Elevated Card</CardTitle>
            </CardHeader>
            <CardBody>
              Surface container low background, elevation level 1. The standard card variant.
            </CardBody>
            <CardActions>
              <TextButton>Learn more</TextButton>
              <FilledButton>Action</FilledButton>
            </CardActions>
          </Card>
          <Card variant="filled">
            <CardHeader>
              <CardTitle>Filled Card</CardTitle>
            </CardHeader>
            <CardBody>
              Surface container highest background. No elevation, no border. For emphasis within a surface.
            </CardBody>
            <CardActions>
              <FilledButton>Action</FilledButton>
            </CardActions>
          </Card>
          <Card variant="outlined">
            <CardHeader>
              <CardTitle>Outlined Card</CardTitle>
            </CardHeader>
            <CardBody>
              Surface background with outline-variant border. Low emphasis, used on darker surfaces.
            </CardBody>
            <CardActions>
              <OutlinedButton>Action</OutlinedButton>
            </CardActions>
          </Card>
        </div>
      ))}

      {section('Typography', (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            ['md-display-large',   'Display Large'],
            ['md-display-medium',  'Display Medium'],
            ['md-display-small',   'Display Small'],
            ['md-headline-large',  'Headline Large'],
            ['md-headline-medium', 'Headline Medium'],
            ['md-headline-small',  'Headline Small'],
            ['md-title-large',     'Title Large'],
            ['md-title-medium',    'Title Medium'],
            ['md-title-small',     'Title Small'],
            ['md-body-large',      'Body Large'],
            ['md-body-medium',     'Body Medium'],
            ['md-body-small',      'Body Small'],
            ['md-label-large',     'Label Large'],
            ['md-label-medium',    'Label Medium'],
            ['md-label-small',     'Label Small'],
          ].map(([cls, label]) => (
            <div key={cls} style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
              <span
                className="md-label-small"
                style={{
                  color: 'var(--md-sys-color-outline)',
                  width: '160px',
                  flexShrink: 0,
                  fontFamily: 'monospace',
                }}
              >
                .{cls}
              </span>
              <span className={cls} style={{ color: 'var(--md-sys-color-on-background)' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      ))}

      {section('Color System', (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '8px' }}>
          {[
            ['primary',            'on-primary'],
            ['primary-container',  'on-primary-container'],
            ['secondary',          'on-secondary'],
            ['secondary-container','on-secondary-container'],
            ['tertiary',           'on-tertiary'],
            ['tertiary-container', 'on-tertiary-container'],
            ['error',              'on-error'],
            ['error-container',    'on-error-container'],
            ['surface-container-low',     'on-surface'],
            ['surface-container',         'on-surface'],
            ['surface-container-high',    'on-surface'],
            ['surface-container-highest', 'on-surface'],
          ].map(([bg, fg]) => (
            <div
              key={bg}
              style={{
                backgroundColor: `var(--md-sys-color-${bg})`,
                color: `var(--md-sys-color-${fg})`,
                borderRadius: '12px',
                padding: '12px',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.5px',
              }}
            >
              {bg}
            </div>
          ))}
        </div>
      ))}
    </main>
  )
}
