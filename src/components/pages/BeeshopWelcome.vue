<template>
    <a v-if="!isLoggedIn" id="welcome-later" href="/login" style="position: absolute; top: 0; right: 0" class="button is-link m-5" type="submit">Login</a>
    <div class="centered-div">
        <div style="width: 500px" class="card p-3">
            <div class="card-content">
                <div class="field">
                    <div style="display: block; width: 30%; margin-left: auto; margin-right: auto; margin-bottom: 10px">
                        <BeeshopAbelha />
                    </div>
                    <p v-if="isLoggedIn" style="text-align: center; font-size: 22px; font-weight: bold">Bem vindo ao Beeshop, {{ user.name }}!</p>
                    <p v-else style="text-align: center; font-size: 22px; font-weight: bold">Bem vindo ao Beeshop!</p>
                </div>
                <div class="field my-5">
                    <p style="text-align: center">
                        Antes de começar a utilizar todas as funcionalidades disponíveis, será necessário fazer algumas
                        configurações:
                        configurar o logotipo, o favicon, o email geral, o email de notificações e o limite máximo de
                        ficheiros.
                    </p>
                </div>
                <div style="margin: auto; width: 50%" class="field is-grouped">
                    <div class="control">
                        <button type="submit" id="welcome-later" class="button is-secondary">Mais tarde</button>
                    </div>
                    <div class="control">
                        <button type="submit" id="welcome-start" class="button is-link">Começar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import BeeshopAbelha from '../logotypes/BeeshopAbelha.vue'
import { useAuth } from '@helpers'

const { user, isLoggedIn } = useAuth()

</script>

<style scoped>

body {
    background-color: #f8f8f8;
}

.centered-div {
    height: 100vh;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
