<template>
  <div class="home-container">
    <section class="hero">
      <div class="hero-content">
        <div class="hero-content-text">
          <h2>Explore the Wonders of Physics</h2>
          <p>
            Helping Nigerian students understand physics concepts through
            interactive simulations and hands-on experimentation.
          </p>
          <a href="/signup" class="cta-button">Get Started</a>
        </div>
        <div class="home-content-image">
          <img
            src="../assets/images/image-moon.d287d07182de3015952f.png"
            alt="moon"
          />
        </div>
      </div>
      <canvas ref="heroCanvas" class="hero-canvas"></canvas>
    </section>

    <section class="description">
      <div class="container">
        <h2 class="text-shadows">Understanding Physics Made Easy</h2>
        <p>
          Our platform offers a collection of interactive simulations designed
          to make complex physics concepts accessible to learners of all levels.
          Whether you're a student, educator, or enthusiast, explore the wonders
          of physics through hands-on experimentation and visualization.
        </p>
      </div>
    </section>

    <div class="features">
      <img
        class="features_border"
        src="../assets/images/Rulebase - Google Chrome 5_15_2024 3_02_41 PM.png"
        alt="border"
      />
      <section class="features_container">
        <h2>Key Features</h2>
        <div class="feature-container">
          <div class="feature">
            <div>
              <img
                src="../assets/images/icon-simulation.png"
                alt="simulation"
              />
            </div>
            <div>
              <h3>Interactive Simulations</h3>
              <p>
                Engage with physics concepts through interactive simulations.
              </p>
            </div>
          </div>
          <div class="feature">
            <div>
              <img src="../assets/images/icon-learning.jpg" alt="learning" />
            </div>
            <div>
              <h3>Enhanced Learning</h3>
              <p>
                Accelerate your understanding of physics with hands-on learning
                experiences.
              </p>
            </div>
          </div>
          <div class="feature">
            <div>
              <img
                src="../assets/images/icon-experiment.jpg"
                alt="experiment"
              />
            </div>
            <div>
              <h3>Experimental Exploration</h3>
              <p>
                Conduct virtual experiments to observe real-world phenomena.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div>
      <img
        class="mission-border"
        src="../assets/images/Untitled-fotor-20240515173647.png"
        alt="mission-border"
      />
      <div class="mission" ref="missionSection">
        <div class="mission-container">
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide a platform that empowers learners to
            explore the wonders of physics through interactive simulations and
            hands-on experimentation. We believe that by making physics
            accessible and engaging, we can inspire a new generation of
            scientists and innovators.
          </p>
        </div>
        <Count class="counting" ref="countComponent" />
      </div>
    </div>

    <div id="faq">
      <Faq class="faq" />
      <div id="loader">
        <div id="box"></div>
        <div id="hill"></div>
      </div>
    </div>


    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import Count from "@/components/Count.vue";
import Faq from "@/components/Faq.vue";
import Footer from "@/views/Footer.vue";

const heroCanvas = ref<HTMLCanvasElement | null>(null);
const missionSection = ref<HTMLDivElement | null>(null);
const countComponent = ref(null);

const drawHeroAnimation = () => {
  const canvas = heroCanvas.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
  const numParticles = 100;

  const createParticles = () => {
    particles = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 2 + 1,
      });
    }
  };

  const animateParticles = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.fill();
    });
    requestAnimationFrame(animateParticles);
  };

  createParticles();
  animateParticles();
};

onMounted(() => {
  const canvas = heroCanvas.value;
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  drawHeroAnimation();

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        nextTick(() => {
          if (countComponent.value) {
            (countComponent.value as any).startCounting();
          }
        });
      }
    },
    { threshold: 0.1 }
  );

  if (missionSection.value) {
    observer.observe(missionSection.value);
  }
});
</script>

<style scoped>
.hero {
  position: relative;
  margin-top: 5%;
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    135deg,
    var(--background-color),
    var(--secondary-color)
  );
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content {
  z-index: 2;
  color: var(--text-color);
  text-align: center;
  display: flex;
  align-items: center;
}

.hero-content-text {
  flex: 1;
  padding: 0 50px;
  text-align: left;
}

