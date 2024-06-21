<template>
   <div class="container">
        <div class="centered-div">
            <form class="card shadow p-3 mb-5 rounded" @submit.prevent="submitForm" style="width: 500px;">
                <div class="card-body">
                    <app-logo></app-logo>
                    <hr>

                    <h6 class="alt-font font-weight-500 text-extra-dark-gray">{{ $t('email_recovery.recover_password')}}</h6>

                    <div v-if="errors != null">
                        <p class="font-weight-bold mb-2">{{ $t('email_recovery.errors')}}</p>

                        <div v-for="(messages, key) in errors" :key="key">
                            <p v-for="(message, key) in messages" :key="key">
                                {{ message }}
                            </p>
                        </div>
                    </div>

                    <div class="mb-3">
                    <input class="form-control" type="email" name="email" id="email"
                        :placeholder="$t('email_recovery.your_email')" v-model="data.email">
                    </div>

                    <div>
                    <button id="btn-login" class="btn btn-primary w-100"
                        type="submit">{{ $t('email_recovery.send_email')}}</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>

import { reactive } from 'vue'

const data = reactive({
    email: ''
})

const submitForm = () => {
    axios
        .post("/password-recovery/request", data)
        .then((res) => {
            window.notyf.success(res.data)
        })
        .catch((err) => {
            window.notyf.error(err.response.data)
        })
}
</script>
