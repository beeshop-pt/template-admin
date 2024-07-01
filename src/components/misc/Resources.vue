<template>
    <div class="resources__content">
        <div class="columns">
            <div class="column">
                <div class="field">
                    <div class="control is-expanded">
                        <label class="label">Procurar:</label>
                        <input class="input" placeholder="Pesquisar..." @input="search" v-model="searchInput" />
                    </div>
                </div>
            </div>
            <div class="column is-4">
                <div class="field">
                    <label class="label">Tipo de Recurso:</label>
                    <div class="select is-fullwidth">
                        <select @change="searchResourceType()" v-model="resourceType">
                            <option value="">Tudo</option>
                            <option v-for="(category, index) in resourceTypes" :key="index" :value="category.id">
                                {{ category.description }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <template v-if="!isLoading">
            <div class="columns is-multiline">
                <div class="column is-one-fifth" v-for="(item, key) in records.data" :key="item.id">
                    <div :id="'resource-item-' + key" class="resources__content--box"
                        :class="{ 'is-selected': item.id == selected.id }" @click="selectItem(item)">
                        <template v-if="!item.is_editing">
                            <div v-if="item.is_editing" class="resources__content--img has-text-centered">
                                <img :src="item.route" :alt="item.title" @error="elImageError" />
                            </div>
                            <div class="resources__content--img has-text-centered">
                                <img :id="'resource-' + key" :src="item.route" :alt="item.title" />
                            </div>

                            <p class="resources__content--title">
                                <span class="resources__content--limit-chars">
                                    {{ item.title }}
                                </span>
                            </p>

                            <p class="control resources__content--button">
                                <a class="button is-primary is-small" v-if="item.is_editing">
                                    <span v-if="selected.route === item.route">Selecionado</span>
                                    <span v-else>Selecionar</span>
                                </a>
                                <a @click.prevnt="copy(item.route)" class="button is-primary is-small">
                                    Copiar
                                </a>
                                <a @click.prevent="deleteRecord(item.id)" class="button remove is-small is-danger">
                                    <font-awesome-icon icon="fa fa-times"></font-awesome-icon>
                                </a>
                                <a @click.prevent="() => item.is_editing = !item.is_editing"
                                    class="button remove is-small is-info">
                                    <font-awesome-icon icon="fa fa-pencil-alt"></font-awesome-icon>
                                </a>
                            </p>
                        </template>

                        <template v-else>
                            <p class="control resources__content--button">
                                <a @click.prevent="() => item.is_editing = !item.is_editing"
                                    class="button is-small is-danger">
                                    <font-awesome-icon icon="fa fa-times"></font-awesome-icon>
                                </a>
                                <a @click.prevent="updateRecord(item)" class="button is-small is-success">
                                    <font-awesome-icon icon="fa fa-save"></font-awesome-icon>
                                </a>
                            </p>
                            <div class="field">
                                <label>Nome:</label>
                                <input class="input is-small" type="text" v-model="item.title">
                            </div>
                            <div class="field">
                                <label>Alt Text:</label>
                                <input class="input is-small" type="text" v-model="item.alt_text">
                            </div>
                            <div class="field">
                                <label>Categoria:</label>
                                <div class="select is-small is-fullwidth">
                                    <select v-model="item.resource_type_id" @change="() => item.changed = true">
                                        <option value="">Sem Categoria</option>
                                        <template v-for="category in resourceTypes" :key="category.id">
                                            <option v-if="category.id == item.resource_type_id" :value="category.id"
                                                :selected="true">
                                                {{ category.description }}
                                            </option>
                                            <option v-else :value="category.id">
                                                {{ category.description }}
                                            </option>
                                        </template>
                                    </select>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="columns">
                <datatable-pagination :limit="3" :data="records" @pagination-change-page="paginationChanged">
                </datatable-pagination>
            </div>
            <div class="columns is-vcentered mt-2">
                <div class="column">
                    <small>
                        A mostrar {{ records.to ?? records.total }} de {{ records.total }} registos no total ({{
                            records.per_page }} por
                        página).
                    </small>
                </div>
            </div>
        </template>
        <div v-else class="mt-5">
            <app-loader></app-loader>
        </div>
    </div>
</template>

<script setup>
import _ from "lodash"
import swal from 'sweetalert2'
import useClipboard from "vue-clipboard3"
import { reactive, toRef, ref, watch, inject } from 'vue'

const emitter = inject("emitter")
const { toClipboard } = useClipboard()
const emit = defineEmits(['update:modelValue'])


const props = defineProps({
    records: {
        required: false,
        default: {}
    }
})

const selected = reactive({ id: '' })


const isLoading = ref(false)
const hasSelected = ref(0)
const searchInput = ref('')
const resourceType = ref('')
const resourceTypes = ref([])
const records = toRef(props.records)

const filter = reactive({
    page: 1,
    limit: records.value.per_page ?? 10,
    sortOrder: 'desc',
    sortBy: 'id',
    column: 'id',
    operator: 'contains',
    value: ''
})

const filters = ref([filter]);
const getQueryParameters = () => {
    let string = ''
    filters.value.forEach((e, index) => {
        string += index != 0 ? '&' : ''
        string += 'filters[' + index + '][column]=' + e.column + '&'
        string += 'filters[' + index + '][operator]=' + e.operator + '&'
        string += 'filters[' + index + '][value]=' + e.value
    })
    string += '&page=' + filter.page;
    string += '&limit=' + filter.limit;
    string += '&sortOrder=' + filter.sortOrder;
    string += '&sortBy=' + filter.sortBy;
    return string;
};

const selectItem = (item) => {
    selected.id = item.id
    emit('update:modelValue', item)
}

const paginationChanged = (page) => {
    filter.page = page
}

const getRecords = _.debounce(async () => {
    isLoading.value = true
    Object.assign(selected, { id: '' })
    let res = await axios.post(`/admin/resources/fetch?${getQueryParameters()}`)
    records.value = res.data
    isLoading.value = false
}, 500);

const updateRecord = async (item) => {
    try {
        item.is_editing = !item.is_editing

        if (!item.changed) {
            await axios.put(`/admin/resources/${item.id}`, item)
            window.notyf.success("Recurso atualizado!")
            getRecords()
            return
        }

        let filter = 'filters[0][column]=link&filters[0][operator]=equals&filters[0][value]=' + item.route
        res = []
        let res = await axios.post("/admin/extras/fetch?" + filter)

        if (!res.data.data.length) {
            await axios.put(`/admin/resources/${item.id}`, { ...item, update_extras: false })
            window.notyf.success("Recurso atualizado!")
            getRecords()
            return
        }

        swal.fire({
            title: "Existem extras relacionados!",
            text: "Pretende atualizar o tipo dos extras relacionados? ",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Não",
            confirmButtonColor: "#2d72d9",
            cancelButtonColor: "#E53A40",
            confirmButtonText: "Sim!"
        }).then(async (result) => {
            if (["cancel", "backdrop"].includes(result.dismiss)) {
                await axios.put(`/admin/resources/${item.id}`, { ...item, update_extras: false })
                window.notyf.success("Recurso atualizado!")
                getRecords()
                return
            }

            await axios.put(`/admin/resources/${item.id}`, { ...item, update_extras: true })
            window.notyf.success("Recurso atualizado!")
            getRecords()
            return

        })

    } catch (e) {
        window.notyf.error("Erro ao atualizar recurso")
    }
}

const deleteRecord = (id) => {
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

        axios.delete(`/admin/resources/${id}`).then((res) => {
            window.notyf.success("Registo eliminado")
            getRecords()
        }).catch((err) => {
            window.notyf.error("Erro a eliminar registo")
        })
    })
}

