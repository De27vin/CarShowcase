import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import CarDetails from '../views/CarDetails.vue'
import AddCar from '../views/AddCar.vue'
import Favourites from '../views/Favourites.vue'
import EditCar from '../views/EditCar.vue'

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
    {
      path: '/favourites',
      name: 'Favourites',
      component: Favourites,
    },
    {
      path: '/edit/:id',
      name: 'EditCar',
      component: EditCar,
      props: true,
    },
  ],
})

export default router
