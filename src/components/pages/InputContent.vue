<template>
    <Draggable ref="tree" v-model="selectedContents" class="mtl-tree">
        <template #default="{ node, stat }">
            <OpenIcon v-if="stat.children.length" :open="stat.open" class="mtl-mr"
                @click.native="stat.open = !stat.open" />
            <input class="mtl-checkbox mtl-mr" type="checkbox" v-model="stat.checked" />
            <span class="mtl-ml">{{ node.title }}</span>
        </template>
    </Draggable>
    <button @click="() => show = !show" type="button"> show</button>
    <!-- <div class="columns is-centered">
        <div class="column">
            <h1 class="subtitle">Componentes</h1>

            <button @click="() => show = !show">show</button>
            <div class="mt-3">
                <small>Clique nos conteúdos para editar</small><br>
            </div>
        </div>

        <div class="column is-6" v-if="selectedContent" style="border-left: 1px solid lightgray;">
            <h1 class="subtitle">Informação</h1>
            <label for="content-title">Titulo</label>
            <input id="content-title" class="input" type="text" v-model="selectedContent.title">
            <label for="content-component">Component</label>
            <input id="content-component" class="input" type="text" v-model="selectedContent.component">
            <small>Arraste os componentes para o conteúdo</small>
        </div>
        <input type="hidden" name="contents" :value="mapDom()" />
    </div> -->
</template>

<script setup>
import { ref, onMounted } from "vue"
import { BaseTree, Draggable, pro, OpenIcon } from '@he-tree/vue'

import swal from 'sweetalert2'

const props = defineProps({
    name: {
        required: false,
        default: null
    },
    modelValue: Object,
})

const show = ref(false)
const tree = ref(null)
const selectedContent = ref(null)
const selectedContents = ref([{ title: 'teste' }, { title: 'teste' }, { title: 'teste' }, { title: 'teste' }, { title: 'teste' }, { title: 'teste' }])


const mapDom = () => {
    return JSON.stringify(selectedContents.value);
}

const removeContent = (key) => {
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

        selectedContents.value.splice(key, 1)
    })
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
