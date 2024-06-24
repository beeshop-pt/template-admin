<template>
    <div class="field is-grouped align-text-end margin-top-45 is-justify-content-flex-end">
        <div class="control">
            <button id="builder-submit" class="button is-primary" @click="changeOperation('save')"
                type="submit">{{ $t('buttons_form.save')}}</button>
        </div>
        <div class="control">
            <button id="builder-submit-close" class="button is-primary" @click="changeOperation('saveClose')" type="submit">
                {{ $t('buttons_form.save_close')}}
            </button>
        </div>
        <div class="control">
            <button id="builder-cancel" class="button" @click="changeOperation('cancel')" type="submit">{{ $t('buttons_form.cancel')}}</button>
        </div>
        <input id="builder-operation" name="operation" type="hidden" v-model="operation">
    </div>
</template>

<script setup>
import { ref } from 'vue';

const operation = ref('save');

const changeOperation = (value) => {
    operation.value = value
}
</script>
