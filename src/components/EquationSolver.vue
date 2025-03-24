<script setup lang="ts">
import { ref } from "vue";
import { useSolverStore } from "../stores/solverStore";
import { euler } from "../utils/euler";
import { eulerMejorado } from "../utils/eulerMejorado";
import { rungeKutta } from "../utils/rungeKutta";
import { create, all } from "mathjs";
import SolutionGraph from "./SolutionGraph.vue";
import ResultsTable from "./ResultsTable.vue";
import ErrorChart from "./ErrorChart.vue"; // Importamos el ErrorChart
import apiService from "../services/exactaService"; // Servicio para la solución exacta

const math = create(all);
const store = useSolverStore();

// Variables reactivas
const equationInput = ref<string>(store.equation);
const x0 = ref<number>(0);
const y0 = ref<number>(1);
const h = ref<number>(0.1);
const n = ref<number>(10);
const solved = ref<boolean>(false);

const solveEquation = async () => {
  try {
    const userEquation = equationInput.value;

    // Para métodos numéricos usamos la ecuación tal como la ingresa el usuario
    const node = math.parse(userEquation);
    const compiledFunction = node.compile();
    const f = (x: number, y: number) =>
      parseFloat(compiledFunction.evaluate({ x, y }).toFixed(6));

    // Ejecutar métodos numéricos
    const eulerResults = euler(f, x0.value, y0.value, h.value, n.value);
    const eulerMejoradoResults = eulerMejorado(f, x0.value, y0.value, h.value, n.value);
    const rungeKuttaResults = rungeKutta(f, x0.value, y0.value, h.value, n.value);

    // Para la solución exacta, reemplazamos '^' por '**' para que sea compatible con Sympy
    const backendEquation = userEquation.replace(/\^/g, '**');

    // Llamada al backend para resolver la EDO de primer orden
    const response = await apiService.solveExacta(
      backendEquation,
      x0.value,
      y0.value,
      h.value,
      n.value
    );

    if (response.data.is_exact) {
      // Guardar en el store tanto los resultados numéricos como la solución exacta
      store.setEquation(userEquation);
      store.setEulerResults(eulerResults);
      store.setEulerMejoradoResults(eulerMejoradoResults);
      store.setRungeKuttaResults(rungeKuttaResults);
      store.setGeneralSolution(response.data.evaluated_points);
      store.setGeneralSolutionExpression(response.data.general_solution);
      solved.value = true;
    } else {
      alert("❌ No se pudo calcular la solución exacta.");
      solved.value = false;
    }
  } catch (error) {
    console.error("Error al evaluar la ecuación:", error);
    alert("Ocurrió un error al comunicarse con el servidor.");
    solved.value = false;
  }
};
</script>

<template>
  <div class="w-full h-screen flex flex-col">
    <!-- Formulario (siempre visible) -->
    <div class="w-full p-4">
      <div class="bg-white shadow-lg rounded-lg p-4">
        <h2 class="text-xl font-bold text-center mb-4">📌 Resolver Ecuaciones Diferenciales EDO'S</h2>
        <label class="block text-gray-700 text-sm">📝 Ecuación:</label>
        <input
          v-model="equationInput"
          type="text"
          class="w-full p-2 border rounded-lg mb-2 text-sm"
          placeholder="Ejemplo: x^2 - y"
        />
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
        <button
          @click="solveEquation"
          class="w-full bg-blue-600 text-white py-2 rounded-lg text-sm mt-4 cursor-pointer"
        >
          ✨ Resolver
        </button>
        <div v-if="solved" class="mt-4 p-2 bg-gray-100 rounded-lg text-sm">
          <strong>📄 Solución general:</strong> {{ store.generalSolutionExpression }}
        </div>
      </div>
    </div>
    <!-- Contenedor de Resultados -->
    <div v-if="solved" class="flex-1 p-4">
      <!-- En pantallas medianas y superiores, usamos dos columnas:
           Izquierda: gráfica de solución exacta y gráfica de error (apiladas verticalmente)
           Derecha: tabla de resultados -->
      <div class="flex flex-col md:flex-row md:space-x-4 h-full">
        <div class="md:w-1/2 flex flex-col space-y-4 h-full">
          <div class="flex-1 bg-white shadow-lg rounded-lg p-4">
            <SolutionGraph />
          </div>
          <div class="flex-1 bg-white shadow-lg rounded-lg p-4">
            <ErrorChart />
          </div>
        </div>
        <div class="md:w-1/2 bg-white shadow-lg rounded-lg p-4 overflow-auto">
          <ResultsTable />
        </div>
      </div>
    </div>
  </div>
</template>
