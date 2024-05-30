<template>
  <div class="faq-container">
    <h2>Frequently Asked Questions</h2>
    <div v-for="faq in faqs" :key="faq.question" class="faq-item">
      <div class="faq-question" @click="toggleAnswer(faq)">
        <h3>{{ faq.question }}</h3>
        <span class="btns" v-if="faq.showAnswer">−</span>
        <span class="btns" v-else>+</span>
      </div>
      <div v-if="faq.showAnswer" class="faq-answer">
        <p>{{ faq.answer }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const faqs = reactive([
  {
    question: "What is this platform?",
    answer:
      "This platform provides interactive simulations to help you understand and visualize complex physical phenomena in electric circuits, fluid dynamics, and thermodynamics.",
    showAnswer: false,
  },
  {
    question: "How do I start a simulation?",
    answer:
      "To start a simulation, navigate to the respective section (Electric Circuits, Fluid Dynamics, or Thermodynamics) and select the simulation you want to run.",
    showAnswer: false,
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No, you can access and run the simulations without creating an account. However, creating an account will allow you to save your progress and access additional features.",
    showAnswer: false,
  },
  {
    question: "Is this platform free to use?",
    answer:
      "Yes, the platform is free to use. We aim to provide quality educational resources accessible to everyone.",
    showAnswer: false,
  },
  {
    question: "Can I use these simulations for my classroom?",
    answer:
      "Absolutely! These simulations are designed to be educational tools suitable for both self-learning and classroom use.",
    showAnswer: false,
  },
  {
    question: "Who can I contact for support?",
    answer:
      "If you need assistance, you can contact our support team through the contact form available on our website.",
    showAnswer: false,
  },
]);

const toggleAnswer = (faq) => {
  faq.showAnswer = !faq.showAnswer;
};
</script>

<style scoped>
.faq-container {
  padding: 50px; 
}

h2 {
  color: var(--primary-color);
  text-align: left;
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.faq-item {
    /* margin: 0% auto; */
  margin-bottom: 10px;
  max-width: 600px;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  background-color: var(--secondary-color);
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.faq-answer {
  background-color: transparent;
  border: 1px solid black;
  border-top: none;
  padding: 10px;
  border-radius: 0px 0px 5px 5px;
  color: var(--text-color);
}

.btns {
  font-size: 1.5rem;
  font-weight: bolder;
}
</style>
