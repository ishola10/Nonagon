<template>
  <div class="navbar">
    <div>
      <router-link to="/"><h1>AtomAcademy</h1></router-link>
    </div>
    <div class="links">
      <router-link to="/" active-class="active">Home</router-link>
      <router-link to="/about" active-class="active">About</router-link>
      <div class="topics-container">
        <a class="dr" href="#" @click="toggleTopics" ><p>Topics</p> <img class="down-arrow" src="../assets/images/icons8-down-arrow-64.png" alt="down-arrow"></a>
        <div :class="{ hidden: !showTopics }" class="topic-links">
          <router-link to="/electric-circuit">Electric Circuits</router-link>
          <router-link to="/fluid-dynamics">Fluid Dynamics</router-link>
          <router-link to="/harmonic-motion">Harmonic Motion</router-link>
          <router-link to="/pendulum-swing">Pendulum Swing</router-link>
          <router-link to="/thermo-dynamics">Thermo Dynamics</router-link>
          <router-link to="/wave-patterns">Wave Patterns</router-link>
        </div>
      </div>
      <a href="#faq" active-class="active">FAQs</a>
      <router-link to="/contact" active-class="active">Contact</router-link>
      <router-link to="/chatbot">Chatbot</router-link>

      <!-- <router-link to="/calculator">Calculator</router-link> -->
    </div>
    <div class="links">
        <router-link to="/signup">SignUp</router-link>
        <router-link to="/login">Login</router-link>
        <!-- <router-link to="/profile">Profile</router-link> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const showTopics = ref(false);

const toggleTopics = () => {
  showTopics.value = !showTopics.value;
};
</script>

<style scoped>
.navbar {
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: space-between;
  padding: 1rem 4rem;
  background-color: #333;
  color: white;
  position: relative;
}
.navbar a {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
}

.navbar a.active {
  color: var(--primary-color);
}

.links {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
}

.topics-container {
  position: relative;
}

.topic-links {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #333;
  padding: 0.5rem 1rem; 
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 300%;
  z-index: 1;
}

.dr{
    display: flex;
}

.down-arrow {
  width: 1.4rem;
  height: 1.4rem;
}

.topic-links a {
  color: white;
  text-decoration: none;
  border-bottom: 1px solid white;
}

.hidden {
  display: none;
}
</style>
