<template>
    <div>
        <h1>Contact Us</h1>
        <p>For any inquiries or support, please fill out the form below:</p>
        <div class="contact-form">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <label for="message">Message:</label>
            <textarea id="message" name="message" required></textarea>
            <button>Submit</button>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>