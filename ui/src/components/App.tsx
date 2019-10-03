import { FunctionComponent, h } from 'preact'
import Router, { RoutableProps } from 'preact-router'

import { InitialData, useInitialData } from '../api/initialData'

const Home: FunctionComponent<RoutableProps> = () => <div>home</div>
const Search: FunctionComponent<RoutableProps> = () => <div>About</div>

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
