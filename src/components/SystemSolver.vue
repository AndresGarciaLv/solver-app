<script setup lang="ts">
import { ref } from "vue";
import { useSolverSistemStore } from "@/stores/solverSistemStore";
import { eulerSistema } from "@/utils/eulerSistema";
import { eulerMejoradoSistema } from "@/utils/eulerMejoradoSistema";
import { rungeKuttaSistema } from "@/utils/rungeKuttaSistema";
import { create, all } from "mathjs";
import GraphSistem from "./SolutionGraphSystems.vue";
import ResultsTableSistem from "./ResultsTableSystem.vue";

const math = create(all);
const store = useSolverSistemStore();
const equationInputF1 = ref<string>(store.equations.f1);
const equationInputF2 = ref<string>(store.equations.f2);
const x0 = ref<number>(0);
const y0 = ref<number>(1);
const z0 = ref<number>(1);
const h = ref<number>(0.1);
const n = ref<number>(10);
const solved = ref<boolean>(false);

const exactSolution = (x: number) => {
  return parseFloat((3 * Math.exp(-x) + x ** 2 - 2 * x + 2).toFixed(6));
};

const solveSystem = async () => {
  try {
    const nodeF1 = math.parse(equationInputF1.value);
    const nodeF2 = math.parse(equationInputF2.value);
    const compiledF1 = nodeF1.compile();
    const compiledF2 = nodeF2.compile();

    const f1 = (x: number, y: number, z: number) => parseFloat(compiledF1.evaluate({ x, y, z }).toFixed(6));
    const f2 = (x: number, y: number, z: number) => parseFloat(compiledF2.evaluate({ x, y, z }).toFixed(6));

    const eulerResults = eulerSistema(f1, f2, x0.value, y0.value, z0.value, h.value, n.value);
    const eulerMejoradoResults = eulerMejoradoSistema(f1, f2, x0.value, y0.value, z0.value, h.value, n.value);
    const rungeKuttaResults = rungeKuttaSistema(f1, f2, x0.value, y0.value, z0.value, h.value, n.value);

    const generalSolution = eulerResults.map(point => ({ x: point.x, y: exactSolution(point.x), z: exactSolution(point.x) }));

    store.setEquations(equationInputF1.value, equationInputF2.value);
    store.setEulerResults(eulerResults);
    store.setEulerMejoradoResults(eulerMejoradoResults);
    store.setRungeKuttaResults(rungeKuttaResults);
    store.setGeneralSolution(generalSolution);

    solved.value = true;
  } catch (error) {
    console.error("Error al evaluar el sistema de ecuaciones:", error);
  }
};
</script>


<template>
  <div class="w-full h-screen flex flex-col p-6" :class="{'justify-center items-center': !solved}">
    <!-- Formulario y Tabla en la parte superior cuando está resuelto -->
    <div :class="solved ? 'flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4' : 'w-full max-w-lg'">
      <!-- Formulario -->
      <div :class="solved ? 'md:w-1/3 flex flex-col space-y-2' : 'bg-white shadow-lg rounded-lg p-6 w-full'">
        <div class="bg-white shadow-lg rounded-lg p-4">
          <h2 class="text-xl font-bold text-center mb-4">📌 Resolver Sistema de Ecuaciones Diferenciales</h2>
          <label class="block text-gray-700 text-sm">📝 Ecuación 1:</label>
          <input v-model="equationInputF1" type="text" class="w-full p-2 border rounded-lg mb-2 text-sm" placeholder="Ejemplo: z - y" />
          <label class="block text-gray-700 text-sm">📝 Ecuación 2:</label>
          <input v-model="equationInputF2" type="text" class="w-full p-2 border rounded-lg mb-2 text-sm" placeholder="Ejemplo: x - z" />
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
              <label class="block text-gray-700 text-sm">🔹 z₀</label>
              <input v-model.number="z0" type="number" class="w-full p-2 border rounded-lg text-sm" />
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
          <button @click="solveSystem" class="w-full bg-blue-600 text-white py-2 rounded-lg text-sm mt-4 cursor-pointer">✨ Resolver</button>
        </div>
      </div>

      <!-- Tabla de resultados -->
      <div v-if="solved" class="md:w-2/3 flex-grow">
        <div class="bg-white shadow-lg rounded-lg p-3 w-full h-full overflow-auto">
          <ResultsTableSistem />
        </div>
      </div>
    </div>

    <!-- Gráfica debajo del formulario -->
    <div v-if="solved" class="mt-4">
      <GraphSistem />
    </div>
  </div>
</template>
