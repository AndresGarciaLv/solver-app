<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { Chart, registerables } from "chart.js";
import { useSolverSistemStore } from "@/stores/solverSistemStore";

Chart.register(...registerables);

const store = useSolverSistemStore();
const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

const renderChart = () => {
  if (!chartCanvas.value) return;

  if (chartInstance) {
    chartInstance.destroy();
  }

  const data = {
    labels: store.eulerResults.map((r) => r.x.toFixed(2)),
    datasets: [
      {
        label: "Exacta Y",
        data: store.generalSolution.map((r) => r.y),
        borderColor: "black",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderDash: [5, 5],
        tension: 0.3,
      },
      {
        label: "Euler Y",
        data: store.eulerResults.map((r) => r.y),
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        tension: 0.3,
      },
      {
        label: "Euler Mejorado Y",
        data: store.eulerMejoradoResults.map((r) => r.y),
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        tension: 0.3,
      },
      {
        label: "Runge-Kutta Y",
        data: store.rungeKuttaResults.map((r) => r.y),
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        tension: 0.3,
      },
      {
        label: "Euler Z",
        data: store.eulerResults.map((r) => r.z),
        borderColor: "purple",
        backgroundColor: "rgba(128, 0, 128, 0.2)",
        tension: 0.3,
      },
      {
        label: "Euler Mejorado Z",
        data: store.eulerMejoradoResults.map((r) => r.z),
        borderColor: "orange",
        backgroundColor: "rgba(255, 165, 0, 0.2)",
        tension: 0.3,
      },
      {
        label: "Runge-Kutta Z",
        data: store.rungeKuttaResults.map((r) => r.z),
        borderColor: "cyan",
        backgroundColor: "rgba(0, 255, 255, 0.2)",
        tension: 0.3,
      }
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
        y: { title: { display: true, text: "Y & Z" } },
      },
    },
  });
};

watch(() => store.generalSolution, renderChart, { deep: true });
onMounted(renderChart);
</script>

<template>
   <div class="mt-6">
    <h3 class="text-xl font-bold text-center">📈 Gráfico Comparativo del Sistema</h3>
    <div class="w-full h-70">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>
