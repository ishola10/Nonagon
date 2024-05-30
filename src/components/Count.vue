<template>
  <div class="counter">
    <div class="count-display">{{ count }} +</div>
    <p>Learners to be Satisfied</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";

const count = ref<number>(0);
const maxLimit = 2000;
let interval: number | undefined;

const startCounting = () => {
  if (interval) {
    clearInterval(interval);
  }
  interval = window.setInterval(() => {
    if (count.value < maxLimit) {
      count.value++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        count.value = 0;
        startCounting();
      }, 3000);
    }
  }, 0);
};

onMounted(() => {
  startCounting();
});

onUnmounted(() => {
  if (interval) {
    clearInterval(interval);
  }
});
</script>

<style scoped>
.counter {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
    background-color: var(--secondary-color);
}

.count-display {
  font-size: 5rem;
  font-weight: bolder;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 20px;
  color: var(--text-color);
}

p {
  font-size: 1.5rem;
  font-weight: bolder;
  font-family: Arial, Helvetica, sans-serif;
    color: var(--accent-color);
}
</style>
