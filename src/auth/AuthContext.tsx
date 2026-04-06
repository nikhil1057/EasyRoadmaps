import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { fetchSession, login as loginRequest, logout as logoutRequest } from './api'
import type { SessionUser } from './api'

type AuthContextValue = {
  user: SessionUser | null
  isLoading: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  async function refreshSession() {
    try {
      const nextUser = await fetchSession()
      setUser(nextUser)
    } catch {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void refreshSession()
  }, [])

  async function login(email: string, password: string) {
    const nextUser = await loginRequest(email, password)
    setUser(nextUser)
  }

  async function logout() {
    await logoutRequest()
    setUser(null)
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAdmin: user?.role === 'admin',
      login,
      logout,
      refreshSession,
    }),
    [isLoading, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) {
    throw new Error('useAuth must be used within AuthProvider.')
  }

  return value
}
