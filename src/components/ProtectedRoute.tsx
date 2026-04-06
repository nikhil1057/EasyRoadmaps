import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export function ProtectedRoute() {
  const location = useLocation()
  const { isAdmin, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="card p-8">
        <h1 className="font-display text-2xl font-semibold">Checking access</h1>
        <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">Please wait while we verify your admin session.</p>
      </div>
    )
  }

  if (!isAdmin) {
    return <Navigate to={`/login?next=${encodeURIComponent(location.pathname + location.search)}`} replace />
  }

  return <Outlet />
}
