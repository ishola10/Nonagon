<template>
    <div>
        <footer class="footer">
            <div class="footer-content">
                <div class="footer-links">
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                    <a href="/feedback">Feedback</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                </div>
                <div class="footer-logo">
                    <h1>Nonagon .</h1>
                </div>
                <div>© copyright 2024</div>
            </div>
            
        </footer>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

.footer {
    background-color: var(--primary-color);
    color: var(--text-color);
    padding: 40px;
    text-align: center;
}

.footer-content {
    display: flex;
    flex-direction: column;
    gap: 6.5rem;
    align-items: center;
}

.footer-links {
    display: flex;
    gap: 2rem;
}

.footer-links a {
    color: var(--secondary-color);
    text-decoration: none;
    font-size: 1.3rem;
}

.footer-logo h1 {
    color: var(--text-color);
    font-size: 5rem;
    padding: 10% 0;
}
</style>