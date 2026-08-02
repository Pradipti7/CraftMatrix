import { useState } from 'react'
import CraftMatrixLanding from './pages/LandingPage'
import LoginPage from './pages/LoginPage'

function App() {
  const [page, setPage] = useState('landing')

  if (page === 'login') {
    return <LoginPage onBack={() => setPage('landing')} />
  }

  return <CraftMatrixLanding onNavigateToLogin={() => setPage('login')} />
}

export default App
