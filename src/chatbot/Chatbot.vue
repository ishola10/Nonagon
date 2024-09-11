<template>
  <div class="chat-container">
    <h1 class="mb-5">Hello, I'm Nonagon AI. Ask me anything</h1>

    <div class="chat-history">
      <div v-for="item in chatHistory" :key="item.id" class="chat-item">
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
          placeholder="Type your question..."
        ></textarea>
        <button type="submit" :disabled="!question.trim().length">
          {{ isLoading ? 'Asking Nonagon AI...' : 'Ask' }}
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
          {{ isListening ? 'Listening...' : 'Voice Input' }}
        </button>
      </div>
    </form>

    <!-- Auth Popup Modal -->
    <div v-if="showAuthPopup" class="auth-popup">
      <div class="auth-popup-content">
        <h3>You need to sign in to ask a question</h3>
        <router-link to="/login" class="auth-link">Login</router-link>
        <router-link to="/signup" class="auth-link">Sign Up</router-link>
        <button @click="showAuthPopup = false" class="close-popup">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useGetGenerativeModelGP } from './useGetGenerativeModelGP.js'
import AIAnswer from './AIAnswer.vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase' // Adjust the path to your Firebase config

const question = ref('')
const answer = ref('')
const isLoading = ref(false)
const chatHistory = ref([])
const selectedLanguage = ref('en')
const isListening = ref(false)
const showAuthPopup = ref(false)
const user = ref(null)

let recognition = null

// Check if the user is authenticated
onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser
  })
})

const fetchAnswer = async () => {
  // If the user is not authenticated, show the login/signup popup
  if (!user.value) {
    showAuthPopup.value = true
    return
  }

  answer.value = ''
  isLoading.value = true

  try {
    answer.value = await useGetGenerativeModelGP(question.value, selectedLanguage.value)
    chatHistory.value.push({ id: Date.now(), question: question.value, answer: answer.value })
  } catch (error) {
    console.error('Error fetching answer:', error)
  } finally {
    isLoading.value = false
    question.value = ''
  }
}

const clearQuestion = () => {
  question.value = ''
  answer.value = ''
}

const toggleListening = () => {
  if (!isListening.value) {
    startListening()
  } else {
    stopListening()
  }
}

const startListening = () => {
  recognition = new webkitSpeechRecognition()
  recognition.continuous = false
  recognition.lang = selectedLanguage.value
  recognition.interimResults = false

  recognition.onstart = () => {
    isListening.value = true
  }

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript
    question.value = transcript
    fetchAnswer()
    isListening.value = false
  }

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error)
    isListening.value = false
  }

  recognition.onend = () => {
    isListening.value = false
  }

  recognition.start()
}

const stopListening = () => {
  recognition.stop()
  isListening.value = false
}
</script>

<style scoped>
.chat-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 10px;
}

.mb-5 {
  margin-bottom: 2rem;
}

.chat-history {
  max-height: 300px;
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

/* Auth Popup Modal */
.auth-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

.auth-link {
  display: block;
  margin-top: 10px;
  text-decoration: none;
  color: #007bff;
}

.close-popup {
  margin-top: 15px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
