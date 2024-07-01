import { fn } from '@storybook/test'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Pages/Auth',
  tags: ["autodocs"],
}

export const Login = {
  render: (args) => ({
    setup() {
      return { args }
    },
    template: `<AppContent v-bind="args"></AppContent>`,
  }),
  args: {
    design: {
      contents: [
        {
          component: 'SimpleLayout',
          children: [
            {
              component: 'AppLogin',
            }
          ]
        }
      ]
    },
    user: { permissions: [{ name: 'access admin' }] }
  },
}

export const PasswordRecovery = {
  render: (args) => ({
    setup() {
      return { args };
    },
    template: `<AppContent v-bind="args"></AppContent>`,
  }),
  args: {
    design: {
      contents: [
        {
          component: 'SimpleLayout',
          children: [
            {
              component: 'AppPasswordRecovery',
            }
          ]
        }
      ]
    },
    user: { permissions: [{ name: 'access admin' }] }
  },
}

export const EmailPasswordRecovery = {
  render: (args) => ({
    setup() {
      return { args };
    },
    template: `<AppContent v-bind="args"></AppContent>`,
  }),
  args: {
    design: {
      contents: [
        {
          component: 'SimpleLayout',
          children: [
            {
              component: 'AppEmailPasswordRecovery',
            }
          ]
        }
      ]
    },
    user: { permissions: [{ name: 'access admin' }] }
  },
}