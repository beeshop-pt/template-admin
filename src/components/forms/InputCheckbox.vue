<template>
    <div class="mb-2">
        <label :for="props.name" class="label">
            {{ props.title }}
        </label>
        <div class="field">
            <div class="select is-fullwidth">
                <select :id="name" :name="props.name" :disabled="disabled" v-model="propValue">
                    <option value="1">{{ $t('input_checkbox.yes') }}</option>
                    <option value="0">{{ $t('input_checkbox.no') }}</option>
                </select>
            </div>
            <p class="help" v-if="help">{{ help }}</p>
            <input type="hidden" :name="props.name" :value="propValue">
        </div>
    </div>
</template>

<script setup>
import { toRef, watch } from "vue"

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    name: {
        required: false,
        default: null
    },
    valueProp: {
        default: "1",
        required: true,
    },
    configProp: {
        required: false,
        default: [],
    },
    label: {
        required: false,
    },
    modelValue: Boolean
});

let check = typeof props.valueProp === 'string' ? props.valueProp : props.valueProp ? '1' : '0'

const propValue = toRef(check)
const disabled = Object.keys(props.configProp).includes('disabled') ? props.configProp.disabled : false
const help = Object.keys(props.configProp).includes('help') ? props.configProp.help : null

watch(propValue, () => {
    emit('update:modelValue', propValue.value)
})
</script>
