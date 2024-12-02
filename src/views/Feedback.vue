<template>
  <div>
    <div class="banner">
      <div class="banner-content">
        <h1>Feedback</h1>
        <p>Help us improve by providing your valuable feedback.</p>
        <h3>
          For any feedback or suggestions, please fill out the form below:
        </h3>
        <div class="bouncing-arrow">⬇️</div>
      </div>
    </div>

    <div class="feedback-form">
      <form @submit.prevent="submitFeedback">
        <label for="name">Name*</label>
        <input
          type="text"
          id="name"
          v-model="formData.name"
          placeholder="Enter your name"
          required
        />

        <label for="email">Email*</label>
        <input
          type="email"
          id="email"
          v-model="formData.email"
          placeholder="Enter your email"
          required
        />

        <label for="schoolLevel">School Level*</label>
        <select id="schoolLevel" v-model="formData.schoolLevel" required>
          <option value="">Select your school level</option>
          <option value="university">University Student</option>
          <option value="teacher">Teacher</option>
          <option value="secondary">Secondary School Student</option>
        </select>

        <label for="topic">Feedback Topic*</label>
        <select
          id="topic"
          v-model="formData.topic"
          @change="handleTopicChange"
          required
        >
          <option value="">Select a topic</option>
          <option value="simple-pendulum">Simple Pendulum</option>
          <option value="electric-circuits">Electric Circuits</option>
          <option value="fluid-dynamics">Fluid Dynamics</option>
          <option value="thermodynamics">Thermodynamics</option>
          <option value="waves">Waves</option>
          <option value="harmonic-motion">Harmonic Motion</option>
          <option value="others">Others</option>
        </select>

        <div v-if="formData.topic === 'others'" class="other-topic">
          <label for="otherTopic">Specify Topic*</label>
          <input
            type="text"
            id="otherTopic"
            v-model="formData.otherTopic"
            placeholder="Specify your topic"
            required
          />
        </div>

        <label for="feedback">Feedback*</label>
        <textarea
          id="feedback"
          v-model="formData.feedback"
          placeholder="Enter your feedback"
          required
        ></textarea>

        <label for="suggestion">Suggestions</label>
        <textarea
          id="suggestion"
          v-model="formData.suggestion"
          placeholder="Any suggestions for us?"
        ></textarea>

        <button type="submit">Submit Feedback</button>
      </form>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import Footer from "./Footer.vue";

const formData = ref({
  name: "",
  email: "",
  schoolLevel: "",
  topic: "",
  otherTopic: "",
  feedback: "",
  suggestion: "",
});

const handleTopicChange = () => {
  if (formData.value.topic !== "others") {
    formData.value.otherTopic = "";
  }
};

const submitFeedback = async () => {
  try {
    const feedbackData = { ...formData.value };
    if (feedbackData.topic === "others" && feedbackData.otherTopic) {
      feedbackData.topic = feedbackData.otherTopic;
    }
    delete feedbackData.otherTopic;

    const feedbackCollection = collection(db, "feedback");
    await addDoc(feedbackCollection, feedbackData);

    alert("Feedback submitted successfully!");
    formData.value = {
      name: "",
      email: "",
      schoolLevel: "",
      topic: "",
      otherTopic: "",
      feedback: "",
      suggestion: "",
    };
  } catch (error) {
    console.error("Error submitting feedback:", error);
    alert("Failed to submit feedback. Please try again.");
  }
};
</script>

<style scoped>
/* Banner Styles */
.banner {
  background: var(--bg-color);
  color: white;
  text-align: center;
  padding: 12rem 1rem;
  height: 100vh;
}

.banner-content {
  max-width: 800px;
  margin: 0 auto;
}

.banner h1 {
  font-size: 6rem;
  -webkit-text-stroke: 2px var(--accent-color);
  color: transparent;
}

.banner p {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.banner h3 {
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: var(--secondary-color);
}

.banner .bouncing-arrow {
  font-size: 2rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
}

/* Form Styles */
.feedback-form {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.feedback-form form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feedback-form label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.feedback-form input,
.feedback-form select,
.feedback-form textarea {
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
}

.feedback-form textarea {
  resize: vertical;
}

.feedback-form button {
  background-color: #4caf50;
  color: white;
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.feedback-form button:hover {
  background-color: #45a049;
}
</style>
