<template>
    <div :class="['column  mb-2', props.class]">
        <label :for="props.name" class="label">
            {{ props.title }}
        </label>
        <div class="mt-2">
            <div v-if="props.name"
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                <input :type="props.type ?? 'text'" :name="props.name" :id="props.name" class="input"
                    :placeholder="props.placeholder" v-model="props.modelValue[props.name]" />
            </div>
            <small v-else class="help"> No Name set</small>
            <small class="help" v-if="props.subtitle" v-html="props.subtitle"></small>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    class: {
        required: false,
        default: {}
    },
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: false,
        default: "text",
    },
    help: String,
    name: {
        type: String,
        required: true,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    required: {
        type: Boolean,
        default: false,
    },
    modelValue: {
        required: false,
        default: {}
    },
    placeholder: {
        type: String,
        required: false,
    },
})

const emit = defineEmits(["update:modelValue"])

const updateData = (ev) => {
    emit("update:modelValue", ev.target.value)
}

</script>