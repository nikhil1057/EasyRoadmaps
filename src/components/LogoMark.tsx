import clsx from 'clsx'

export function LogoMark({ small = false, className }: { small?: boolean; className?: string }) {
  return (
    <img
      src="/favicon.svg?v=2"
      alt="EasyRoadmaps logo"
      className={clsx('site-logo-mark', small && 'small', className)}
    />
  )
}
