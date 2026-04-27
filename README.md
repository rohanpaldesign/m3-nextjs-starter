# M3 Next.js Starter

Material Design 3 component library for Next.js — built on Google's official [`@material/web`](https://github.com/material-components/material-web) (Lit-based) with full dark theme, Roboto Flex, and Material Symbols.

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?repo=rohanpaldesign/m3-nextjs-starter)

---

## What's inside

### `@material/web` wrappers
React wrappers around Google's official M3 web components. These get all HTML attributes, `style`, and `className` automatically, and respond to every `--md-sys-color-*` and `--md-comp-*` CSS custom property.

| Component | Export(s) |
|---|---|
| Buttons | `FilledButton` `OutlinedButton` `TextButton` `TonalButton` `ElevatedButton` |
| Icon Buttons | `IconButton` `FilledIconButton` `OutlinedIconButton` `TonalIconButton` |
| FAB | `FAB` `BrandedFAB` |
| Text Fields | `FilledTextField` `OutlinedTextField` |
| Select | `FilledSelect` `OutlinedSelect` `SelectOption` |
| Checkbox | `Checkbox` |
| Radio | `Radio` |
| Switch | `Switch` |
| Slider | `Slider` |
| Progress | `LinearProgress` `CircularProgress` |
| Badge | `Badge` |
| Chips | `ChipSet` `AssistChip` `FilterChip` `InputChip` `SuggestionChip` |
| Tabs | `Tabs` `PrimaryTab` `SecondaryTab` |
| List | `List` `ListItem` |
| Dialog | `Dialog` |
| Menu | `Menu` `MenuItem` `SubMenu` |
| Divider | `Divider` |
| Icon | `Icon` |

### Custom M3-spec components
Built from scratch using `--md-sys-color-*` tokens, following the M3 spec exactly for sizes and colors. All accept `className` and `style` for instance-level overrides.

| Component | Export(s) | Notes |
|---|---|---|
| Card | `Card` `CardHeader` `CardTitle` `CardBody` `CardActions` | 3 variants: elevated / filled / outlined |
| Navigation Drawer | `NavigationDrawer` | Desktop sidebar, 360dp default width |
| Navigation Rail | `NavigationRail` | Tablet sidebar, 80dp default width |
| Navigation Bar | `NavigationBar` | Mobile bottom nav, 80dp height |
| Top App Bar | `TopAppBar` | 4 variants: small / center-aligned / medium / large |
| Snackbar | `Snackbar` `useSnackbar` | Auto-dismiss, action button, `aria-live` |

---

## Quick start

### Option A — Try it in Codespaces

Click the badge above. After the container starts:

```bash
npm run dev
```

Then open `http://localhost:3000` and visit:
- `/components` — every component with realistic usage
- `/layout` — NavigationDrawer + TopAppBar dashboard shell
- `/forms` — form patterns, validation, reading `md-text-field` values in React

### Option B — Copy into your Next.js project

**Step 1.** Copy the `components/m3/` folder into your project.

**Step 2.** Add the M3 token block from `app/globals.css` (the entire `:root { ... }` section) to your project's global CSS file.

**Step 3.** Add `transpilePackages` to `next.config.js`:

```js
const nextConfig = {
  transpilePackages: ['@material/web', 'lit', '@lit/reactive-element', '@lit/react'],
}
module.exports = nextConfig
```

**Step 4.** Install dependencies:

```bash
npm install @material/web @lit/react lit
```

**Step 5.** Load Roboto Flex and Material Symbols in your root layout:

