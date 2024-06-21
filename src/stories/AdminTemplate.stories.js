import { fn } from '@storybook/test';
import AdminLayout from '@/components/layout/AdminLayout.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Components/Layouts',
  tags: ["autodocs"],
  component: AdminLayout,
};

export const Main = {
  render: (args) => ({
    setup() {
      return { args };
    },
    template: `<AppContent v-bind="args"></AppContent>`,
  }),
  args: {
    design: { contents: [{ component: 'AdminLayout' }] },
    user: { permissions: [{ name: 'access admin' }] }
  },
};