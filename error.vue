<script setup>
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'

defineProps({ error: Object })
</script>

<template>
  <div class="error-wrapper">
    <Navbar />

    <div class="error-container">
      <div class="error-content">
        <h1>Looks like you took a<br />wrong turn on the path<br />to enlightenment.</h1>
        <InteractiveButton label="Shall we get back on the mat?" to="/"></InteractiveButton>
      </div>

      <img src="/img/error.png" alt="Meditating Woman" class="error-image" />

    </div>

    <Footer />
  </div>
</template>

<style scoped>

.error-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.error-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 4rem 2rem;
  background-color: #f6f4f8;
  flex: 1;
  flex-wrap: wrap;
  text-align: center;
}

.error-content {
  max-width: 500px;
  font-family: 'Montserrat', sans-serif;
}

h1 {
  font-size: 2rem;
  color: #111;
  font-weight: 700;
  line-height: 1.5;
  margin-bottom: 2rem;
}

.error-image {
  max-width: 400px;
  width: 100%;
  margin-top: 2rem;
}

</style>
