<template>
    <div class="container">
        <div class="centered-div">
            <form class="card " @submit.prevent="submitForm" style="width: 500px;">
                <div class="card-content">
                    <app-logo></app-logo>
                    <hr>


                    <div v-if="errors != null">
                        <p class="font-weight-bold mb-2">{{ $t('email_recovery.errors') }}</p>

                        <div v-for="(messages, key) in errors" :key="key">
                            <p v-for="(message, key) in messages" :key="key">
                                {{ message }}
                            </p>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">{{ $t('email_recovery.your_email') }}</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input" :placeholder="$t('email_recovery.your_email')" type="email"
                                name="email" id="email" v-model="data.email">
                            <span class="icon is-small is-left">
                                <font-awesome-icon icon="fas fa-key"></font-awesome-icon>
                            </span>
                        </div>
                    </div>
                    <div class="field is-grouped">
                        <div class="control">
                            <button type="submit" id="btn-login" class="button is-link">{{
                                $t('email_recovery.send_email') }}</button>
                        </div>
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
