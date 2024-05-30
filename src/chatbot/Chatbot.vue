<template>
  <div>
    <h1 class="mb-5">Hello I'm Gemini AI, ask me anything</h1>

    <form class="mb-5" @submit.prevent="fetchAnswer">
      <div>
        <textarea name="question" id="question" cols="30" rows="10" v-model="question"></textarea>
      </div>
      <div>
        <button type="submit" :disabled="!question.trim().length">
          {{ isLoading ? 'Asking Gemini...' : 'Ask' }}
        </button>
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

    <div class="mb-10">
      <AIAnswer :answer="answer" />
    </div>

    <div>
      <h2>Chat History</h2>
      <ul>
        <li v-for="item in chatHistory" :key="item.id">
          <strong>{{ item.question }}</strong>: {{ item.answer }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useGetGenerativeModelGP } from './useGetGenerativeModelGP.js'
import AIAnswer from './AIAnswer.vue'

const question = ref('')
const answer = ref('')
const isLoading = ref(false)
const chatHistory = ref([])
const selectedLanguage = ref('en') // Default language is English
const isListening = ref(false)

let recognition = null

const fetchAnswer = async () => {
  answer.value = ''
  isLoading.value = true

  try {
    answer.value = await useGetGenerativeModelGP(question.value, selectedLanguage.value)
    // Store in chat history
    chatHistory.value.unshift({ id: Date.now(), question: question.value, answer: answer.value })
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
.mb-5 {
  margin-bottom: 5rem;
}

.mb-10 {
  margin-bottom: 10rem;
}
</style>
