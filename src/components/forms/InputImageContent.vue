<template>
    <div style="padding: 0 1.25rem">
        <div class="box--button-add" style="margin-top: 1rem">
            <a v-if="!readOnly" class="button is-primary" @click="openResources">{{ $t('input_image_content.add') }}</a>
        </div>

        <div style="padding: 1.25rem">
            <draggable tag="div" :list="props.modelValue[props.name]" class="columns is-multiline" ghost-class="ghost"
                @start="dragging = true" @end="dragging = false" handle=".handle" item-key="id" v-bind="dragOptions">
                <template #item="{ element, index }">
                    <div class="column">
                        <div class="columns">
                            <div class="column is-2"
                                style="display: flex;justify-content: center;align-items: center;padding: 0;">
                                <div class="actions-image"
                                    style="display: flex;justify-content: center;flex-direction: column;">
                                    <a v-if="!readOnly" class="button handle-button handle mb-2">
                                        <font-awesome-icon icon="fa fa-align-justify"></font-awesome-icon>
                                    </a>
                                    <a v-if="!readOnly" class="button remove-button mb-2" @click="remove(index)">
                                        <font-awesome-icon icon="fas fa-trash"></font-awesome-icon>
                                    </a>
                                </div>
                            </div>

                            <div class="column">
                                <a @click.prevent="openResources(index)">
                                    <div class="image is-128x128">
                                        <img style="height: 100%; width: 100%; object-fit: contain" class="responsive"
                                            :src="element.route ? element.route : defaultImage" />
                                    </div>
                                </a>
                            </div>

                        </div>
                    </div>
                </template>
            </draggable>
        </div>
        <input type="hidden" :name="props.name" :value="getResourceIds" />
    </div>
</template>

<script setup>
import { computed, inject } from "vue"
import draggable from "vuedraggable";
import { v4 as uuid } from "uuid";

const emitter = inject('emitter')
const props = defineProps({
    name: {
        required: false,
        default: "image",
    },
    readOnly: {
        required: false,
        default: false
    },
    modelKey: {
        required: false,
        default: 'id'
    },
    modelValue: {
        required: false,
        default: null
    },
})

const emits = defineEmits(["update:modelValue"])
const eventFire = `resources:images:${uuid()}`;

const openResources = () => {
    emitter.emit("resources:open", { event: eventFire });
};

emitter.on(eventFire, (res) => {
    if (!Array.isArray(props.modelValue[props.name])) {
        props.modelValue[props.name] = []
    }
    props.modelValue[props.name].push(res.params)
});

const remove = (index) => {
    props.modelValue[props.name].splice(index, 1)
};

const getResourceIds = computed(() => {
    let res = {}
    if (!Array.isArray(props.modelValue[props.name])) {
        props.modelValue[props.name] = []
    }

    props.modelValue[props.name].map((item, index) => {
        res[item[props.modelKey]] = { sort_order: index }
    })
    return JSON.stringify(res)
})

const dragOptions = computed(() => {
    return {
        animation: 200,
        group: "parent",
        disabled: false,
        ghostClass: "ghost",
    };
})
</script>

<style lang="sass" scoped>
.margin-bottom-20
  margin-bottom: 20px

  .box--button-add
    display: inline-flex
    margin: 10px
    & a
      margin-left: 20px

    .content-form
      background: #f3f3f3
      border-radius: 5px
      border: 1px solid #eee
      padding: 10px

    .box-image
      display: inline-flex
      width: 100%
      flex-direction: row
      display: flex
      margin: auto
      & .image
        margin-right: 20px
        margin-left: 20px

    a.remove-button
      background: transparent
      border: none

    a.handle-button
      background: transparent
      border: none

    .actions-image
      max-width: 10%
      width: 100%

    .ghost
      opacity: 0.5
      background: #c8ebfb

</style>