```tsx
import { Roboto_Flex, Material_Symbols_Rounded } from 'next/font/google'

const robotoFlex     = Roboto_Flex({ subsets: ['latin'], display: 'swap', variable: '--font-roboto-flex' })
const materialSymbols = Material_Symbols_Rounded({ subsets: ['latin'], display: 'swap', variable: '--font-material-symbols' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${robotoFlex.variable} ${materialSymbols.variable}`}>
      <body className={robotoFlex.className}>{children}</body>
    </html>
  )
}
```

All wrapper components require `'use client'` — import them only in client components or pages.

---

## Theming

M3 theming works in three concentric layers, from widest to narrowest scope.

### Level 1 — System tokens (retheme the whole app)

All `--md-sys-color-*` tokens are defined in `app/globals.css` under `:root`. Changing them recolors every component automatically — `@material/web` reads them natively, and every custom component uses them too.

**To use a different brand color:** go to [m3.material.io/theme-builder](https://m3.material.io/theme-builder), enter your seed color, export the dark scheme, and paste the hex values into `globals.css`.

Example — switch from purple to teal:

```css
:root {
  --md-sys-color-primary:                  #80CBC4;
  --md-sys-color-on-primary:               #003733;
  --md-sys-color-primary-container:        #004F4B;
  --md-sys-color-on-primary-container:     #9EF2EB;
  --md-sys-color-secondary:                #B2DFDB;
  --md-sys-color-on-secondary:             #00201E;
  /* ... paste full scheme here */
}
```

**Shape tokens** control corner radii across all components:

```css
:root {
  --md-sys-shape-corner-medium: 4px; /* squarer design language */
}
```

Available shape tokens: `extra-small` (4px) · `small` (8px) · `medium` (12px) · `large` (16px) · `extra-large` (28px) · `full` (9999px).

### Level 2 — Component tokens (override one component type)

Every `@material/web` component exposes CSS custom properties with the prefix `--md-<component-name>-*`. Set these in your global CSS to override that component type everywhere.

```css
/* Make all filled buttons use brand green */
md-filled-button {
  --md-filled-button-container-color: #2E7D32;
  --md-filled-button-label-text-color: #FFFFFF;
}

/* Square off all buttons (override the full/pill shape) */
md-filled-button,
md-outlined-button,
md-text-button,
md-tonal-button {
  --md-filled-button-container-shape:   4px;
  --md-outlined-button-container-shape: 4px;
  --md-text-button-container-shape:     4px;
  --md-tonal-button-container-shape:    4px;
}

/* Thicker text field borders */
md-outlined-text-field {
  --md-outlined-text-field-outline-width:       2px;
  --md-outlined-text-field-focus-outline-width: 3px;
}

/* Smaller FAB corner radius (extra-large → medium) */
md-fab {
  --md-fab-container-shape: var(--md-sys-shape-corner-medium);
}

/* Custom slider track color */
md-slider {
  --md-slider-active-track-color: var(--md-sys-color-tertiary);
}
```

Full token lists for every component: [github.com/material-components/material-web/tree/main/tokens](https://github.com/material-components/material-web/tree/main/tokens)

Key prefixes:

| Component | Token prefix |
|---|---|
| FilledButton | `--md-filled-button-*` |
| OutlinedButton | `--md-outlined-button-*` |
| TextButton | `--md-text-button-*` |
| TonalButton | `--md-tonal-button-*` |
| ElevatedButton | `--md-elevated-button-*` |
| FilledTextField | `--md-filled-text-field-*` |
| OutlinedTextField | `--md-outlined-text-field-*` |
| Checkbox | `--md-checkbox-*` |
| Radio | `--md-radio-*` |
| Switch | `--md-switch-*` |
| Slider | `--md-slider-*` |
| LinearProgress | `--md-linear-progress-*` |
| CircularProgress | `--md-circular-progress-*` |
| FAB | `--md-fab-*` |
| Dialog | `--md-dialog-*` |
| AssistChip | `--md-assist-chip-*` |
| FilterChip | `--md-filter-chip-*` |
| InputChip | `--md-input-chip-*` |
| PrimaryTab | `--md-primary-tab-*` |
| SecondaryTab | `--md-secondary-tab-*` |

### Level 3 — Instance overrides (one specific element)

All wrappers and all custom components accept `style` and `className`. CSS custom properties set via `style` override component tokens for that single element.

```tsx
{/* One destructive filled button — red container, no pill shape */}
<FilledButton
  style={{
    '--md-filled-button-container-color': 'var(--md-sys-color-error)',
    '--md-filled-button-label-text-color': 'var(--md-sys-color-on-error)',
    '--md-filled-button-container-shape': '4px',
  } as React.CSSProperties}
>
  Delete account
</FilledButton>

{/* Narrower drawer for a compact sidebar layout */}
<NavigationDrawer width="280px" items={NAV} activeHref={active} onNavigate={setActive} />

{/* Fixed-position bottom nav bar */}
<NavigationBar
  style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100 }}
  items={NAV}
  activeHref={active}
  onNavigate={setActive}
