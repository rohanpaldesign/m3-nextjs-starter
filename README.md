# M3 Next.js Starter

Material Design 3 component library for Next.js — built on Google's official [`@material/web`](https://github.com/material-components/material-web) (Lit-based) with full dark theme, Roboto Flex, and Material Symbols.

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?repo=rohanpaldesign/m3-nextjs-starter)

---

## Requirements

| Requirement | Minimum version | Why |
|---|---|---|
| Node.js | 18+ | Required by Next.js 14 |
| Next.js | 14.0+ | App Router, `next/font/google` |
| React | 18+ | Concurrent features used by `@lit/react` |
| TypeScript | 5.0+ | `moduleResolution: "bundler"` is TS 5 only |

The `tsconfig.json` in this repo uses `"moduleResolution": "bundler"` which is what allows `@material/web` subpath imports with `.js` extensions to resolve correctly. If your consuming project uses `"moduleResolution": "node"` or `"node16"`, change it to `"bundler"`.

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

The components import from each other using the barrel file (`index.ts`). If you place the folder somewhere other than `components/m3/`, update the barrel's relative imports and make sure your `tsconfig.json` path alias points to it (see Step 3.5).

**Step 2.** Copy these sections from `app/globals.css` into your project's global CSS file — all five are required:

- The entire `:root { ... }` block (M3 color, shape, elevation, and typescale tokens)
- The `.material-symbols-rounded { ... }` class (icon font configuration)
- The `html, body { ... }` block (background color and font-family)
- The `.md-display-large` through `.md-label-small` typography helper classes
- The `:focus-visible`, `@media (prefers-reduced-motion)`, and `@media (prefers-contrast)` rules at the bottom

The `* { box-sizing: border-box; margin: 0; padding: 0 }` reset at the top of `globals.css` is optional — omit it if your project already has a CSS reset.

**Step 3.** Add `transpilePackages` to `next.config.js`:

```js
const nextConfig = {
  transpilePackages: ['@material/web', 'lit', '@lit/reactive-element', '@lit/react'],
}
module.exports = nextConfig
```

**Step 3.5.** Make sure `tsconfig.json` has the `@/` path alias pointing to your project root:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

All components import from `@/components/m3/...`. If your project uses a different alias (e.g. `~/`) or a different folder structure, do a find-and-replace on `@/components/m3` across the copied files.

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

If `Material_Symbols_Rounded` is not available in your version of `next/font/google`, fall back to a `<link>` tag in `<head>`:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
```

Then update the `.material-symbols-rounded` rule in `globals.css` to use the static family name instead of the CSS variable:

```css
.material-symbols-rounded {
  font-family: 'Material Symbols Rounded'; /* instead of var(--font-material-symbols) */
}
```

All wrapper components require `'use client'` — see the next section for how this affects Next.js App Router.

---

## Server Components and `'use client'`

This is the most important thing to understand when using this library with Next.js App Router.

**Why all wrappers need `'use client'`:** `@material/web` elements call `customElements.define()` when their module loads. That API only exists in the browser. If Next.js tries to render them on the server, it throws. The `'use client'` directive tells Next.js to skip SSR for that module.

**What this means for your pages:** You cannot import M3 components directly in a Server Component (`.tsx` files without `'use client'`). If you try, you'll get:

```
Error: createComponent is not a function
```

**Pattern 1 — Make the page a client component (simplest):**

```tsx
'use client'

import { FilledButton, OutlinedTextField } from '@/components/m3'

export default function LoginPage() {
  return (
    <form>
      <OutlinedTextField label="Email" />
      <FilledButton type="submit">Sign in</FilledButton>
    </form>
  )
}
```

**Pattern 2 — Keep the page as a Server Component, extract interactive parts:**

```tsx
// app/dashboard/page.tsx  — Server Component, no 'use client'
import { DashboardClient } from './DashboardClient'

