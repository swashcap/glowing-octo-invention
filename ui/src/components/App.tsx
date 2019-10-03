import { h } from 'preact'
import Router from 'preact-router'

import { Home } from './routes/Home'
import { InitialData, useInitialData } from '../api/initialData'
import { Search } from './routes/Search'

export const App = () => {
  const initialData = useInitialData()

  return (
    <InitialData.Provider value={initialData}>
      <Router>
        <Home path="/" />
        <Search path="/search/:query" />
      </Router>
    </InitialData.Provider>
  )
}
