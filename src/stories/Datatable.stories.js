import { fn } from '@storybook/test';
import Datatable from '@/components/datatable/Datatable.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Components/Datatable',
  tags: ["autodocs"],
  component: Datatable,
};

export const Main = {
  render: (args) => ({
    setup() {
      return { args };
    },
    template: `<AppContent v-bind="args"></AppContent>`,
  }),
  args: {
    design: {
      contents: [{
        component: 'Datatable',
        configs: {
          displayble: {
            id: { name: 'ID' },
            code: { name: 'Código' },
            description: { name: 'Descrição' },
            stock_quantity: { name: 'Stock' },
            is_active: { name: 'Ativo?' },
          },
          allow: {
            update: false,
            create: false,
            link: false
          },
          endpoint: '/articles'
        }
      } ]
    },
    user: { permissions: [{ name: 'access admin' }] }
  },
};