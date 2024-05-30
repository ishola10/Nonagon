<template>
  <div class="simulation-container">
    <h3>Pendulum Swing Simulation</h3>

    <div class="controls">
      <label for="numPendulums">Number of Pendulums:</label>
      <input
        type="number"
        v-model="numPendulums"
        id="numPendulums"
        min="1"
        max="5"
        step="1"
      />
    </div>
    <div class="controls">
      <label for="length">Pendulum Length:</label>
      <input type="number" v-model="length" id="length" min="0.1" step="0.1" />
    </div>
    <div class="controls">
      <label for="angle">Initial Angle:</label>
      <input
        type="number"
        v-model="angle"
        id="angle"
        min="-90"
        max="90"
        step="1"
      />
    </div>
    <div class="controls">
      <label for="mass">Mass:</label>
      <input type="number" v-model="massInput" id="mass" min="0.1" step="0.1" />
    </div>
    <div class="controls">
      <label for="gravity">Gravity:</label>
      <input
        type="number"
        v-model="gravity"
        id="gravity"
        min="0.1"
        step="0.1"
      />
    </div>

    <div class="control-buttons">
      <button class="button" @click="startSimulation">Start</button>
      <button class="button" @click="pauseResumeSimulation">
        {{ isPaused ? "Resume" : "Pause" }}
      </button>
      <button class="button" @click="resetSimulation">Reset</button>
    </div>

    <div class="time-display">Time: {{ time.toFixed(2) }} seconds</div>

    <canvas ref="canvasRef" class="simulation-canvas"></canvas>

    <!-- Calculator Modal -->
    <button class="button calculator-btn" @click="showCalculator">Calculator</button>
    <Calculator :showModal="showModal" @close="closeCalculator" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import Calculator from "../components/Calculator.vue";

class Pendulum {
  length: number;
  initialAngle: number;
  mass: number;
  gravity: number;
  angle: number;
  angularVelocity: number;

  constructor(
    length: number,
    initialAngle: number,
    mass: number,
    gravity: number
  ) {
    this.length = length;
    this.initialAngle = initialAngle;
    this.mass = mass;
    this.gravity = gravity;
    this.angle = this.initialAngle;
    this.angularVelocity = 0;
  }

  update(timeStep: number) {
    const angularAcceleration =
      (-this.gravity / this.length) * Math.sin(this.angle);

    this.angularVelocity += angularAcceleration * timeStep;
    this.angle += this.angularVelocity * timeStep;
  }

  getPosition(canvasWidth: number, canvasHeight: number) {
    const x = canvasWidth / 2 + this.length * 50 * Math.sin(this.angle);
    const y = this.length * 50 * Math.cos(this.angle);

    return { x, y };
  }
}

const canvasRef = ref<HTMLCanvasElement | null>(null);
const numPendulums = ref<number>(1);
const length = ref<number>(10);
const angle = ref<number>(15);
const massInput = ref<number>(1);
const gravity = ref<number>(9.8);
const time = ref<number>(0);
const isPaused = ref<boolean>(false);
let interval: number | null = null;
let pendulums: Pendulum[] = [];

const initializePendulums = () => {
  pendulums = [];
  for (let i = 0; i < numPendulums.value; i++) {
    const pendulum = new Pendulum(
      length.value,
      angle.value + i * 10,
      massInput.value,
      gravity.value
    );
    pendulums.push(pendulum);
  }
};

const startSimulation = () => {
  if (interval) clearInterval(interval);
  time.value = 0;
  isPaused.value = false;
  initializePendulums();
  interval = setInterval(() => {
    if (!isPaused.value) {
      updateAndRenderSimulation();
      time.value += 0.02;
    }
  }, 20);
};

const updateAndRenderSimulation = () => {
  const canvas = canvasRef.value;
  if (!canvas) {
    console.error("Canvas element not found");
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Canvas context not found");
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pendulums.forEach((pendulum, index) => {
    pendulum.update(0.02);
    const { x, y } = pendulum.getPosition(canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(x, y);
    ctx.stroke();

    const ballRadius = 10;
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = index === 0 ? "#FF5733" : "#34D1BF"; // custom colors
    ctx.fill();
  });

  detectCollisions();
};

const detectCollisions = () => {
  const collisionDistance = 20;

  for (let i = 0; i < pendulums.length; i++) {
    for (let j = i + 1; j < pendulums.length; j++) {
      const pendulum1 = pendulums[i];
      const pendulum2 = pendulums[j];

      const pos1 = pendulum1.getPosition(
        canvasRef.value!.width,
        canvasRef.value!.height
      );
      const pos2 = pendulum2.getPosition(
        canvasRef.value!.width,
        canvasRef.value!.height
      );

      const distance = Math.sqrt(
        (pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2
      );

      if (distance < collisionDistance) {
        const temp = pendulum1.angularVelocity;
        pendulum1.angularVelocity = pendulum2.angularVelocity;
        pendulum2.angularVelocity = temp;
      }
    }
  }
};

const pauseResumeSimulation = () => {
  isPaused.value = !isPaused.value;
};

const resetSimulation = () => {
  if (interval) clearInterval(interval);
  time.value = 0;
  isPaused.value = false;

  const canvas = canvasRef.value;
  if (canvas) {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  initializePendulums();
};

onMounted(() => {
  const canvas = canvasRef.value;
  if (canvas) {
    canvas.width = 800;
    canvas.height = 400;
  }
});

onBeforeUnmount(() => {
  if (interval) clearInterval(interval);
});

// Calculator modal handling
const showModal = ref<boolean>(false);

const showCalculator = () => {
  showModal.value = true;
};

const closeCalculator = () => {
  showModal.value = false;
};

</script>

<style scoped>
.simulation-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.controls {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.controls label {
  margin-right: 10px;
}

.controls input[type="number"] {
  width: 70px;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.control-buttons {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.button {
  padding: 8px 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #45a049;
}

.time-display {
  margin-bottom: 10px;
  font-weight: bold;
}

.simulation-canvas {
  width: 100%;
  height: 400px;
  border: 1px solid #000;
  background-color: white;
  margin-bottom: 20px;
}

.calculator-btn {
  margin-top: 10px;
}

</style>
