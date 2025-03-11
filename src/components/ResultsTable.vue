<script setup lang="ts">
import { useSolverStore } from "../stores/solverStore";

const store = useSolverStore();
</script>

<template>
  <div class="mt-6 p-4 bg-gray-50 shadow-md rounded-lg">
    <h3 class="text-xl font-bold mb-2 text-center">📊 Resultados</h3>
    <table class="w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-blue-500 text-white">
          <th class="border border-gray-300 p-2">x</th>
          <th class="border border-gray-300 p-2">y</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(point, index) in store.results" :key="index" class="bg-white">
          <td class="border border-gray-300 p-2">{{ point.x.toFixed(4) }}</td>
          <td class="border border-gray-300 p-2">{{ point.y.toFixed(4) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