/>

{/* Snackbar pinned to bottom-right instead of center */}
<Snackbar
  style={{ left: 'auto', right: '24px', transform: 'none' }}
  {...snackbarProps}
/>
```

---

## Component reference

### Buttons

M3 defines five button variants by emphasis level.

| Variant | Use when |
|---|---|
| `FilledButton` | Primary action — highest emphasis |
| `TonalButton` | Secondary action on a surface |
| `OutlinedButton` | Secondary action, lower emphasis |
| `ElevatedButton` | On colored/image backgrounds |
| `TextButton` | Inline or tertiary actions — lowest emphasis |

```tsx
import { FilledButton, TonalButton, OutlinedButton, TextButton, ElevatedButton } from '@/components/m3'

<FilledButton onClick={handleSave}>Save</FilledButton>
<OutlinedButton type="button">Cancel</OutlinedButton>
<FilledButton disabled>Disabled</FilledButton>

{/* With a leading icon — use the slot="icon" attribute */}
<FilledButton>
  <span slot="icon" className="material-symbols-rounded" style={{ fontSize: '18px' }}>add</span>
  New item
</FilledButton>
```

Props: `disabled`, `type` ('button'|'submit'|'reset'), `onClick`, `href` (renders as `<a>`), `target`.

---

### Icon Buttons

```tsx
import { IconButton, FilledIconButton, OutlinedIconButton, TonalIconButton } from '@/components/m3'

{/* Always provide aria-label — the icon is the only content */}
<IconButton aria-label="Close dialog">
  <span className="material-symbols-rounded">close</span>
</IconButton>

<FilledIconButton aria-label="Add item">
  <span className="material-symbols-rounded">add</span>
</FilledIconButton>
```

Props: `disabled`, `onClick`, `aria-label` (required for accessibility).

---

### FAB (Floating Action Button)

```tsx
import { FAB, BrandedFAB } from '@/components/m3'

{/* Standard FAB with label */}
<FAB label="Compose" variant="primary">
  <span slot="icon" className="material-symbols-rounded">edit</span>
</FAB>

{/* Small FAB — icon only */}
<FAB size="small" aria-label="Add">
  <span slot="icon" className="material-symbols-rounded">add</span>
</FAB>

{/* Fixed-position FAB (common pattern) */}
<FAB
  label="New"
  variant="primary"
  style={{ position: 'fixed', bottom: '24px', right: '24px' }}
>
  <span slot="icon" className="material-symbols-rounded">add</span>
</FAB>
```

Props: `size` ('small'|'medium'|'large'), `variant` ('primary'|'secondary'|'tertiary'|'surface'), `label`, `aria-label`, `disabled`.

---

### Text Fields

```tsx
import { OutlinedTextField, FilledTextField } from '@/components/m3'

<OutlinedTextField label="Email" type="email" style={{ width: '100%' }} />
<FilledTextField label="Search" type="search" />
<OutlinedTextField
  label="Password"
  type="password"
  supportingText="Minimum 8 characters"
/>
<OutlinedTextField label="Bio" type="textarea" rows={4} style={{ width: '100%' }} />

{/* With icons */}
<OutlinedTextField label="Search">
  <span slot="leading-icon" className="material-symbols-rounded" style={{ fontSize: '20px' }}>search</span>
</OutlinedTextField>

{/* Error state */}
<OutlinedTextField label="Email" error errorText="Invalid email address" />
```

Props: `label`, `type`, `value`, `placeholder`, `disabled`, `required`, `error` (boolean), `errorText`, `supportingText`, `rows` (textarea), `autocomplete`, `onInput`, `onChange`.

**Reading values in React — use `useRef`:**

```tsx
interface MdTextFieldElement extends HTMLElement {
  value: string
  error: boolean
  errorText: string
}

const emailRef = useRef<MdTextFieldElement>(null)

<OutlinedTextField ref={emailRef} label="Email" />

// On submit:
const email = emailRef.current?.value

// Validation:
if (!email?.includes('@')) {
  emailRef.current!.error = true
  emailRef.current!.errorText = 'Enter a valid email'
}
```

See `/forms` for a complete form example with validation, radio groups, select, and Snackbar feedback.

---

### Select

```tsx
import { OutlinedSelect, FilledSelect, SelectOption } from '@/components/m3'

