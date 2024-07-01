<template>
    <div
        style="overflow-y:scroll;height: 600px !important; width: 100% !important; position: relative; margin-bottom: .5rem;">
        <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
                <tr style="position: sticky; top: 0px; background-color: white; z-index: 10;">
                    <th style="width: 5%;"></th>
                    <th>Descrição</th>
                    <th>Link</th>
                    <th>Ativo</th>
                    <th style="width: 5%"></th>
                    <th style="width: 5%"></th>
                </tr>
            </thead>
            <draggable tag="tbody" :list="props.modelValue[props.name]" handle=".handle" v-bind="dragOptions"
                itemKey="id">
                <template #item="{ element, index }">
                    <tr>
                        <td class="handle">
                            <button class="button" type="button">
                                <font-awesome-icon icon="fa fa-align-justify"></font-awesome-icon>
                            </button>
                        </td>
                        <td>
                            <div class="field">
                                <input class="input" type="text" v-model="element.name">
                            </div>
                            <div class="field" v-if="element.editing">
                                <label class="label">Notas</label>
                                <input class="input" type="text" v-model="element.notes">
                            </div>
                        </td>
                        <td>
                            <div class="field is-grouped">
                                <input-link name="link" v-model="props.modelValue[props.name][index]"
                                    @new-resource="(res) => handleNewResource(res, element)"></input-link>
                            </div>
                            <div class="field" v-if="element.editing">
                                <label class="label">Tipo</label>
                                <input-select v-bind="{
                                    'fetch': '/admin/resource-type/fetch', 'isMultiple': false, 'fields': ['code', 'description'], 'searchField': 'description',
                                }" v-model="props.modelValue[props.name][index]"></input-select>
                            </div>
                        </td>
                        <td style="vertical-align:top!important;">
                            <div class="select is-fullwidth">
                                <select v-model="element.is_active">
                                    <option value="1">Sim</option>
                                    <option value="0">Não</option>
                                </select>
                            </div>
                        </td>
                        <td>
                            <button class="button ml-2" type="button" @click="() => element.editing = !element.editing">
                                <font-awesome-icon v-if="element.editing" :icon="['fas', 'chevron-up']" />
                                <font-awesome-icon v-else :icon="['fas', 'chevron-down']" />
                            </button>
                        </td>
                        <td>
                            <button type="button" class="button" @click="removeExtra(index)">
                                <font-awesome-icon :icon="['fas', 'fa-trash']" />
                            </button>
                        </td>

                    </tr>
                </template>
            </draggable>
            <tfoot>
                <tr style="position: sticky; bottom: 0px; background-color: white; z-index: 10;">
                    <td colspan="3">
                        <button type="button" class="button" @click="addExtra()">
                            <font-awesome-icon icon="fa-plus" />
                        </button>
                    </td>
                    <td colspan="3">
                    </td>
                </tr>
            </tfoot>
        </table>

        <input type="hidden" :name="props.name" :value="JSON.stringify(props.modelValue[props.name])">
    </div>
</template>

<script setup>
import swal from 'sweetalert2'
import { computed } from 'vue'
import draggable from 'vuedraggable'

const props = defineProps({
    modelValue: Object,
    name: {
        required: false,
        default: 'extras'
    },
})


const addExtra = () => {
    if (!Array.isArray(props.modelValue[props.name])) {
        props.modelValue[props.name] = []
    }

    props.modelValue[props.name].push({
        name: '',
        link: '',
        notes: '',
        resource: null,
        is_active: "0"
    })
}

const removeExtra = (key) => {
    swal.fire({
        title: 'Deseja eliminar?',
        text: "O registo selecionado será removido permanentemente.",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Não, cancelar.',
        confirmButtonColor: '#2d72d9',
        cancelButtonColor: '#E53A40',
        confirmButtonText: 'Sim, eliminar!'
    }).then((result) => {
        if (['cancel', 'backdrop'].includes(result.dismiss)) {
            return
        }

        props.modelValue[props.name].splice(key, 1)
    })
}

const handleNewResource = (res, element) => {
    element.resource_type = res.resource_type
}

const dragOptions = computed(() => {
    return {
        animation: 200,
        group: "child",
        disabled: false,
        ghostClass: "ghost-child",
    }
})
</script>
