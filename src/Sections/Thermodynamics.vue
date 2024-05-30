<template>
  <div class="simulation-container">
    <h3>Thermodynamics Simulation</h3>

    <div class="controls">
      <label for="initialTemperature">Initial Temperature (°C):</label>
      <input
        type="number"
        v-model="initialTemperature"
        id="initialTemperature"
        min="-273.15"
        step="1"
      />
    </div>
    <div class="controls">
      <label for="heatAdded">Heat Added (J):</label>
      <input
        type="number"
        v-model="heatAdded"
        id="heatAdded"
        min="0"
        step="1"
      />
    </div>
    <div class="controls">
      <label for="mass">Mass (kg):</label>
      <input type="number" v-model="mass" id="mass" min="0.1" step="0.1" />
    </div>
    <div class="controls">
      <label for="specificHeat">Specific Heat (J/(kg·°C)):</label>
      <input
        type="number"
        v-model="specificHeat"
        id="specificHeat"
        min="0.1"
        step="0.1"
      />
    </div>

    <div class="control-buttons">
      <button class="button" @click="calculateFinalTemperature">
        Calculate
      </button>
    </div>

    <div class="result-display">
      <p>Final Temperature: {{ finalTemperature.toFixed(2) }} °C</p>
    </div>

    <canvas ref="canvasRef" class="simulation-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const initialTemperature = ref<number>(25);
const heatAdded = ref<number>(1000);
const mass = ref<number>(1);
const specificHeat = ref<number>(4.18);
const finalTemperature = ref<number>(initialTemperature.value);
const canvasRef = ref<HTMLCanvasElement | null>(null);

const calculateFinalTemperature = () => {
  finalTemperature.value =
    initialTemperature.value +
    heatAdded.value / (mass.value * specificHeat.value);
  drawThermodynamics();
};

const drawThermodynamics = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Drawing thermometer (simplified representation)
  ctx.fillStyle = "lightgray";
  ctx.fillRect(100, 50, 50, 300);

  const height = 300 - ((finalTemperature.value + 273.15) / 500) * 300;

  ctx.fillStyle = "red";
  ctx.fillRect(100, height, 50, 300 - height);

  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`T = ${finalTemperature.value.toFixed(2)} °C`, 100, 40);
};

onMounted(() => {
  const canvas = canvasRef.value;
  if (canvas) {
    canvas.width = 300;
    canvas.height = 400;
  }
  drawThermodynamics();
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

.result-display {
  margin-bottom: 10px;
  font-weight: bold;
}

.simulation-canvas {
  width: 100%;
  height: 400px;
  border: 1px solid #000;
}
</style>
