export type SessionUser = {
  id: number
  email: string
  role: string
  createdAt: string | null
}

async function readJson<T>(response: Response) {
  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as { error?: string } | null
    throw new Error(data?.error || 'Request failed.')
  }

  return (await response.json()) as T
}

export async function fetchSession() {
  const response = await fetch('/api/auth/session')
  const data = await readJson<{ user: SessionUser | null }>(response)
  return data.user
}

export async function login(email: string, password: string) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  const data = await readJson<{ user: SessionUser }>(response)
  return data.user
}

export async function logout() {
  const response = await fetch('/api/auth/logout', { method: 'POST' })
  await readJson<{ ok: boolean }>(response)
}
