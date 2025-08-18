import { defineStore } from 'pinia'
import carsData from '../assets/cars.json'

export const useCarStore = defineStore('cars', {
  state: () => ({
    cars: [],
    favourites: [],
  }),

  actions: {
    addCar(car) {
      const newId = this.cars.length > 0 ? this.cars[this.cars.length - 1].id + 1 : 1
      this.cars.push({ id: newId, ...car })
      this.saveToLocalStorage()
    },

    toggleFavourite(id) {
      if (this.favourites.includes(id)) {
        this.favourites = this.favourites.filter((favId) => favId !== id)
      } else {
        this.favourites.push(id)
      }
      this.saveToLocalStorage()
    },

    saveToLocalStorage() {
      localStorage.setItem('cars', JSON.stringify(this.cars))
      localStorage.setItem('favourites', JSON.stringify(this.favourites))
    },

    loadFromLocalStorage() {
      const savedCars = localStorage.getItem('cars')
      const savedFavs = localStorage.getItem('favourites')

      if (savedCars) {
        this.cars = JSON.parse(savedCars)
      } else {
        this.cars = carsData.map((car) => ({
          ...car,
          image: new URL(`../assets/carPictures/${car.image}`, import.meta.url).href,
        }))
        this.saveToLocalStorage()
      }

      if (savedFavs) {
        this.favourites = JSON.parse(savedFavs)
      }
    },
  },
})
