<template>
    <div>
        <!-- <app-required-steps /> -->

        <div class="columns is-multiline">
            <div class="column is-8">
                <bar-graph v-if="props.sessionBarGraphRoute !== null" title="Sessões de Utilizadores (mensais)"
                    :route="props.sessionBarGraphRoute"></bar-graph>
                <div v-else class="notification is-danger is-light">
                    Ocorreu um erro ao renderizar o gráfico de sessões!
                </div>
            </div>

            <div class="column is-4">
                <div class="box bordered border-primary" style="height: 384px; overflow: auto;">
                    <p class="panel-heading">Últimas Sessões</p>

                    <div class="table-container">
                        <table class="table is-fullwidth is-striped">
                            <thead>
                                <tr>
                                    <th>Data/Hora de Acesso</th>
                                    <th>Utilizador | Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="userSessions.length == 0">
                                    <td colspan="2">Sem registos...</td>
                                </tr>

                                <tr v-for="session in userSessions" :key="session.id">
                                    <td>{{ formatDate(session.created_at) }}</td>
                                    <td>{{ session.name }} | {{ session.email_address }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Counters -->
        <div class="columns is-multiline is-vcentered">
            <div class="column is-3-desktop is-6-tablet" v-for="record in counters" :key="record.label">
                <a :href="record.url">
                    <div class="box">
                        <div class="columns is-vcentered">
                            <div class="column is-3">
                                <font-awesome-icon :icon="record.icon_class" size="3x"></font-awesome-icon>
                            </div>
                            <div class="column">
                                <h1 class="is-size-2 has-text-weight-bold">
                                    {{ record.count }}
                                </h1>
                                <p class="is-size-6 has-text-weight-medium has-text-grey">
                                    {{ record.label }}
                                </p>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { DateTime } from "luxon";

const userSessions = ref([])
const counters = ref({})

const props = defineProps({
    sessionBarGraphRoute: {
        required: false,
        default: null
    },
    statsRoute: {
        required: false,
        default: null

    }
})

const fetchStats = (route) => {
    axios.get(route)
        .then((data) => {
            counters.value = data.data.counters ?? {}
            userSessions.value = data.data.sessions ?? []
        })
        .catch((err) => console.error(err))
}

const formatDate = (value) => {
    return DateTime.fromJSDate(new Date(value)).toFormat('yyyy/MM/dd HH:mm')
}

if (props.statsRoute !== null) {
    fetchStats(props.statsRoute)
}
</script>

<style scoped>
.box i {
    font-size: 3em;
    color: #4e5e7d;
}
</style>
