import { Fragment, FunctionComponent, h } from 'preact'
import { RoutableProps } from 'preact-router'

import { Header } from '../base/Header'

export const Home: FunctionComponent<RoutableProps> = () => (
  <Fragment>
    <Header />
    <main class="center mw8 ph3" id="content"></main>
  </Fragment>
)
