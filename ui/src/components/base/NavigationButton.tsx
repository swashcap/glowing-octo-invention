import { FunctionComponent, h, JSX } from 'preact'
import clsx from 'clsx'

import { ScreenReaderOnly } from './ScreenReaderOnly'

export const NavigationButton: FunctionComponent<JSX.HTMLAttributes> = ({
  children,
  class: className,
  ...rest
}) => (
  <ScreenReaderOnly.FocusTrap>
    <a class={clsx('dib w2 white', className)} {...rest}>
      <div
        aria-hidden="true"
        class="bg-white br1 mb1"
        style="height: .25rem"
      ></div>
      <div
        aria-hidden="true"
        class="bg-white br1 mb1"
        style="height: .25rem"
      ></div>
      <div aria-hidden="true" class="bg-white br1" style="height: .25rem"></div>
      <ScreenReaderOnly.Content>{children}</ScreenReaderOnly.Content>
    </a>
  </ScreenReaderOnly.FocusTrap>
)
