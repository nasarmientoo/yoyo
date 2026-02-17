<script setup lang="js">
  import { useRouter } from 'vue-router'
  const props = defineProps({
    label: {            //Card description
      type: String,
      required: true
    },
    to: {               //Card link
      type: String,
      required: true
    },
    img_src: {          //Card image
      type: String,
      required: true
    },
    // Geometrical parameters
    card_width: {
      type: String,
      required: false,
      default: 300
    },
    card_height: {
      type: String,
      required: false,
      default: 346
    }
  })

  const card_size = computed(() => ({
    height: `${props.card_height}px`,
    width: `${props.card_width}px`,
  }));

  const img_size = computed(() => ({
    height: `${props.card_height-46}px`,
    width: `${props.card_width}px`,
  }));

  const desc_size = computed(() => ({
    height: `46px`,
    width: `${props.card_width}px`,
  }));

  const router = useRouter()

  function handleClick() {
    router.push(props.to)
  }
</script>

<template>

  <div @click="handleClick" class="card-full" :style="card_size">
    <img :src="img_src" :alt="label+' picture'" class="card-image" :style="img_size">

    <div class="card-description" :style="desc_size">
      <p>{{label}}</p>

    </div>

  </div>

</template>

<style scoped>
  .card-full{
    flex-shrink: 0;
    border-radius: 20px;
    overflow: hidden;
    transition: transform 0.1s ease, box-shadow 0.1s ease;
    cursor: pointer;
  }
  .card-full:hover {
    transform: scale(1.01);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  .card-image {
    display: flex;
    object-fit: cover;
    object-position: top center;
  }
  .card-description{
    height: 46px;
    flex-shrink: 0;
    background-color: #D5D5D5;

    display: flex;
    align-items: center;
    justify-content: center;

    color: #000;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
</style>