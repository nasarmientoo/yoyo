<script setup lang="js">
import { useRouter } from 'vue-router'
const props = defineProps({
  label: {              //Button text
    type: String,
    required: true
  },
  to: {                 //Button link
    type: String,
    required: true
  },
  width: {
    type: String,
    required: false,
    default: 310
  }
});

const button_width = computed(() => ({
  width: `${props.width}px`,
}));

const router = useRouter()

function handleClick() {
  router.push(props.to)
}
</script>

<template>

  <button class="interactive-button" :style="button_width" @click="handleClick">{{ label }}</button>

</template>

<style scoped>
  .interactive-button{
    height: 55px;
    flex-shrink: 0;
    background-color: #0d0d39;
    color: #FFFFFF;
    border-radius: 6px;
    border: 0;
    font-family: "Montserrat", sans-serif;

    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    transition: background-color 0.3s ease;
  }

  .interactive-button:hover {
    background-color: #060620;
  }

  .interactive-button:active {
    background-color: #060620;
  }
</style>