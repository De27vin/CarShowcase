<template>
  <div v-if="car" class="car-detail container">
    <button @click="goBack" class="btn back-btn">⬅ Return</button>

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

        <button class="btn favourite-btn" @click="toggleFavourite">
          <span v-if="isFav">⭐ In Favourites</span>
          <span v-else>☆ Add to Favourites</span>
        </button>

        <button class="btn danger-btn" @click="deleteCar(car.id)">🗑 Delete Car</button>
      </div>
    </div>
  </div>

  <div v-else class="not-found container">
    <p>Car not found!</p>
    <button @click="goBack" class="btn">Back to Homepage</button>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCarStore } from '../stores/cars.js'

const route = useRoute()
const router = useRouter()
const store = useCarStore()

const id = computed(() => Number(route.params.id))

const car = computed(() => store.cars.find((c) => c.id === id.value))

const isFav = computed(() => store.favourites.includes(id.value))

const toggleFavourite = () => store.toggleFavourite(id.value)
const goBack = () => router.push('/')

const deleteCar = (id) => {
  if (confirm('Are you sure you want to delete this car?')) {
    store.deleteCar(id)
    router.push('/')
  }
}

onMounted(() => {
  store.loadFromLocalStorage()
})
</script>