const selectRef = useRef<{ value: string } & HTMLElement>(null)

<OutlinedSelect ref={selectRef} label="Country" style={{ width: '100%' }}>
  <SelectOption value="us">United States</SelectOption>
  <SelectOption value="uk">United Kingdom</SelectOption>
  <SelectOption value="au">Australia</SelectOption>
</OutlinedSelect>

// Read on submit:
const country = selectRef.current?.value
```

Props: `label`, `disabled`, `required`, `onChange`.

---

### Selection Controls

```tsx
import { Checkbox, Radio, Switch } from '@/components/m3'

{/* Checkbox — always wrap in <label> */}
<label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <Checkbox checked={agreed} onChange={e => setAgreed(e.target.checked)} />
  I agree to the terms
</label>
<label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <Checkbox indeterminate />
  Indeterminate state
</label>

{/* Radio — group by same name prop */}
{['free', 'pro', 'team'].map(plan => (
  <label key={plan} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <Radio name="plan" value={plan} checked={selected === plan} onChange={() => setSelected(plan)} />
    {plan}
  </label>
))}

{/* Switch */}
<label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <Switch selected={enabled} onChange={e => setEnabled(e.target.checked)} />
  Email notifications
</label>
```

---

### Progress

```tsx
import { LinearProgress, CircularProgress } from '@/components/m3'

{/* Determinate — value is 0–1 */}
<LinearProgress value={0.65} style={{ width: '100%' }} />

{/* Indeterminate */}
<LinearProgress indeterminate style={{ width: '100%' }} />
<CircularProgress indeterminate />
```

---

### Badge

```tsx
import { Badge } from '@/components/m3'
import { IconButton } from '@/components/m3'

{/* Dot badge */}
<div style={{ position: 'relative', display: 'inline-flex' }}>
  <IconButton aria-label="Notifications, new">
    <span className="material-symbols-rounded">notifications</span>
  </IconButton>
  <Badge style={{ position: 'absolute', top: 4, right: 4 }} />
</div>

{/* Numbered badge — include count in aria-label on the button */}
<div style={{ position: 'relative', display: 'inline-flex' }}>
  <IconButton aria-label="Messages, 12 new">
    <span className="material-symbols-rounded">chat</span>
  </IconButton>
  <Badge value="12" style={{ position: 'absolute', top: 4, right: 4 }} />
</div>
```

---

### Chips

```tsx
import { ChipSet, AssistChip, FilterChip, InputChip, SuggestionChip } from '@/components/m3'

<ChipSet>
  <AssistChip label="Add to calendar" />
  <FilterChip label="Unread" selected={filter === 'unread'} onChange={() => setFilter('unread')} />
  <InputChip label="react" onRemove={() => removeTag('react')} />
  <SuggestionChip label="Try this" onClick={applySuggestion} />
</ChipSet>
```

---

### Tabs

```tsx
import { Tabs, PrimaryTab, SecondaryTab } from '@/components/m3'

<Tabs onChange={e => setTab((e.target as any).activeTabIndex)}>
  <PrimaryTab>Overview</PrimaryTab>
  <PrimaryTab>
    <span slot="icon" className="material-symbols-rounded">bar_chart</span>
    Analytics
  </PrimaryTab>
  <PrimaryTab>Settings</PrimaryTab>
</Tabs>

{/* Secondary tabs for sub-navigation */}
<Tabs>
  <SecondaryTab>Flights</SecondaryTab>
  <SecondaryTab>Hotels</SecondaryTab>
</Tabs>
```

---

### List

```tsx
import { List, ListItem, Divider } from '@/components/m3'

<List>
  <ListItem type="button" headline="Settings" onClick={openSettings}>
    <span slot="start" className="material-symbols-rounded" aria-hidden="true">settings</span>
  </ListItem>
  <Divider />
  <ListItem type="button" headline="Help" supportingText="View documentation" />
  <ListItem type="button" headline="Sign out" disabled />
</List>
```

Slots: `slot="start"` (leading icon/avatar), `slot="end"` (trailing icon/text).

---

### Dialog

```tsx
import { Dialog } from '@/components/m3'
import { FilledButton, TextButton } from '@/components/m3'

const [open, setOpen] = useState(false)

