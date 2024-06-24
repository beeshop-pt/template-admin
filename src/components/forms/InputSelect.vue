<template>
    <div class="mb-2">
        <label :for="props.name" class="label">
            {{ props.title }}
        </label>
        <select v-model="props.modelValue[props.name]" class="bee-select-options input select p-1">
            <option value="1">TEste 1</option>
            <option value="2">TEste 2</option>
        </select>
        <!-- <div :id="'bee-select-' + props.name" class="bee-select w-100" style="position: relative">
            <div class="bee-select-options input select p-1" @click="openOption()"
                :class="{ 'disabled': props.disabled }">
                <p class="bee-select-option px-2" v-for="(item, i) in selectedOptions">
                    <template v-for="( key, i ) in props.fields ">
                        <span v-if="i != 0"> | </span>
                        <span>{{ item[key] }}</span>
                    </template>
<small @click="removeOption(i)">
    <font-awesome-icon icon="fa-close" class="ml-2" />
</small>
</p>
</div>
<div :id="'bee-select-items-' + props.name" class="bee-select-items"
    :class="{ 'show': showOptions, 'hidden': !showOptions }">
    <div class="d-flex">
        <input type="text" class="input" v-model="searchInput.value" :placeholder="$t('input_select.select')"
            @input="search">
        <div class="select ml-2">
            <select v-model="searchInput.column">
                <option v-for="key in props.fields" :value="key">{{ key }}</option>
            </select>
        </div>
    </div>

    <div class="mt-2">
        <template v-if="list && list.length">
                        <p class="bee-select-item py-1 px-2" :class="{ 'text-bold': checkIfExists(item.id) }"
                            v-for="( item, key ) in list " :key="key" @click="selectOption(item)">
                            <template v-for="(key, i) in props.fields">
                                <span v-if="i != 0"> | </span>
                                <span>{{ item[key] }}</span>
                            </template>
        </p>
        </template>

        <template v-else-if="!isLoading">
                        <p class="bee-select-item py-1 px-2">
                            {{ $t('input_select.no_records') }}
                        </p>
                    </template>

        <template v-else>
                        <app-loader></app-loader>
                    </template>
    </div>
</div>
{{ props.modelValue }}
<input type="hidden" :name="model" :value="selectIds()" v-model="props.modelValue[props.name]" />
</div>-->
    </div>
</template>

<script setup>

import { v4 as uuid } from 'uuid'
import { reactive, ref, watch } from "vue"

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    name: {
        required: false,
        default() {
            return `${uuid()}`
        },
    },
    title: {
        required: false,
        default: '',
    },
    valueProp: {
        required: false,
        default: null,
    },
    searchField: {
        required: false,
        default: 'id'
    },
    list: {
        required: false,
        default: []
    },
    modelKey: {
        required: false,
        default: null
    },
    disabled: {
        required: false,
        default: false
    },
    fields: {
        required: false,
        default: []
    },
    fetch: {
        required: false,
        default: []
    },
    searchInput: {
        required: false,
        default: {}
    },
    filters: {
        required: false,
        default: []
    },
    isMultiple: { required: false, default: false },
    modelValue: {
        required: false,
        default: {}
    },
})

const isLoading = ref(false)
const selectedOptions = ref([])
const list = ref([])
const showOptions = ref(false)

watch(props, (newValue, oldValue) => {

    selectedOptions.value = []
    if (newValue.valueProp) {
        if (props.isMultiple) {
            selectedOptions.value = newValue.valueProp
        } else {
            selectedOptions.value = [newValue.valueProp]
        }
    }

    initSelect()
    search()
})

let model = props.name

const getName = (keys) => {
    if (!keys) {
        return null
    }
    let properties = keys.split(".")
    return properties.reduce((acc, element) => {
        if (acc == '') {
            acc += element
            return acc
        }
        acc += '[' + element + ']'
        return acc
    }, '')
}

const searchInput = reactive({
    value: '',
    operator: "contains",
    column: props.searchField,
})

const filters = ref([searchInput])

const initSelect = () => {
    list.value = props.list
    model = getName(props.modelKey)

    filters.value = [searchInput]
    props.filters.forEach((e) => {
        filters.value.push(e)
    })
}

if (props.valueProp && !props.isMultiple) {
    selectedOptions.value.push(props.valueProp)
}
if (props.valueProp && props.isMultiple) {
    props.valueProp.forEach((e) => {
        selectedOptions.value.push(e)
    })
}

const selectOption = (item) => {
    if (selectedOptions.value.find((e) => e.id == item.id)) {
        return
    }

    if (!props.isMultiple) {
        if (selectedOptions.value.length == 1) {
            selectedOptions.value.splice(0, 1)
        }
        selectedOptions.value.push(item)
        return
    }

    selectedOptions.value.push(item)
}

const removeOption = (key) => {
    selectedOptions.value.splice(key, 1)
}

const openOption = () => {
    if (props.disabled) {
        return
    }
    showOptions.value = !showOptions.value
}

const search = (loading, query) => {
    if (!props.fetch) {
        return
    }
    isLoading.value = true
    axios.post(`${props.fetch}`, { filters: filters.value })
        .then((res) => {
            isLoading.value = false
            list.value = res.data.data
        })
        .catch((err) => {
            console.error(err)
        })
}

const checkIfExists = (id) => {
    return !!selectedOptions.value.find(e => e.id == id)
}

const selectIds = () => {
    if (!props.isMultiple) {
        return selectedOptions.value.length ? selectedOptions.value[0].id : null
    }
    return selectedOptions.value.reduce((acc, e) => {
        acc.push(e.id)
        return acc
    }, [])
}

document.addEventListener('click', function (event) {
    const parent = document.getElementById('bee-select-' + props.name)
    const div = document.getElementById('bee-select-items-' + props.name)
    const targetElement = event.target
    if (parent && parent.contains(targetElement)) {
        return
    }
    if (div && !div.contains(targetElement)) {
        showOptions.value = false
    }
})

initSelect()
search()

</script>

<style scoped>
.bee-select-options {
    min-height: 2.5em;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.bee-select-option {
    border: 1px solid hsl(0, 0%, 86%);
    margin-right: 5px;
    border-radius: 4px;
    cursor: pointer;
    background-color: whitesmoke;
}

.bee-select-items {
    position: absolute;
    visibility: hidden;
    pointer-events: none;
    width: 100%;
    max-height: 300px;
    overflow: auto;
    background-color: white;
    padding: 10px;
    z-index: 100;
    border: 1px solid hsl(0, 0%, 86%);
    border-radius: 4px;
    color: hsl(0, 0%, 21%);
}

.bee-select-item:hover {
    font-weight: bold;
    cursor: pointer;
}

.show {
    visibility: visible !important;
    pointer-events: auto !important;
}

.hide {
    visibility: hidden !important;
    pointer-events: auto !important;
}

.disabled {
    pointer-events: none;
    background-color: whitesmoke;
}

.text-bold {
    font-weight: bold;
}
</style>
