<template>
    <div class="container">
        <div class="centered-div">
            <form class="card shadow p-3 mb-5 rounded" @submit.prevent="submitForm" style="width: 500px;">

                <div class="card-body">
                    <app-logo></app-logo>
                    <hr>

                    <h6 class="alt-font font-weight-500 text-extra-dark-gray">{{
                        $t('password_recovery.change_password')}}</h6>

                    <div v-if="errors != null">
                        <p class="font-weight-bold mb-2">{{ $t('password_recovery.errors') }}</p>

                        <div v-for="(messages, key) in errors" :key="key">
                            <p v-for="(message, key) in messages" :key="key">
                                {{ message }}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="mb-3">
                    <input class="form-control" type="email" name="email" id="email"
                        :placeholder="$t('password_recovery.your_email')" v-model="data.email">
                </div>

                <div class="mb-3">
                    <input class="form-control" type="password" name="password" id="password"
                        :placeholder="$t('password_recovery.your_password')" v-model="data.password">
                </div>

                <div class="mb-3">
                    <input class="form-control" type="password" name="password_confirmation" id="password_confirmation"
                        :placeholder="$t('password_recovery.your_password_confirmation')"
                        v-model="data.password_confirmation">
                </div>

                <input type="hidden" name="token" :value="data.token">

                <div class="mb-3">
                    <button id="btn-login" class="btn btn-primary w-100" type="submit">{{
                        $t('password_recovery.save')}}</button>
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
