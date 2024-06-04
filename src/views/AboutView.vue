<template>
  <div class="about">
    <div class="container">
      <div class="about-banner">
        <h1>AtomAcademy</h1>
        <p>Learn everything about <strong>AtomAcademy</strong></p>
        <router-link to="/signup" class="btn">Sign Up</router-link>
      </div>
      <div class="first-sec">
        <h2>About Us</h2>
        <p>
          AtomAcademy is an online platform that provides interactive physics
          lessons for students of all ages. Our mission is to make learning
          physics fun and engaging by offering a variety of resources, including
          simulations, practice problems, and real-world examples.
        </p>
      </div>

      <div class="team">
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
      </div>

      <div class="features">
        <h2>Features</h2>
        <ul>
          <li>Interactive simulations</li>
          <li>Practice problems</li>
          <li>Real-world examples</li>
        </ul>
      </div>

      <div class="topics">
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
      </div>

      <div class="get-started">
        <h2>Get Started</h2>
        <p>
          Ready to start exploring the world of physics? Sign up for a free
          account today and begin your journey!
        </p>
        <router-link to="/signup" class="btn">Sign Up</router-link>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from './Footer.vue';
</script>

<style scoped>
.about {
  background-color: white;
  color: var(--text-color);
}
.about-banner{
  background-color: var(--primary-color);
  color: white;
  text-align: left;
  padding: 15rem 0 2rem 3rem;
  height: 100vh;
}

.about-banner h1 {
  font-size: 4.5rem;
  color: var(--background-color);
}

.about-banner p {
  font-size: 1.5rem;
}

.about-banner .btn {
  display: inline-block;
  padding: 1rem 2rem;
  background-color: var(--accent-color);
  color: white;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: background-color 0.3s ease;
}


h1, h2 {
  color: var(--primary-color);
}

p {
  line-height: 1.6;
}

.team {
  margin-top: 2rem;
}

.members {
  display: flex;
  gap: 2rem;
}

.member {
  text-align: center;
}

.member img {
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-bottom: 1rem;
}

.features, .topics, .get-started {
  margin-top: 2rem;
}

.features ul, .topics ul {
  list-style: none;
  padding: 0;
}

.features li, .topics li {
  background-color: var(--secondary-color);
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
}

.get-started .btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: white;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.get-started .btn:hover {
  background-color: var(--accent-color);
}
</style>
