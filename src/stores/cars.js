import { defineStore } from 'pinia'

export const useCarStore = defineStore('cars', {
  state: () => ({
    cars: [],
    favourites: [],
  }),
  actions: {
    addCar(car) {
      this.cars.push(car)
      this.saveToLocalStorage()
    },
    deleteCar(id) {
      this.cars = this.cars.filter((car) => car.id !== id)
      this.saveToLocalStorage()
    },
    updateCar(updatedCar) {
      const index = this.cars.findIndex((car) => car.id === updatedCar.id)
      if (index !== -1) {
        this.cars[index] = updatedCar
        this.saveToLocalStorage()
      }
    },
    toggleFavourite(car) {
      if (this.favourites.find((c) => c.id === car.id)) {
        this.favourites = this.favourites.filter((c) => c.id !== car.id)
      } else {
        this.favourites.push(car)
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
      if (savedCars) this.cars = JSON.parse(savedCars)
      if (savedFavs) this.favourites = JSON.parse(savedFavs)
    },
  },
})
