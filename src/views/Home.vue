<template>
  <div class="home">
    <h1>Car Showcase Home</h1>

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
import carsCollection from '../assets/cars.json'

export default {
  name: 'Home',
  data() {
    return {
      cars: [],
    }
  },
  mounted() {
    this.cars = carsCollection.map((car) => ({
      ...car,
      image: new URL(`../assets/carPictures/${car.image}`, import.meta.url).href,
    })) //connect DB -> CRUD?
  },
  methods: {
    goToCar(id) {
      this.$router.push(`/car/${id}`)
    },
  },
}
</script>

<style scoped>
.home {
  padding: 1rem;
}

.car-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.car-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.car-card:hover {
  transform: scale(1.02);
}

.car-card img {
  width: 20%;
  height: auto;
  border-radius: 8px;
}
</style>
