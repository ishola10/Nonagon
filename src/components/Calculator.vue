<template>
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h4>Calculator</h4>
        <input type="text" v-model="calculation" placeholder="0" readonly />
        <div class="calc-buttons">
          <button @click="appendToCalc('7')">7</button>
          <button @click="appendToCalc('8')">8</button>
          <button @click="appendToCalc('9')">9</button>
          <button @click="appendToCalc('+')">+</button>
          <button @click="appendToCalc('sin(')">sin</button>
          <button @click="appendToCalc('cos(')">cos</button>
          <button @click="appendToCalc('tan(')">tan</button>
          <button @click="appendToCalc('sqrt(')">sqrt</button>
          <button @click="clearCalculation">C</button>
          <button @click="appendToCalc('4')">4</button>
          <button @click="appendToCalc('5')">5</button>
          <button @click="appendToCalc('6')">6</button>
          <button @click="appendToCalc('-')">-</button>
          <button @click="appendToCalc('log(')">log</button>
          <button @click="appendToCalc('exp(')">exp</button>
          <button @click="appendToCalc(' ^ ')">^</button>
          <button @click="deleteLastChar()">DEL</button>
          <button @click="appendToCalc('1')">1</button>
          <button @click="appendToCalc('2')">2</button>
          <button @click="appendToCalc('3')">3</button>
          <button @click="appendToCalc('*')">*</button>
          <button @click="appendToCalc('(')">(</button>
          <button @click="appendToCalc(')')">)</button>
          <button @click="appendToCalc('pi')">π</button>
          <button @click="calculateResult()">=</button>
          <button @click="appendToCalc('0')">0</button>
          <button @click="appendToCalc('.')">.</button>
        </div>
        <div v-if="calcHistory.length > 0" class="calc-history">
          <h5>History:</h5>
          <ul>
            <li v-for="(entry, index) in calcHistory" :key="index">
              {{ entry }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  
  const calculation = ref<string>("");
  const calcHistory = ref<string[]>([]);
  const showModal = ref<boolean>(false);
  
  const showCalculator = () => {
    showModal.value = true;
  };
  
  const closeModal = () => {
    showModal.value = false;
    calculation.value = "";
  };
  
  const appendToCalc = (char: string) => {
    calculation.value += char;
  };
  
  const clearCalculation = () => {
    calculation.value = "";
  };
  
  const deleteLastChar = () => {
    calculation.value = calculation.value.slice(0, -1);
  };
  
  const calculateResult = () => {
    try {
      const result = eval(calculation.value);
      calcHistory.value.push(`${calculation.value} = ${result}`);
      calculation.value = result.toString();
    } catch (error) {
      calculation.value = "Error";
    }
  };
  </script>
  
  <style scoped>
  .modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
  }
  
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 50%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  
  .calc-buttons {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
  }
  
  .calc-buttons button {
    padding: 10px;
    font-size: 1rem;
    background-color: #bde0fe;
    border: none;
    cursor: pointer;
  }
  
  .calc-buttons button:hover {
    background-color: #a2d2ff;
  }
  
  .calc-history {
    margin-top: 10px;
  }
  
  .calc-history ul {
    padding-left: 20px;
  }
  
  .calc-history li {
    list-style-type: none;
    margin-bottom: 5px;
  }
  </style>
  