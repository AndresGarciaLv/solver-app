import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SystemEcuationView from '@/views/SystemEcuationView.vue'
import ProjectView from '@/views/ProjectView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/system-equation',
      name: 'system-equation',
      component: SystemEcuationView,
    },
    {
      path: '/project',
      name: 'project',
      component: ProjectView,
    },

  ],
})

export default router
