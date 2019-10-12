import {
  createContext,
  createRef,
  h,
  Component,
  FunctionComponent,
  JSX
} from 'preact'
import { useContext } from 'preact/hooks'
import clsx from 'clsx'

const MenuContext = createContext<
  MenuState & {
    alignment: MenuAlignment
    onToggleExpanded: JSX.MouseEventHandler
  }
>({
  alignment: 'left',
  id: '',
  isExpanded: false,
  onToggleExpanded: () => {}
})

export type MenuAlignment = 'left' | 'right'

export interface MenuProps extends JSX.HTMLAttributes {
  alignment?: MenuAlignment
}

export interface MenuState {
  id: string
  isExpanded: boolean
}

// TODO: Add keyboard navigation traps
export class Menu extends Component<MenuProps, MenuState> {
  static Button: FunctionComponent<JSX.HTMLAttributes> = ({
    class: className,
    ...rest
  }) => {
    const { id, isExpanded, onToggleExpanded } = useContext(MenuContext)

    return (
      <button
        aria-expanded={isExpanded}
        aria-haspopup="true"
        class={clsx(
          'menu-button bg-white bn button-reset color-inherit dib lh-copy ph3 pv2 pointer sans-serif',
          className
        )}
        id={id}
        onClick={onToggleExpanded}
        type="button"
        {...rest}
      />
    )
  }

  static Items: FunctionComponent<JSX.HTMLAttributes> = ({
    class: className,
    ...rest
  }) => {
    const { alignment, id, isExpanded } = useContext(MenuContext)

    return (
      <div
        aria-labelledby={id}
        class={clsx(
          'menu-items absolute bg-white',
          {
            dn: !isExpanded,
            'left-0': alignment === 'left',
            'right-0': alignment === 'right'
          },
          className
        )}
        {...rest}
      />
    )
  }

  static Item: FunctionComponent<JSX.HTMLAttributes> = ({
    class: className,
    ...rest
  }) => {
    return (
      <a
        class={clsx('menu-item color-inherit db link pv2 ph3 ', className)}
        {...rest}
      />
    )
  }

  state = {
    id: '',
    isExpanded: false
  }

  rootRef = createRef()

  handleToggleExpanded = () => {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }

  render(
    { alignment = 'left', class: className, ...rest }: MenuProps,
    { id, isExpanded }: MenuState
  ) {
    return (
      <MenuContext.Provider
        value={{
          alignment,
          id,
          isExpanded,
          onToggleExpanded: this.handleToggleExpanded
        }}
      >
        <div
          class={clsx('menu black relative', className)}
          ref={this.rootRef}
          {...rest}
        />
      </MenuContext.Provider>
    )
  }
}

Menu.Button.displayName = 'Menu.Button'
Menu.Items.displayName = 'Menu.Items'
