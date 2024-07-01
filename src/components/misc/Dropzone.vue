<template>
    <form :action="props.url" class="dropzone" :id="props.id">
        <slot></slot>
    </form>
</template>

<script setup>
import Dropzone from "dropzone"
import { inject, onMounted } from "vue"
import { v4 as uuid } from 'uuid'

const emitter = inject('emitter')

const props = defineProps({
    name: { required: true },
    id: {
        require: false,
        default() {
            return `dropzone-${uuid()}`
        },
    },
    url: {
        require: false,
        default: null
    },
})

Dropzone.autoDiscover = false

onMounted(() => {
    let element = document.getElementById(props.id);

    new Dropzone(element, {
        url: props.url,
        paramName: "file",
        maxFilesize: 5000,
        uploadMultiple: true,
        acceptedFiles: "image/*,application/pdf",
        headers: {
            "X-CSRF-TOKEN": document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content"),
        },
        dictDefaultMessage: "Clique ou arraste para carregar um ficheiro",
        init: function () { },
        success: (res, data) => onUpload(data),
        error: (res, data) => onError(data)

    })
})

const onUpload = (data) => {
    window.notyf.success(data.message)
    emitter.emit("list.resources")
}

const onError = (data) => {
    window.notyf.error(data.message)
}

</script>

<style scoped>
.dropzone {
    min-height: 150px;
    border: 2px dashed rgba(33, 121, 253, 0.67);
    background: white;
    padding: 20px 20px;
}
</style>
