<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="container is-fluid">
            <div class="navbar-brand">
                <a class="navbar-item" href="/admin" title="Visitar a página de administração">
                    <img src="@assets/logotypes/beeshop-horizontal.svg">
                </a>

                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div class="navbar-menu">
                <div class="navbar-start">
                    <div class="navbar-start">
                        <div class="separator"></div>
                        <a class="navbar-item" target="_blank" href="/" title="Visitar a página inicial">
                            BeeShop
                            <span v-if="companyName" class="ml-1"> &mdash; {{ companyName }}</span>
                        </a>
                    </div>
                </div>

                <div class="navbar-end">
                    <app-loader v-if="isFetchingJobs"></app-loader>
                    <!-- <app-changelog v-if="changelogAccount" :account="changelogAccount" selector=".changelog"
                        trigger=".changelog" /> -->

                    <div class="navbar-item">
                        <div class="navbar-item has-dropdown is-hoverable">
                            <a class="navbar-link">Olá, {{ user.name }}</a>
                            <div class="navbar-dropdown">
                                <a href="/admin/users" class="navbar-item">Perfil</a>
                                <hr class="navbar-divider">
                                <a href="javascript:void(0);" @click.prevent="logout" class="navbar-item">Sair</a>
                            </div>
                        </div>
                        <div class="navbar-item has-dropdown is-hoverable">
                            <a class="navbar-link">
                                <span class="mr-2">{{ locale.toUpperCase() }}</span>
                                <font-awesome-icon icon="fas fa-globe"></font-awesome-icon>
                            </a>
                            <div v-if="locales.length > 1" class="navbar-dropdown" style="right:0;left:auto">
                                <a v-for="locale in locales" :href="'/language/' + locale.key" class="navbar-item">
                                    {{ locale.name }}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useCompany, useAuth, useLocale } from '@helpers'

const { company } = useCompany()
const { user, logout } = useAuth()
const { locales, locale } = useLocale()

const emitter = inject('emitter')

const isFetchingJobs = ref(false)
const companyName = Object.keys(company).includes('name') ? company.name : 'BeeShop'

// const changelogAccount = process.env.VITE_BEESHOP_CHANGELOG_ACCOUNT && process.env.VITE_BEESHOP_CHANGELOG_ACCOUNT != undefined
//     ? process.env.VITE_BEESHOP_CHANGELOG_ACCOUNT
//     : false

const changelogAccount = false

const getJobs = () => {
    axios.post('/admin/jobs/fetch').then((res) => {
        if (res.data.data.length) {
            isFetchingJobs.value = true
        } else {
            isFetchingJobs.value = false
        }

        // fetch again in 10 seconds
        setTimeout(() => {
            getJobs()
        }, 10000)
    })
}

emitter.on("admin:jobs:get", () => getJobs())

getJobs()
</script>

<style scoped>
.navbar {
    position: fixed;
    top: 0;
    left: 0;
}

img {
    width: 100%;
}
</style>
