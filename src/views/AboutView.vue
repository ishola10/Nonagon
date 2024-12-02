<template>
  <div class="about">
    <div class="about-banner">
      <div class="banner-content">
        <h1>Nonagon.</h1>
        <p>Learn everything about <strong>Nonagon.</strong></p>
        <h3>
          Nonagon is an online platform that provides interactive physics
          simulation for Nigerian students of all ages. Our mission is to make learning
          physics fun and engaging by offering a variety of resources, including
          simulations, practice problems, and real-world examples.
        </h3>

        <router-link to="/signup" class="btn">Sign Up</router-link>
      </div>
    </div>

    <div class="container">
      <section class="first-sec">
        <h2>About Us</h2>
        <p>
          Nonagon is an online platform that provides interactive physics
          simulation for Nigerian students of all ages. Our mission is to make learning
          physics fun and engaging by offering a variety of resources, including
          simulations, practice problems, and real-world examples. Whether you
          are a high school student preparing for an exam or a lifelong learner
          interested in exploring the wonders of the universe, Nonagon has
          something for everyone. Our team of experienced educators and
          developers is dedicated to creating high-quality content that is
          accessible to learners of all levels. Join us on this exciting journey
          and discover the beauty of physics!
        </p>
      </section>

      <section class="team">
        <h2>Our Team</h2>
        <div class="members">
          <div class="member">
            <img src="../assets/images/me.jpg" alt="team-member-1" />
            <h3>Muhammed Badmus</h3>
            <h4>Lead Developer</h4>
            <p>
              Muhammed is a Frontend developer with a passion for creating
              innovative educational tools. He has a background in physics and
              computer science and is excited to share his knowledge with
              learners around the world.
            </p>
            <a href="https://www.linkedin.com/in/muhammed-badmus-a02303258/">Linkedin</a>
          </div>
        </div>
      </section>

      <section class="features">
        <h2>Features</h2>
        <ul>
          <li>
            <h3>Interactive simulations</h3>
            <p>
              Explore the laws of physics through our interactive simulations.
              Visualize complex concepts and experiment with different scenarios
              to deepen your understanding.
            </p>
          </li>
          <li>
            <h3>Practice problems</h3>
            <p>
              Test your knowledge and skills with our collection of practice
              problems. Practice solving physics problems and receive instant
              feedback to track your progress.
            </p>
          </li>
          <li>
            <h3>Real-world examples</h3>
            <p>
              Discover the relevance of physics in the real world with our
              curated collection of real-world examples. Learn how physics
              impacts everyday life and gain a new appreciation for the subject.
            </p>
          </li>
        </ul>
      </section>

      <section class="topics">
        <h2>Topics</h2>
        <p style="margin-bottom: 1rem;">Nonagon covers a wide range of topics, including:</p>
        <ul>
          <li>
            <h3>Classical Mechanics</h3>
            <p>
              Learn about the fundamental laws of motion and the principles of
              classical mechanics. Explore concepts such as force, energy, and
              momentum through interactive simulations and real-world examples.
            </p>
          </li>
          <li>
            <h3>Quantum Mechanics</h3>
            <p>
              Dive into the fascinating world of quantum mechanics and discover
              the strange and counterintuitive nature of the quantum realm.
              Explore topics such as superposition, entanglement, and quantum
              tunneling through engaging simulations and practice problems.
            </p>
          </li>
          <li>
            <h3>Thermodynamics</h3>
            <p>
              Explore the laws of thermodynamics and learn about the behavior of
              heat and energy in physical systems. Discover the concepts of
              temperature, entropy, and heat transfer through interactive
              simulations and real-world examples.
            </p>
          </li>
          <li>
            <h3>Electromagnetism</h3>
            <p>
              Learn about the fundamental forces of electromagnetism and the
              behavior of electric and magnetic fields. Explore topics such as
              Coulomb's law, Faraday's law, and Maxwell's equations through
              engaging simulations and practice problems.
            </p>
          </li>
          <li>
            <h3>Optics</h3>
            <p>
              Discover the principles of optics and the behavior of light and
              electromagnetic waves. Explore topics such as reflection,
              refraction, and diffraction through interactive simulations and
              real-world examples.
            </p>
          </li>
          <li>
            <h3>Modern Physics</h3>
            <p>
              Explore the cutting-edge concepts of modern physics, including
              relativity, quantum field theory, and particle physics. Learn
              about the latest developments in the field and gain a deeper
              understanding of the nature of the universe.
            </p>
          </li>
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
import Footer from "./Footer.vue";
</script>

<style scoped>
.about {
  font-family: "Arial", sans-serif;
  color: var(--text-color);
}

.about-banner {
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

.about-banner h1 {
  font-size: 6rem;
  -webkit-text-stroke: 2px var(--accent-color);
  color: transparent;
}

.about-banner p {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.about-banner strong {
  color: var(--accent-color);
}

.about-banner h3 {
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: var(--secondary-color);
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

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

section {
  margin-bottom: 2rem;
}

h2 {
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 3rem;
  font-weight: bolder;
  font-family: "Arial", sans-serif;
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
  align-items: center;
}

.member {
  text-align: center;
  width: 400px;
  padding: 1rem;
  border: 2px solid var(--secondary-color);
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
  gap: 1rem;
}

li {
  background-color: var(--secondary-color);
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

li:hover {
  background-color: var(--accent-color);
  transform: translateY(-5px);
}

li h3 {
  margin-bottom: 0.25rem;
}

li p {
  font-size: 0.9rem;
}

/* Get Started */
.get-started {
  text-align: center;
  padding: 2rem;
  max-width: 600px;
  margin: 10% auto;
  background-color: var(--bg-color);
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.get-started h2 {
  color: white;
}

.get-started p {
  margin-bottom: 2rem;
  color: var(--secondary-color);
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
