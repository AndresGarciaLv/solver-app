<script setup lang="ts">
import { ref } from "vue";
import { useSolverStore } from "../stores/solverStore";
import { euler } from "../utils/euler";
import { eulerMejorado } from "../utils/eulerMejorado";
import { rungeKutta } from "../utils/rungeKutta";
import { create, all } from "mathjs";
import SolutionGraph from "./SolutionGraph.vue";
import ResultsTable from "./ResultsTable.vue";

// Configurar math.js con precisión alta
const math = create(all);
const store = useSolverStore();
const equationInput = ref<string>(store.equation);
const x0 = ref<number>(0);
const y0 = ref<number>(1);
const h = ref<number>(0.1);
const n = ref<number>(10);
const solved = ref<boolean>(false);

// Función para calcular la solución exacta
const exactSolution = (x: number) => {
  return parseFloat((3 * Math.exp(-x) + x ** 2 - 2 * x + 2).toFixed(6)); // Solución exacta para la ecuación ejemplo
};

const solveEquation = () => {
  try {
    const node = math.parse(equationInput.value);
    const compiledFunction = node.compile();

    const f = (x: number, y: number) => parseFloat(compiledFunction.evaluate({ x, y }).toFixed(6));

    const eulerResults = euler(f, x0.value, y0.value, h.value, n.value);
    const eulerMejoradoResults = eulerMejorado(f, x0.value, y0.value, h.value, n.value);
    const rungeKuttaResults = rungeKutta(f, x0.value, y0.value, h.value, n.value);

    // Calcular la solución exacta para comparación
    const generalSolution = eulerResults.map(point => ({ x: point.x, y: exactSolution(point.x) }));

    // Almacenar los datos en Pinia
    store.setEquation(equationInput.value);
    store.setEulerResults(eulerResults);
    store.setEulerMejoradoResults(eulerMejoradoResults);
    store.setRungeKuttaResults(rungeKuttaResults);
    store.setGeneralSolution(generalSolution);

    solved.value = true;
  } catch (error) {
    console.error("Error al evaluar la ecuación:", error);
  }
};
</script>

<template>
  <div class="w-full h-screen flex items-center justify-center" :class="{'md:flex-row p-6': solved}">
    <!-- Sección izquierda: Formulario y Gráfica -->
    <div :class="solved ? 'md:w-1/3 flex flex-col space-y-2' : 'bg-white shadow-lg rounded-lg p-6 w-full max-w-lg'">
      <!-- Formulario -->
      <div class="bg-white shadow-lg rounded-lg p-4 pt-0">
        <h2 class="text-xl font-bold text-center mb-4">📌 Resolver Ecuaciones Diferenciales</h2>
        <label class="block text-gray-700 text-sm">📝 Ecuación:</label>
        <input v-model="equationInput" type="text" class="w-full p-2 border rounded-lg mb-2 text-sm" placeholder="Ejemplo: x^2 - y" />
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-gray-700 text-sm">🔹 x₀</label>
            <input v-model.number="x0" type="number" class="w-full p-2 border rounded-lg text-sm" />
          </div>
          <div>
            <label class="block text-gray-700 text-sm">🔹 y₀</label>
            <input v-model.number="y0" type="number" class="w-full p-2 border rounded-lg text-sm" />
          </div>
          <div>
            <label class="block text-gray-700 text-sm">🔹 h (paso)</label>
            <input v-model.number="h" type="number" step="0.01" class="w-full p-2 border rounded-lg text-sm" />
          </div>
          <div>
            <label class="block text-gray-700 text-sm">🔹 n (iteraciones)</label>
            <input v-model.number="n" type="number" class="w-full p-2 border rounded-lg text-sm" />
          </div>
        </div>
        <button @click="solveEquation" class="w-full bg-blue-600 text-white py-2 rounded-lg text-sm mt-4 cursor-pointer">✨ Resolver</button>
      </div>

      <!-- Gráfica -->
      <div v-if="solved" class="bg-white shadow-lg rounded-lg">
        <SolutionGraph />
      </div>
    </div>

    <!-- Sección derecha: Tabla -->
    <div v-if="solved" class="md:w-2/3 p-4 pt-0 flex items-center justify-center">
      <div class="bg-white shadow-lg rounded-lg p-3 w-full h-full overflow-x-auto">
        <ResultsTable />
      </div>
    </div>
  </div>
</template>
