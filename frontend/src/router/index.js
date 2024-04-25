import { createRouter, createWebHistory } from 'vue-router'
import CalendarView from '../views/CalendarView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Calendar',
      component: CalendarView
    },
    {
      path: '/tasks/:date',
      name: 'tasks',
      component: () => import('../views/TaskView.vue')
    }
  ]
})

export default router
