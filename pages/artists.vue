<script setup lang="ts">
import ClickableCard from "@/components/ClickableCard.vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

const { app } = useRuntimeConfig();
const baseUrl = import.meta.env.BASE_URL || app?.baseURL || "/";

const resolveImagePath = (path: string): string => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (baseUrl && path.startsWith(baseUrl)) return path;
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return `${baseUrl}${normalized}`;
};

//Get all artists from database
const { data, error } = await useFetch(resolveImagePath("/data/artists.json"), {
  server: false,
  lazy: false,
});

const artists = computed(() => data.value ?? null);

useSeoMeta({
  title: "All artists",
  description: "In this page are listed all artists.",
});
</script>

<template>
  <Navbar />

  <div class="page-wrapper">
    <div v-if="artists?.length" class="artists-section">
      <h1 class="sr-only">Our Artists</h1>

      <main class="main-content">
        <div class="grid-wrapper">
          <div v-for="(artist, index) in artists" :key="index" class="grid-item">
            <ClickableCard
              :img_src="resolveImagePath(artist.photos?.[0]?.path || '')"
              :to="'artist-' + artist.name.toLowerCase() + '-' + artist.surname.toLowerCase() + '-' + artist.id"
              :label="artist.name + ' ' + artist.surname"
            />
          </div>
        </div>
      </main>
    </div>

    <div v-else class="loading">Loading artists...</div>

    <Footer />
  </div>
</template>

<style scoped>
.loading {
  font-family: "Montserrat", sans-serif;
  text-align: center;
  font-size: var(--font-text);
  padding: 40px;
}
.page-wrapper {
  min-height: 88vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

.grid-wrapper {
  padding: 84px 171px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  justify-content: center;
  gap: 72px;
  align-items: center;
}
</style>
