import { h, render } from 'preact'

import { App } from './components/App'

const mount = () => {
  const appEl = document.getElementById('app')

  if (appEl) {
    render(<App />, appEl)
  }
}

mount()
