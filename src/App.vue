<script setup lang="ts">
import { RouterView, useRoute, RouterLink } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const tabs = [
  { name: 'Inicio', path: '/', routeName: 'home' },
  { name: 'Sistema de Ecuaciones', path: '/system-equation', routeName: 'system-equation' },
  { name: 'Proyecto', path: '/project', routeName: 'project' }
];

const activeTab = computed(() => route.name);
</script>

<template>
  <header class="bg-white shadow-md py-3">
    <nav class="flex justify-center space-x-6">
      <RouterLink
        v-for="tab in tabs"
        :key="tab.routeName"
        :to="tab.path"
        class="relative text-lg font-semibold px-4 py-2 transition duration-200"
        :class="{ 'text-blue-600': activeTab === tab.routeName }"
      >
        {{ tab.name }}
        <span
          v-if="activeTab === tab.routeName"
          class="absolute left-0 bottom-0 w-full h-1 bg-blue-600 rounded-t-md"
        ></span>
      </RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
nav a {
  text-decoration: none;
  position: relative;
}
</style>
