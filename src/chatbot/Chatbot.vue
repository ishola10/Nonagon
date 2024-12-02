<template>
  <div class="chat-app">
    <aside class="sidebar">
      <button @click="goBack">< Back</button>
      <button class="new-chat-btn" @click="createNewTab">+ New Chat</button>
      <div class="chat-tabs">
        <div
          v-for="(tab, index) in chatTabs"
          :key="index"
          :class="{ active: activeTab === index }"
          class="chat-tab"
          @click="switchTab(index)"
        >
          Chat {{ index + 1 }}
        </div>
      </div>
    </aside>

    <div class="chat-container">
      <h1 class="mb-5">Hello, I'm Nonagon AI. Ask me anything</h1>

      <div class="chat-history">
        <div
          v-for="item in chatTabs[activeTab]?.history || []"
          :key="item.id"
          class="chat-item"
        >
          <div class="user-message">
            <strong>You:</strong> {{ item.question }}
          </div>
          <div class="ai-message">
            <strong>Nonagon AI:</strong> {{ item.answer }}
          </div>
        </div>
      </div>

      <form class="chat-input-form" @submit.prevent="fetchAnswer">
        <div class="input-group">
          <textarea
            name="question"
            id="question"
            rows="3"
            v-model="question"
            placeholder="Type your question or use voice input..."
          ></textarea>
          <button type="submit" :disabled="!question.trim().length">
            {{ isLoading ? "Asking Nonagon AI..." : "Ask" }}
          </button>
        </div>
        <div class="chat-options">
          <button type="button" @click="clearQuestion">Clear</button>
          <select v-model="selectedLanguage">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
          <button @click="toggleListening" :disabled="isListening">
            {{ isListening ? "Listening..." : "Voice Input" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useGetGenerativeModelGP } from "./useGetGenerativeModelGP.js";
import router from "@/router/index.ts";

const goBack = () => {
  router.go(-1);
};

const question = ref("");
const isLoading = ref(false);
const selectedLanguage = ref("en");
const isListening = ref(false);

const chatTabs = ref([]);
const activeTab = ref(0);

let recognition = null;

const loadChatsFromStorage = () => {
  const savedChats = localStorage.getItem("chatTabs");
  if (savedChats) {
    chatTabs.value = JSON.parse(savedChats);
    activeTab.value = parseInt(localStorage.getItem("activeTab")) || 0;
  } else {
    chatTabs.value = [{ history: [] }];
  }
};

const saveChatsToStorage = () => {
  localStorage.setItem("chatTabs", JSON.stringify(chatTabs.value));
  localStorage.setItem("activeTab", activeTab.value.toString());
};

watch(chatTabs, saveChatsToStorage, { deep: true });
watch(activeTab, saveChatsToStorage);

onMounted(() => {
  loadChatsFromStorage();
});

const fetchAnswer = async () => {
  isLoading.value = true;

  try {
    const aiResponse = await useGetGenerativeModelGP(
      question.value,
      selectedLanguage.value
    );
    chatTabs.value[activeTab.value].history.push({
      id: Date.now(),
      question: question.value,
      answer: aiResponse,
    });
    question.value = "";
  } catch (error) {
    console.error("Error fetching answer:", error);
  } finally {
    isLoading.value = false;
  }
};

const createNewTab = () => {
  chatTabs.value.push({ history: [] });
  activeTab.value = chatTabs.value.length - 1;
};

const switchTab = (index) => {
  activeTab.value = index;
};

const clearQuestion = () => {
  question.value = "";
};

const toggleListening = () => {
  if (!isListening.value) {
    startListening();
  } else {
    stopListening();
  }
};

const startListening = () => {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.lang = selectedLanguage.value;
  recognition.interimResults = false;

  recognition.onstart = () => {
    isListening.value = true;
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    question.value = transcript;
    fetchAnswer();
    isListening.value = false;
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    isListening.value = false;
  };

  recognition.onend = () => {
    isListening.value = false;
  };

  recognition.start();
};

const stopListening = () => {
  if (recognition) {
    recognition.stop();
    isListening.value = false;
  }
};
</script>


<style scoped>
.chat-app {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.new-chat-btn {
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 30%;
  cursor: pointer;
}

.new-chat-btn:hover {
  background-color: #0056b3;
}

.chat-tabs {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.chat-tab {
  padding: 0.5rem;
  background-color: #34495e;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  font-size: 1rem;
}

.chat-tab:hover {
  background-color: #3e536d;
}

.chat-tab.active {
  background-color: #007bff;
  font-weight: bold;
}

.chat-container {
  flex-grow: 1;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.mb-5 {
  margin-bottom: 2rem;
}

.chat-history {
  flex-grow: 1;
  max-height: calc(100vh - 300px);
  overflow-y: auto;
  margin-bottom: 1.5rem;
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.chat-item {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.user-message {
  background-color: #d1e7dd;
  padding: 10px;
  border-radius: 10px;
  align-self: flex-end;
  max-width: 70%;
  text-align: right;
}

.ai-message {
  background-color: #ffeeba;
  padding: 10px;
  border-radius: 10px;
  align-self: flex-start;
  max-width: 70%;
  text-align: left;
}

.chat-input-form {
  display: flex;
  flex-direction: column;
}

.input-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

textarea {
  flex-grow: 1;
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  resize: none;
}

button {
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background-color: #007bff;
  color: white;
}

button[disabled] {
  background-color: #6c757d;
}

.chat-options {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

select {
  padding: 0.5rem;
  border-radius: 10px;
}
</style>
