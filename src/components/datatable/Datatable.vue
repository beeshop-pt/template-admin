<template>
    <div>
        <div class="field is-grouped is-grouped-multiline">
            <div class="control">
                <div class="select">
                    <select id="datatable-filter-field" @change="search" v-model="activeFilter.column">
                        <option v-for="(item, key) in displayble" :value="key">{{ item.name }}</option>
                    </select>
                </div>
            </div>
            <div class="control">
                <div class="select">
                    <select id="datatable-filter" @change="search" v-model="activeFilter.operator">
                        <optgroup :label="$t('datatable.simple')" label="">
                            <option value="contains">{{ $t('datatable.contains') }}</option>
                            <option value="starts_with">{{ $t('datatable.starts_with') }}</option>
                            <option value="ends_with">{{ $t('datatable.ends_with') }}</option>
                            <option value="equals" v-html="'='"></option>
                            <option value="not_equals" v-html="'!='"></option>
                            <option value="greater_than" v-html="'>'"></option>
                            <option value="less_than" v-html="'<'"></option>
                            <option value="greater_than_or_equal_to" v-html="'>='"></option>
                            <option value="less_than_or_equal_to" v-html="'<='"></option>
                        </optgroup>
                        <optgroup :label="$t('datatable.predifined')">
                            <option value="is_null">{{ $t('datatable.without_translation') }} </option>
                        </optgroup>
                    </select>
                </div>
            </div>
            <div class="control is-expanded">
                <div id="datatable-filter-value" class="dv-header-search mx-1 d-flex">
                    <button v-for="(filter, key) in request.filters.filter((x, i) => i != 0) " type="button"
                        class="button is-info is-light mr-2" @click="removeFilter(key + 1)">
                        {{ displayble[filter.column].name }}:
                        {{ filter.value }}
                    </button>
                    <input id="datatable-filter-input" type="text" class="input" v-model="activeFilter.value"
                        :placeholder="$t('datatable.quick_search')">
                    <button type="button" class="button ml-2"
                        @click="addFilter(activeFilter.column, activeFilter.operator, activeFilter.value)">
                        <font-awesome-icon icon="fas fa-plus"></font-awesome-icon>
                    </button>
                </div>
            </div>
            <a id="new-record" v-if="allow.create && endpoint" class="button is-primary" :href="endpoint + '/create'">
                {{ $t('datatable.new_record') }}
            </a>
        </div>
        <div class="box mt-2 p-0" style="overflow-y: scroll;height:550px">
            <table class="table is-fullwidth">
                <thead>
                    <tr style="font-size:18px;position: sticky; top: 0px; background-color: white; z-index: 10;">
                        <th style="width: 5%;">
                            <div class="d-flex justify-content-between" style="justify-content: space-between;">
                                <div class="b-checkbox is-info is-circular" @click="checkAll()">
                                    <input type="checkbox" name="check-all" id="check-all" v-model="checkBoxAll">
                                    <label for="check-all"></label>
                                </div>
                                <div class="d-flex align-items-center mr-3" @click="sortBy(request.sortBy)"
                                    style="cursor: pointer;">
                                    <font-awesome-icon v-if="request.sortOrder === 'asc'" icon="sort-up" />
                                    <font-awesome-icon v-else icon="sort-down" />
                                </div>
                            </div>
                        </th>
                        <th v-for="( column, key) in displayble">
                            <div class="d-flex justify-content-between" style="justify-content: space-between;">
                                <template v-if="key.split('.').length > 1">
                                    <span class="sortable">
                                        {{ column.name }}
                                    </span>
                                </template>
                                <template v-else>
                                    <span class="sortable" @click="sortBy(key)" style="cursor: pointer;">
                                        {{ column.name }}
                                    </span>
                                </template>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in records.data">
                        <td>
                            <div class="d-flex align-items-center justify-content-start">
                                <div :id="`record-select-${i}`" class="b-checkbox is-info is-circular p-0 mr-5">
                                    <input type="checkbox" :name="'check-' + i" :id="'check-' + i"
                                        v-model="item.checked">
                                    <label class="p-0" :for="'check-' + i"></label>
                                </div>

                                <template v-if="allow.update">
                                    <a class="button is-primary is-small mr-2">
                                        <font-awesome-icon icon="fa-edit" />
                                    </a>
                                </template>

                                <template v-if="allow.link">
                                    <a :id="`record-update-${i}`" class="button is-primary is-small mr-2"
                                        :href="`${endpoint}/${item.id}/edit`">
                                        <font-awesome-icon icon="fa-external-link-alt" />
                                    </a>
                                </template>

                                <template v-if="allow.delete">
                                    <a :id="`record-delete-${i}`" class="button is-small mr-2"
                                        @click="deleteRecord(item.id)">
                                        <font-awesome-icon icon="fas fa-trash-alt"></font-awesome-icon>
                                    </a>
                                </template>
                            </div>
                        </td>

                        <template v-for="(column, key) in displayble">
                            <td>
                                <div v-html="getValue(item, key)">
                                </div>
                            </td>
                        </template>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="d-flex flex-nowrap" style="justify-content:space-between">
            <div style="display: flex; align-items: center;">
                <div class="select mr-4">
                    <select class="w-100" @change="bulk()" v-model="bulkOperation">
                        <option disabled value="" selected>{{ $t('datatable.actions') }}</option>
                        <option v-if="getChecked().length > 0" value="export_selected">{{
                            $t('datatable.export_selected') }}
                        </option>
                        <option value="export_all">{{ $t('datatable.export_all') }}</option>
                    </select>
                </div>

                <input type="text" v-model="request.limit" class="input mx-3" @input="getRecords()" />
                <p style="white-space: nowrap"> {{ $t('datatable.out_of') }} {{ records.meta?.total }} {{
                    $t('datatable.lines') }} </p>
            </div>
            <div class="d-flex justify-content-end">
                <datatable-pagination :limit="3" :data="records" @pagination-change-page="paginationChanged">
                </datatable-pagination>
            </div>
        </div>
    </div>
