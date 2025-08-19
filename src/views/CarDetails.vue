<template>
  <div v-if="car" class="car-detail container">
    <button @click="$router.push('/')" class="btn back-btn">⬅ Return</button>

    <div class="car-card-detail">
      <div class="car-image-wrapper">
        <img :src="car.image" :alt="car.model" class="car-image-detail" />
      </div>

      <div class="car-info">
        <h1 class="car-title">{{ car.brand }} {{ car.model }}</h1>

        <ul class="car-specs">
          <li><strong>Production year:</strong> {{ car.year }}</li>
          <li><strong>Horsepower:</strong> {{ car.hp }} HP</li>
        </ul>

        <button class="btn favourite-btn">⭐ Add to Favourites</button>
      </div>
    </div>
  </div>

  <div v-else class="not-found container">
    <p>Car not found!</p>
    <button @click="$router.push('/')" class="btn">Back to Homepage</button>
  </div>
</template>

<script>
import carsCollection from '../assets/cars.json'

export default {
  name: 'CarDetails',
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
      image: new URL(`../assets/carPictures/${car.image}`, import.meta.url).href,
    }))

    this.car = carsWithImages.find((c) => c.id === carId)
  },
}
</script>
