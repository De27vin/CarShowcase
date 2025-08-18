<template>
  <div class="add-car">
    <h1>Add New Car</h1>
    <form @submit.prevent="submitForm" class="add-car-form">
      <div class="form-group">
        <label for="brand">Brand</label>
        <input type="text" id="brand" v-model="newCar.brand" required />
      </div>

      <div class="form-group">
        <label for="model">Model</label>
        <input type="text" id="model" v-model="newCar.model" required />
      </div>

      <div class="form-group">
        <label for="year">Year</label>
        <input type="number" id="year" v-model="newCar.year" required />
      </div>

      <div class="form-group">
        <label for="hp">Horsepower (PS)</label>
        <input type="number" id="hp" v-model="newCar.hp" required />
      </div>

      <div class="form-group">
        <label for="image">Image Filename</label>
        <input type="text" id="image" v-model="newCar.image" placeholder="example.jpg" />
      </div>

      <button type="submit" class="submit-btn">Add Car</button>
    </form>
  </div>
</template>

<script>
import { useCarStore } from '../stores/cars.js'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'AddCar',
  setup() {
    const carStore = useCarStore()
    const router = useRouter()

    const newCar = reactive({
      brand: '',
      model: '',
      year: '',
      hp: '',
      image: '',
    })

    const submitForm = () => {
      // Optional: Bildpfad automatisch ergänzen
      if (newCar.image) {
        newCar.image = new URL(`../assets/carPictures/${newCar.image}`, import.meta.url).href
      }
      carStore.addCar({ ...newCar })
      router.push('/') // zurück zur Home-Seite
    }

    return {
      newCar,
      submitForm,
    }
  },
}
</script>
