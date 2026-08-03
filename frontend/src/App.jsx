import { useState } from 'react'
import CraftMatrixLanding from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import GridPage from './pages/GridPage'

function App() {
  const [page, setPage] = useState('landing')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleGoogleAuth = () => {
    // Simulate Google authentication
    // In production, this would redirect to Google OAuth
    setIsLoggedIn(true)
    setPage('landing')
  }

  if (page === 'login') {
    return (
      <LoginPage
        onBack={() => setPage('landing')}
        onNavigateToSignup={() => setPage('signup')}
        onGoogleAuth={handleGoogleAuth}
      />
    )
  }

  if (page === 'signup') {
    return (
      <SignupPage
        onBack={() => setPage('login')}
        onNavigateToLogin={() => setPage('login')}
        onGoogleAuth={handleGoogleAuth}
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
      onLogin={() => setPage('login')}
      onLogout={() => setIsLoggedIn(false)}
      onStartCreating={() => isLoggedIn ? setPage('grid') : setPage('login')}
      onPreviousWork={() => {}}
    />
  )
}

export default App
