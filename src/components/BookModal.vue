<template>
  <div class="event flex justify-evenly">
    <Button icon="pi pi-eye" @click="openBookDetails" />
    <Button icon="pi pi-pencil" @click="onClick" />
  </div>
  <Teleport to="body">
    <Dialog :visible="visible" @update:visible="emit('update:visible', $event)" modal header="Редактирование книги"
      class="w-lg">
      <div class="body my-5">
        <slot></slot>
      </div>
    </Dialog>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['update:visible']);

function onClick() {
  emit('update:visible', true);
}

function openBookDetails() {
  emit('update:visible', true);
}
</script>

<style scoped></style>