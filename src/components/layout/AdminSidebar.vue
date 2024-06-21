<template>
    <div class="sidebar__column" :class="classVisible" v-if="visible">
        <div class="sidebar__content">
            <aside class="menu">
                <template v-for="item in menuItems">
                    <p :id="slugify(item.slug)" class="menu-label">{{ item.label }}</p>
                    <ul v-for="child in item.children" class="menu-list" :class="{ 'menu-list-expanded': true }">
                        <li>
                            <a :id="slugify(child.slug)" :class="{ 'is-active': url == child.url }"
                                :href="child.slug">
                                {{ child.label }}
                            </a>
                        </li>
                    </ul>
                </template>
            </aside>
        </div>
    </div>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import { useAuth, usePage, useCompany } from '@helpers'

const { company } = useCompany()
const { page } = usePage()
const { user } = useAuth()


const menu = [
    {
        label: "GERAL",
        children: [
            { label: "Dashboard", slug: "/admin", allow: true }
        ],
        allow: true
    }, {
        label: "WEBSITE",
        children: [
            { label: "Páginas", slug: "/admin/pages", allow: true },
            { label: "Formulários", slug: "/admin/forms", allow: true },
            { label: "Componentes", slug: "/admin/pages/components", allow: !!user },
            { label: "Templates", slug: "/admin/templates", allow: true },
        ],
        allow: true
    }
]

const menuItems = ref(menu)
axios.post(`/admin/pages/fetch`, {
    sortBy: 'sort_order',
    sortOrder: 'asc',
    limit: 100,
    filters: [
        {
            operator: "is_null",
            column: "parent_id",
            value: null
        },
        {
            operator: "equals",
            column: "template_id",
            value: page.template_id
        }, {
            operator: "equals",
            column: "show_in_menu",
            value: 1
        }
    ]
}).then((res) => {
    menuItems.value = res.data.data
})



const visible = ref(true)
const classVisible = ref('')
const emitter = inject("emitter")
const url = window.location.pathname

const toggleSidebar = () => {
    visible.value = !visible.value
    if (visible.value) {
        classVisible.value = 'slideInLeft'
    } else {
        classVisible.value = 'slideOutLeft'
    }
}

emitter.on("sidebar.navigation", toggleSidebar);

onMounted(() => {
    if (document.body.getBoundingClientRect().width <= 1000) {
        visible.value = false;
    }
})
</script>

<style lang="sass" scoped>
.sidebar
    &__column
        position: fixed
        max-height: 100vh
        height: calc(100% - 60px)
        box-shadow: 0 4px 34px -4px #ccc
        overflow-y: auto
        overflow-x: hidden
        display: block
        bottom: 0
        top: 60px
        left: 0
        padding: 0.75rem
        -webkit-box-flex: 0
        -ms-flex: none
        flex: none
        max-width: 220px
        width: 100%
        background: #fff
        z-index: 10
        border-right: 1px solid #dadde0
    &__content
        padding: 10px 20px

@media screen and (max-width: 1000px)
    .sidebar__column
        transform: translate3d(-220px,0,0)
</style>
