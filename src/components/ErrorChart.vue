<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { Chart, registerables } from "chart.js";
import { useSolverStore } from "../stores/solverStore";

// Registra componentes de Chart.js
Chart.register(...registerables);

const store = useSolverStore();
const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

/**
 * Función para calcular el error porcentual:
 * Error(%) = |(exact - approx) / exact| * 100
 */
function calculateError(exact: number, approx: number): number {
  return exact !== 0 ? Math.abs((exact - approx) / exact) * 100 : 0;
}

// Computed: genera un array con el error de EXACTA (siempre 0)
const exactaErrors = computed(() => {
  // Tantos puntos como la solución exacta
  return store.generalSolution.map(() => 0);
});

// Error Euler
const eulerErrors = computed(() => {
  return store.generalSolution.map((exactPoint, i) => {
    const eulerVal = store.eulerResults[i]?.y ?? null;
    if (eulerVal === null) return null;
    return calculateError(exactPoint.y, eulerVal);
  });
});

// Error Euler Mejorado
const eulerMejoradoErrors = computed(() => {
  return store.generalSolution.map((exactPoint, i) => {
    const eulerMejoradoVal = store.eulerMejoradoResults[i]?.y ?? null;
    if (eulerMejoradoVal === null) return null;
    return calculateError(exactPoint.y, eulerMejoradoVal);
  });
});

// Error Runge-Kutta
const rungeKuttaErrors = computed(() => {
  return store.generalSolution.map((exactPoint, i) => {
    const rungeKuttaVal = store.rungeKuttaResults[i]?.y ?? null;
    if (rungeKuttaVal === null) return null;
    return calculateError(exactPoint.y, rungeKuttaVal);
  });
});

/**
 * renderChart: Destruye la instancia previa y crea un nuevo gráfico
 */
const renderChart = () => {
  if (!chartCanvas.value) return;

  // Destruir instancia previa
  if (chartInstance) {
    chartInstance.destroy();
  }

  // Eje X: tomamos los mismos "x" que la solución exacta
  const labels = store.generalSolution.map((r) => r.x.toFixed(2));

  // Construimos el data con los errores
  const data = {
    labels,
    datasets: [
      {
        label: "Error EXACTA (%)",
        data: exactaErrors.value,
        borderColor: "black",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderDash: [5, 5],
        tension: 0.3,
      },
      {
        label: "Error Euler (%)",
        data: eulerErrors.value,
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        tension: 0.3,
      },
      {
        label: "Error Euler Mejorado (%)",
        data: eulerMejoradoErrors.value,
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        tension: 0.3,
      },
      {
        label: "Error Runge-Kutta (%)",
        data: rungeKuttaErrors.value,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
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
        y: { title: { display: true, text: "Error (%)" } },
      },
    },
  });
};

// Observamos cambios en las soluciones y volvemos a renderizar
watch(() => store.generalSolution, renderChart, { deep: true });
watch(() => store.eulerResults, renderChart, { deep: true });
watch(() => store.eulerMejoradoResults, renderChart, { deep: true });
watch(() => store.rungeKuttaResults, renderChart, { deep: true });

onMounted(renderChart);
</script>

<template>
  <div class="mt-6">
    <h3 class="text-xl font-bold text-center mb-2">📈 Gráfico de Errores</h3>
    <div class="w-full h-70">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>
