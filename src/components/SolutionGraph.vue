<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { Chart, registerables } from "chart.js";
import { useSolverStore } from "../stores/solverStore";

Chart.register(...registerables);

const store = useSolverStore();
const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

const renderChart = () => {
  if (!chartCanvas.value) return;

  // Si ya existe un gráfico, lo destruimos antes de renderizar uno nuevo
  if (chartInstance) {
    chartInstance.destroy();
  }

  const data = {
    labels: store.results.map((r) => r.x.toFixed(2)),
    datasets: [
      {
        label: "Solución Numérica",
        data: store.results.map((r) => r.y),
        borderColor: "blue",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        tension: 0.3,
      },
    ],
  };

  chartInstance = new Chart(chartCanvas.value, {
    type: "line",
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, position: "top" },
      },
      scales: {
        x: { title: { display: true, text: "X" } },
        y: { title: { display: true, text: "Y" } },
      },
    },
  });
};

// Actualiza la gráfica cuando cambien los resultados
watch(() => store.results, renderChart, { deep: true });
onMounted(renderChart);
</script>

<template>
  <div class="mt-6">
    <h3 class="text-xl font-bold text-center">📈 Gráfico de la Solución</h3>
    <div class="w-full h-64">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>
