'use client'

import { useState } from 'react'
import { NavigationDrawer } from '@/components/m3/NavigationDrawer'
import { TopAppBar } from '@/components/m3/TopAppBar'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/m3/Card'
import { LinearProgress } from '@/components/m3/Progress'
import { IconButton } from '@/components/m3/IconButton'

const NAV_ITEMS = [
  { label: 'Dashboard',  icon: 'home',         href: '/dashboard'  },
  { label: 'Analytics',  icon: 'bar_chart',    href: '/analytics'  },
  { label: 'Projects',   icon: 'folder',       href: '/projects',  badge: 3 },
  { label: 'Messages',   icon: 'chat',         href: '/messages',  badge: 12 },
  { label: 'Settings',   icon: 'settings',     href: '/settings'   },
]

export default function LayoutExample() {
  const [active, setActive] = useState('/dashboard')

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: 'var(--md-sys-color-background)',
      }}
    >
      <NavigationDrawer
        headline="My App"
        items={NAV_ITEMS}
        activeHref={active}
        onNavigate={setActive}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopAppBar
          title="Dashboard"
          actions={
            <>
              <IconButton>
                <span className="material-symbols-rounded">search</span>
              </IconButton>
              <IconButton>
                <span className="material-symbols-rounded">notifications</span>
              </IconButton>
              <IconButton>
                <span className="material-symbols-rounded">account_circle</span>
              </IconButton>
            </>
          }
        />

        <main
          style={{
            flex: 1,
            overflow: 'auto',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
            {[
              { title: 'Total Revenue', value: '$24,500', change: '+12%', icon: 'payments' },
              { title: 'Active Users',  value: '1,840',   change: '+8%',  icon: 'group'    },
              { title: 'Conversion',    value: '3.2%',    change: '-0.4%', icon: 'trending_up' },
              { title: 'Open Issues',   value: '14',      change: '-2',   icon: 'bug_report'  },
            ].map(stat => (
              <Card key={stat.title} variant="elevated">
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span
                    className="material-symbols-rounded"
                    style={{ color: 'var(--md-sys-color-primary)', fontSize: '24px' }}
                  >
                    {stat.icon}
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      color: stat.change.startsWith('+') ? 'var(--md-sys-color-tertiary)' : 'var(--md-sys-color-error)',
                    }}
                  >
                    {stat.change}
                  </span>
                </div>
                <div style={{ fontSize: '28px', fontWeight: 400, color: 'var(--md-sys-color-on-surface)', marginBottom: '4px' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--md-sys-color-on-surface-variant)' }}>
                  {stat.title}
                </div>
              </Card>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Project Progress</CardTitle>
              </CardHeader>
              <CardBody>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '8px' }}>
                  {[
                    { name: 'M3 Design System', value: 0.85 },
                    { name: 'API Integration',  value: 0.60 },
                    { name: 'Mobile App',       value: 0.30 },
                    { name: 'Documentation',    value: 0.45 },
                  ].map(project => (
                    <div key={project.name}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '14px', color: 'var(--md-sys-color-on-surface)' }}>
                          {project.name}
                        </span>
                        <span style={{ fontSize: '14px', color: 'var(--md-sys-color-on-surface-variant)' }}>
                          {Math.round(project.value * 100)}%
                        </span>
                      </div>
                      <LinearProgress value={project.value} style={{ width: '100%' }} />
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardBody>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
                  {[
                    { text: 'Design review completed',    time: '2m ago'  },
                    { text: 'New component added',        time: '1h ago'  },
                    { text: 'Sprint planning scheduled',  time: '3h ago'  },
                    { text: 'Bug fix deployed',           time: '5h ago'  },
                    { text: 'Performance report ready',   time: '1d ago'  },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '14px', color: 'var(--md-sys-color-on-surface)', flex: 1 }}>
                        {item.text}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--md-sys-color-on-surface-variant)', marginLeft: '12px', flexShrink: 0 }}>
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
