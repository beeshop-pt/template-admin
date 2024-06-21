<template>
    <div class="container">
        <div class="centered-div">
            <form class="card shadow p-3 mb-5 rounded" @submit.prevent="submitForm" style="width: 500px;">
                <div class="card-body">
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

                    <div class="mb-3">
                        <label for="email" class="form-label">{{ $t('login.email') }}</label>
                        <input type="email" id="email" name="email" class="form-control" aria-describedby="emailHelp"
                            v-model="data.email">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">{{ $t('login.password') }}</label>
                        <input type="password" name="password" id="password" class="form-control"
                            v-model="data.password">
                    </div>
                    <div class="mb-3">
                        <a href="/password-recovery">{{ $t('login.forgot_password') }}</a>
                    </div>

                    <button type="submit" id="btn-login" class="btn btn-primary w-100">{{ $t('login.login')
                        }}</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import AppLogo from './AppLogo.vue';
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
