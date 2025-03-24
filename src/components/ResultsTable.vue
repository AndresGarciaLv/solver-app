<script setup lang="ts">
import { useSolverStore } from "../stores/solverStore";
import { computed } from "vue";

const store = useSolverStore();

// Función para calcular el error porcentual
const calculateError = (exact: number, approx: number): number => {
  return exact !== 0 ? Math.abs((exact - approx) / exact) * 100 : 0;
};

const comparisonResults = computed(() => {
  // Recorremos los puntos evaluados de la solución exacta
  return store.generalSolution.map((exactPoint, index) => {
    const x = exactPoint.x;
    const exactY = exactPoint.y;
    // Obtenemos los resultados de cada método en el mismo índice
    const eulerY = store.eulerResults[index]?.y ?? null;
    const eulerMejoradoY = store.eulerMejoradoResults[index]?.y ?? null;
    const rungeKuttaY = store.rungeKuttaResults[index]?.y ?? null;

    return {
      x,
      exact: exactY,
      euler: eulerY,
      eulerMejorado: eulerMejoradoY,
      rungeKutta: rungeKuttaY,
      // Calculamos el error porcentual, verificando que los valores sean numéricos
      errorEuler: eulerY !== null ? calculateError(exactY, eulerY) : null,
      errorEulerMejorado: eulerMejoradoY !== null ? calculateError(exactY, eulerMejoradoY) : null,
      errorRungeKutta: rungeKuttaY !== null ? calculateError(exactY, rungeKuttaY) : null,
    };
  });
});
</script>

<template>
  <div class="mt-6 p-4 bg-gray-50 shadow-md rounded-lg">
    <h3 class="text-xl font-bold mb-2 text-center">📊 Comparación de Métodos y Márgenes de Error</h3>
    <table class="w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-blue-500 text-white text-sm">
          <th class="border border-gray-300 p-2">x</th>
          <th class="border border-gray-300 p-2">Exacta (Solución General)</th>
          <th class="border border-gray-300 p-2">Euler</th>
          <th class="border border-gray-300 p-2">Euler Mejorado</th>
          <th class="border border-gray-300 p-2">Runge-Kutta</th>
          <th class="border border-gray-300 p-2">Error Euler (%)</th>
          <th class="border border-gray-300 p-2">Error Euler Mejorado (%)</th>
          <th class="border border-gray-300 p-2">Error Runge-Kutta (%)</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(point, index) in comparisonResults"
          :key="index"
          class="bg-white text-center text-sm"
        >
          <td class="border border-gray-300 p-2">{{ point.x.toFixed(4) }}</td>
          <td class="border border-gray-300 p-2">{{ point.exact.toFixed(4) }}</td>
          <td class="border border-gray-300 p-2">
            {{ point.euler !== null ? point.euler.toFixed(4) : '-' }}
          </td>
          <td class="border border-gray-300 p-2">
            {{ point.eulerMejorado !== null ? point.eulerMejorado.toFixed(10) : '-' }}
          </td>
          <td class="border border-gray-300 p-2">
            {{ point.rungeKutta !== null ? point.rungeKutta.toFixed(10) : '-' }}
          </td>
          <td class="border border-gray-300 p-2">
            {{ point.errorEuler !== null ? point.errorEuler.toFixed(10) : '-' }}
          </td>
          <td class="border border-gray-300 p-2">
            {{ point.errorEulerMejorado !== null ? point.errorEulerMejorado.toFixed(10) : '-' }}
          </td>
          <td class="border border-gray-300 p-2">
            {{ point.errorRungeKutta !== null ? point.errorRungeKutta.toFixed(10) : '-' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
