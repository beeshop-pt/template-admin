<template>
  <div class="modal" :class="{ 'is-active': showResources }">
    <div class="modal-background" @click.prevent="closeResources()"></div>
    <div class="modal-card" style="width: 1240px;">
      <header class="modal-card-head">
        <p class="modal-card-title">Recursos</p>
        <button class="delete" aria-label="close" @click.prevent="closeResources()"></button>
      </header>
      <section class="modal-card-body">
        <div class="box bordered">
          <div class="columns">
            <div class="column">
              <dropzone name="modal-dropzone" :url="props.endpoint"></dropzone>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <resources v-if="showResources" v-model="selected"></resources>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot justify-content-end">
        <button id="resource-insert" class="button is-primary" :disabled="!selected" @click.prevent="insert()"
          v-if="showBtnInsert">
          Inserir
        </button>
        <button id="resource-close" class="button" @click.prevent="closeResources()">
          Fechar
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from 'vue'
const props = defineProps({
  endpoint: {
    required: true,
  },
})

const emitter = inject("emitter")
const showResources = ref(false)
const selected = ref(null)
const element = ref("")
const showBtnInsert = ref(true)

emitter.on("resources:open", (params, showBtnInsert = true) =>
  openResources(params, showBtnInsert)
);

// emitter.on("resources:close", closeResources);

const openResources = (params, flag) => {
  showBtnInsert.value = flag;
  showResources.value = true;
  element.value = params;
}

const closeResources = (params) => {
  showResources.value = false;
}


const insert = () => {
  emitter.emit(
    element.value.event ? element.value.event : "resources:images:insert",
    { params: selected.value, key: element.value }
  )
  showResources.value = false;
  selected.value = "";
  element.value = "";
}
</script>