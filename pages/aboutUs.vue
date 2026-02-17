<script setup lang="js">
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import aboutImage from "@/assets/images/about-us.png";

useSeoMeta({
  title: "About Us",
  description: "Page contains general information about YoYo center",
});
</script>

<template>

  <Navbar></Navbar>

  <div class="about-us">
    <section class="hero">
      <img
          style="background: lightgray 50% / cover no-repeat"
          class="hero-bg"
          :src="aboutImage"
          alt="Background"
      />

      <div class="hero-card-front">
        <h1 class="hero-title">Our Story & Vision</h1>

        <p class="hero-description">
          Born from the raw pulse of rhythm, improvisation, and street‑grown creativity, YoYo takes its name from the iconic onomatopoeia rappers throw into the air right before they drop a verse. That “yo, yo” is more than a sound — it’s a spark. It’s the moment the mic wakes up, the beat opens a doorway, and the artist steps into their truth.
          For us, YoYo represents a creative ignition point: the instant where confidence rises, the voice loosens, and the mind syncs with the flow. It’s a reminder that everyone carries a rhythm inside them, waiting to be released.
          We believe expression begins the moment we dare to speak up, tune into our own cadence, and honor the stories our bodies, minds, and memories hold. Our vision is to create a space where people from all backgrounds can explore their voice, their identity, and their artistic evolution at their own pace.
        </p>

      </div>

    </section>

    <section class="approach">
      <div class="approach-content">
        <h2 class="approach-title">Our approach</h2>

        <p class="approach-intro">
         We roll with the idea that real transformation hits hardest when it’s full‑spectrum. That’s why our approach blends the sounds, moods, and cultures that shape how this generation feels, moves, and creates.
        </p>

        <ul class="approach-list">
          <li><strong><NuxtLink class="clickable-link" to="/events?category=indie">Indie</NuxtLink></strong> – raw vocals, live instruments, and intimate stages</li>
          <li><strong><NuxtLink class="clickable-link" to="/events?category=electronic">Electronic</NuxtLink></strong> – synth-driven nights and dance-floor energy</li>
          <li><strong><NuxtLink class="clickable-link" to="/events?category=hiphop">Hip-Hop</NuxtLink></strong> – bold lyrics, beats, and street culture</li>
        </ul>

        <p class="approach-description">
         We’re not here for rigid rules or one‑way methods. We mix, remix, and mash up influences — old school, new school, and everything in between — to craft experiences that feel real, personal, and full of life.

        Our space is open, inclusive, and built for exploration. No pressure, no perfection, no “you must know this first.”
        Just show up with curiosity, jump into the vibe, and let yourself play, experiment, and grow.

        Because here, transformation isn’t serious — it’s alive, it’s loud, and it’s yours.
        </p>

      </div>

    </section>
    <section class="contact">
      <h2 class="contact-title">Need a little more clarity?</h2>

      <p class="contact-text">
        Sometimes one breath — or one message — is all it takes.
      </p>

      <InteractiveButton label="Contact Us" to="/contactUs"></InteractiveButton>

    </section>

  </div>

  <Footer></Footer>

</template>

<style scoped src="@/assets/about-us.css"></style>