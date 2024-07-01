<template>
    <div class="column">
        <header class="card-header">
            <p class="card-header-title">
                <span>
                    <small><font-awesome-icon icon="fas fa-hashtag"></font-awesome-icon></small>
                    Descontos
                </span>
            </p>
            <p class="card-header-title" style="flex-grow: 0; ">Ativo?</p>
            <div class="select is-primary my-2">
                <select v-model="form.has_discount">
                    <option :value="true">Sim</option>
                    <option :value="false">Não</option>
                </select>
            </div>
        </header>

        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">Ativar descontos do ERP?</label>
                    <input type="hidden" v-model="form.has_erp_discount" />
                    <div class="select is-fullwidth">
                        <select v-model="form.has_erp_discount" :disabled="!form.has_discount">
                            <option :value="true">Sim</option>
                            <option :value="false">Não</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">Acumular com desconto online?</label>
                    <div class="select is-fullwidth">
                        <select v-model="form.has_cumulative_discounts" :disabled="!form.has_discount">
                            <option :value="false">Quando não existe desconto no ERP </option>
                            <option :value="true">Sempre</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">Mostrar os descontos do ERP?</label>
                    <div class="select is-fullwidth">
                        <select v-model="form.show_erp_discount" :disabled="!form.has_discount">
                            <option :value="true">Sim</option>
                            <option :value="false">Não</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">Ativar desconto online?</label>
                    <div class="select is-fullwidth">
                        <select v-model="form.has_online_discount" :disabled="!form.has_discount">
                            <option :value="true">Sim</option>
                            <option :value="false">Não</option>
                        </select>
                    </div>
                </div>
                <div class="field">
                    <label>Valor do desconto online (%)</label>
                    <input class="input" type="number" v-model="form.discount_value" step="1"
                        :readonly="!form.has_discount" />
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">Ativar desconto para encomendas até X hora?</label>
                    <div class="field has-addons">
                        <div class="control is-fullwidth">
                            <input class="input" type="time" id="appt" min="09:00" max="18:00"
                                v-model="form.has_discount_until_x_hours" :disabled="!form.has_discount" />
                        </div>
                        <div class="control">
                            <a class="button is-default" :class="{ 'disabled': !form.has_discount }"
                                @click.prevent="form.has_discount_until_x_hours = ''"> Limpar </a>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Valor do desconto para encomendas até X hora (%)</label>
                    <input class="input" type="number" v-model="form.discount_until_x_hours_value" step="1"
                        :readonly="!form.has_discount" />
                </div>
            </div>
        </div>

        <input type="hidden" name="online_discounts" :value="JSON.stringify(form)">
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    name: {
        require: false,
        default: 'online_discounts'
    },
    modelValue: {
        require: false,
        default: 0
    }
})

const sample = {
    has_discount: false,
    has_erp_discount: false,
    show_erp_discount: false,
    has_online_discount: false,
    has_cumulative_discounts: false,
    discount_value: 0,
    has_discount_until_x_hours: '',
    discount_until_x_hours_value: 0,
}

const form = ref(props.modelValue[props.name] ?? sample)
</script>

<style lang="sass" scoped>
.disabled
    pointer-events: none
    background: whitesmoke

.card-header
    background-color: transparent
    -webkit-box-align: stretch
    align-items: stretch
    box-shadow: none
    margin-bottom: 15px
    display: -webkit-box
    display: flex
    border-bottom: 2px solid #dbdbdb

.card-header-title
    -webkit-box-align: center
    align-items: center
    color: #363636
    display: -webkit-box
    display: flex
    -webkit-box-flex: 1
    flex-grow: 1
    font-weight: 700
    padding: 5px
</style>