<FilledButton onClick={() => setOpen(true)}>Delete item</FilledButton>

<Dialog
  open={open}
  onClosed={() => setOpen(false)}   // use onClosed (after animation), not onClosing
>
  <span slot="headline">Delete item?</span>
  <span slot="content">
    This action cannot be undone.
  </span>
  <div slot="actions">
    <TextButton onClick={() => setOpen(false)}>Cancel</TextButton>
    <FilledButton onClick={() => { deleteItem(); setOpen(false) }}>Delete</FilledButton>
  </div>
</Dialog>
```

Events: `onOpening` (animation start), `onOpened` (animation done), `onClosing`, `onClosed`, `onCancel` (Escape key).

---

### Menu

```tsx
import { Menu, MenuItem, SubMenu } from '@/components/m3'
import { IconButton } from '@/components/m3'
import { useId } from 'react'

const menuId = useId()

{/* The Menu anchor must match the trigger element's id */}
<div style={{ position: 'relative', display: 'inline-block' }}>
  <IconButton id={menuId} aria-label="More options">
    <span className="material-symbols-rounded">more_vert</span>
  </IconButton>
  <Menu anchor={menuId}>
    <MenuItem onClick={handleEdit}>Edit</MenuItem>
    <MenuItem onClick={handleDuplicate}>Duplicate</MenuItem>
    <Divider />
    <MenuItem onClick={handleDelete}>Delete</MenuItem>
  </Menu>
</div>
```

Events: `onOpen` (opened), `onClose` (closed).

---

### Slider

```tsx
import { Slider } from '@/components/m3'

{/* Basic */}
<Slider
  min={0} max={100} value={volume}
  onInput={e => setVolume(Number((e.target as HTMLInputElement).value))}
  style={{ width: '100%' }}
/>

{/* With labels */}
<Slider min={0} max={100} value={50} labeled style={{ width: '100%' }} />

{/* Range slider */}
<Slider min={0} max={100} valueStart={20} valueEnd={80} range labeled style={{ width: '100%' }} />
```

Use `onInput` for live updates while dragging, `onChange` for the committed value on release.

---

### Card

Three variants following M3 spec surface roles:

```tsx
import { Card, CardHeader, CardTitle, CardBody, CardActions } from '@/components/m3'
import { FilledButton, TextButton } from '@/components/m3'

{/* Elevated — surface-container-low + elevation level 1. Most common. */}
<Card variant="elevated">
  <CardHeader>
    <CardTitle>Card title</CardTitle>
  </CardHeader>
  <CardBody>Supporting text or content.</CardBody>
  <CardActions>
    <TextButton>Cancel</TextButton>
    <FilledButton>Confirm</FilledButton>
  </CardActions>
</Card>

{/* Filled — surface-container-highest, no elevation. For emphasis within a surface. */}
<Card variant="filled">...</Card>

{/* Outlined — surface + outline-variant border. Low emphasis. */}
<Card variant="outlined">...</Card>

{/* Override padding or size */}
<Card variant="elevated" style={{ padding: '24px' }}>...</Card>
```

---

### TopAppBar

```tsx
import { TopAppBar } from '@/components/m3'
import { IconButton } from '@/components/m3'

{/* Small (default) — 64dp height */}
<TopAppBar
  title="Inbox"
  navigationIcon={
    <IconButton aria-label="Open menu">
      <span className="material-symbols-rounded">menu</span>
    </IconButton>
  }
  actions={
    <>
      <IconButton aria-label="Search"><span className="material-symbols-rounded">search</span></IconButton>
      <IconButton aria-label="Account"><span className="material-symbols-rounded">account_circle</span></IconButton>
    </>
  }
/>

{/* Large — 152dp height, title moves to bottom */}
<TopAppBar variant="large" title="Settings" />

{/* Center-aligned — title centered, 64dp */}
<TopAppBar variant="center-aligned" title="Profile" />
```

Variants: `small` (64dp) · `center-aligned` (64dp) · `medium` (112dp) · `large` (152dp) — all per M3 spec.

---

### NavigationDrawer

Standard side navigation for desktop (> 1240px).

```tsx
import { NavigationDrawer } from '@/components/m3'

