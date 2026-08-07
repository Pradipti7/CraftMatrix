import { useState } from 'react'
import CraftMatrixLanding from './pages/LandingPage'
import GridPage from './pages/GridPage'
import ImageToGridPage from './pages/ImageToGridPage'

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

  if (page === 'image') {
    return (
      <ImageToGridPage
        onBack={() => setPage('landing')}
        onGridGenerated={(pattern) => {
          setInitialPattern(pattern)
          setPage('grid')
        }}
      />
    )
  }

  return (
    <CraftMatrixLanding
      onStartCreating={() => setPage('grid')}
      onPatterns={() => setPage('patterns')}
      onHome={() => setPage('landing')}
      onSelectPattern={handleSelectPattern}
      onUploadPhoto={() => setPage('image')}
    />
  )
}

export default App