watch(records.value, () => {
    let res = records.value.data.reduce((acc, e) => {
        acc += e.checked ? 1 : 0
        return acc
    }, 0)

    hasSelected.value = res
})

const getResourceTypes = () => {
    axios.post("/admin/resource-type/fetch").then((res) => {
        resourceTypes.value = res.data.data
    })
}

const searchResourceType = () => {
    filter.page = 1
    if (!resourceType.value) {
        filter.operator = "contains"
        filter.column = "title"
        filter.value = ""
        return
    }
    filter.operator = resourceType.value ? "equals" : null
    filter.column = resourceType.value ? "resource_type_id" : null
    filter.value = resourceType.value
}

const search = () => {
    filter.page = 1
    filter.operator = "contains"
    filter.column = "title"
    filter.value = searchInput.value
}

const copy = async (item) => {
    try {
        await toClipboard(item)
        window.notyf.success(
            "URL copiado para área de transferência!"
        )
    } catch (e) {
        window.notyf.error(e)
    }
}

getRecords()
getResourceTypes()

watch(filter, () => {
    getRecords()
})

emitter.on("list.resources", () => getRecords())
</script>

<style lang="scss" scoped>
.resources__content {
    &--button {
        padding: 10px 0;
        justify-content: center;
        display: flex;
        flex-wrap: wrap;
    }

    & a {
        margin: 5px;
        flex-grow: 1;
        align-items: center;
    }

    &--box {
        flex-grow: 1;
        margin-bottom: auto;
        align-items: flex-end;
        padding: 10px;

        &.is-selected {
            background: #deebff;
        }
    }

    &--img {
        height: 120px;
        overflow: hidden;
    }

    &--title {
        font-size: 0.69em;
        background: #e7f0f9;
        color: #276cda;
        margin: auto;
        text-align: center;
        padding: 2px;
    }

    &--limit-chars {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        direction: ltr;
        display: block;
    }
}

.remove i {
    font-size: 13px;
}

.bg-green {
    color: #fff;
    background-color: #23d160 !important;
}

.bg-red {
    background-color: #ff3860 !important;
    color: #fff;
}

@media (max-width: 800px) {
    .resources__content--img {
        height: 100%;
    }
}
</style>
