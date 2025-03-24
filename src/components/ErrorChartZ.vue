<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { Chart, registerables } from "chart.js";
import { useSolverSistemStore } from "@/stores/solverSistemStore";

Chart.register(...registerables);
const store = useSolverSistemStore();
const chartCanvasZ = ref<HTMLCanvasElement | null>(null);
let chartInstanceZ: Chart | null = null;

function calculateError(exact: number, approx: number): number {
  return exact !== 0 ? Math.abs((exact - approx) / exact) * 100 : 0;
}

// Computed para calcular los errores para la variable Z:
const eulerErrorsZ = computed(() => {
  return store.generalSolution.map((pt, i) => {
    const approx = store.eulerResults[i]?.z ?? null;
    return approx === null ? null : calculateError(pt.z, approx);
  });
});

const eulerMejoradoErrorsZ = computed(() => {
  return store.generalSolution.map((pt, i) => {
    const approx = store.eulerMejoradoResults[i]?.z ?? null;
    return approx === null ? null : calculateError(pt.z, approx);
  });
});

const rungeKuttaErrorsZ = computed(() => {
  return store.generalSolution.map((pt, i) => {
    const approx = store.rungeKuttaResults[i]?.z ?? null;
    return approx === null ? null : calculateError(pt.z, approx);
  });
});

const renderChartZ = () => {
  if (!chartCanvasZ.value) return;
  if (chartInstanceZ) chartInstanceZ.destroy();

  const labels = store.generalSolution.map(pt => pt.x.toFixed(2));
  const data = {
    labels,
    datasets: [
      {
        label: "Error Euler (Z)",
        data: eulerErrorsZ.value,
        borderColor: "purple",
        backgroundColor: "rgba(128, 0, 128, 0.2)",
        tension: 0.3,
      },
      {
        label: "Error Euler Mejorado (Z)",
        data: eulerMejoradoErrorsZ.value,
        borderColor: "orange",
        backgroundColor: "rgba(255, 165, 0, 0.2)",
        tension: 0.3,
      },
      {
        label: "Error Runge-Kutta (Z)",
        data: rungeKuttaErrorsZ.value,
        borderColor: "cyan",
        backgroundColor: "rgba(0, 255, 255, 0.2)",
        tension: 0.3,
      },
    ],
  };

  chartInstanceZ = new Chart(chartCanvasZ.value, {
    type: "line",
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: true, position: "top" } },
      scales: {
        x: { title: { display: true, text: "X" } },
        y: { title: { display: true, text: "Error (%)" } },
      },
    },
  });
};

watch(
  () => [
    store.generalSolution,
    store.eulerResults,
    store.eulerMejoradoResults,
    store.rungeKuttaResults,
  ],
  renderChartZ,
  { deep: true }
);

onMounted(renderChartZ);
</script>

<template>
  <div class="mt-6">
    <h3 class="text-xl font-bold text-center mb-2">📈 Gráfico de Error para Z</h3>
    <div class="w-full h-70">
      <canvas ref="chartCanvasZ"></canvas>
    </div>
  </div>
</template>
