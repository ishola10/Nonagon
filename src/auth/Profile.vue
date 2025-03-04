<template>
  <div class="dashboard">
    <aside class="sidebar">
      <nav>
        <div>
      <router-link to="/"><h1>Nonagon.</h1></router-link>
    </div>
        <ul>
          <li><router-link to="/dashboard">Dashboard</router-link></li>
          <li><router-link to="/settings">Settings</router-link></li>
          <li><router-link to="/classes">Classes</router-link></li>
          <li><router-link to="/referrals">Referrals</router-link></li>
        </ul>
      </nav>
    </aside>
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { auth } from "../firebase";
import router from "@/router/index";

const user = ref(null);

onMounted(() => {
  auth.onAuthStateChanged((newUser) => {
    user.value = newUser;
  });
});
</script>

<style>
.dashboard {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  padding-top: 8%;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

nav h1 {
  font-size: 2rem;
  color: var(--primary-color);
  margin: 0;
}

.sidebar nav ul {
  list-style: none;
  padding: 0;
}

.sidebar nav ul li {
  margin-bottom: 15px;
}

.sidebar nav ul li a {
  color: white;
  text-decoration: none;
  font-size: 16px;
  display: block;
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.sidebar nav ul li a:hover {
  background-color: #34495e;
}

.content {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
}

h2 {
  margin-top: 0;
}
</style>
