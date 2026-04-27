'use client'

import React, { useId, useRef, useState } from 'react'
import {
  FilledButton, OutlinedButton, TextButton, TonalButton, ElevatedButton,
  FilledTextField, OutlinedTextField,
  IconButton, FilledIconButton, TonalIconButton,
  Checkbox, Radio, Switch,
  FAB,
  Badge,
  LinearProgress, CircularProgress,
  FilledSelect, OutlinedSelect, SelectOption,
  Dialog,
  ChipSet, AssistChip, FilterChip, InputChip,
  Tabs, PrimaryTab, SecondaryTab,
  List, ListItem,
  Slider,
  Divider,
  Card, CardHeader, CardTitle, CardBody, CardActions,
  NavigationBar, NavigationRail,
  Snackbar, useSnackbar,
  Menu, MenuItem,
} from '@/components/m3'

export default function ComponentGallery() {
  const [dialogOpen, setDialogOpen]     = useState(false)
  const [radioValue, setRadioValue]     = useState('a')
  const [sliderValue, setSliderValue]   = useState(40)
  const [filterSelected, setFilterSelected] = useState(false)
  const [navActive, setNavActive]       = useState('/home')
  const { snackbarProps, showSnackbar } = useSnackbar()
  const menuAnchorId = useId()

  const NAV_ITEMS = [
    { label: 'Home',      icon: 'home',      href: '/home' },
    { label: 'Search',    icon: 'search',    href: '/search' },
    { label: 'Favorites', icon: 'favorite',  href: '/favorites', badge: 3 },
    { label: 'Profile',   icon: 'person',    href: '/profile' },
  ]

  const section = (title: string, children: React.ReactNode) => (
    <section style={{ marginBottom: '56px' }}>
      <h2 className="md-title-large" style={{ color: 'var(--md-sys-color-on-surface)', marginBottom: '4px' }}>
        {title}
      </h2>
      <Divider style={{ marginBottom: '24px' }} />
      {children}
    </section>
  )

  const row = (children: React.ReactNode, wrap = true) => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: wrap ? 'wrap' : 'nowrap', alignItems: 'center' }}>
      {children}
    </div>
  )

  return (
    <main style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 24px', backgroundColor: 'var(--md-sys-color-background)', minHeight: '100vh' }}>
      <h1 className="md-headline-large" style={{ color: 'var(--md-sys-color-on-background)', marginBottom: '8px' }}>
        Component Gallery
      </h1>
      <p className="md-body-medium" style={{ color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '40px' }}>
        Every component in the M3 kit, with realistic usage.
      </p>

      {section('Buttons', (
        <>
          {row(<>
            <FilledButton>Filled</FilledButton>
            <TonalButton>Tonal</TonalButton>
            <OutlinedButton>Outlined</OutlinedButton>
            <TextButton>Text</TextButton>
            <ElevatedButton>Elevated</ElevatedButton>
          </>)}
          <div style={{ marginTop: '12px' }}>
            {row(<>
              <FilledButton disabled>Disabled</FilledButton>
              <FilledButton>
                <span slot="icon" className="material-symbols-rounded" style={{ fontSize: '18px' }}>add</span>
                With Icon
              </FilledButton>
              <OutlinedButton onClick={() => showSnackbar('Outlined clicked')}>Fires snackbar</OutlinedButton>
            </>)}
          </div>
        </>
      ))}

      {section('Icon Buttons', (
        row(<>
          <IconButton aria-label="Settings">
            <span className="material-symbols-rounded">settings</span>
          </IconButton>
          <FilledIconButton aria-label="Add">
            <span className="material-symbols-rounded">add</span>
          </FilledIconButton>
          <TonalIconButton aria-label="Edit">
            <span className="material-symbols-rounded">edit</span>
          </TonalIconButton>
          <IconButton aria-label="Delete" disabled>
            <span className="material-symbols-rounded">delete</span>
          </IconButton>
        </>)
      ))}

      {section('FAB (Floating Action Button)', (
        row(<>
          <FAB size="small" aria-label="Add small">
            <span slot="icon" className="material-symbols-rounded">add</span>
          </FAB>
          <FAB label="Compose" variant="primary">
            <span slot="icon" className="material-symbols-rounded">edit</span>
          </FAB>
          <FAB size="large" aria-label="Add large" variant="secondary">
            <span slot="icon" className="material-symbols-rounded">add</span>
          </FAB>
          <FAB variant="tertiary" aria-label="Share">
            <span slot="icon" className="material-symbols-rounded">share</span>
          </FAB>
          <FAB variant="surface" aria-label="Upload">
            <span slot="icon" className="material-symbols-rounded">upload</span>
          </FAB>
        </>)
      ))}

      {section('Text Fields', (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <OutlinedTextField label="Outlined" style={{ width: '220px' }} />
          <FilledTextField label="Filled" style={{ width: '220px' }} />
          <OutlinedTextField label="With error" error errorText="Required field" style={{ width: '220px' }} />
          <OutlinedTextField label="Supporting text" supportingText="Help text" style={{ width: '220px' }} />
          <OutlinedTextField label="Password" type="password" style={{ width: '220px' }} />
          <OutlinedTextField label="Search" type="search" style={{ width: '220px' }}>
            <span slot="leading-icon" className="material-symbols-rounded" style={{ fontSize: '20px' }}>search</span>
          </OutlinedTextField>
          <FilledTextField label="Multiline" type="textarea" rows={3} style={{ width: '220px' }} />
        </div>
      ))}

      {section('Select / Dropdown', (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <OutlinedSelect label="Country" style={{ width: '220px' }}>
            <SelectOption value="us">United States</SelectOption>
            <SelectOption value="uk">United Kingdom</SelectOption>
            <SelectOption value="ca">Canada</SelectOption>
            <SelectOption value="au">Australia</SelectOption>
          </OutlinedSelect>
          <FilledSelect label="Plan" style={{ width: '220px' }}>
            <SelectOption value="free">Free</SelectOption>
            <SelectOption value="pro">Pro</SelectOption>
            <SelectOption value="team">Team</SelectOption>
          </FilledSelect>
        </div>
      ))}

      {section('Selection Controls', (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {row(<>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--md-sys-color-on-surface)' }}>
              <Checkbox /> Unchecked
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--md-sys-color-on-surface)' }}>
              <Checkbox defaultChecked /> Checked
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--md-sys-color-on-surface)' }}>
              <Checkbox indeterminate /> Indeterminate
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--md-sys-color-on-surface)' }}>
              <Checkbox disabled /> Disabled
            </label>
          </>)}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p className="md-label-medium" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>Radio group</p>
            {row(<>
              {['Option A', 'Option B', 'Option C'].map((label, i) => {
                const val = ['a', 'b', 'c'][i]
                return (
                  <label key={val} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--md-sys-color-on-surface)' }}>
                    <Radio name="gallery-radio" value={val} checked={radioValue === val} onChange={() => setRadioValue(val)} />
                    {label}
                  </label>
                )
              })}
            </>)}
          </div>

          {row(<>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', color: 'var(--md-sys-color-on-surface)' }}>
              <Switch /> Switch off
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', color: 'var(--md-sys-color-on-surface)' }}>
              <Switch selected /> Switch on
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--md-sys-color-on-surface)' }}>
              <Switch disabled /> Disabled
            </label>
          </>)}
        </div>
      ))}

      {section('Slider', (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="md-label-medium" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>Volume</span>
              <span className="md-label-medium" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>{sliderValue}%</span>
            </div>
            <Slider min={0} max={100} value={sliderValue} onInput={(e: Event) => setSliderValue(Number((e.target as HTMLInputElement).value))} style={{ width: '100%' }} />
          </div>
          <Slider min={0} max={100} value={70} labeled style={{ width: '100%' }} />
          <Slider min={0} max={100} valueStart={20} valueEnd={80} range labeled style={{ width: '100%' }} />
        </div>
      ))}

      {section('Progress Indicators', (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <p className="md-label-medium" style={{ color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '8px' }}>Linear — 65%</p>
            <LinearProgress value={0.65} style={{ width: '100%' }} />
          </div>
          <div>
            <p className="md-label-medium" style={{ color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '8px' }}>Linear — indeterminate</p>
            <LinearProgress indeterminate style={{ width: '100%' }} />
          </div>
          {row(<>
            <CircularProgress value={0.7} />
            <CircularProgress value={0.3} />
            <CircularProgress indeterminate />
          </>)}
        </div>
      ))}

      {section('Badge', (
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <div style={{ position: 'relative', display: 'inline-flex' }}>
            <IconButton aria-label="Notifications, 4 new">
              <span className="material-symbols-rounded">notifications</span>
            </IconButton>
            <Badge style={{ position: 'absolute', top: 4, right: 4 }} />
          </div>
          <div style={{ position: 'relative', display: 'inline-flex' }}>
            <IconButton aria-label="Messages, 12 new">
              <span className="material-symbols-rounded">chat</span>
            </IconButton>
            <Badge value="12" style={{ position: 'absolute', top: 4, right: 4 }} />
          </div>
          <div style={{ position: 'relative', display: 'inline-flex' }}>
            <IconButton aria-label="Cart, 999 items">
              <span className="material-symbols-rounded">shopping_cart</span>
            </IconButton>
            <Badge value="999+" style={{ position: 'absolute', top: 4, right: 4 }} />
          </div>
        </div>
      ))}

      {section('Chips', (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <ChipSet>
            <AssistChip label="Assist" />
            <AssistChip label="With icon">
              <span slot="icon" className="material-symbols-rounded" style={{ fontSize: '18px' }}>event</span>
            </AssistChip>
          </ChipSet>
          <ChipSet>
            <FilterChip label="All" />
            <FilterChip label="Active" selected={filterSelected} onChange={() => setFilterSelected(v => !v)} />
            <FilterChip label="Archived" />
          </ChipSet>
          <ChipSet>
            <InputChip label="react" />
            <InputChip label="typescript" />
            <InputChip label="material-web" />
          </ChipSet>
        </div>
      ))}

      {section('Tabs', (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <p className="md-label-medium" style={{ color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '8px' }}>Primary tabs</p>
            <Tabs>
              <PrimaryTab>Overview</PrimaryTab>
              <PrimaryTab>
                <span slot="icon" className="material-symbols-rounded">bar_chart</span>
                Analytics
              </PrimaryTab>
              <PrimaryTab>History</PrimaryTab>
            </Tabs>
          </div>
          <div>
            <p className="md-label-medium" style={{ color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '8px' }}>Secondary tabs</p>
            <Tabs>
              <SecondaryTab>Flight</SecondaryTab>
              <SecondaryTab>Hotel</SecondaryTab>
              <SecondaryTab>Activities</SecondaryTab>
            </Tabs>
          </div>
        </div>
      ))}

      {section('List', (
        <List style={{ maxWidth: '480px', borderRadius: '12px', backgroundColor: 'var(--md-sys-color-surface-container-low)' }}>
          <ListItem type="button" headline="Single line item" />
          <Divider />
          <ListItem type="button" headline="Two-line item" supportingText="Supporting text below" />
          <Divider />
          <ListItem
            type="button"
            headline="With leading icon"
            supportingText="Supporting text"
          >
            <span slot="start" className="material-symbols-rounded" aria-hidden="true">folder</span>
          </ListItem>
          <Divider />
          <ListItem type="button" headline="Disabled item" disabled />
        </List>
      ))}

      {section('Menu', (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <IconButton id={menuAnchorId} aria-label="More options">
            <span className="material-symbols-rounded">more_vert</span>
          </IconButton>
          <Menu anchor={menuAnchorId}>
            <MenuItem onClick={() => showSnackbar('Edit clicked')}>Edit</MenuItem>
            <MenuItem onClick={() => showSnackbar('Duplicate clicked')}>Duplicate</MenuItem>
            <Divider />
            <MenuItem onClick={() => showSnackbar('Delete clicked')}>Delete</MenuItem>
          </Menu>
        </div>
      ))}

      {section('Dialog', (
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <FilledButton onClick={() => setDialogOpen(true)}>Open dialog</FilledButton>
          <Dialog open={dialogOpen} onClosed={() => setDialogOpen(false)}>
            <span slot="headline">Discard draft?</span>
            <span slot="content">
              Your draft will be permanently deleted. This action cannot be undone.
            </span>
            <div slot="actions">
              <TextButton onClick={() => setDialogOpen(false)}>Cancel</TextButton>
              <FilledButton onClick={() => { showSnackbar('Draft discarded'); setDialogOpen(false) }}>
                Discard
              </FilledButton>
            </div>
          </Dialog>
        </div>
      ))}

      {section('Snackbar', (
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <OutlinedButton onClick={() => showSnackbar('Simple message')}>Show snackbar</OutlinedButton>
          <OutlinedButton onClick={() => showSnackbar('Item deleted', { action: 'Undo', onAction: () => showSnackbar('Restored') })}>
            With action
          </OutlinedButton>
        </div>
      ))}

      {section('Cards', (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
          <Card variant="elevated">
            <CardHeader><CardTitle>Elevated</CardTitle></CardHeader>
            <CardBody>Surface container low + elevation level 1. The standard card for most contexts.</CardBody>
            <CardActions>
              <TextButton>Cancel</TextButton>
              <FilledButton>Action</FilledButton>
            </CardActions>
          </Card>
          <Card variant="filled">
            <CardHeader><CardTitle>Filled</CardTitle></CardHeader>
            <CardBody>Surface container highest, no elevation. For emphasis within a surface.</CardBody>
            <CardActions>
              <FilledButton>Action</FilledButton>
            </CardActions>
          </Card>
          <Card variant="outlined">
            <CardHeader><CardTitle>Outlined</CardTitle></CardHeader>
            <CardBody>Surface background with outline-variant border. Minimal emphasis.</CardBody>
            <CardActions>
              <OutlinedButton>Action</OutlinedButton>
            </CardActions>
          </Card>
        </div>
      ))}

      {section('Navigation Bar (mobile)', (
        <div style={{ maxWidth: '480px', borderRadius: '12px', overflow: 'hidden' }}>
          <NavigationBar items={NAV_ITEMS} activeHref={navActive} onNavigate={setNavActive} />
        </div>
      ))}

      {section('Navigation Rail (tablet)', (
        <div style={{ height: '320px', display: 'flex', borderRadius: '12px', overflow: 'hidden' }}>
          <NavigationRail
            items={NAV_ITEMS}
            activeHref={navActive}
            onNavigate={setNavActive}
            fab={
              <FAB size="small" aria-label="Compose">
                <span slot="icon" className="material-symbols-rounded">edit</span>
              </FAB>
            }
          />
          <div style={{ flex: 1, backgroundColor: 'var(--md-sys-color-background)', padding: '24px' }}>
            <p className="md-body-medium" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
              Active: {navActive}
            </p>
          </div>
        </div>
      ))}

      {section('Typography', (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {([
            ['md-display-large',   'Display Large — 57/64'],
            ['md-display-medium',  'Display Medium — 45/52'],
            ['md-display-small',   'Display Small — 36/44'],
            ['md-headline-large',  'Headline Large — 32/40'],
            ['md-headline-medium', 'Headline Medium — 28/36'],
            ['md-headline-small',  'Headline Small — 24/32'],
            ['md-title-large',     'Title Large — 22/28'],
            ['md-title-medium',    'Title Medium — 16/24 500'],
            ['md-title-small',     'Title Small — 14/20 500'],
            ['md-body-large',      'Body Large — 16/24'],
            ['md-body-medium',     'Body Medium — 14/20'],
            ['md-body-small',      'Body Small — 12/16'],
            ['md-label-large',     'Label Large — 14/20 500'],
            ['md-label-medium',    'Label Medium — 12/16 500'],
            ['md-label-small',     'Label Small — 11/16 500'],
          ] as [string, string][]).map(([cls, label]) => (
            <div key={cls} style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
              <code style={{ fontSize: '11px', color: 'var(--md-sys-color-outline)', width: '180px', flexShrink: 0 }}>
                .{cls}
              </code>
              <span className={cls} style={{ color: 'var(--md-sys-color-on-background)' }}>{label}</span>
            </div>
          ))}
        </div>
      ))}

      {section('Color System', (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '8px' }}>
          {([
            ['primary',                    'on-primary'],
            ['on-primary',                 'primary'],
            ['primary-container',          'on-primary-container'],
            ['on-primary-container',       'primary-container'],
            ['secondary',                  'on-secondary'],
            ['secondary-container',        'on-secondary-container'],
            ['tertiary',                   'on-tertiary'],
            ['tertiary-container',         'on-tertiary-container'],
            ['error',                      'on-error'],
            ['error-container',            'on-error-container'],
            ['background',                 'on-background'],
            ['surface',                    'on-surface'],
            ['surface-variant',            'on-surface-variant'],
            ['surface-container-lowest',   'on-surface'],
            ['surface-container-low',      'on-surface'],
            ['surface-container',          'on-surface'],
            ['surface-container-high',     'on-surface'],
            ['surface-container-highest',  'on-surface'],
            ['inverse-surface',            'inverse-on-surface'],
            ['outline',                    'background'],
            ['outline-variant',            'on-surface'],
          ] as [string, string][]).map(([bg, fg]) => (
            <div
              key={bg}
              style={{
                backgroundColor: `var(--md-sys-color-${bg})`,
                color: `var(--md-sys-color-${fg})`,
                borderRadius: '12px',
                padding: '10px 12px',
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.3px',
                lineHeight: '14px',
              }}
            >
              {bg}
            </div>
          ))}
        </div>
      ))}

      <Snackbar {...snackbarProps} />
    </main>
  )
}
