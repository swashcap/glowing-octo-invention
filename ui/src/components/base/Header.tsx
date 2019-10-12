import { Fragment, h } from 'preact'

import { SkipLink } from './SkipLink'
import { NavigationButton } from './NavigationButton'
import { Menu } from './Menu'

export const Header = () => (
  <Fragment>
    <header class="center mw8 ph3" role="banner">
      <SkipLink href="#content">Skip to content</SkipLink>
      <div class="flex justify-between">
        <NavigationButton href="#navigation">Navigation</NavigationButton>
        <Menu alignment="right">
          <Menu.Button>Account</Menu.Button>
          <Menu.Items style="width: 8rem">
            <Menu.Item href="#">Orders</Menu.Item>
            <Menu.Item href="#">Personal Info</Menu.Item>
            <Menu.Item href="#">Shopping List</Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </header>
    <nav id="navigation"></nav>
  </Fragment>
)
