<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Timetable from "@/components/Timetable.vue";

import { useRoute } from "vue-router";
import { ref } from "vue";
const route = useRoute();
const eventItem = ref(null);

const slug = route.params.id;
const id = slug.split("-").pop();

interface EventItem {
  id: number;
  name: string;
  description: string;
  event_category_id: number;
  additional_info?: {
    benefits?: string[];
    bring_with_you?: string[];
  };
  photos: { path: string; priority: number }[];
  Artists: ArtistWithSchedule[];
}

interface ArtistWithSchedule {
  id: number;
  name: string;
  surname: string;
  photos: {
    path: string;
    priority: number;
  }[];
  timetable: Record<string, string>;
}

const eventData = ref<EventItem>(null);
// First query: fetch event by ID
const { data, error } = await useFetch<{ success: boolean; data: EventItem }>(
  "/api/event/getEventById?id=" + String(id),
  {
    server: true,
    lazy: false,
  }
);

if (error.value) {
  console.error("Fetch error:", error.value);
} else {
  eventData.value = {
    ...data.value?.data,
    photos: Array.isArray(data.value?.data?.photos) ? data.value.data.photos : [],
  };
}

const artists = ref<ArtistWithSchedule[]>([]);

// Second query: fetch artists and their timetable from join table
const { data: artistData, error: artistError } = await useFetch<{
  success: boolean;
  data;
}>(`/api/artist/getArtistByEvent?id=${id}`, {
  server: true,
  lazy: false,
});

if (artistError.value) {
  console.error("Fetch error:", artistError.value);
} else {
  artists.value = artistData.value?.data
    ?.filter((item) => item.Artists)
    .map((item) => ({
      ...item.Artists,
      timetable: JSON.parse(item.timetable),
      photos: Array.isArray(item.Artists.photos) ? item.Artists.photos : [],
    }));
}

eventItem.value = {
  ...eventData.value,
  Artists: artists.value,
};

useSeoMeta({
  title: eventItem.value?.name,
  description:
    "Page contains information about the event, artists who perform, and timetable",
});
</script>

<template>
  <Navbar />

  <div class="activity-page">
    <div v-if="eventItem" class="activity-container">
      <div class="main-content">
        <div class="image-section">
          <img
            :src="eventItem.photos?.[0]?.path"
            :alt="eventItem.name"
            class="activity-image"
          />
        </div>

        <div class="info-section">
          <div class="row-1">
            <h1 class="activity-title">{{ eventItem.name }}</h1>
            <p class="activity-description">{{ eventItem.description }}</p>
          </div>

          <div class="row-2">
            <div class="left-column">
              <div class="highlights">
                <h3>Highlights:</h3>
                <ul>
                  <li v-for="(item, i) in eventItem.additional_info?.benefits || []" :key="'ben' + i">
                    {{ item }}
                  </li>
                </ul>
              </div>

              <div class="bring-section">
                <h3>Bring with you:</h3>
                <p>{{ (eventItem.additional_info?.bring_with_you || []).join(", ") }}</p>
              </div>
            </div>

            <div v-if="eventItem.Artists?.length" class="right-column">
              <h3>Artists:</h3>
              <div class="artist-cards">
                <NuxtLink
                  v-for="artist in eventItem.Artists"
                  :key="artist.id"
                  :to="'/artist' + '-' + artist.name.toLowerCase() + '-' + artist.surname.toLowerCase() + '-' + artist.id"
                  class="artist-card"
                >
                  <img :src="artist.photos?.[0]?.path" :alt="artist.name" />
                  <p>{{ artist.name }} {{ artist.surname }}</p>
                </NuxtLink>
              </div>
            </div>
          </div>

          <div v-if="eventItem.Artists?.length" class="row-3">
            <Timetable :artists="eventItem.Artists" />
          </div>
        </div>
      </div>

      <div class="button-wrapper">
        <InteractiveButton label="Back to All Events" to="/events" />
      </div>
    </div>

    <div v-else class="loading">Loading event...</div>
  </div>

  <Footer />
</template>

<style scoped>
.activity-page {
  max-width: 1300px;
  margin: 60px auto;
  font-family: "Jost", sans-serif;
  padding: 0 20px;
  color: #333;
}

.activity-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.main-content {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 3rem;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.image-section {
  position: relative;
}

.activity-image {
  width: 100%;
  height: 100%;
  max-height: 600px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.row-1 {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.right-column {
  display: flex;
  flex-direction: column;
}

.row-3 {
  margin-top: 0;
  overflow-x: auto;
}

.activity-title {
  font-weight: 700;
  color: #0d0d39;
  margin: 0;
}

.activity-description {
  font-style: italic;
  font-size: var(--font-text);
  line-height: 1.6;
  color: #555;
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.highlights h3,
.bring-section h3,
.right-column h3 {
  font-size: var(--font-sub-subtitle);
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #0d0d39;
}

.highlights ul {
  list-style: disc;
  padding-left: 1.5rem;
  line-height: 1.8;
}

.bring-section p {
  line-height: 1.6;
  color: #555;
}

.artist-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.75rem;
  justify-content: flex-start;
}

.artist-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;
}

.artist-card:hover {
  transform: scale(1.05);
}

.artist-card img {
  width: 120px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.artist-card p {
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
}

.button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.loading {
  text-align: center;
  font-size: var(--font-text);
  padding: 40px;
}

@media (max-width: 923px) {
  .main-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .activity-image {
    max-height: 400px;
  }

  .row-1 {
    gap: 1rem;
  }

  .row-2 {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .artist-card img {
    width: 100px;
    height: 130px;
  }
}
</style>
