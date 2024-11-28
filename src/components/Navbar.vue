<template>
  <div v-if="isNavbarVisible" class="navbar">
    <div>
      <router-link to="/"><h1>Nonagon.</h1></router-link>
    </div>
    <div class="links">
      <router-link to="/about" active-class="active">About</router-link>
      <div class="topics-container">
        <a class="dr" href="#" @click="toggleTopics">
          <p>Topics</p>
          <img
            class="down-arrow"
            src="../assets/images/icons8-down-arrow-64.png"
            alt="down-arrow"
          />
        </a>
        <div :class="{ hidden: !showTopics }" class="topic-links">
          <input
            type="text"
            v-model="searchQuery"
            @input="searchTopics"
            placeholder="Search topics..."
          />
          <div v-if="topics.length > 0">
            <router-link
              v-for="topic in topics"
              :key="topic.title"
              :to="`/topic/${topic.title}`"
              @click="closeTopics"
            >
              {{ topic.title }}
            </router-link>
          </div>
          <div>
            <router-link to="/electric-circuit" @click="closeTopics">Electric Circuits</router-link>
            <router-link to="/fluid-dynamics" @click="closeTopics">Fluid Dynamics</router-link>
            <router-link to="/harmonic-motion" @click="closeTopics">Harmonic Motion</router-link>
            <router-link to="/pendulum-swing" @click="closeTopics">Pendulum Swing</router-link>
            <router-link to="/thermo-dynamics" @click="closeTopics">Thermo Dynamics</router-link>
            <router-link to="/wave-patterns" @click="closeTopics">Wave Patterns</router-link>
          </div>
        </div>
      </div>
      <router-link to="/contact" active-class="active">Contact</router-link>
      <a style="cursor: pointer;" @click="navigateToChatbot" active-class="active">Chatbot</a>
    </div>
    <div class="links">
      <router-link v-if="!isAuthenticated" to="/signup">SignUp</router-link>
      <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
      <router-link v-if="isAuthenticated" to="/profile">Profile</router-link>
      <a v-if="isAuthenticated" href="#" @click="logout">Logout</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";

const isAuthenticated = ref(false);
const showTopics = ref(false);
const searchQuery = ref("");
const isNavbarVisible = ref(true);

const router = useRouter();
const route = useRoute();

interface Topic {
  title: string;
}
const topics = ref<Topic[]>([]);

const toggleTopics = () => {
  showTopics.value = !showTopics.value;
};

const closeTopics = () => {
  showTopics.value = false;
};

const searchTopics = async () => {
  if (searchQuery.value.length > 2) {
    try {
      const response = await axios.get(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=${searchQuery.value}&origin=*`
      );
      topics.value = response.data.query.search.map((result: any) => ({
        title: result.title,
      }));
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  } else {
    topics.value = [];
  }
};

const logout = async () => {
  try {
    await auth.signOut();
    isAuthenticated.value = false;
    router.push("/");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

const navigateToChatbot = () => {
  if (isAuthenticated.value) {
    router.push("/chatbot");
  } else {
    router.push("/login");
  }
};

watch(
  () => route.path,
  (newPath) => {
    const hiddenRoutes = ["/chatbot", "/login", "/signup"];
    isNavbarVisible.value = !hiddenRoutes.includes(newPath);
  }
);

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isAuthenticated.value = !!user;
  });
});
</script>


<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 4rem;
  background-color: #333;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}
.navbar h1 {
  font-size: 2rem;
  color: var(--primary-color);
  margin: 0;
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

.dr {
  display: flex;
}

.down-arrow {
  width: 1.4rem;
  height: 1.4rem;
}

.topic-links input {
  background-color: #222;
  color: white;
  border: 1px solid white;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}

.topic-links a {
  color: white;
  text-decoration: none;
  /* border-bottom: 1px solid white; */
}

.hidden {
  display: none;
}
</style>
