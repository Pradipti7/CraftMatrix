import { useState } from 'react'
import CraftMatrixLanding from './pages/LandingPage'
import GridPage from './pages/GridPage'
import PatternRecommendation from './pages/PatternRecommendation'

function App() {
  const [page, setPage] = useState('landing')
  const [initialPattern, setInitialPattern] = useState(null)

  const handleSelectPattern = (pattern) => {
    setInitialPattern(pattern)
    setPage('grid')
  }

  if (page === 'grid') {
    return (
      <GridPage
        onBack={() => { setInitialPattern(null); setPage('landing') }}
        initialPattern={initialPattern}
      />
    )
  }

  if (page === 'patterns') {
    return (
      <PatternRecommendation
        onBack={() => setPage('landing')}
        onSelectPattern={handleSelectPattern}
        onCreatePattern={() => setPage('grid')}
      />
    )
  }

  return (
    <CraftMatrixLanding
      onStartCreating={() => setPage('grid')}
      onPatterns={() => setPage('patterns')}
    />
  )
}

export default App
