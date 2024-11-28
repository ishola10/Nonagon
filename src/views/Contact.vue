<template>
  <div class="contact-page">
    <div class="banner">
      <div class="banner-content">
        <h1>Contact Us</h1>
        <p>We're here to help. Get in touch with us today!</p>
        <h3>For any inquiries or support, please fill out the form below:</h3>
        <div class="bouncing-arrow">⬇️</div>
      </div>
    </div>

    <div class="contact-container">
      <p>For any inquiries or support, please fill out the form below:</p>
      <div class="contact-form">
        <label for="name"
          >Name: <br />
          <br />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            required
          />
        </label>

        <label for="email"
          >Email: <br />
          <br />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            required
          />
        </label>

        <label for="message"
          >Message: <br />
          <br />
          <textarea
            id="message"
            name="message"
            placeholder="Your Message"
            required
          ></textarea>
        </label>

        <button>Submit</button>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from "./Footer.vue";
</script>

<style scoped>
.contact-page {
  font-family: "Arial", sans-serif;
  color: var(--text-color);
}

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

/* Form  */
.contact-container {
  padding: 2rem 1rem;
  max-width: 600px;
  margin: 2rem auto;
  text-align: center;
}

.contact-container p {
  margin-bottom: 1rem;
  font-size: 1rem;
  color: var(--text-color);
}

.contact-form {
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 1.5rem;
  background-color: var(--light-color);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.contact-form label {
  font-weight: bold;
  font-size: 0.9rem;
}

.contact-form input,
.contact-form textarea {
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid var(--secondary-color);
  border-radius: 4px;
  width: 100%;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.contact-form input:focus,
.contact-form textarea:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 4px var(--accent-color);
  outline: none;
}

.contact-form textarea {
  resize: vertical;
  height: 120px;
}

.contact-form button {
  padding: 0.8rem 1rem;
  font-size: 1rem;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.contact-form button:hover {
  background-color: #1e40af;
}

/* Responsive Design */
@media (max-width: 768px) {
  .banner h1 {
    font-size: 2.5rem;
  }

  .banner p {
    font-size: 1rem;
  }

  .contact-container {
    padding: 1rem;
  }

  .contact-form {
    padding: 1.5rem;
  }
}
</style>
