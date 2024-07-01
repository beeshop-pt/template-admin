<template>
    <div class="columns">
        <div class="column">
            <div v-if="!list.length && !isLoading">Sem Resultados...</div>

            <app-loader v-if="isLoading"></app-loader>

            <table v-else class="table is-fullwidth is-striped is-hoverable">
                <thead>
                    <tr>
                        <th style="width: 5%;"></th>
                        <th style="width: 40%;">Tipo de Dimensão</th>
                        <th style="width: 40%;">Valor</th>
                        <th style="width: 10%;"></th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <td></td>
                        <td>
                            <input-select v-bind="{
                                'fetch': '/admin/store/dimension-types/fetch',
                                'fields': ['code', 'description'],
                                'searchField': 'description',
                                'isMultiple': false
                            }" name="dimension_type" v-model="newRecord"></input-select>
                        </td>
                        <td>
                            <input-select v-bind="{
                                'fetch': '/admin/store/dimensions/fetch',
                                'fields': ['code', 'value'],
                                'searchField': 'code',
                                'isMultiple': false,
                                'filters': [{
                                    'column': 'dimension_type_id',
                                    'operator': 'equals',
                                    'value': newRecord.dimension_type?.id ?? null
                                }]
                            }" v-model="newRecord" name="dimension"></input-select>
                        </td>
                        <td class="has-text-right">
                            <button type="button" class="button is-primary" @click.prevent="addRecord">
                                <span class="icon">
                                    <font-awesome-icon icon="fas fa-plus"></font-awesome-icon>
                                </span>
                                <span>Adicionar</span>
                            </button>
                        </td>
                    </tr>
                </tfoot>
                <draggable tag="tbody" :list="list" handle=".handle" item-key="name" v-bind="dragOptions">
                    <template #item="{ element, index }">
                        <tr class="handle">
                            <td>
                                <font-awesome-icon icon="fas fa-arrows-alt-v" class="mr-2"></font-awesome-icon>
                            </td>
                            <td>{{ element.dimension_type?.description }}</td>
                            <td>{{ element.dimension?.value }}</td>

                            <td class="has-text-right">
                                <button class="button" type="button" @click.prevent="deleteRecord(element.id, index)">
                                    <span class="icon">
                                        <font-awesome-icon icon="fas fa-trash"></font-awesome-icon>
                                    </span>
                                    <span>Remover</span>
                                </button>
                            </td>
                        </tr>
                    </template>
                </draggable>
            </table>

            <small>
                <font-awesome-icon icon="sort" class="mr-2" />
                As dimensões podem ser reorganizadas (<span class="fst-italic">drag-and-drop</span>) para qualquer
                ordem.
            </small>
        </div>
    </div>
</template>

<script setup>
import swal from "sweetalert2"
import draggable from "vuedraggable"
import { ref, computed, reactive } from 'vue'

const props = defineProps({
    modelValue: {
        required: false,
        default: {}
    }
})

const newRecord = reactive({
    article_id: props.modelValue.id,
    dimension_type: null,
    dimension: null
})

const list = ref([])
const isLoading = ref(false)

const deleteRecord = (id, index) => {
    swal.fire({
        title: 'Deseja eliminar?',
        text: "O registo selecionado será removido permanentemente.",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Não, cancelar.',
        confirmButtonColor: '#2d72d9',
        cancelButtonColor: '#E53A40',
        confirmButtonText: 'Sim, eliminar!'
    }).then(function (result) {
        if (["cancel", "backdrop"].includes(result.dismiss)) {
            return
        }

        axios.delete(`/admin/store/article-dimensions/${id}`)
            .then((res) => {
                window.notyf.success('Registo eliminado com sucesso!')
                fetch()
            })
            .catch((err) => {
                window.notyf.error('Ocorreu um erro ao eliminar o registo!')
            })
    })
}

const addRecord = () => {
    axios.post('/admin/store/article-dimensions', {
        article_id: newRecord.article_id,
        dimension_id: newRecord.dimension.id,
        dimension_type_id: newRecord.dimension_type.id
    })
        .then((res) => {
            window.notyf.success(res.data.message)

            newRecord.dimension_type = null
            newRecord.dimension = null

            fetch()
        })
        .catch((err) => {
            window.notyf.error(err.response.data.message)
        })
}

const fetch = () => {
    isLoading.value = true

    let filters = [
        {
            column: "article_id",
            operator: "equals",
            value: props.modelValue.id
        }
    ]

    let string = ''
    filters.forEach((e, index) => {
        string += index != 0 ? '&' : ''
        string += 'filters[' + index + '][column]=' + e.column + '&'
        string += 'filters[' + index + '][operator]=' + e.operator + '&'
        string += 'filters[' + index + '][value]=' + e.value
    })

    axios.post(`/admin/store/article-dimensions/fetch?${string}`)
        .then((res) => {
            isLoading.value = false
            list.value = res.data.data
        })
        .catch((err) => {
            isLoading.value = false
            window.notyf.error('Ocorreu um erro ao carregar as dimensões!')
        })
}

const dragOptions = computed(() => {
    return {
        animation: 200,
        group: "child",
        disabled: false,
        ghostClass: "ghost-child",
    }
})

fetch()
</script>

<style scoped>
td {
    vertical-align: middle;
}
</style>
