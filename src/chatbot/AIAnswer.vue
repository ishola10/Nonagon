<template>
    <div>
      <p v-if="answer">{{ answer }}</p>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps({
    answer: {
      type: String,
      default: ''
    }
  })
  </script>
  