<template>
  <div class="home">
    <div class="home-header">
      <h1>Car Showcase Home</h1>
      <RouterLink to="/add" class="add-btn">+ Add Car</RouterLink>
    </div>

    <div v-if="cars.length === 0">There are no cars here...</div>

    <div class="car-list">
      <div v-for="car in cars" :key="car.id" class="car-card" @click="goToCar(car.id)">
        <img :src="car.image" :alt="car.model" />
        <h2>{{ car.brand }} {{ car.model }}</h2>
        <p>{{ car.year }} • {{ car.hp }} PS</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useCarStore } from '../stores/cars.js'
import { onMounted } from 'vue'

export default {
  name: 'Home',
  setup() {
    const carStore = useCarStore()

    onMounted(() => {
      carStore.loadFromLocalStorage()
    })

    const goToCar = (id) => {
      window.location.href = `/car/${id}`
    }

    return {
      cars: carStore.cars,
      goToCar,
    }
  },
}
</script>
