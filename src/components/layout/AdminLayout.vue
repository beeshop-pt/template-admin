<template>
    <div class="site app-fluid" v-if="can('access admin')">
        <AdminHeader></AdminHeader>
        <AdminSidebar></AdminSidebar>
        <div class="content-app margin-left-content px-5 pb-5">
            <div class="box mb-5">
                <Form :endpoint="props.endpoint">
                    <slot></slot>
                </Form>
            </div>
        </div>
    </div>
    <div class="site app-fluid" v-else>
        <div class="content-apppx-5 pb-5">
            <div class="box mb-5">
                <h1>Esta acção não está autorizada. </h1>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuth } from '@helpers'

const { can } = useAuth()
const props = defineProps({
    endpoint: {
        required: false,
        default: false
    }
})


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