const NAV_ITEMS = [
  { label: 'Home',     icon: 'home',     href: '/home' },
  { label: 'Inbox',    icon: 'inbox',    href: '/inbox', badge: 3 },
  { label: 'Settings', icon: 'settings', href: '/settings' },
]

<NavigationDrawer
  items={NAV_ITEMS}
  activeHref={currentPath}
  onNavigate={href => router.push(href)}
  headline="My App"     // optional section label at top
  width="360px"         // default per M3 spec; reduce for compact layouts
/>
```

The `icon` field is a Material Symbols name (e.g. `'home'`, `'settings'`). The active item shows a filled icon and pill-shaped indicator. Inactive items show outlined icons.

---

### NavigationRail

Compact side navigation for tablet (600–1240px).

```tsx
import { NavigationRail } from '@/components/m3'
import { FAB } from '@/components/m3'

<NavigationRail
  items={NAV_ITEMS}
  activeHref={currentPath}
  onNavigate={href => router.push(href)}
  width="80px"    // default per M3 spec
  fab={
    <FAB size="small" aria-label="Compose">
      <span slot="icon" className="material-symbols-rounded">edit</span>
    </FAB>
  }
/>
```

---

### NavigationBar

Bottom navigation for mobile (< 600px).

```tsx
import { NavigationBar } from '@/components/m3'

<NavigationBar
  items={NAV_ITEMS}
  activeHref={currentPath}
  onNavigate={href => router.push(href)}
/>

{/* Fixed to viewport bottom */}
<NavigationBar
  items={NAV_ITEMS}
  activeHref={currentPath}
  onNavigate={setActive}
  style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100 }}
/>
```

Height is 80dp per M3 spec. `env(safe-area-inset-bottom)` is applied automatically for mobile notches.

---

### Snackbar + useSnackbar

```tsx
import { Snackbar, useSnackbar } from '@/components/m3'

export default function MyPage() {
  const { snackbarProps, showSnackbar } = useSnackbar()

  return (
    <>
      <FilledButton onClick={() => showSnackbar('Changes saved')}>
        Save
      </FilledButton>

      <FilledButton onClick={() => showSnackbar('Item deleted', {
        action: 'Undo',
        onAction: () => restoreItem(),
      })}>
        Delete
      </FilledButton>

      {/* Render once at the bottom of your page or root layout */}
      <Snackbar {...snackbarProps} />
    </>
  )
}
```

`useSnackbar` returns `showSnackbar(message, options?)` and `hideSnackbar()`. For manual control without the hook:

```tsx
<Snackbar
  open={open}
  message="File uploaded"
  action="View"
  onAction={() => router.push('/files')}
  onClose={() => setOpen(false)}
  duration={4000}
/>
```

Default position: center-bottom. Override via `style`:

```tsx
{/* Bottom-right corner */}
<Snackbar
  style={{ left: 'auto', right: '24px', transform: 'none' }}
  {...snackbarProps}
/>
```

---

## Form patterns

`@material/web` text fields are Lit web components — their value is a DOM property, not a React prop. Read it with `useRef` on submit rather than syncing on every keystroke.

```tsx
'use client'

import { useRef, useState } from 'react'
import { OutlinedTextField, FilledButton } from '@/components/m3'

interface MdTextFieldElement extends HTMLElement {
  value: string
  error: boolean
  errorText: string
}

export default function LoginForm() {
  const emailRef = useRef<MdTextFieldElement>(null)
  const passRef  = useRef<MdTextFieldElement>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Validate
    let valid = true
    if (!emailRef.current?.value.includes('@')) {
      emailRef.current!.error = true
      emailRef.current!.errorText = 'Enter a valid email'
      valid = false
    } else {
      emailRef.current!.error = false
    }
    if (!valid) return

    // Read values
    const email    = emailRef.current!.value
    const password = passRef.current!.value
    login(email, password)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <OutlinedTextField ref={emailRef} label="Email" type="email" style={{ width: '100%' }} />
      <OutlinedTextField ref={passRef}  label="Password" type="password" style={{ width: '100%' }} />
      <FilledButton type="submit">Sign in</FilledButton>
    </form>
  )
}
```

See `app/forms/page.tsx` for a complete example covering radio groups, select, checkbox, switch, slider, and Snackbar feedback.

---

## Responsive layout pattern

M3 defines three navigation patterns by screen width:

| Screen | Width | Component |
|---|---|---|
| Mobile | < 600px | `NavigationBar` (bottom) |
| Tablet | 600–1240px | `NavigationRail` (side, compact) |
| Desktop | > 1240px | `NavigationDrawer` (side, full) |

```tsx
// app/(authenticated)/layout.tsx
'use client'

