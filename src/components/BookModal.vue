<template>
  <Button icon="pi pi-pencil" @click="visible = true" />
  <Teleport to="head">
    <Dialog v-model:visible="visible" modal header="Edit Profile" class="w-lg">
      <div class="body my-5">
        <slot></slot>
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
        <Button type="button" label="Save" @click="visible = false"></Button>
      </div>
    </Dialog>
  </Teleport>
</template>
<script setup>
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
const visible = ref(false);

import Button from 'primevue/button';
</script>
<style scoped></style>