<script setup lang="ts">
import { useSolverSistemStore } from "@/stores/solverSistemStore";
import { computed } from "vue";

const store = useSolverSistemStore();

const calculateError = (exact: number, approx: number) => {
  return exact !== 0 ? Math.abs((exact - approx) / exact) * 100 : 0;
};

const comparisonResults = computed(() => {
  if (!store.eulerResults.length) return [];

  return store.eulerResults.map((point, index) => {
    return {
      x: point.x,
      exactY: store.generalSolution[index]?.y ?? null,
      exactZ: store.generalSolution[index]?.z ?? null,
      eulerY: point.y,
      eulerZ: point.z,
      eulerMejoradoY: store.eulerMejoradoResults[index]?.y ?? null,
      eulerMejoradoZ: store.eulerMejoradoResults[index]?.z ?? null,
      rungeKuttaY: store.rungeKuttaResults[index]?.y ?? null,
      rungeKuttaZ: store.rungeKuttaResults[index]?.z ?? null,
      errorEulerY: store.generalSolution[index]?.y ? calculateError(store.generalSolution[index]?.y, point.y) : null,
      errorEulerZ: store.generalSolution[index]?.z ? calculateError(store.generalSolution[index]?.z, point.z) : null,
      errorEulerMejoradoY: store.generalSolution[index]?.y ? calculateError(store.generalSolution[index]?.y, store.eulerMejoradoResults[index]?.y) : null,
      errorEulerMejoradoZ: store.generalSolution[index]?.z ? calculateError(store.generalSolution[index]?.z, store.eulerMejoradoResults[index]?.z) : null,
      errorRungeKuttaY: store.generalSolution[index]?.y ? calculateError(store.generalSolution[index]?.y, store.rungeKuttaResults[index]?.y) : null,
      errorRungeKuttaZ: store.generalSolution[index]?.z ? calculateError(store.generalSolution[index]?.z, store.rungeKuttaResults[index]?.z) : null,
    };
  });
});
</script>


<template>
  <div class=" p-2 bg-gray-50 shadow-md rounded-lg">
    <h3 class="text-xl font-bold mb-2 text-center">📊 Comparación de Métodos para el Sistema</h3>

    <!-- Contenedor scrollable -->
    <div class="overflow-x-auto">
      <table class="w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr class="bg-blue-500 text-white text-xs whitespace-nowrap">
            <th class="border border-gray-300 p-2">x</th>
            <th class="border border-gray-300 p-2">Exacta Y</th>
            <th class="border border-gray-300 p-2">Exacta Z</th>
            <th class="border border-gray-300 p-2">Euler Y</th>
            <th class="border border-gray-300 p-2">Euler Z</th>
            <th class="border border-gray-300 p-2">Euler Mejorado Y</th>
            <th class="border border-gray-300 p-2">Euler Mejorado Z</th>
            <th class="border border-gray-300 p-2">Runge-Kutta Y</th>
            <th class="border border-gray-300 p-2">Runge-Kutta Z</th>
            <th class="border border-gray-300 p-2">Error Euler Y (%)</th>
            <th class="border border-gray-300 p-2">Error Euler Z (%)</th>
            <th class="border border-gray-300 p-2">Error Euler Mejorado Y (%)</th>
            <th class="border border-gray-300 p-2">Error Euler Mejorado Z (%)</th>
            <th class="border border-gray-300 p-2">Error Runge-Kutta Y (%)</th>
            <th class="border border-gray-300 p-2">Error Runge-Kutta Z (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(point, index) in comparisonResults" :key="index" class="bg-white text-xs whitespace-nowrap">
            <td class="border border-gray-300 p-2">{{ point.x.toFixed(4) }}</td>
            <td class="border border-gray-300 p-2">{{ point.exactY.toFixed(4) }}</td>
            <td class="border border-gray-300 p-2">{{ point.exactZ.toFixed(4) }}</td>
            <td class="border border-gray-300 p-2">{{ point.eulerY?.toFixed(4) ?? '-' }}</td>
            <td class="border border-gray-300 p-2">{{ point.eulerZ?.toFixed(4) ?? '-' }}</td>
            <td class="border border-gray-300 p-2">{{ point.eulerMejoradoY?.toFixed(4) ?? '-' }}</td>
            <td class="border border-gray-300 p-2">{{ point.eulerMejoradoZ?.toFixed(4) ?? '-' }}</td>
            <td class="border border-gray-300 p-2">{{ point.rungeKuttaY?.toFixed(4) ?? '-' }}</td>
            <td class="border border-gray-300 p-2">{{ point.rungeKuttaZ?.toFixed(4) ?? '-' }}</td>
            <td class="border border-gray-300 p-2">{{ point.errorEulerY?.toFixed(2) ?? '-' }}</td>
            <td class="border border-gray-300 p-2">{{ point.errorEulerZ?.toFixed(2) ?? '-' }}</td>
            <td class="border border-gray-300 p-2">{{ point.errorEulerMejoradoY?.toFixed(2) ?? '-' }}</td>
            <td class="border border-gray-300 p-2">{{ point.errorEulerMejoradoZ?.toFixed(2) ?? '-' }}</td>
            <td class="border border-gray-300 p-2">{{ point.errorRungeKuttaY?.toFixed(2) ?? '-' }}</td>
            <td class="border border-gray-300 p-2">{{ point.errorRungeKuttaZ?.toFixed(2) ?? '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
