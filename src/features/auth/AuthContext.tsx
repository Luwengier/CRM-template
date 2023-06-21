import { useState, useCallback, createContext, useMemo, ReactNode } from 'react'
import axios from 'axios'
import './config'

const initialValue: ContextType = {
  token: '',
  role: '',
  user: null,
  setToken: () => {},
  setRole: () => {},
  setUser: () => {},
  reset: () => {},
}

export const AuthContext = createContext<ContextType>(initialValue)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const initialToken: string = localStorage.getItem('token') || ''
  const initialUser: UserType | null =
    JSON.parse(localStorage.getItem('user') || 'null') || null

  const [token, setToken] = useState<string>(initialToken)
  const [role, setRole] = useState<string>(initialUser?.role || 'consultant')
  const [user, setUser] = useState<UserType | null>(initialUser)

  if (token) {
    axios.defaults.headers.common['Authorization'] = 'bearer ' + token
  }

  const handleSetToken = useCallback((token: string) => {
    setToken(token)
    localStorage.setItem('token', token)
  }, [])

  const handleSetRole = useCallback((role: string) => {
    setRole(role)
    localStorage.setItem('role', role)
  }, [])

  const handleSetUser = useCallback((user: UserType | null) => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }, [])

  const reset = useCallback(() => {
    handleSetToken('')
    handleSetRole('')
    handleSetUser(null)
  }, [handleSetToken, handleSetRole, handleSetUser])

  const value: ContextType = useMemo(
    () => ({
      token,
      role,
      user,
      setToken: handleSetToken,
      setRole: handleSetRole,
      setUser: handleSetUser,
      reset,
    }),
    [token, role, user, handleSetToken, handleSetRole, handleSetUser, reset]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export type UserType = {
  id: string | number
  role: string
  companyId: string | number
}

type ContextType = {
  token: string
  role: string
  user: UserType | null
  setToken: (token: string) => void
  setRole: (role: string) => void
  setUser: (user: UserType | null) => void
  reset: () => void
}

export default AuthProvider
