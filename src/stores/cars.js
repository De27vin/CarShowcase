import { defineStore } from 'pinia'
import seed from '../assets/cars.json'

export const useCarStore = defineStore('cars', {
  state: () => ({
    cars: [],
    favourites: [],
  }),

  getters: {
    favouriteCars(state) {
      return state.cars.filter((c) => state.favourites.includes(c.id))
    },
    isFavourite: (state) => (id) => state.favourites.includes(id),
  },

  actions: {
    ensureSeeded() {
      if (this.cars.length === 0) {
        this.cars = seed.map((car) => ({
          ...car,
          image: new URL(`../assets/carPictures/${car.image}`, import.meta.url).href,
        }))
      }
    },

    addCar(car) {
      const newId = this.cars.length ? Math.max(...this.cars.map((c) => c.id)) + 1 : 1
      this.cars.push({ id: newId, ...car })
      this.saveToLocalStorage()
    },

    updateCar(updated) {
      const idx = this.cars.findIndex((c) => c.id === updated.id)
      if (idx !== -1) {
        this.cars[idx] = { ...updated }
        this.saveToLocalStorage()
      }
    },

    deleteCar(id) {
      this.cars = this.cars.filter((c) => c.id !== id)
      this.favourites = this.favourites.filter((fid) => fid !== id)
      this.saveToLocalStorage()
    },

    toggleFavourite(id) {
      const set = new Set(this.favourites)
      set.has(id) ? set.delete(id) : set.add(id)
      this.favourites = Array.from(set)
      this.saveToLocalStorage()
    },

    loadFromLocalStorage() {
      const sc = localStorage.getItem('cars')
      const sf = localStorage.getItem('favourites')

      if (sc) {
        this.cars = JSON.parse(sc)
      } else {
        this.ensureSeeded()
        this.saveToLocalStorage()
      }

      if (sf) {
        let favs = JSON.parse(sf)
        if (Array.isArray(favs) && favs.length && typeof favs[0] === 'object') {
          favs = favs.map((x) => x.id)
        }
        this.favourites = favs
      }
    },

    saveToLocalStorage() {
      localStorage.setItem('cars', JSON.stringify(this.cars))
      localStorage.setItem('favourites', JSON.stringify(this.favourites))
    },
  },
})