import { useState } from 'react'
import { NavigationDrawer, NavigationRail, NavigationBar, TopAppBar } from '@/components/m3'

const NAV_ITEMS = [
  { label: 'Home',  icon: 'home',  href: '/home' },
  { label: 'Inbox', icon: 'inbox', href: '/inbox', badge: 4 },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState('/home')

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Desktop: full drawer */}
      <div className="nav-desktop">
        <NavigationDrawer items={NAV_ITEMS} activeHref={active} onNavigate={setActive} />
      </div>

      {/* Tablet: compact rail */}
      <div className="nav-tablet">
        <NavigationRail items={NAV_ITEMS} activeHref={active} onNavigate={setActive} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopAppBar title="My App" />

        <main style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
          {children}
        </main>

        {/* Mobile: bottom bar */}
        <div className="nav-mobile">
          <NavigationBar items={NAV_ITEMS} activeHref={active} onNavigate={setActive} />
        </div>
      </div>
    </div>
  )
}
```

```css
/* In your globals.css */
.nav-desktop { display: flex; }
.nav-tablet  { display: none; }
.nav-mobile  { display: none; }

@media (max-width: 1240px) {
  .nav-desktop { display: none; }
  .nav-tablet  { display: flex; }
}
@media (max-width: 600px) {
  .nav-tablet { display: none; }
  .nav-mobile { display: flex; }
}
```

See `app/layout/page.tsx` for a complete working example.

---

## Accessibility

The following is built in and requires no extra configuration:

- **`@material/web` components** are ARIA-compliant per Google's M3 spec — roles, states, and keyboard interactions are handled by the library.
- **Navigation components** (`NavigationDrawer`, `NavigationRail`, `NavigationBar`): `aria-label` on the `<nav>`, `aria-current="page"` on the active link, `aria-hidden="true"` on decorative icons, and the readable label in `aria-label` for badge counts ("Inbox, 4 new").
- **Snackbar**: `role="status"` and `aria-live="polite"` so screen readers announce new messages.
- **Focus rings**: `:focus-visible` styles in `globals.css` show a primary-colored ring for keyboard users only.
- **Reduced motion**: `@media (prefers-reduced-motion: reduce)` disables all transitions and animations.
- **High contrast**: `@media (prefers-contrast: more)` increases outline visibility.

---

## M3 compliance reference

Sizes and values that come directly from the official M3 specification:

| Property | Value | Source |
|---|---|---|
| Navigation Drawer width | 360dp | [M3 Navigation Drawer spec](https://m3.material.io/components/navigation-drawer/specs) |
| Navigation Rail width | 80dp | [M3 Navigation Rail spec](https://m3.material.io/components/navigation-rail/specs) |
| Navigation Bar height | 80dp | [M3 Navigation Bar spec](https://m3.material.io/components/navigation-bar/specs) |
| Top App Bar height (small) | 64dp | [M3 Top App Bar spec](https://m3.material.io/components/top-app-bar/specs) |
| Top App Bar height (medium) | 112dp | — |
| Top App Bar height (large) | 152dp | — |
| Card corner radius | 12dp (medium) | [M3 Shape spec](https://m3.material.io/styles/shape/shape-scale-tokens) |
| Button corner radius | 9999px (full) | [M3 Button spec](https://m3.material.io/components/buttons/specs) |
| Nav item indicator corner | 9999px (full) | M3 Navigation specs |
| Color palette | seed `#6750A4` | [M3 Theme Builder](https://m3.material.io/theme-builder) |

---

## Stack

- [Next.js 14](https://nextjs.org/) App Router
- [@material/web 2.x](https://github.com/material-components/material-web) — Google's official M3 web components
- [@lit/react](https://lit.dev/docs/frameworks/react/) — React wrappers for Lit components
- [Roboto Flex](https://fonts.google.com/specimen/Roboto+Flex) — official M3 typeface
- [Material Symbols Rounded](https://fonts.google.com/icons) — icon font
