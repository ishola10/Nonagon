<template>
  <div class="simulation-container">
    <h3>Electric Circuits Simulation</h3>

    <div class="controls">
      <label for="resistance">Resistance (Ω):</label>
      <input
        type="number"
        v-model="resistance"
        id="resistance"
        min="0.1"
        step="0.1"
      />
    </div>
    <div class="controls">
      <label for="voltage">Voltage (V):</label>
      <input
        type="number"
        v-model="voltage"
        id="voltage"
        min="0.1"
        step="0.1"
      />
    </div>
    <div class="controls">
      <label for="current">Current (A):</label>
      <input type="number" v-model="current" id="current" readonly />
    </div>

    <div class="control-buttons">
      <button class="button" @click="calculateCurrent">Calculate</button>
    </div>

    <canvas ref="canvasRef" class="simulation-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const resistance = ref<number>(1);
const voltage = ref<number>(1);
const current = ref<number>(0);
const canvasRef = ref<HTMLCanvasElement | null>(null);

const calculateCurrent = () => {
  current.value = voltage.value / resistance.value;
  drawCircuit();
};

const drawCircuit = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Drawing circuit
  ctx.beginPath();
  ctx.moveTo(50, 100);
  ctx.lineTo(150, 100);
  ctx.moveTo(150, 50);
  ctx.lineTo(150, 150);
  ctx.moveTo(150, 50);
  ctx.lineTo(250, 50);
  ctx.moveTo(250, 50);
  ctx.lineTo(250, 150);
  ctx.moveTo(150, 150);
  ctx.lineTo(250, 150);
  ctx.moveTo(50, 150);
  ctx.lineTo(150, 150);
  ctx.moveTo(50, 150);
  ctx.lineTo(50, 100);
  ctx.stroke();
};

onMounted(() => {
  const canvas = canvasRef.value;
  if (canvas) {
    canvas.width = 300;
    canvas.height = 200;
  }
  drawCircuit();
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
  height: 200px;
  border: 1px solid #000;
}
</style>
