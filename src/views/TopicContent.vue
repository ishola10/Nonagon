<template>
    <div>
      <h1>{{ title }}</h1>
      <p v-if="content" v-html="content"></p>
      <p v-else>Loading...</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  const route = useRoute();
  const title = route.params.title;
  const content = ref('');
  
  const fetchContent = async () => {
    try {
      const response = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`);
      content.value = response.data.extract_html;
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };
  
  onMounted(fetchContent);
  </script>
  
  <style scoped>

  </style>
  