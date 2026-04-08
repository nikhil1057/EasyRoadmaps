import type { ReactNode } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Compass, LayoutDashboard, Layers, LogOut, Sparkles } from 'lucide-react'
import clsx from 'clsx'
import { useAuth } from '../auth/AuthContext'
import { LogoMark } from './LogoMark'

function TopNavLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => clsx('site-nav-link', isActive && 'active')}
    >
      {children}
    </NavLink>
  )
}

export function Shell() {
  const { isAdmin, logout } = useAuth()

  return (
    <div className="site-shell min-h-screen">
      <header className="site-header sticky top-0 z-20">
        <div className="container">
          <div className="flex items-center justify-between gap-4 py-4">
            <Link to="/" className="site-brand inline-flex items-center gap-3">
              <LogoMark />
              <span className="hidden font-display text-base font-semibold tracking-tight sm:block">
                EasyRoadmaps
              </span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              <TopNavLink to="/">Home</TopNavLink>
              <TopNavLink to="/roadmaps">Roadmaps</TopNavLink>
              <TopNavLink to="/roadmaps/system-design">System Design</TopNavLink>
              {isAdmin ? <TopNavLink to="/admin">Admin</TopNavLink> : null}
            </nav>

            <div className="flex items-center gap-2">
              {isAdmin ? (
                <>
                  <Link to="/admin" className="btn-secondary hidden text-sm md:inline-flex">
                    <LayoutDashboard className="h-4 w-4" /> Admin
                  </Link>
                  <button type="button" onClick={() => void logout()} className="btn-secondary text-sm">
                    <LogOut className="h-4 w-4" />
                    Log out
                  </button>
                </>
              ) : (
                <Link
                  to="/roadmaps"
                  className="site-utility-link hidden items-center gap-2 md:inline-flex"
                >
                  <Layers className="h-4 w-4" /> Library
                </Link>
              )}
              <Link to="/roadmaps/system-design" className="btn-primary text-sm">
                <Compass className="h-4 w-4" />
                Open roadmap
              </Link>
            </div>
          </div>

          <nav className="flex items-center gap-1 pb-3 md:hidden">
            <TopNavLink to="/">Home</TopNavLink>
            <TopNavLink to="/roadmaps">Roadmaps</TopNavLink>
            <TopNavLink to="/roadmaps/system-design">System Design</TopNavLink>
            {isAdmin ? <TopNavLink to="/admin">Admin</TopNavLink> : null}
          </nav>
        </div>
      </header>

      <main className="container py-10 md:py-12">
        <Outlet />
      </main>

      <footer className="container pb-10 md:pb-12">
        <div className="card site-footer-card px-6 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <LogoMark small />
              <div>
                <div className="font-display text-sm font-semibold">EasyRoadmaps</div>
                <div className="text-xs text-[color:var(--muted)]">
                  Guided learning journeys for deep technical subjects.
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[color:var(--muted)]">
              <Link to="/roadmaps" className="flex items-center gap-1.5 transition hover:text-[color:var(--accent)]">
                <Layers className="h-3.5 w-3.5" /> Roadmaps
              </Link>
              <Link
                to="/roadmaps/system-design"
                className="flex items-center gap-1.5 transition hover:text-[color:var(--accent)]"
              >
                <Compass className="h-3.5 w-3.5" /> System Design
              </Link>
              {isAdmin ? (
                <Link to="/admin" className="flex items-center gap-1.5 transition hover:text-[color:var(--accent)]">
                  <LayoutDashboard className="h-3.5 w-3.5" /> Admin
                </Link>
              ) : null}
              <Link to="/" className="flex items-center gap-1.5 transition hover:text-[color:var(--accent)]">
                <Sparkles className="h-3.5 w-3.5" /> Home
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
