<template>
  <div class="add-car container">
    <h1>Add a New Car</h1>

    <form @submit.prevent="addCar" class="car-form">
      <label>Brand:</label>
      <input v-model="brand" required />

      <label>Model:</label>
      <input v-model="model" required />

      <label>Year:</label>
      <input type="number" v-model="year" required />

      <label>Horsepower:</label>
      <input type="number" v-model="hp" required />

      <label>Image:</label>
      <input type="file" accept="image/*" @change="onFileChange" />

      <div v-if="preview" class="image-preview">
        <p>Preview:</p>
        <img :src="preview" alt="Preview" />
      </div>

      <button type="submit" class="btn">✅ Add Car</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCarStore } from '../stores/cars.js'

const router = useRouter()
const store = useCarStore()

const brand = ref('')
const model = ref('')
const year = ref('')
const hp = ref('')
const image = ref('')
const preview = ref('')

const onFileChange = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    image.value = reader.result
    preview.value = reader.result
  }
  reader.readAsDataURL(file)
}

const addCar = () => {
  store.addCar({
    brand: brand.value,
    model: model.value,
    year: parseInt(year.value),
    hp: parseInt(hp.value),
    image: image.value || null,
  })
  router.push('/')
}
</script>
