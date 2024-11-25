<template>
    <div class="contact-page">
      <!-- Banner Section -->
      <div class="banner">
        <div class="banner-content">
          <h1>Contact Us</h1>
          <p>We're here to help. Get in touch with us today!</p>
        </div>
      </div>
  
      <!-- Contact Form Section -->
      <div class="contact-container">
        <p>For any inquiries or support, please fill out the form below:</p>
        <div class="contact-form">
          <label for="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            required
          />
  
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            required
          />
  
          <label for="message">Message:</label>
          <textarea
            id="message"
            name="message"
            placeholder="Your Message"
            required
          ></textarea>
  
          <button>Submit</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // Script setup (if needed for additional functionality)
  </script>
  
  <style scoped>
  /* General Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  /* Root Variables */
  :root {
    --bg-color: #1e3a8a;
    --accent-color: #2563eb;
    --text-color: #333;
    --light-color: #f3f4f6;
    --secondary-color: #e5e7eb;
  }
  
  /* Contact Page Styles */
  .contact-page {
    font-family: 'Arial', sans-serif;
    color: var(--text-color);
  }
  
  /* Banner Section */
  .banner {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url('https://via.placeholder.com/1920x600') center/cover no-repeat;
    text-align: center;
    color: white;
    padding: 5rem 1rem;
  }
  
  .banner-content {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .banner h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .banner p {
    font-size: 1.25rem;
  }
  
  /* Contact Form Container */
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
  
  /* Contact Form Styles */
  .contact-form {
    display: flex;
    flex-direction: column;
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
  