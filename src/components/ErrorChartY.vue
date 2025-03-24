<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { Chart, registerables } from "chart.js";
import { useSolverSistemStore } from "@/stores/solverSistemStore";

Chart.register(...registerables);
const store = useSolverSistemStore();
const chartCanvasY = ref<HTMLCanvasElement | null>(null);
let chartInstanceY: Chart | null = null;

// Función para calcular el error porcentual: |(exact - approx)/exact| * 100
function calculateError(exact: number, approx: number): number {
  return exact !== 0 ? Math.abs((exact - approx) / exact) * 100 : 0;
}

// Computed para calcular los errores para la variable Y:
const eulerErrorsY = computed(() => {
  return store.generalSolution.map((pt, i) => {
    const approx = store.eulerResults[i]?.y ?? null;
    return approx === null ? null : calculateError(pt.y, approx);
  });
});

const eulerMejoradoErrorsY = computed(() => {
  return store.generalSolution.map((pt, i) => {
    const approx = store.eulerMejoradoResults[i]?.y ?? null;
    return approx === null ? null : calculateError(pt.y, approx);
  });
});

const rungeKuttaErrorsY = computed(() => {
  return store.generalSolution.map((pt, i) => {
    const approx = store.rungeKuttaResults[i]?.y ?? null;
    return approx === null ? null : calculateError(pt.y, approx);
  });
});

// Renderiza la gráfica para los errores en Y:
const renderChartY = () => {
  if (!chartCanvasY.value) return;
  if (chartInstanceY) chartInstanceY.destroy();

  const labels = store.generalSolution.map(pt => pt.x.toFixed(2));
  const data = {
    labels,
    datasets: [
      {
        label: "Error Euler (Y)",
        data: eulerErrorsY.value,
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        tension: 0.3,
      },
      {
        label: "Error Euler Mejorado (Y)",
        data: eulerMejoradoErrorsY.value,
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        tension: 0.3,
      },
      {
        label: "Error Runge-Kutta (Y)",
        data: rungeKuttaErrorsY.value,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        tension: 0.3,
      },
    ],
  };

  chartInstanceY = new Chart(chartCanvasY.value, {
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
  renderChartY,
  { deep: true }
);

onMounted(renderChartY);
</script>

<template>
  <div class="mt-6">
    <h3 class="text-xl font-bold text-center mb-2">📈 Gráfico de Error para Y</h3>
    <div class="w-full h-70">
      <canvas ref="chartCanvasY"></canvas>
    </div>
  </div>
</template>
