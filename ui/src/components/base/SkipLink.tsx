import { FunctionalComponent, JSX, h } from 'preact'
import clsx from 'clsx'

import { ScreenReaderOnly } from './ScreenReaderOnly'

export const SkipLink: FunctionalComponent<JSX.HTMLAttributes> = ({
  class: className,
  ...rest
}) => (
  <ScreenReaderOnly>
    <a class={clsx('bg-white blue dib pa2', className)} {...rest} />
  </ScreenReaderOnly>
)
