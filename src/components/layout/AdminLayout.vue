<template>
    <div class="site app-fluid">
        <AdminHeader></AdminHeader>
        <AdminSidebar></AdminSidebar>
        <div class="content-app margin-left-content px-5 pb-5" v-if="can('access admin')">
            <div class="box mb-5">
                <!-- <slot></slot> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuth } from '@helpers'

const { can } = useAuth()

</script>

<style scoped>
.content-app {
    padding-top: 80px;
    margin-left: 0;
    /* -webkit-transform: translateZ(0) */
    /* transform: translateZ(0) */
}

.content-app.margin-left-content {
    margin-left: 220px
}

@media screen and (max-width: 1000px) {
    .content-app {
        margin-left: 0;
        padding: 80px 10px
    }

    .content-app.margin-left-content {
        margin-left: 0
    }
}
</style>