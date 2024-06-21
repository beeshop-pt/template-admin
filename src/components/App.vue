<script setup>
const design = {
  contents: [{ component: "AdminLayout" }]
}
</script>

<template>
  <app-content :user="{ permissions: [{ name: 'access admin' }] }"
    :design="{ contents: [{ component: 'AdminLayout' }] }"></app-content>
</template>