export default async function DashboardPage() {
  const data = await fetchData()   // server-side fetch, runs on server
  return <DashboardClient data={data} />
}
```

```tsx
// app/dashboard/DashboardClient.tsx
'use client'

import { Card, FilledButton, LinearProgress } from '@/components/m3'

export function DashboardClient({ data }: { data: DashboardData }) {
  return (
    <Card variant="elevated">
      <LinearProgress value={data.progress} style={{ width: '100%' }} />
      <FilledButton onClick={handleAction}>Action</FilledButton>
    </Card>
  )
}
```

This pattern lets you keep data fetching on the server while using M3 components in client subtrees.

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

**Adding a light mode:**

The current setup is dark-only. To support both, move the dark tokens into a `[data-theme="dark"]` selector (or `@media (prefers-color-scheme: dark)`) and add a light scheme under `:root`. Generate both schemes at [m3.material.io/theme-builder](https://m3.material.io/theme-builder):

```css
/* globals.css */
:root {
  /* Light scheme — paste light hex values from Theme Builder */
  --md-sys-color-primary:             #6750A4;
  --md-sys-color-on-primary:          #FFFFFF;
  --md-sys-color-background:          #FFFBFE;
  --md-sys-color-on-background:       #1C1B1F;
  /* ... full light scheme */
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Dark scheme */
    --md-sys-color-primary:           #D0BCFF;
    --md-sys-color-on-primary:        #381E72;
    --md-sys-color-background:        #141218;
    --md-sys-color-on-background:     #E6E0E9;
    /* ... full dark scheme */
  }
}
```

Or for a manual toggle, apply a `data-theme` attribute to `<html>` and scope the selectors accordingly. Because all custom components and `@material/web` both read the same `--md-sys-color-*` tokens, switching the tokens is all that's needed.

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

**Using alongside Tailwind CSS:** This library has no dependency on Tailwind and doesn't conflict with it. You can use Tailwind utility classes on wrapper divs and layout containers, and M3 components for interactive elements. The only overlap to watch for is Tailwind's `preflight` reset — if you're using it, remove the `* { box-sizing: border-box; margin: 0; padding: 0 }` block from `globals.css` to avoid double-resetting.

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

Icon names are Material Symbols identifiers — browse and search the full set at **[fonts.google.com/icons](https://fonts.google.com/icons)**. Use the icon name exactly as shown (e.g. `account_circle`, `arrow_back`, `check_circle`).

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
'use client'

import { usePathname, useRouter } from 'next/navigation'
import { NavigationDrawer } from '@/components/m3'

const NAV_ITEMS = [
  { label: 'Home',     icon: 'home',     href: '/home' },
  { label: 'Inbox',    icon: 'inbox',    href: '/inbox', badge: 3 },
  { label: 'Settings', icon: 'settings', href: '/settings' },
]

export function AppNav() {
  const pathname = usePathname()   // current route — marks the active item
  const router   = useRouter()

  return (
    <NavigationDrawer
      items={NAV_ITEMS}
      activeHref={pathname}
      onNavigate={href => router.push(href)}
      headline="My App"     // optional section label at top
      width="360px"         // default per M3 spec; reduce for compact layouts
    />
  )
}
```

The `activeHref` prop is compared against each item's `href` with strict equality. For nested routes (e.g. `/inbox/123` should highlight the Inbox item), pass `pathname.startsWith(item.href) ? item.href : pathname` or derive the active href before passing it in.

