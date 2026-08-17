import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ApiError, authApi } from '../lib/api.js'

const AuthContext = createContext(null)

function normalizeUser(user) {
  if (!user) return null
  return {
    ...user,
    id: user.id ?? user.userId,
    username: user.username ?? '',
    displayName: user.displayName ?? user.display_name ?? user.username ?? '',
    role: String(user.role || 'LEARNER').toUpperCase(),
    status: String(user.status || 'PENDING').toUpperCase(),
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [error, setError] = useState(null)

  const refreshSession = useCallback(async () => {
    setStatus('loading')
    setError(null)
    try {
      const data = await authApi.session()
      setUser(normalizeUser(data?.user))
      setStatus('ready')
      return normalizeUser(data?.user)
    } catch (requestError) {
      // Een expliciete 401 is een geldige gastsessie, geen kapotte app.
      if (requestError instanceof ApiError && requestError.status === 401) {
        setUser(null)
        setStatus('ready')
        return null
      }
      setError(requestError)
      setStatus('error')
      throw requestError
    }
  }, [])

  useEffect(() => {
    refreshSession().catch(() => {})
  }, [refreshSession])

  const login = useCallback(async ({ username, password }) => {
    setError(null)
    const data = await authApi.login({ username: username.trim(), password })
    const nextUser = normalizeUser(data?.user)
    setUser(nextUser)
    setStatus('ready')
    return nextUser
  }, [])

  const register = useCallback(async ({ username, displayName, password }) => {
    setError(null)
    const data = await authApi.register({
      username: username.trim(),
      displayName: displayName.trim() || undefined,
      password,
    })
    const nextUser = normalizeUser(data?.user)
    // Registratie maakt bewust nog geen sessie: een PENDING-account mag vóór
    // goedkeuring geen beveiligde gebruikersroute kunnen openen.
    setStatus('ready')
    return { ...data, user: nextUser }
  }, [])

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } finally {
      setUser(null)
      setStatus('ready')
      setError(null)
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      status,
      error,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'ADMIN' && user?.status === 'ACTIVE',
      login,
      register,
      logout,
      refreshSession,
      setUser,
    }),
    [user, status, error, login, register, logout, refreshSession],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth moet binnen <AuthProvider> gebruikt worden')
  return context
}
