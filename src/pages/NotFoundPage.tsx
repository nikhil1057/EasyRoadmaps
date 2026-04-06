import { Link } from 'react-router-dom'
import { ArrowLeft, Compass } from 'lucide-react'

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="card max-w-xl p-10 text-center md:p-14">
        <div className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--muted)]">404</div>
        <h1 className="font-display text-5xl font-semibold tracking-tight">Roadmap not found</h1>
        <p className="mx-auto mt-4 max-w-[48ch] text-sm leading-6 text-[color:var(--muted)]">
          The page you requested is not part of the current EasyRoadmaps library.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">
            <ArrowLeft className="h-4 w-4" /> Go home
          </Link>
          <Link to="/roadmaps" className="btn-secondary">
            <Compass className="h-4 w-4" /> Browse roadmaps
          </Link>
        </div>
      </div>
    </div>
  )
}
