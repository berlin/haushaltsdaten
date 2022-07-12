import { GPS } from '@components/Icons'
import { Story, Meta } from '@storybook/react'

import { Button, ButtonPropType } from '.'

export default {
  title: 'UI Elements/Button',
  component: Button,
} as Meta

const Template: Story<ButtonPropType> = (props) => <Button {...props} />

export const Primary = Template.bind({})
Primary.parameters = {
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
Primary.args = {
  children: 'Click me',
  onClick: () => undefined,
  primary: true,
}

export const Secondary = Template.bind({})
Secondary.parameters = {
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
Secondary.args = {
  children: 'Click me',
  onClick: () => undefined,
}

export const Disabled = Template.bind({})
Disabled.parameters = {
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
Disabled.args = {
  children: 'Click me not',
  onClick: () => undefined,
  disabled: true,
}

export const FullWidth = Template.bind({})
FullWidth.parameters = {
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
FullWidth.args = {
  children: 'Click me',
  onClick: () => undefined,
  className: 'w-full',
}

export const WithIconCentered = Template.bind({})
WithIconCentered.parameters = {
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
WithIconCentered.args = {
  primary: true,
  children: (
    <>
      <GPS className="text-gray-400" />
      <span>Baum finden</span>
    </>
  ),
  onClick: () => undefined,
  className: 'w-full',
}

export const WithIconSeparated = Template.bind({})
WithIconSeparated.parameters = {
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
WithIconSeparated.args = {
  children: (
    <>
      <span>Click me</span>
      <GPS />
    </>
  ),
  onClick: () => undefined,
  className: 'w-full justify-between',
}