</template>

<script setup>
import _ from "lodash";
import swal from "sweetalert2";
import { reactive, toRef, ref, watch } from 'vue'

const { allow, endpoint, displayble } = defineProps({
    allow: {
        required: false,
        default: {}
    },
    endpoint: {
        required: false,
        default: ''
    },
    displayble: {
        required: false,
        default: []
    },
})
const records = reactive({
    data: []
})

const activeFilter = reactive({
    column: 'id',
    operator: 'contains',
    value: ''
})

const request = reactive({
    page: 1,
    limit: records.per_page ?? 20,
    sortOrder: 'desc',
    sortBy: 'id',
    filters: [activeFilter],
})


const removeFilter = (key) => {
    request.filters.splice(key, 1)
    getRecords()
}

const addFilter = (column, operator, value) => {
    if (!value) {
        return
    }
    request.page = 1;
    request.filters.push({
        column: column,
        operator: operator,
        value: value,
    });
    activeFilter.value = ''
}

const paginationChanged = (page) => {
    request.page = page
    getRecords()
}

// Converts a boolean property (true/false) to a string value (Sim/Não)
const convertBooleansToStrings = (obj) => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'boolean') {
                obj[key] = obj[key] ? 'Sim' : 'Não';
            }
        }
    }
}

const getRecords = _.debounce(async () => {
    let res = await axios.post(`${endpoint}/fetch`, request);

    res.data.data.forEach((item) => {
        convertBooleansToStrings(item)
    })

    records.data = res.data.data
}, 500);

const sortBy = (column) => {
    if (column.split(".").length > 1) {
        window.notyf.error("Não é possivel ordenar por esse campo!")
        return
    }

    let changeSort = request.sortOrder == 'asc' ? 'desc' : 'asc'
    request.sortOrder = request.sortBy === column ? changeSort : request.sortOrder
    request.sortBy = column
    getRecords()
}

const checkBoxAll = ref(false)
const checkAll = () => {
    records.data.forEach((e) => {
        e.checked = !checkBoxAll.value
    })
}

const bulkOperation = ref('')

const bulk = () => {
    if (bulkOperation.value.startsWith('export_')) {
        swal.fire({
            title: 'Exportar?',
            text: "Esta operação poderá demorar algum tempo.",
            footer: "<small>O resultado será enviado para o seu email.</small>",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Não, cancelar.',
            confirmButtonColor: '#2d72d9',
            cancelButtonColor: '#E53A40',
            confirmButtonText: 'Sim, exportar!'
        }).then(async (result) => {
            if (['cancel', 'backdrop'].includes(result.dismiss)) {
                bulkOperation.value = ''
                return
            }

            try {
                let res = await axios.post(`${endpoint}/export`, { records: getChecked().length == 0 ? 'all' : getChecked() })
                window.notyf.success(res.data.message)
            } catch (err) {
                window.notyf.error(err.response.message)
            }

            bulkOperation.value = ''
        })
    }
}

const deleteRecord = (id) => {
    swal.fire({
        title: 'Deseja eliminar o registo?',
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

        axios.delete(`${endpoint}/${id}`).then((res) => {
            if (Object.keys(res.data).includes('error') && res.data.error) {
                window.notyf.error(res.data.message)
                return
            }
            window.notyf.success("Registo eliminado!")
            getRecords()
        }).catch((err) => {
            window.notyf.error("Erro ao eliminar registo, tente novamente.")
        })
    })
}

const getChecked = () => {
    return records.data.filter((el) => el.checked == true).map((el) => el.id)
}


const getValue = (item, key) => {
    let items = key.split(".")
    let result = item;

    for (let i = 0; i < items.length; i++) {
        const prop = items[i];

        // Check if the current property exists in the current object
        if (result && typeof result === 'object' && prop in result) {
            result = result[prop];
            // Access the nested object using the current property
            if (Array.isArray(result) && i < items.length - 1) {
                result = result.length > 0 ? result[0] : undefined;
            }
        } else {
            // Property not found, return undefined
            return undefined;
        }
    }

    return result;
}

watch(activeFilter, () => {
    getRecords()
})

getRecords()
</script>

<style scoped lang="scss">
.table td,
.table th {
    border: 1px solid hsl(0, 0%, 86%);
    border-width: 0 0 1px;
    padding: 0.2em 0.75em;
    vertical-align: middle;
}
</style>
