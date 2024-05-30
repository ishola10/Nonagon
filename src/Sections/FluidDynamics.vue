<template>
  <div class="simulation-container">
    <h3>Fluid Dynamics Simulation</h3>

    <div class="controls">
      <label for="velocity">Flow Velocity (m/s):</label>
      <input
        type="number"
        v-model="velocity"
        id="velocity"
        min="0.1"
        step="0.1"
      />
    </div>
    <div class="controls">
      <label for="density">Fluid Density (kg/m³):</label>
      <input
        type="number"
        v-model="density"
        id="density"
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

    <canvas ref="canvasRef" class="simulation-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const velocity = ref<number>(1);
const density = ref<number>(1);
const isPaused = ref<boolean>(false);
const canvasRef = ref<HTMLCanvasElement | null>(null);
let interval: number | null = null;

const drawFluidFlow = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Drawing fluid flow (simplified representation)
  for (let i = 0; i < canvas.width; i += 20) {
    for (let j = 0; j < canvas.height; j += 20) {
      ctx.beginPath();
      ctx.arc(i + ((velocity.value * 2) % 20), j, 5, 0, Math.PI * 2);
      ctx.fillStyle = "blue";
      ctx.fill();
    }
  }
};

const startSimulation = () => {
  if (interval) clearInterval(interval);

  interval = setInterval(() => {
    if (!isPaused.value) {
      drawFluidFlow();
    }
  }, 100);
};

const pauseResumeSimulation = () => {
  isPaused.value = !isPaused.value;
};

const resetSimulation = () => {
  if (interval) clearInterval(interval);
  isPaused.value = false;
  drawFluidFlow();
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

.controls {
  margin-bottom: 10px;
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

.simulation-canvas {
  width: 100%;
  height: 400px;
  border: 1px solid #000;
}
</style>
