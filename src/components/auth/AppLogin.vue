<template>
    <div class="container">
        <div class="centered-div">
            <form class="card" @submit.prevent="submitForm" style="width: 500px;">
                <div class="card-content">
                    <AppLogo />

                    <hr />

                    <div v-if="errors != null">
                        <p class="font-weight-bold mb-2">{{ $t('login.errors') }}</p>

                        <div v-for="(messages, key) in errors" :key="key">
                            <p v-for="(message, key) in messages" :key="key">
                                {{ message }}
                            </p>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">{{ $t('login.email') }}</label>
                        <div class="control has-icons-left has-icons-right">
                            <input id="email" class="input" type="email" name="email" v-model="data.email">
                            <span class="icon is-small is-left">
                                <font-awesome-icon icon="fas fa-user"></font-awesome-icon>
                            </span>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">{{ $t('login.password') }}</label>
                        <div class="control has-icons-left has-icons-right">
                            <input id="password" class="input" type="password" name="password" v-model="data.password">
                            <span class="icon is-small is-left">
                                <font-awesome-icon icon="fas fa-key"></font-awesome-icon>
                            </span>
                        </div>
                    </div>

                    <div class="mb-3">
                        <a href="/password-recovery">{{ $t('login.forgot_password') }}</a>
                    </div>
                    <div class="field is-grouped">
                        <div class="control">
                            <button type="submit" id="btn-login" class="button is-link">{{ $t('login.login') }}</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePage } from "@helpers";

const { page } = usePage()
const errors = ref(null)
const data = ref({ email: null, password: null })

const submitForm = () => {
    axios
        .post("/login", data.value)
        .then((res) => {
            window.location.href = res.data.redirect ?? '/'

            if (res.data.show_pending_modal == true) {
                localStorage.setItem('showPendingCartModal', 'show')
            }
        })
        .catch((err) => {
            errors.value = null
            let response = err.response.data

            // general error
            if (response.error) {
                window.notyf.error(response.message)
                return
            }

            // validation errors
            if (response.errors) {
                errors.value = response.errors
                window.notyf.error('Valide os dados introduzidos!')
                return
            }
        })
}
</script>

<style>
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
