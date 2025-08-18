import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import CarDetails from '../views/CarDetails.vue'
import AddCar from '../views/AddCar.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/car/:id',
      name: 'CarDetails',
      component: CarDetails,
      props: true,
    },
    {
      path: '/add',
      name: 'AddCar',
      component: AddCar,
    },
  ],
})

export default router
