<script setup lang="ts">
import { useSolverStore } from "../stores/solverStore";
import { computed } from "vue";

const store = useSolverStore();

const calculateError = (exact: number, approx: number) => {
  return exact !== 0 ? Math.abs((exact - approx) / exact) * 100 : 0;
};

const comparisonResults = computed(() => {
  return store.generalSolution.map((exactPoint, index) => {
    const x = exactPoint.x;
    const exactY = exactPoint.y;
    const eulerY = store.eulerResults[index]?.y ?? null;
    const eulerMejoradoY = store.eulerMejoradoResults[index]?.y ?? null;
    const rungeKuttaY = store.rungeKuttaResults[index]?.y ?? null;
    return {
      x,
      exact: exactY,
      euler: eulerY,
      eulerMejorado: eulerMejoradoY,
      rungeKutta: rungeKuttaY,
      errorEuler: eulerY ? calculateError(exactY, eulerY) : null,
      errorEulerMejorado: eulerMejoradoY ? calculateError(exactY, eulerMejoradoY) : null,
      errorRungeKutta: rungeKuttaY ? calculateError(exactY, rungeKuttaY) : null,
    };
  });
});
</script>

<template>
  <div class="mt-6 p-4 bg-gray-50 shadow-md rounded-lg">
    <h3 class="text-xl font-bold mb-2 text-center">📊 Comparación de Métodos</h3>
    <table class="w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-blue-500 text-white">
          <th class="border border-gray-300 p-2">x</th>
          <th class="border border-gray-300 p-2">Exacta</th>
          <th class="border border-gray-300 p-2">Euler</th>
          <th class="border border-gray-300 p-2">Euler Mejorado</th>
          <th class="border border-gray-300 p-2">Runge-Kutta</th>
          <th class="border border-gray-300 p-2">Error Euler (%)</th>
          <th class="border border-gray-300 p-2">Error Euler Mejorado (%)</th>
          <th class="border border-gray-300 p-2">Error Runge-Kutta (%)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(point, index) in comparisonResults" :key="index" class="bg-white">
          <td class="border border-gray-300 p-2">{{ point.x.toFixed(4) }}</td>
          <td class="border border-gray-300 p-2">{{ point.exact.toFixed(4) }}</td>
          <td class="border border-gray-300 p-2">{{ point.euler?.toFixed(4) ?? '-' }}</td>
          <td class="border border-gray-300 p-2">{{ point.eulerMejorado?.toFixed(4) ?? '-' }}</td>
          <td class="border border-gray-300 p-2">{{ point.rungeKutta?.toFixed(4) ?? '-' }}</td>
          <td class="border border-gray-300 p-2">{{ point.errorEuler?.toFixed(2) ?? '-' }}</td>
          <td class="border border-gray-300 p-2">{{ point.errorEulerMejorado?.toFixed(2) ?? '-' }}</td>
          <td class="border border-gray-300 p-2">{{ point.errorRungeKutta?.toFixed(2) ?? '-' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
