<template>
    <div class="box bordered border-primary">
        <div class="chart-content">
            <canvas ref="chartCanvas" id="barChart"></canvas>
        </div>
        <div class="text-right mt-3">
            <a href="#" class="button is-small" @click.prevent="reset">
                <font-awesome-icon icon="fas fa-search-minus" class="mr-2"></font-awesome-icon>
                ZOOM PADRÃO
            </a>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import Chart from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import { generateRGB, transparentize } from "@/components/dashboard/utils";

Chart.register(zoomPlugin);

const { title, route } = defineProps({
    title: {
        required: false,
        default: "Gráfico"
    },
    route: {
        required: true
    }
})

const element = ref(null)
const config = ref({
    type: "bar",
    data: {
        labels: [],
        datasets: [],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 20,
            },
        },
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: title,
            },
            zoom: {
                limits: {
                    y: { min: 0, minRange: 50 },
                },
                pan: {
                    enabled: true,
                    mode: "xy",
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: "xy",
                    onZoomComplete({ chart }) {
                        chart.update("none");
                    },
                },
            },
        },
    },
})

onMounted(() => {
    element.value = document.getElementById('barChart')
})

const displayGraph = () => {
    element.value = new Chart(element.value, config.value);
}

const reset = () => {
    element.value.resetZoom()
}

const fetch = async () => {
    const response = await axios.get(route);

    if (response.status !== 200) {
        return false;
    }

    config.value.data.labels = Object.values(response.data.labels);

    config.value.options.scales.y.suggestedMax =
        response.data.suggestedMax + 15;

    Object.keys(response.data.datasets).forEach((idKey) => {
        let color = generateRGB();
        config.value.data.datasets.push({
            label: idKey,
            data: response.data.datasets[idKey],
            borderColor: color,
            backgroundColor: transparentize(color, 0.5),
        });
    });

    displayGraph()
}

fetch()
</script>

<style>
.chart-content {
    display: flex;
    width: 100%;
    height: 300px;
    flex: 0 0 auto;
    position: relative;
}
</style>
