import { useState } from 'react'
import CraftMatrixLanding from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

function App() {
  const [page, setPage] = useState('landing')

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

  return <CraftMatrixLanding onNavigateToLogin={() => setPage('login')} />
}

export default App
