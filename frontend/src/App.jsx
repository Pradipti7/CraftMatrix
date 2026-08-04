import { useState } from 'react'
import CraftMatrixLanding from './pages/LandingPage'
import GridPage from './pages/GridPage'

function App() {
  const [page, setPage] = useState('landing')

  if (page === 'grid') {
    return (
      <GridPage onBack={() => setPage('landing')} />
    )
  }

  return (
    <CraftMatrixLanding
      onStartCreating={() => setPage('grid')}
      onPreviousWork={() => {}}
    />
  )
}

export default App
