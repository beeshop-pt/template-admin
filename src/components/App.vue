<script setup>
const design = {
  contents: [
    {
      component: "AdminLayout",
      children: [{
        component: "Datatable",
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
      }]
    }
  ]
}
</script>

<template>
  <app-content :user="{ permissions: [{ name: 'access admin' }] }" :design="design"></app-content>
</template>