.hero-content h2 {
  font-size: 3.5rem;
  font-weight: bolder;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.home-content-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-content-image img {
  width: 200px;
  height: 200px;
  animation: spin 15s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.hero p {
  font-size: 1.5em;
  margin: 20px 0;
}

.cta-button {
  padding: 10px 20px;
  background-color: var(--accent-color);
  color: var(--text-color);
  text-decoration: none;
  border-radius: 5px;
}

.hero-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.simulations {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.simulations > * {
  margin: 20px 0;
}

.description {
  /* background-color: var(--background-color); */
  padding: 8% 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 50px;
  align-items: center;
}

.container h2 {
  font-size: 4.5rem;
  margin-bottom: 20px;
  color: var(--text-color);
}

.text-shadows {
  text-transform: uppercase;
  font-family: verdana;
  text-shadow: 1px 1px 1px var(--accent-color), 1px 2px 1px var(--accent-color),
    1px 3px 1px var(--accent-color), 1px 4px 1px var(--accent-color),
    1px 5px 1px var(--accent-color), 1px 6px 1px var(--accent-color),
    1px 7px 1px var(--accent-color), 1px 8px 1px var(--accent-color),
    1px 9px 1px var(--accent-color), 1px 10px 1px var(--accent-color),
    1px 18px 6px var(--background-color), 1px 30px 60px var(--background-color);
}

.container p {
  font-size: 1.5rem;
  color: var(--accent-color);
}

.features {
  /* margin-bottom: 5%; */
  background-color: #185f77;
  padding-bottom: 5%;
}

.features_border {
  width: 100%;
  height: 100%;
}

.features_container {
  margin: 0% auto;
  max-width: 1100px;
}

.features h2 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.feature-container {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: var(--text-color);
  border-radius: 10px;
}

.feature:nth-of-type(1) {
  background-color: var(--background-color);
}

.feature:nth-of-type(2) {
  background-color: var(--text-color);
}

.feature:nth-of-type(3) {
  background-color: var(--background-color);
}

.feature img {
  width: 300px;
  height: 300px;
  margin-right: 20px;
}

.feature h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: black;
  font-weight: bolder;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.feature p {
  font-size: 1rem;
  color: white;
}

.mission {
  background-color: var(--accent-color);
  padding: 5%;
  display: flex;
  gap: 50px;
  margin-top: -2%;
}

.mission-border {
  width: 1263px;
  height: 50px;
}

.mission-container {
  text-align: left;
  max-width: 500px;
}

.mission-container h2 {
  font-size: 3rem;
  margin-bottom: 20px;
  color: var(--text-color);
}

.mission-container p {
  font-size: 1.5rem;
  color: var(--secondary-color);
}

.counting {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}


#loader {
  position: absolute;
  top: 420%;
  left: 70%;
  margin-top: -2.7em;
  margin-left: -2.7em;
  width: 5.4em;
  height: 5.4em;
  background-color: transparent;
}

#hill {
  position: absolute;
  width: 7.1em;
  height: 17.1em;
  top: 1.7em;
  left: 1.7em;
  background-color: transparent;
  border-left: .25em solid red;
  transform: rotate(45deg);
}

#hill:after {
  content: '';
  position: absolute;
  width: 7.1em;
  height: 7.1em;
  left: 0;
  background-color: transparent;
}

#box {
  position: absolute;
  left: 0;
  bottom: -3.5em;
  width: 3em;
  height: 3em;
  background-color: transparent;
  border: .25em solid var(--text-color);
  border-radius: 15%;
  transform: translate(0, -1em) rotate(-45deg);
  animation: push 2.5s cubic-bezier(.79, 0, .47, .97) infinite;
}

@keyframes push {
  0% {
    transform: translate(0, -1em) rotate(-45deg);
  }
  5% {
    transform: translate(0, -1em) rotate(-50deg);
  }
  20% {
    transform: translate(1em, -2em) rotate(47deg);
  }
  25% {
    transform: translate(1em, -2em) rotate(45deg);
  }
  30% {
    transform: translate(1em, -2em) rotate(40deg);
  }
  45% {
    transform: translate(2em, -3em) rotate(137deg);
  }
  50% {
    transform: translate(2em, -3em) rotate(135deg);
  }
  55% {
    transform: translate(2em, -3em) rotate(130deg);
  }
  70% {
    transform: translate(3em, -4em) rotate(217deg);
  }
  75% {
    transform: translate(3em, -4em) rotate(220deg);
  }
  100% {
    transform: translate(0, -1em) rotate(-225deg);
  }
}
</style>