The `icon` field is a Material Symbols name. Browse the full set at [fonts.google.com/icons](https://fonts.google.com/icons). The active item shows a filled icon and pill-shaped indicator. Inactive items show outlined icons.

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

The best App Router pattern is to keep the layout itself as a Server Component and extract the interactive navigation shell into a client component. This lets page-level data fetching stay on the server while the nav handles routing on the client.

```tsx
// app/(authenticated)/layout.tsx  — Server Component (no 'use client')
import { NavShell } from '@/components/NavShell'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <NavShell>{children}</NavShell>
}
```

```tsx
// components/NavShell.tsx
'use client'

import { usePathname, useRouter } from 'next/navigation'
import { NavigationDrawer, NavigationRail, NavigationBar, TopAppBar } from '@/components/m3'

const NAV_ITEMS = [
  { label: 'Home',     icon: 'home',     href: '/home' },
  { label: 'Inbox',    icon: 'inbox',    href: '/inbox', badge: 4 },
  { label: 'Projects', icon: 'folder',   href: '/projects' },
  { label: 'Settings', icon: 'settings', href: '/settings' },
]

export function NavShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router   = useRouter()

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Desktop: full drawer (> 1240px) */}
      <div className="nav-desktop">
        <NavigationDrawer
          items={NAV_ITEMS}
          activeHref={pathname}
          onNavigate={href => router.push(href)}
        />
      </div>

      {/* Tablet: compact rail (600–1240px) */}
      <div className="nav-tablet">
        <NavigationRail
          items={NAV_ITEMS}
          activeHref={pathname}
          onNavigate={href => router.push(href)}
        />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopAppBar title="My App" />

        <main style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
          {children}
        </main>

        {/* Mobile: bottom bar (< 600px) */}
        <div className="nav-mobile">
          <NavigationBar
            items={NAV_ITEMS}
            activeHref={pathname}
            onNavigate={href => router.push(href)}
          />
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

---

## Known limitations

**`transpilePackages` is required.**
`@material/web` calls `customElements.define()` at module import time, which requires `window` and `document` to exist. Without `transpilePackages` in `next.config.js`, Next.js evaluates these packages on the server and throws a `ReferenceError: self is not defined` or similar. This is not optional — forgetting it produces cryptic errors that are hard to trace back to the config.

**This library is copy-based, not a versioned npm package.**
There is no `npm install rohanpaldesign/m3-nextjs-starter`. You copy the `components/m3/` folder into your project. This means updates don't flow automatically — see [Keeping up to date](#keeping-up-to-date) below.

**All M3 wrappers require `'use client'`.**
`@material/web` components are Lit-based custom elements — they rely on browser APIs that are unavailable during server-side rendering. Every file in `components/m3/` that wraps a `@material/web` element has `'use client'` at the top. You cannot import them directly in React Server Components; wrap them in a client component boundary instead (see [Server Components and 'use client'](#server-components-and-use-client) above).

**No IE11 / legacy browser support.**
Web components require modern browser APIs (`customElements`, `shadowRoot`, CSS custom properties). IE11 and pre-Chromium Edge are not supported. All evergreen browsers (Chrome, Firefox, Safari, Edge) work correctly.

**No right-to-left (RTL) layout support.**
The custom components (`NavigationDrawer`, `TopAppBar`, etc.) use fixed `left`/`right` CSS and do not flip for RTL locales. `@material/web` components do have some RTL awareness, but the custom shells do not. RTL support would require per-component overrides.

---

## Keeping up to date

Since components are copied into your project rather than installed as a versioned package, updates require a manual sync:

1. **Check for changes** — visit `https://github.com/rohanpaldesign/m3-nextjs-starter/commits/main` and scan commit messages for component names you're using.

2. **Copy updated files** — download or copy any changed files from `components/m3/` into your project, then re-apply any per-file customizations you made.

3. **Check `globals.css`** — new components may introduce new CSS variables or utility classes. Diff `app/globals.css` against your project's global CSS and merge any additions.

4. **Pin to a commit when copying** — if your project needs stability, note the commit SHA you copied from (e.g., in a comment in your `globals.css` or a `COMPONENTS_VERSION` file). That way you know exactly what diff to apply when you decide to update.

```bash
# Example: see what changed in components/m3 since a specific commit
git log <commit-sha>..HEAD -- components/m3/
```

There is no automated upgrade path — but because the components are plain TypeScript/React files with no build step, copying individual files is straightforward and the diff is easy to review.
