<template>
  <div id="app">
    <header>
      <h1>Car Showcase</h1>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/favourites">Favourites</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>

    <footer id="footer">
      <p>&copy; 2025 Car Showcase. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import './style.css'

export default {
  name: 'App',
}
</script>
