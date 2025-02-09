<template>
  <Teleport to="header">
    <Dialog v-model:visible="modelValue" modal header="Информация о книге" class="w-lg">
      <div class="flex-column ">
        <slot></slot>
      </div>
    </Dialog>
  </Teleport>
</template>
<script setup>
import Dialog from 'primevue/dialog';

const modelValue = defineModel()
</script>

<style scoped></style>