<template>
    <div class="input-link ">
        <input type="text" :id="props.id" class="input" v-model="props.modelValue" :name="props.name"
            autocomplete="false">
        <div class="input-link-btn" @click.prevent="openResources()">
            <font-awesome-icon aria-hidden="true" icon="fas fa-folder-open"></font-awesome-icon>
        </div>
    </div>
</template>

<script setup>
import { v4 as uuid } from 'uuid'
import { inject } from 'vue';
const emitter = inject('emitter')
const props = defineProps({
    id: {
        type: String,
        default() {
            return `bee-${uuid()}`
        },
    },
    name: {
        required: false
    },
    modelValue: String
})

const emit = defineEmits(['update:modelValue', 'newResource'])

emitter.on("inputLink:resource:" + props.id, (params) => {
    props.modelValue = params.params.route
    emit('newResource', params.params)
})

const openResources = () => {
    emitter.emit("resources:open", { event: "inputLink:resource:" + props.id })
}
</script>

<style>
.input-link {
    position: relative;
    width: 100%
}

.input-link-btn {
    cursor: pointer;
    border-radius: 0 5px 5px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    width: 15%;
    height: 100%;
    background-color: #4e5e7d;
    z-index: 1;
    border-color: transparent;
    color: white;
}
</style>
