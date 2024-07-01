<template>
    <div class="columns is-centered">
        <div class="column">
            <h1 class="subtitle">Componentes</h1>
            <Tree v-model="selectedContents">
                <template v-slot="{ element, parent, stats }">
                    <div style="display: flex;justify-content: space-between;width:100%"
                        @click="() => selectedContent = element">
                        <div style="display: flex;align-items: center;">
                            <input type="checkbox" :checked="element.is_selected" style="width: 14px; height: 14px" />
                            <p>{{ element.title }}</p>
                        </div>
                        <button v-if="element.children && element.children.length" type="button"
                            @click="orderTree(element.children, stats)">
                            <font-awesome-icon v-if="stats.sortOrder == 'asc'" icon="fas fa-sort-amount-up" />
                            <font-awesome-icon v-else icon="fas fa-sort-amount-down" />
                        </button>
                    </div>
                </template>
            </Tree>

            <div class="mt-3">
                <small>Clique nos conteúdos para editar</small><br>
            </div>
        </div>

        <div class="column is-6" style="border-left: 1px solid lightgray;">
            <div v-if="selectedContent">
                <h1 class="subtitle">Informação</h1>
                <label for="content-title">Titulo</label>
                <input id="content-title" class="input" type="text" v-model="selectedContent.title">
                <label for="content-component">Component</label>
                <input id="content-component" class="input" type="text" v-model="selectedContent.component">
                <small>Arraste os componentes para o conteúdo</small>
            </div>
        </div>
        <input type="hidden" name="contents" :value="mapDom()" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"

import swal from 'sweetalert2'
const props = defineProps({
    name: {
        required: false,
        default: null
    },
    modelValue: Object,
})

const selectedContent = ref(null)
const selectedContents = ref(props.modelValue[props.name] ?? [])


const mapDom = () => {
    return JSON.stringify(selectedContents.value)
}

const orderTree = (items, stat) => {
    items.sort((a, b) => {
        let catA = a.title;
        let catB = b.title;
        return stat.sortOrder == "asc" ? catB.localeCompare(catA) : catA.localeCompare(catB);
    })

    stat.sortOrder = stat.sortOrder == "asc" ? "desc" : "asc"
}

</script>

<style scoped>

.section-item {
    text-align: center !important;
    vertical-align: middle !important;
    cursor: pointer;
    border: 1px dashed gray !important;
}

.section-item:hover {
    background-color: #4e5e7d;
    color: white;
}

.child-item {
    cursor: pointer;
    border: 1px dashed gray;
    padding: 10px;
}

.child-item p {
    padding: 10px;
}

.child-item p:hover {
    background-color: #4e5e7d;
    color: white !important;
}

</style>
