import { useState, useEffect } from 'react'
import CraftMatrixLanding from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import GridPage from './pages/GridPage'

const API_URL = 'http://localhost:3001/api'

function App() {
  const [page, setPage] = useState('landing')
  const [user, setUser] = useState(null)
  const [authError, setAuthError] = useState(null)
  const [authLoading, setAuthLoading] = useState(false)

  const isLoggedIn = !!user

  useEffect(() => {
    const savedUser = localStorage.getItem('craftmatrix_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        localStorage.removeItem('craftmatrix_user')
      }
    }
  }, [])

  useEffect(() => {
    if (user && (page === 'login' || page === 'signup')) {
      setPage('landing')
    }
  }, [user, page])

  const handleLogin = async (email, password) => {
    setAuthLoading(true)
    setAuthError(null)
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }
      setUser(data)
      localStorage.setItem('craftmatrix_user', JSON.stringify(data))
      return { success: true }
    } catch (error) {
      setAuthError(error.message)
      return { success: false, error: error.message }
    } finally {
      setAuthLoading(false)
    }
  }

  const handleSignup = async (name, email, password) => {
    setAuthLoading(true)
    setAuthError(null)
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Signup failed')
      }
      setUser(data)
      localStorage.setItem('craftmatrix_user', JSON.stringify(data))
      return { success: true }
    } catch (error) {
      setAuthError(error.message)
      return { success: false, error: error.message }
    } finally {
      setAuthLoading(false)
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('craftmatrix_user')
  }

  const clearAuthError = () => setAuthError(null)

  if (page === 'login') {
    return (
      <LoginPage
        onBack={() => setPage('landing')}
        onNavigateToSignup={() => { clearAuthError(); setPage('signup') }}
        onLogin={handleLogin}
        authError={authError}
        authLoading={authLoading}
        clearError={clearAuthError}
      />
    )
  }

  if (page === 'signup') {
    return (
      <SignupPage
        onBack={() => setPage('login')}
        onNavigateToLogin={() => { clearAuthError(); setPage('login') }}
        onSignup={handleSignup}
        authError={authError}
        authLoading={authLoading}
        clearError={clearAuthError}
      />
    )
  }

  if (page === 'grid') {
    return (
      <GridPage onBack={() => setPage('landing')} />
    )
  }

  return (
    <CraftMatrixLanding
      isLoggedIn={isLoggedIn}
      user={user}
      onLogin={() => setPage('login')}
      onLogout={handleLogout}
      onStartCreating={() => isLoggedIn ? setPage('grid') : setPage('login')}
      onPreviousWork={() => {}}
    />
  )
}

export default App
