<template>
  <div class="edit-car container">
    <h1>Edit Car</h1>

    <form @submit.prevent="updateCar" class="car-form">
      <label>
        Brand:
        <input v-model="form.brand" required />
      </label>

      <label>
        Model:
        <input v-model="form.model" required />
      </label>

      <label>
        Year:
        <input v-model.number="form.year" type="number" required />
      </label>

      <label>
        Horsepower (HP):
        <input v-model.number="form.hp" type="number" required />
      </label>

      <label>
        Image URL:
        <input v-model="form.image" type="text" />
      </label>

      <button type="submit" class="btn">💾 Save Changes</button>
      <RouterLink to="/" class="btn back-btn">Cancel</RouterLink>
    </form>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCarStore } from '../stores/cars.js'

const route = useRoute()
const router = useRouter()
const store = useCarStore()

const form = reactive({
  id: null,
  brand: '',
  model: '',
  year: '',
  hp: '',
  image: '',
})

onMounted(() => {
  store.loadFromLocalStorage()
  const car = store.cars.find((c) => c.id === Number(route.params.id))
  if (car) {
    Object.assign(form, car) // kopiert alle Werte ins Formular
  }
})

const updateCar = () => {
  store.updateCar({ ...form })
  router.push(`/car/${form.id}`)
}
</script>
