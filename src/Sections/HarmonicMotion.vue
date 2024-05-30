<template>
  <div class="simulation-container">
    <h3>Harmonic Motion Simulation</h3>

    <div class="controls">
      <label for="springConstant">Spring Constant (k):</label>
      <input
        type="number"
        v-model="springConstant"
        id="springConstant"
        min="0.1"
        step="0.1"
      />
    </div>
    <div class="controls">
      <label for="mass">Mass (m):</label>
      <input type="number" v-model="mass" id="mass" min="0.1" step="0.1" />
    </div>
    <div class="controls">
      <label for="damping">Damping:</label>
      <input type="number" v-model="damping" id="damping" min="0" step="0.01" />
    </div>
    <div class="controls">
      <label for="frequency">Frequency:</label>
      <input
        type="number"
        v-model="frequency"
        id="frequency"
        min="0"
        step="0.1"
      />
    </div>
    <div class="controls">
      <label for="amplitude">Amplitude:</label>
      <input
        type="number"
        v-model="amplitude"
        id="amplitude"
        min="0"
        step="0.1"
      />
    </div>
    <div class="controls">
      <label for="phase">Phase:</label>
      <input type="number" v-model="phase" id="phase" min="0" step="0.1" />
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const canvasRef = ref<HTMLCanvasElement | null>(null);
const springConstant = ref<number>(1);
const mass = ref<number>(1);
const damping = ref<number>(0.1);
const amplitude = ref<number>(1);
const frequency = ref<number>(1);
const phase = ref<number>(0);
const isPaused = ref(false);
const time = ref<number>(0);

let interval: number | null = null;

const calculateSpringMassPosition = (t: number) => {
  const omega = Math.sqrt(springConstant.value / mass.value);
  const dampingRatio =
    damping.value / (2 * Math.sqrt(springConstant.value * mass.value));
  const phaseAngle = phase.value;

  const displacement =
    amplitude.value *
    Math.exp(-dampingRatio * omega * t) *
    Math.cos(omega * Math.sqrt(1 - dampingRatio ** 2) * t + phaseAngle);

  return displacement;
};

const startSimulation = () => {
  if (interval) clearInterval(interval);

  const timeStep = 0.02;
  time.value = 0;

  interval = setInterval(() => {
    if (!isPaused.value) {
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

      const displacement = calculateSpringMassPosition(time.value);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerY = canvas.height / 2;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, centerY);
      ctx.lineTo(canvas.width / 2 + displacement * 100, centerY);
      ctx.stroke();

      const radius = 10;
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2 + displacement * 100,
        centerY,
        radius,
        0,
        Math.PI * 2
      );
      ctx.fill();

      time.value += timeStep;
    }
  }, 20);
};

const pauseResumeSimulation = () => {
  isPaused.value = !isPaused.value;
};


const resetSimulation = () => {
  if (interval) clearInterval(interval);


  time.value = 0;
  springConstant.value = 0;
  mass.value = 0;
  damping.value = 0;
  amplitude.value = 0;
  frequency.value = 0;
  phase.value = 0;
  isPaused.value = true; 
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
</script>

<style scoped>
.simulation-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Controls styling */
.controls {
  margin-bottom: 10px;
}

/* Control buttons styling */
.control-buttons {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

/* Button styles */
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

/* Time display styling */
.time-display {
  margin-bottom: 10px;
  font-weight: bold;
}

/* Canvas styling */
.simulation-canvas {
  width: 100%;
  height: 400px;
  border: 1px solid #000;
}
</style>
