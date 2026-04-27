import Link from 'next/link'

export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        padding: '32px',
        backgroundColor: 'var(--md-sys-color-background)',
      }}
    >
      <h1 className="md-display-small" style={{ color: 'var(--md-sys-color-on-background)', textAlign: 'center' }}>
        M3 Next.js Starter
      </h1>
      <p className="md-body-large" style={{ color: 'var(--md-sys-color-on-surface-variant)', textAlign: 'center', maxWidth: '480px' }}>
        Material Design 3 for Next.js using @material/web and custom M3 components.
        Dark theme, Roboto Flex, full token system.
      </p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/components"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '40px',
            paddingInline: '24px',
            borderRadius: '9999px',
            backgroundColor: 'var(--md-sys-color-primary)',
            color: 'var(--md-sys-color-on-primary)',
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.1px',
            textDecoration: 'none',
          }}
        >
          Component Gallery
        </Link>
        <Link
          href="/layout"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '40px',
            paddingInline: '24px',
            borderRadius: '9999px',
            border: '1px solid var(--md-sys-color-outline)',
            color: 'var(--md-sys-color-primary)',
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.1px',
            textDecoration: 'none',
          }}
        >
          Layout Example
        </Link>
        <Link
          href="/forms"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '40px',
            paddingInline: '24px',
            borderRadius: '9999px',
            border: '1px solid var(--md-sys-color-outline)',
            color: 'var(--md-sys-color-primary)',
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.1px',
            textDecoration: 'none',
          }}
        >
          Form Patterns
        </Link>
      </div>
    </main>
  )
}
