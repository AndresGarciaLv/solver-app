<script setup lang="ts">
import universityLogo from "../assets/LogoUT.svg"; // Asegúrate de colocar el logo en la carpeta assets
</script>

<template>
  <div class=" bg-gray-100 flex items-center justify-center p-6">
    <div class="bg-white shadow-2xl rounded-lg p-2 max-w-4xl w-full text-center">
      <!-- Logo de la Universidad -->
      <div class="flex justify-center">
        <img :src="universityLogo" alt="Logo Universidad" class="h-50 w-[300px]" />
      </div>

      <!-- Título -->
      <h1 class="text-4xl font-extrabold text-gray-800">PROYECTO INTEGRADOR</h1>
      <h2 class="text-2xl font-semibold text-blue-600 mt-2">Sistema de Solución de Ecuaciones</h2>
      <p class="text-lg text-gray-600 mt-4">GRUPO <span class="font-bold">IDYGS81</span></p>

      <!-- Integrantes -->
      <div class="text-lg text-gray-700">
        <h3 class="mt-2 text-xl font-semibold text-gray-800 mb-3">INTEGRANTES:</h3>
        <ul class="space-y-2">
          <li>📌 Andrés García Leyva</li>
          <li>📌 Ángel Manuel Guzmán Hoil</li>
          <li>📌 Juan Carlos López Can</li>
        </ul>
      </div>

      <!-- Materia -->
      <div class="mt-2 text-lg text-gray-700">
        <h3 class="text-xl font-semibold text-gray-800">MATERIA:</h3>
        <p class="text-blue-600 font-bold">Matemáticas para Ingeniería 2</p>
      </div>
    </div>
  </div>
</template>
