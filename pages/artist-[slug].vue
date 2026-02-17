<script setup>
import ClickableCard from "~/components/ClickableCard.vue";
import { useRoute } from "vue-router";
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { useSeoMeta } from "#app";

const route = useRoute();
const rawSlug = route.params.slug;
const id = rawSlug.split("-").pop();

// Firstly fetch artist data
const {
  data: artistData,
  error: artistError,
  pending: pendingArtist,
} = await useFetch("/api/artist/getArtistById", {
  query: { id },
  server: true,
  lazy: false,
});

// Then fetch artist's related events
const { data: eventData, error: eventError } = await useFetch(
  "/api/artist/getRelatedEvents",
  {
    query: { id },
    server: true,
    lazy: false,
  }
);

// Compute artist object with all the queried information
const artist = computed(() => artistData.value?.data ?? null);

const artistEvents = computed(() =>
  (eventData.value?.data ?? []).map((item) => item.Events).filter(Boolean)
);

// Window resize (client-only)
const windowWidth = ref(0);
const responsiveWidth = computed(() => {
  if (windowWidth.value < 440) {
    return 300 * (windowWidth.value / 440);
  } else {
    return 300;
  }
});

onMounted(() => {
  windowWidth.value = window.innerWidth;
  const update = () => (windowWidth.value = window.innerWidth);
  window.addEventListener("resize", update);
  onBeforeUnmount(() => {
    window.removeEventListener("resize", update);
  });
});

// SEO
if (artist.value) {
  useSeoMeta({
    title: `${artist.value.name} ${artist.value.surname}`,
    description: `This is ${artist.value.name} ${artist.value.surname}'s page.`,
  });
}
</script>

<template>
  <Navbar></Navbar>

  <div v-if="pendingArtist">Loading artist...</div>
  <div v-else-if="artistError">Error: {{ artistError.message }}</div>
  <div v-else-if="eventError">Error: {{ eventError.message }}</div>

  <div v-else>
    <div class="artist-body">
      <div class="artist-card">
        <div class="main-information">
          <div class="image-wrapper">
            <h1 class="title">{{ artist.name }} {{ artist.surname }}</h1>
            <img
              class="artist-profile-picture"
              :src="artist.photos?.[0]?.path"
              :alt="artist.name + ' ' + artist.surname + ' picture'"
            />
          </div>

          <div class="information-text-wrapper">
            <h2 class="subtitle">{{ artist.qualification }}</h2>
            <p class="description">{{ artist.description }}</p>
            <div class="expertise-wrapper">
              <h3 style="font-weight: 700">Main Expertise:</h3>
              <ul>
                <li class="certification" v-for="e in artist.cv.skills" :key="e">{{ e }}</li>
              </ul>
            </div>
          </div>

          <div class="events-wrapper">
            <h3 style="font-weight: 700; margin-bottom: 1rem">Events with {{ artist.name }}</h3>
            <div class="events-list">
              <ClickableCard
                v-for="eventItem in artistEvents"
                :key="eventItem.id"
                :img_src="eventItem.photos[0].path"
                :to="'/events/' + eventItem.name.toLowerCase() + '-' + eventItem.id"
                :label="eventItem.name"
                :card_width="200"
                :card_height="250"
              ></ClickableCard>
            </div>
          </div>
        </div>
      </div>

      <div class="button-wrapper">
        <InteractiveButton label="Back to All Artists" to="/artists" :width="responsiveWidth"></InteractiveButton>
      </div>
    </div>
  </div>

  <Footer></Footer>
</template>

<style scoped>
.artist-body {
  min-height: 88vh;
  position: relative;
  background-color: rgba(230, 218, 248, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  box-sizing: border-box;
  gap: 2rem;
}

.artist-card {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  padding: 2rem;
  max-width: 1000px;
  width: 95%;
}

.title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
  text-align: center;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-style: normal;
  font-weight: 400;
  font-family: 'Lacquer', cursive;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent);
  margin: 0;
  z-index: 2;
}

.subtitle {
  color: var(--Black);
  font-size: var(--font-sub-subtitle);
  font-style: normal;
  font-weight: 600;
}

.main-information {
  position: relative;
  width: 100%;
  height: min-content;
  text-align: left;
  display: grid;
  grid-template-columns: 280px 1fr 220px;
  grid-template-rows: auto;
  column-gap: 2rem;
  font-size: var(--font-text);
}

.artist-profile-picture {
  width: 100%;
  height: 320px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: block;
}

.image-wrapper {
  grid-column: 1;
  grid-row: 1;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
}

.information-text-wrapper {
  grid-column: 2;
  grid-row: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.description {
  font-style: italic;
  color: #333;
  line-height: 1.6;
}

.expertise-wrapper {
  margin-left: 1rem;
}

.certification {
  margin: 0.5rem 0;
  font-size: inherit;
  line-height: 1.6;
}

.events-wrapper {
  grid-column: 3;
  grid-row: 1;
  display: flex;
  flex-direction: column;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.events-list::-webkit-scrollbar {
  width: 6px;
}

.events-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.events-list::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.events-list::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.button-wrapper {
  margin-top: 1.5rem;
}

@media (max-width: 923px) {
  .artist-card {
    padding: 1.5rem;
  }

  .main-information {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    gap: 1.5rem;
  }

  .image-wrapper {
    grid-column: 1;
    grid-row: 1;
    max-width: 100%;
    justify-self: center;
  }

  .artist-profile-picture {
    width: 100%;
    height: auto;
    min-height: 300px;
  }

  .information-text-wrapper {
    grid-column: 1;
    grid-row: 2;
  }

  .events-wrapper {
    grid-column: 1;
    grid-row: 3;
  }

  .events-list {
    flex-direction: row;
    flex-wrap: wrap;
    max-height: none;
    justify-content: center;
  }
}
</style>
