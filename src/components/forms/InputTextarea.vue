<template>
    <div :class="['column  mb-2', props.class]">
        <label :for="props.name" class="label">
            {{ props.title }}
        </label>
        <div class="mt-2">
            <textarea :id="props.id" class="tiny-editor" :name="props.name" output-format="html"
                v-model="props.modelValue[props.name]" model-events="change keydown blur focus paste"
                autocomplete="false"></textarea>
        </div>
    </div>
</template>

<script setup>
import { v4 as uuid } from 'uuid'
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
    id: {
        type: String,
        default() {
            return `tinymce-${uuid()}`
        },
    },
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: false,
    },
    modelValue: {
        required: false
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    readonly: {
        type: Boolean,
        default: false,
    },
    height: {
        type: String,
        default: '300px',
    }
})

const validEvents = [
    'Input',
    'Change',
    'Click',
    'Dirty',
    'FocusOut',
    'Remove',
]

const uploadHandler = async (blobInfo, progress) => {
    const formData = new FormData();
    formData.append("file[]", blobInfo.blob())

    try {
        let res = await axios.post("/admin/resources", formData);
        if (Object.keys(res.data).includes("file")) {
            return res.data.file.route
        }
    } catch (e) {
        console.error(e)
    }
}

onMounted(() => {
    tinymce.init({
        selector: `#${props.id}`,
        setup: function (editor) {
            editor.on(validEvents.join(' '), function (e) {
                if (tinymce.activeEditor.id == props.id) {
                    let content = tinymce.activeEditor.dom.doc.querySelector('body').innerHTML

                    // clear input value from TinyMCE
                    if (content.includes('<p><br data-mce-bogus="1"></p>') || content.includes('<p></p>')) {
                        content = ''
                    }
                    props.modelValue[props.name] = content
                }
            })
        },
        paste_as_text: true,
        paste_data_images: false,
        plugins: "lists link image table code wordcount fullscreen",
        toolbar: 'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
        images_upload_handler: uploadHandler,
        readonly: props.readonly,
        disabled: props.disabled,
        height: props.height,
        branding: false
    })
})

</script>

<style scoped>

.readonly {
    background: whitesmoke;
}

</style>
