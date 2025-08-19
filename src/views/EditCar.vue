<template>
  <div class="container">
    <h1>Edit Car</h1>
    <form @submit.prevent="update">
      <input v-model="car.brand" placeholder="Brand" required />
      <input v-model="car.model" placeholder="Model" required />
      <input v-model.number="car.year" placeholder="Year" required />
      <input v-model.number="car.hp" placeholder="Horsepower" required />
      <input v-model="car.image" placeholder="Image filename" required />

      <button type="submit" class="btn">💾 Save Changes</button>
    </form>
  </div>
</template>

<script>
import { useCarStore } from '../stores/cars'
import { useRouter } from 'vue-router'

export default {
  props: ['id'],
  setup(props) {
    const carStore = useCarStore()
    const router = useRouter()

    const car = { ...carStore.cars.find((c) => c.id === parseInt(props.id)) }

    const update = () => {
      carStore.updateCar(car)
      router.push(`/car/${car.id}`)
    }

    return { car, update }
  },
}
</script>
