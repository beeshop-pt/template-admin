<template>
    <div>

        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th style="width: 10%">Código</th>
                    <th style="width: 10%">Unidade</th>
                    <th>Moeda</th>
                    <th>PVP</th>
                    <th>IVA incluído?</th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <td colspan="5">{{ props.modelValue[props.name].length }} registo(s)</td>
                </tr>
            </tfoot>
            <tbody>
                <tr v-for="price in props.modelValue[props.name]" :key="price.id">
                    <th>
                        <input class="input" v-model="price.code" type="text" readonly />
                    </th>
                    <th>
                        <input class="input" v-model="price.sales_unit" type="text" readonly />
                    </th>
                    <th>
                        <div class="select is-fullwidth">
                            <select name="curency_id" v-model="price.currency.id" disabled>
                                <option v-for="currency in currencies" :key="currency.id" :value="currency.id">
                                    {{ currency.description }}
                                </option>
                            </select>
                        </div>
                    </th>
                    <th>
                        <input class="input" v-model="price.pvp" type="text" readonly />
                    </th>
                    <th>
                        <div class="select is-fullwidth">
                            <select name="includes_vat" v-model="price.includes_vat" disabled>
                                <option :value="true">Sim</option>
                                <option :value="false">Não</option>
                            </select>
                        </div>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
    modelValue: Object,
    name: {
        required: false,
        default: 'prices'
    },
})

const currencies = ref([]);

axios.post("/admin/store/currencies/fetch").then((res) => {
    currencies.value = res.data.data
})
</script>
