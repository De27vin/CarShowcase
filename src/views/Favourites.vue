<template>
  <div class="favourites container">
    <h1>⭐ My Favourite Cars</h1>

    <div v-if="favouriteCars.length === 0" class="empty">
      <p>No favourites yet...</p>
      <RouterLink to="/" class="btn">Browse cars</RouterLink>
    </div>

    <div v-else class="car-list-favourites">
      <div v-for="car in favouriteCars" :key="car.id" class="car-card" @click="goToCar(car.id)">
        <img :src="car.image" :alt="car.model" />
        <h2>{{ car.brand }} {{ car.model }}</h2>
        <p>{{ car.year }} • {{ car.hp }} HP</p>

        <button class="btn remove-btn" @click.stop="toggleFavourite(car.id)">Remove</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCarStore } from '../stores/cars.js'

const router = useRouter()
const store = useCarStore()

onMounted(() => {
  store.loadFromLocalStorage()
})

const favouriteCars = computed(() => store.cars.filter((c) => store.favourites.includes(c.id)))

const goToCar = (id) => router.push(`/car/${id}`)
const toggleFavourite = (id) => store.toggleFavourite(id)
</script>
