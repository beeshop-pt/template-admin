<template>
    <div class="container">
        <div class="centered-div">
            <form class="card" @submit.prevent="submitForm" style="width: 500px;">

                <div class="card-content">
                    <app-logo></app-logo>
                    <hr>


                    <div v-if="errors != null">
                        <p class="font-weight-bold mb-2"> {{ $t('password_recovery.errors') }}</p>

                        <div v-for="(messages, key) in errors" :key="key">
                            <p v-for="(message, key) in messages" :key="key">
                                {{ message }}
                            </p>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">{{ $t('password_recovery.your_email') }}</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input" type="email" name="email" id="email" v-model="data.email">
                            <span class="icon is-small is-left">
                                <font-awesome-icon icon="fas fa-user"></font-awesome-icon>
                            </span>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">{{ $t('password_recovery.your_password') }}</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input" type="password" name="password" id="password" v-model="data.password">
                            <span class="icon is-small is-left">
                                <font-awesome-icon icon="fas fa-key"></font-awesome-icon>
                            </span>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">{{ $t('password_recovery.your_password_confirmation') }}</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input" type="password_confirmation" name="password_confirmation"
                                id="password_confirmation" v-model="data.password_confirmation">
                            <span class="icon is-small is-left">
                                <font-awesome-icon icon="fas fa-key"></font-awesome-icon>
                            </span>
                        </div>
                    </div>

                    <input type="hidden" name="token" :value="data.token">

                    <div class="field is-grouped">
                        <div class="control">
                            <button type="submit" id="btn-login" class="button is-link">{{
                                $t('password_recovery.change_password') }}</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useAuth } from '@helpers'

const { user } = useAuth()

const errors = ref(null)
const data = reactive({
    email: null,
    password: null,
    password_confirmation: null,
    token: window.location.href.split('/').pop() ?? null
})

const submitForm = () => {
    axios
        .post("/password-recovery/reset", data)
        .then((res) => {
            window.notyf.success(res.data)
            window.location.href = "/login"
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
