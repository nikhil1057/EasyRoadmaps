import { useState } from 'react'
import type { FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { LockKeyhole, LogIn } from 'lucide-react'
import { useAuth } from '../auth/AuthContext'

export function LoginPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAdmin, isLoading, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const next = new URLSearchParams(location.search).get('next') || '/admin'

  if (!isLoading && isAdmin) {
    return <Navigate to={next} replace />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      await login(email, password)
      navigate(next, { replace: true })
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Login failed.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="auth-shell grid place-items-center py-8 md:py-14">
      <div className="card auth-card w-full max-w-[480px] p-8 md:p-9">
        <div className="grid gap-6">
          <div className="grid gap-3">
            <span className="eyebrow subtle">
              <LockKeyhole className="h-4 w-4" />
              Admin sign in
            </span>
            <div className="grid gap-2">
              <h1 className="font-display text-3xl font-semibold">Sign in to manage content.</h1>
              <p className="text-sm leading-7 text-[color:var(--muted)]">
                Access the publishing workspace to write, review, and publish roadmap lessons.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <label className="auth-field grid gap-2 text-sm font-semibold">
              Email
              <input value={email} onChange={(event) => setEmail(event.target.value)} className="studio-input" type="email" required />
            </label>

            <label className="auth-field grid gap-2 text-sm font-semibold">
              Password
              <input value={password} onChange={(event) => setPassword(event.target.value)} className="studio-input" type="password" required />
            </label>

            {error ? <div className="rounded-[18px] border border-[rgba(203,91,55,0.18)] bg-[rgba(203,91,55,0.08)] px-4 py-3 text-sm text-[color:var(--accent-dark)]">{error}</div> : null}

            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              <LogIn className="h-4 w-4" />
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

