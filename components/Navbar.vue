<script setup lang="js">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function handleResize() {
  if (window.innerWidth > 1052 && isMenuOpen.value) {
    isMenuOpen.value = false;
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>


<template>

  <nav class="navbar">
    <!-- Fullsize navbar-->
    <div class="nav-links">
      <router-link to="/" class="logo-link">
        <img class="logo" src="/logo.jpg" alt="home link" />

      </router-link>

      <router-link class="tab-link" to="/aboutUs">About YoYo</router-link>

      <router-link class="tab-link" to="/artists">Artists</router-link>

      <router-link class="tab-link" to="/events">Events</router-link>

      <router-link class="tab-link" to="/contactUs">Contact Us</router-link>

    </div>

    <!-- Burger Icon -->
    <div class="nav-burger">
      <div class="burger-left">
        <router-link to="/" class="logo-link">
          <img class="logo" src="/logo.jpg" alt="Logotype of the YoYo center" />

        </router-link>

      </div>

      <div class="burger-right">
        <div class="burger" @click="toggleMenu">
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>

        </div>

      </div>

    </div>

  </nav>

  <!-- Mobile Menu -->
  <div class="mobile-menu" v-if="isMenuOpen">
    <router-link class="mobile-link" to="/aboutUs" @click="toggleMenu">About the Group</router-link>

    <router-link class="mobile-link" to="/artists" @click="toggleMenu">Artists</router-link>

    <router-link class="mobile-link" to="/events" @click="toggleMenu">Events</router-link>

    <router-link class="mobile-link" to="/contactUs" @click="toggleMenu">Contact Us</router-link>

  </div>

</template>


<style scoped>
.navbar {
  height: 91px;
  background-color: #0d0d39;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.logo {
  height: 65px;
  border-radius: 40px;
  transition: transform 0.3s ease;
}
.logo:hover {
  transform: scale(1.1);
}

.nav-links {
  height: 91px;
  display: flex;
  align-items: center;
  padding: 0 150px;
  justify-content: space-between;
}

.tab-link {
  color: #FFFFFF;
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;
  transition: text-decoration 0.3s;
}

.tab-link:hover {
  text-decoration: underline;
  text-decoration-thickness: 2px;
}

.nav-burger {
  width: 100%;
  height: 91px;
  display: none;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  box-sizing: border-box;
}

.burger-left,
.burger-right {
  display: flex;
  align-items: center;
}

.logo {
  height: 55px;
}

.burger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 25px;
  height: 20px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.burger:hover {
  transform: scale(1.1);
}

.line {
  width: 100%;
  height: 3px;
  background-color: #fff;
  transition: all 0.3s ease;
}

.mobile-menu {
  display: flex;
  flex-direction: column;
  background-color: #CDB4DB;
  position: absolute;
  top: 91px;
  left: 0;
  width: 100%;
  padding: 20px 0;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 10;
}
.mobile-link {
  color: #FFF;
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;
  padding: 15px 0;
  text-align: center;
}
.mobile-link:hover {
  text-decoration: underline;
  text-decoration-thickness: 2px;
}

/* Adapt */
@media (max-width: 1052px) {
  .nav-links {
    display: none;
  }
  .nav-burger {
    display: flex;
  }
}

</style>