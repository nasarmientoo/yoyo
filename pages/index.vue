<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Offer {
  id: number
  name: string
  photos: { path: string, priority: number }[]
  promotional_text: string
}

const offers = ref<Offer[]>([])

useSeoMeta({
  title: "Home",
  description: "Main page with events",
})

//True if page is loading
const pending = ref(true)

//Get the highlighted events
const { data, error } = await useFetch<{ success: boolean; data: Offer[] }>(
  '/api/event/getHighlightEvent',
    {
      server: true,
      lazy: false
    }
)

if (error.value) {
  console.error('Fetch error:', error.value)
} else {
  offers.value = (data.value?.data ?? []).map(activity => ({
    ...activity,
    photos: Array.isArray(activity.photos) ? activity.photos : []
  }))
}

pending.value = false

//Get the activity image with the highest priority
function getPriorityOneImage(photos: { path: string, priority: number }[]): string {
  const found = photos.find(p => p.priority === 1)
  return found?.path || ''
}
</script>

<template>
  <Navbar />

  <section class="hero">
    <div class="hero__image">
      <img src="@/assets/images/main.png" alt="Young Artists Collective" />
      <InteractiveButton label="Our Events" to="/events" class="hero__button" />
    </div>
  </section>

  <section class="activity-types">
    <h2 class="text-wrapper">Our events</h2>
    <div class="frame">
      <NuxtLink to="/events?category=indie">
        <div class="BODY">
          <div class="overlap-group">
            <img class="body" src="/icons/indie.png" alt="indie icon" />
            <div class="div">INDIE</div>
          </div>
        </div>
      </NuxtLink>

      <NuxtLink to="/events?category=electronic">
        <div class="MIND">
          <div class="overlap">
            <img class="mind" src="/icons/electronic.png" alt="electronic icon" />
            <div class="text-wrapper-2">ELECTRONIC</div>
          </div>
        </div>
      </NuxtLink>

      <NuxtLink to="/events?category=hiphop">
        <div class="SOUL">
          <div class="overlap-2">
            <img class="soul" src="/icons/hiphop.png" alt="hip hop icon" />
            <div class="text-wrapper-3">HIP-HOP</div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </section>

  <section class="special-offers">
    <h2 class="special-offers__title">Highlights</h2>

    <div v-if="pending" class="loading">Loading...</div>

    <div v-else-if="offers.length > 0" class="special-offers__grid">
      <div v-for="offer in offers" :key="offer.id" class="offer-card">
        <div class="offer-card__container">
          <div class="offer-card__content-wrapper">
            <div class="offer-card__image-wrapper">
              <img :src="getPriorityOneImage(offer.photos)" class="offer-card__image" :alt="`Image for offer: ${offer.name}`" />
            </div>
            <div class="offer-card__content">
              <client-only>
                <p class="offer-card__description" v-html="offer.promotional_text"></p>
              </client-only>
              <div class="offer-card__button-wrapper">
                <InteractiveButton
                  :to="`/events/${offer.name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}-${offer.id}`"
                  label="See Details"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="special-offers__empty">
      Come back later, new offers will appear soon!
    </div>

  </section>

  <Footer />
</template>

<style scoped src="@/assets/index.css"></style>
