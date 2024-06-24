<template>
    <div v-if="hasAnyInvalidField" class="columns">
        <!-- <div class="column is-12">
            <div class="notification is-light">
                <div>
                    <p class="has-text-weight-bold is-size-5 mb-3">
                        <font-awesome-icon icon="circle-exclamation" size="md" class="mr-1" />
                        São necessários alguns passos para configurar o BeeShop
                    </p>
                    <p>
                        Antes de utilizar todas as funcionalidades do BeeShop, é necessário proceder à configuração de
                        alguns parâmetros.
                    </p>
                </div>

                <div v-if="!isLoading" class="mt-5">
                    <ul>
                        <li v-for="(step, index) in requiredSteps" :key="index"
                            :class="{ 'mb-2': !(index == requiredSteps.length - 1) }">
                            <font-awesome-icon :icon="step.is_valid ? 'square-check' : 'square-minus'" size="md"
                                class="mr-2" />
                            <span :class="{ 'step-is-valid': step.is_valid, 'step-is-invalid': !step.is_valid }">
                                {{ step.message }}
                            </span>
                        </li>
                    </ul>

                    <progress class="progress is-small mt-5" :value="progress" max="100" :title="`${progress}%`">
                        {{ progress }}%
                    </progress>
                </div>

                <app-loader v-else class-bind="my-6" />
            </div>
        </div> -->
    </div>
</template>

<script setup>
// import { ref, computed } from 'vue';

// const isLoading = ref(false);
// const requiredSteps = ref([]);

// const progress = computed(() => {
//     const totalSteps = requiredSteps.value.length;
//     const validSteps = requiredSteps.value.filter((x) => x.is_valid).length;

//     return (validSteps / totalSteps) * 100;
// });

// const hasAnyInvalidField = computed(() => requiredSteps.value.some((x) => !x.is_valid));

// const fetch = () => {
//     isLoading.value = true;

//     axios.get('/admin/setup')
//         .then(response => {
//             requiredSteps.value = response.data;
//         })
//         .catch((err) => {
//             console.error(err);
//         })
//         .finally(() => {
//             isLoading.value = false;
//         });
// };

// fetch();
</script>

<style scoped>
.changelog {
    display: flex;
    color: #4a4a4a;
    font-weight: bold;
    align-items: center;
    align-items: baseline;
    justify-content: space-around;
}

.step-is-valid {
    text-decoration: line-through;
    font-style: italic;
}

.step-is-invalid {
    font-weight: bold;
}
</style>
