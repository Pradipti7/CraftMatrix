import { useState } from 'react'
import CraftMatrixLanding from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

function App() {
  const [page, setPage] = useState('landing')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (page === 'login') {
    return (
      <LoginPage
        onBack={() => setPage('landing')}
        onNavigateToSignup={() => setPage('signup')}
      />
    )
  }

  if (page === 'signup') {
    return (
      <SignupPage
        onBack={() => setPage('login')}
        onNavigateToLogin={() => setPage('login')}
      />
    )
  }

  return (
    <CraftMatrixLanding
      isLoggedIn={isLoggedIn}
      onLogin={() => setPage('login')}
      onLogout={() => setIsLoggedIn(false)}
      onStartCreating={() => setPage('login')}
      onPreviousWork={() => {}}
    />
  )
}

export default App
