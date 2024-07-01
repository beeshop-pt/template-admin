<template>
    <div :class="['column mb-2', props.class]">
        <label :for="props.name" class="label">
            {{ props.title }}
        </label>
        <div class="field">
            <div v-if="props.name" class="select is-fullwidth">
                <select :id="name" :name="props.name" :disabled="disabled" v-model="computedValue">
                    <option value="1">{{ $t('input_checkbox.yes') }}</option>
                    <option value="0">{{ $t('input_checkbox.no') }}</option>
                </select>
            </div>
            <small v-else class="help"> No Name set</small>
            <p class="help" v-if="props.subtitle">{{ props.subtitle }}</p>
        </div>
    </div>
</template>

<script setup>

import { ref, watch } from 'vue'

const props = defineProps({
    name: {
        required: false,
        default: null
    },
    title: {
        required: true,
        default: null,
    },
    subtitle: {
        required: false,
        default: null,
    },
    disabled: {
        required: false,
        default: false,
    },
    help: {
        required: false,
        default: null,
    },
    modelValue: Object
})

const emits = defineEmits(['update:modelValue'])

const computedValue = ref(props.modelValue[props.name] ?? '1')

watch(computedValue, () => {
    props.modelValue[props.name] = computedValue.value
})

</script>
