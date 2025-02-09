<template>
    <div class="spinner    ">
        <ProgressSpinner class="" style="width: 50px; height: 50px" strokeWidth="8" fill="transparent"
            animationDuration="0.5s" aria-label="Custom ProgressSpinner" />
    </div>
</template>
<script setup>
import ProgressSpinner from 'primevue/progressspinner';
</script>
<style scoped>
.spinner {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>