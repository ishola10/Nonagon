<template>
    <div class="popup-overlay">
      <div class="popup-content">
        <h3>You need to be logged in to use Nonagon AI</h3>
        <div class="popup-actions">
          <router-link to="/login" @click="closePopup">Login</router-link>
          <router-link to="/signup" @click="closePopup">Signup</router-link>
          <button @click="closePopup">Close</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const closePopup = () => {
    emit('close')
  }
  </script>
  
  <style scoped>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .popup-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
  }
  
  .popup-actions {
    margin-top: 1rem;
  }
  
  .popup-actions a,
  .popup-actions button {
    margin: 0 0.5rem;
  }
  </style>
  