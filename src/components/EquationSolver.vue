<script setup lang="ts">
import { ref } from "vue";
import { useSolverStore } from "../stores/solverStore";
import { euler } from "../utils/euler";
import { eulerMejorado } from "../utils/eulerMejorado";
import { rungeKutta } from "../utils/rungeKutta";
import SolutionGraph from "./SolutionGraph.vue";
import ResultsTable from "./ResultsTable.vue";

const store = useSolverStore();
const equationInput = ref<string>(store.equation);
  const method = ref<"euler" | "eulerMejorado" | "rk4" | "newton">(store.method);

const solveEquation = () => {
  let results: Array<{ x: number; y: number }> = [];

  try {
    const f = new Function("x", "y", `return ${equationInput.value};`) as (x: number, y: number) => number;

    if (method.value === "euler") {
      results = euler(f, 0, 1, 0.1, 10);
    } else if (method.value === "eulerMejorado") {
      results = eulerMejorado(f, 0, 1, 0.1, 10);
    } else if (method.value === "rk4") {
      results = rungeKutta(f, 0, 1, 0.1, 10);
    }

    store.setEquation(equationInput.value);
    store.setMethod(method.value);
    store.setResults(results);
  } catch (error) {
    console.error("Error al evaluar la ecuación:", error);
  }
};
</script>

<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl">
      <h2 class="text-3xl font-bold text-gray-800 text-center mb-6">📌 Resolver Ecuaciones Diferenciales</h2>

      <!-- Entrada de ecuación -->
      <div class="mb-6">
        <label for="equation" class="block text-gray-700 font-medium mb-2">📝 Ingrese la ecuación:</label>
        <input
          v-model="equationInput"
          id="equation"
          type="text"
          placeholder="Ejemplo: x * Math.sin(y)"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
        />
      </div>

      <!-- Selector de método -->
      <div class="mb-6">
        <label for="method" class="block text-gray-700 font-medium mb-2">⚙️ Seleccione el método:</label>
        <select
          v-model="method"
          id="method"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
        >
          <option value="euler">📌 Euler</option>
          <option value="eulerMejorado">📌 Euler Mejorado</option>
          <option value="rk4">📌 Runge-Kutta</option>
        </select>
      </div>

      <!-- Botón Resolver -->
      <button
        @click="solveEquation"
        class="cursor-pointer w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl"
      >
        ✨ Resolver
      </button>

      <!-- Mostrar la tabla y la gráfica solo si hay resultados -->
      <div v-if="store.results.length > 0" class="mt-8">
        <ResultsTable />
        <SolutionGraph />
      </div>
    </div>
  </div>
</template>
