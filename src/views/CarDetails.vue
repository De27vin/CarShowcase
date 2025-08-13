<template>
  <div v-if="car" class="car-detail">
    <button @click="$router.push('/')" class="back-btn">⬅ Return</button>

    <h1>{{ car.brand }} {{ car.model }}</h1>
    <img :src="car.image" :alt="car.model" />

    <ul class="car-specs">
      <li><strong>Production year: </strong> {{ car.year }}</li>
      <li><strong>Horsepower: </strong> {{ car.hp }} HP</li>
    </ul>
  </div>

  <div v-else class="not-found">
    <p>Car not found!</p>
    <button @click="$router.push('/')">Back to Homepage</button>
  </div>
</template>

<script>
import carsCollection from '../assets/cars.json'

export default {
  name: 'carsCollection',
  props: ['id'],
  data() {
    return {
      car: null,
    }
  },
  mounted() {
    const carId = parseInt(this.id)

    const carsWithImages = carsCollection.map((car) => ({
      ...car,
      image: new URL(`../assets/cars/${car.image}`, import.meta.url).href,
    }))

    this.car = carsWithImages.find((c) => c.id === carId)
  },
}
</script>
