<template>
  <div class="simulation-container">
    <h3>Wave Patterns Simulation</h3>

    <!-- Controls for simulation parameters -->
    <div class="controls">
      <label for="amplitude">Amplitude:</label>
      <input
        type="number"
        v-model="amplitude"
        id="amplitude"
        min="0.1"
        step="0.1"
      />
    </div>

    <div class="controls">
      <label for="frequency">Frequency:</label>
      <input
        type="number"
        v-model="frequency"
        id="frequency"
        min="0.1"
        step="0.1"
      />
    </div>

    <div class="controls">
      <label for="waveType">Wave Type:</label>
      <select v-model="waveType" id="waveType">
        <option value="sine">Sine</option>
        <option value="cosine">Cosine</option>
        <option value="square">Square</option>
        <option value="triangle">Triangle</option>
        <option value="sawtooth">Sawtooth</option>
      </select>
    </div>

    <div class="controls">
      <label for="speed">Speed:</label>
      <input
        type="range"
        v-model="speed"
        id="speed"
        min="10"
        max="200"
        step="10"
      />
    </div>

    <!-- Control buttons -->
    <div class="simulation-controls">
      <button class="start-button" @click="startSimulation">Start</button>
      <button class="pause-button" @click="pauseSimulation">
        Pause/Resume
      </button>
      <button class="reset-button" @click="resetSimulation">Reset</button>
    </div>

    <!-- Simulation data display -->
    <div class="simulation-data">
      <p>Time: {{ time.toFixed(2) }} s</p>
      <p>Wave Type: {{ waveType }}</p>
      <p>Amplitude: {{ amplitude }}</p>
      <p>Frequency: {{ frequency }}</p>
    </div>

    <!-- Canvas for the simulation -->
    <canvas ref="canvasRef" class="simulation-canvas"></canvas>

    <!-- Explanatory content about wave patterns -->
    <div class="wave-info">
      <h4>Wave Patterns Explanation:</h4>
      <p>
        - **Sine Wave**: A smooth, continuous oscillation that varies
        sinusoidally in a regular pattern. - **Cosine Wave**: Similar to a sine
        wave but shifted by a phase of 90 degrees. - **Square Wave**: An abrupt
        wave pattern that alternates between high and low values. - **Triangle
        Wave**: A wave with a linear rise and fall pattern, creating a
        triangular shape. - **Sawtooth Wave**: A wave that has a linear rise and
        a sharp drop, resembling the teeth of a saw blade.
      </p>
    </div>

    <!-- Notepad for user notes -->
    <div class="notepad">
      <h4>Notepad:</h4>
      <textarea
        v-model="notepad"
        rows="10"
        cols="50"
        placeholder="Write your notes and calculations here..."
      ></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const canvasRef = ref<HTMLCanvasElement | null>(null);
const amplitude = ref<number>(1);
const frequency = ref<number>(1);
const waveType = ref<string>("sine");
const speed = ref<number>(50);
const time = ref<number>(0);
const notepad = ref<string>(""); // State for the notepad
let interval: number | null = null;
let paused = false;

// Set up canvas on mount
onMounted(() => {
  const canvas = canvasRef.value;
  if (canvas) {
    canvas.width = 800;
    canvas.height = 400;
  } else {
    console.error("Canvas element not found");
  }
});

// Define wave functions
const getWaveY = (x: number, time: number): number => {
  const t = time;
  switch (waveType.value) {
    case "sine":
      return amplitude.value * Math.sin((frequency.value * x) / 10 + t);
    case "cosine":
      return amplitude.value * Math.cos((frequency.value * x) / 10 + t);
    case "square":
      return (
        amplitude.value * Math.sign(Math.sin((frequency.value * x) / 10 + t))
      );
    case "triangle":
      const cycle = (frequency.value * x) / 10 + t;
      return (
        amplitude.value *
        (2 * Math.abs(2 * (cycle - Math.floor(cycle + 0.5))) - 1)
      );
    case "sawtooth":
      return (
        amplitude.value *
        (2 *
          ((frequency.value * x) / 10 +
            t -
            Math.floor((frequency.value * x) / 10 + t)) -
          1)
      );
    default:
      return 0;
  }
};

// Start the simulation
const startSimulation = () => {
  if (interval) clearInterval(interval);
  paused = false;
  interval = setInterval(simulateWave, speed.value);
};

// Pause or resume the simulation
const pauseSimulation = () => {
  if (interval) {
    if (paused) {
      interval = setInterval(simulateWave, speed.value);
      paused = false;
    } else {
      clearInterval(interval);
      paused = true;
    }
  }
};

// Reset the simulation
const resetSimulation = () => {
  if (interval) clearInterval(interval);
  time.value = 0;
  paused = false;

  const canvas = canvasRef.value;
  const ctx = canvas?.getContext("2d");
  if (canvas && ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
};

// Simulate the wave pattern
const simulateWave = () => {
  const canvas = canvasRef.value;
  const ctx = canvas?.getContext("2d");

  if (!canvas || !ctx) {
    console.error("Canvas or context not found");
    return;
  }

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  // Draw the wave
  for (let x = 0; x < canvas.width; x++) {
    const damping = Math.exp(-time.value * 0.05); // Add damping effect
    const y = canvas.height / 2 + getWaveY(x, time.value) * damping;

    if (x === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  // Stroke the path to render the wave
  ctx.stroke();

  // Increment time for the next iteration
  time.value += 0.1;
};

// Clean up interval on unmount
onBeforeUnmount(() => {
  if (interval) clearInterval(interval);
});
</script>

<style scoped>
/* Styles for the container */
.simulation-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: auto;
}

/* Control styling */
.controls {
  margin-bottom: 10px;
}

.simulation-controls {
  margin-bottom: 20px;
}

/* Button styles */
.start-button,
.pause-button,
.reset-button {
  padding: 8px 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

.start-button:hover,
.pause-button:hover,
.reset-button:hover {
  background-color: #45a049;
}

.simulation-canvas {
  width: 100%;
  height: 400px;
  border: 1px solid #000;
}

.wave-info {
  margin-top: 20px;
  text-align: left;
}

.notepad {
  margin-top: 20px;
  text-align: left;
}

textarea {
  width: 100%;
  height: 200px;
}
</style>
