import { Component, JSX, VNode, cloneElement, h } from 'preact'
import clsx from 'clsx'

import './ScreenReaderOnly.css'

/**
 * Preact's `ComponentChildren` and `ComponentChild` don't offer generic support for
 * their `VNode` subtype. Duplicate here:
 */
type ComponentChild<P> =
  | VNode<any>
  | object
  | string
  | number
  | boolean
  | null
  | undefined

export interface ScreenReaderOnlyProps<P> {
  children: ComponentChild<P>[] | ComponentChild<P>
}

const withClass = <P extends JSX.HTMLAttributes>(className: string) => {
  const withClassComponent = ({ children }: ScreenReaderOnlyProps<P>) => {
    if (!children) {
      return null
    } else if (
      Array.isArray(children) ||
      typeof children !== 'object' ||
      !('props' in children) ||
      (children.props !== null && typeof children.props !== 'object')
    ) {
      return <span class={className}>{children}</span>
    }

    return cloneElement(
      children,
      children.props
        ? {
            ...children.props,
            class: children.props.class
              ? clsx(children.props.class, className)
              : className
          }
        : { class: className }
    )
  }

  return withClassComponent
}

export class ScreenReaderOnly<P extends JSX.HTMLAttributes> extends Component<
  ScreenReaderOnlyProps<P>
> {
  /** Use in combination with `FocusTrap` */
  static Content = withClass('screen-reader-only-content')
  /** Use in combination with `Content` */
  static FocusTrap = withClass('screen-reader-only-focus-trap')

  render(props: ScreenReaderOnlyProps<P>) {
    return withClass<P>('screen-reader-only')(props)
  }
}
