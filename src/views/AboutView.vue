<template>
  <div class="about">
    <div class="about-banner">
      <div class="banner-content">
        <h1>AtomAcademy</h1>
        <p>Learn everything about <strong>AtomAcademy</strong></p>
        <router-link to="/signup" class="btn">Sign Up</router-link>
      </div>
    </div>

    <div class="container">
      <section class="first-sec">
        <h2>About Us</h2>
        <p>
          AtomAcademy is an online platform that provides interactive physics
          lessons for students of all ages. Our mission is to make learning
          physics fun and engaging by offering a variety of resources, including
          simulations, practice problems, and real-world examples.
        </p>
      </section>

      <section class="team">
        <h2>Our Team</h2>
        <div class="members">
          <div class="member">
            <img src="../assets/images/team-member-1.jpg" alt="team-member-1" />
            <h3>John Doe</h3>
            <p>Lead Developer</p>
          </div>
          <div class="member">
            <img src="../assets/images/team-member-2.jpg" alt="team-member-2" />
            <h3>Jane Doe</h3>
            <p>Designer</p>
          </div>
          <div class="member">
            <img src="../assets/images/team-member-3.jpg" alt="team-member-3" />
            <h3>James Smith</h3>
            <p>Content Creator</p>
          </div>
        </div>
      </section>

      <section class="features">
        <h2>Features</h2>
        <ul>
          <li>Interactive simulations</li>
          <li>Practice problems</li>
          <li>Real-world examples</li>
        </ul>
      </section>

      <section class="topics">
        <h2>Topics</h2>
        <p>AtomAcademy covers a wide range of topics, including:</p>
        <ul>
          <li>Classical Mechanics</li>
          <li>Quantum Mechanics</li>
          <li>Thermodynamics</li>
          <li>Electromagnetism</li>
          <li>Optics</li>
          <li>Fluid Dynamics</li>
          <li>And much more!</li>
        </ul>
      </section>

      <section class="get-started">
        <h2>Get Started</h2>
        <p>
          Ready to start exploring the world of physics? Sign up for a free
          account today and begin your journey!
        </p>
        <router-link to="/signup" class="btn">Sign Up</router-link>
      </section>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from './Footer.vue';
</script>

<style scoped>
.about {
  font-family: 'Arial', sans-serif;
  color: var(--text-color);
}

.about-banner {
  background: var(--bg-color);
  color: white;
  text-align: center;
  padding: 12rem 1rem;
  height: 90vh;
}

.banner-content {
  max-width: 600px;
  margin: 0 auto;
}

.about-banner h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.about-banner p {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
}

.about-banner .btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--accent-color);
  color: white;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.about-banner .btn:hover {
  background-color: #1e40af;
}

/* Container Styles */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

/* Section Styles */
section {
  margin-bottom: 2rem;
}

h2 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

p {
  line-height: 1.6;
}

/* Team Section */
.members {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

.member {
  text-align: center;
  width: 200px;
}

.member img {
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-bottom: 0.5rem;
}

.member h3 {
  margin-bottom: 0.25rem;
}

ul {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

li {
  background-color: var(--secondary-color);
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
}

/* Get Started */
.get-started {
  text-align: center;
}

.get-started .btn {
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.get-started .btn:hover {
  background-color: var(--accent-color);
}

/* Responsive Design */
@media (max-width: 768px) {
  .about-banner h1 {
    font-size: 2.5rem;
  }

  .about-banner p {
    font-size: 1rem;
  }

  .members {
    flex-direction: column;
    align-items: center;
  }
}
</style>
