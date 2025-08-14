<template>
  <div id="app">
    <header class="app-header">
      <div class="container header-content">
        <h1 class="logo">Car Showcase</h1>
        <nav class="nav-links">
          <RouterLink to="/" class="nav-link" active-class="active">Home</RouterLink>
          <RouterLink to="/favourites" class="nav-link" active-class="active"
            >Favourites</RouterLink
          >
        </nav>
      </div>
    </header>

    <main class="app-main container">
      <RouterView />
    </main>

    <footer class="app-footer">
      <div class="container">
        <p>&copy; 2025 Car Showcase. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import './style.css'

export default {
  name: 'App',
}
</script>
