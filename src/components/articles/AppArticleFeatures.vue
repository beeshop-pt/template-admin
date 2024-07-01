<template>
    <div>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th>Valor Por Defeito</th>
                    <th>Valor</th>
                    <th>Ativar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="features.length == 0">
                    <td colspan="4">Sem registos!</td>
                </tr>

                <tr v-else v-for="c in features" :key="c.id">
                    <td>
                        <input class="input" type="text" v-model="c.description" readonly>
                    </td>
                    <td>
                        <input class="input" type="text" v-model="c.default_value" readonly>
                    </td>
                    <td>
                        <input class="input" type="text" v-model="c.value" />
                    </td>
                    <td>
                        <div class="select is-fullwidth">
                            <select v-model="c.is_active">
                                <option :value="1">Sim</option>
                                <option :value="0">Não</option>
                            </select>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <input type="hidden" name="features" :value="JSON.stringify(getFeatures)">
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
    modelValue: Object,
    name: {
        required: false,
        default: 'features'
    },
})

const features = ref([])

axios.post('/admin/store/features/fetch').then((res) => {
    res.data.data.forEach((item) => {
        let temp = props.modelValue[props.name] ? props.modelValue[props.name].find((x) => x.id == item.id) : null

        if (temp) {
            item.value = temp.pivot.value
            item.is_active = temp.pivot.is_active
        } else {
            item.is_active = 0
        }

        features.value.push(item)
    })
})

const getFeatures = computed(() => {
    let res = {}

    props.modelValue[props.name].forEach((item) => {
        res[item.id] = { value: item.value, is_active: item.is_active }
    })

    return res
})

</script>
