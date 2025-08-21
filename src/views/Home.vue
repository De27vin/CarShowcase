<template>
  <div class="home">
    <div class="home-header">
      <h1>Car Showcase Home</h1>
      <RouterLink to="/add" class="add-btn">+ Add Car</RouterLink>
    </div>

    <div class="controls">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="🔍 Search by brand or model..."
        class="search-input"
      />

      <label for="sort">Sort by:</label>
      <select v-model="sortOption" id="sort" class="sort-select">
        <option value="alphabetical">Brand (A → Z)</option>
        <option value="year">Production Year (Newest → Oldest)</option>
        <option value="hp">Horsepower (High → Low)</option>
      </select>
    </div>

    <div v-if="sortedAndFilteredCars.length === 0">No cars match your search...</div>

    <div class="car-list">
      <div
        v-for="car in sortedAndFilteredCars"
        :key="car.id"
        class="car-card"
        @click="goToCar(car.id)"
      >
        <img :src="car.image" :alt="car.model" />
        <h2>{{ car.brand }} {{ car.model }}</h2>
        <p>{{ car.year }} • {{ car.hp }} PS</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useCarStore } from '../stores/cars.js'
import { onMounted, ref, computed } from 'vue'

export default {
  name: 'Home',
  setup() {
    const carStore = useCarStore()
    const sortOption = ref('alphabetical')
    const searchQuery = ref('')

    onMounted(() => {
      carStore.loadFromLocalStorage()
    })

    const goToCar = (id) => {
      window.location.href = `/car/${id}`
    }

    const sortedCars = computed(() => {
      let carsCopy = [...carStore.cars]

      switch (sortOption.value) {
        case 'year':
          return carsCopy.sort((a, b) => b.year - a.year)
        case 'hp':
          return carsCopy.sort((a, b) => b.hp - a.hp)
        case 'alphabetical':
        default:
          return carsCopy.sort((a, b) => a.brand.localeCompare(b.brand))
      }
    })

    const sortedAndFilteredCars = computed(() => {
      return sortedCars.value.filter((car) =>
        `${car.brand} ${car.model}`.toLowerCase().includes(searchQuery.value.toLowerCase()),
      )
    })

    return {
      cars: carStore.cars,
      sortedAndFilteredCars,
      sortOption,
      searchQuery,
      goToCar,
    }
  },
}
</script>
