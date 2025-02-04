<template>
  <div class="card">
    <div v-if="loading" class="card h-screen flex items-center">
      <ProgressSpinner class="absolute" style="width: 50px; height: 50px" strokeWidth="8" fill="transparent"
        animationDuration="0.5s" aria-label="Custom ProgressSpinner" />
    </div>
    <div v-else>
      <div class="card h-screen flex items-center" v-if="error">{{ error }}</div>
      <DataTable v-if="products" :value="products" class="table-auto" tableStyle="max-width: 60rem; margin:auto">
        <Column header="№">
          <template #body="{ index }">
            {{ index + 1 }}
          </template>
        </Column>
        <Column field="title" header="Наименование книги" style="width: 20%"></Column>
        <Column field="authors" header="Авторы"></Column>
        <Column field="publishedDate" header="Дата публикации"></Column>
        <Column field="publisher" header="Категории"></Column>
        <Column header="Редактирование наименования книги">
          <template #body="{ data }">
            <BookModal>
              <InputText type="text" class="w-sm " v-model="data.title" />
            </BookModal>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ProgressSpinner from 'primevue/progressspinner';
import { getBooksList } from '@/requests/bookRequest.js';
import BookModal from '@/components/BookModal.vue';
import InputText from 'primevue/inputtext';
const products = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await getBooksList();
    products.value = response.data.items.map((item, index) => ({
      index: index + 1,
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'N/A',
      publishedDate: item.volumeInfo.publishedDate || 'N/A',
      publisher: item.volumeInfo.publisher || 'N/A'
    }));
  } catch (err) {
    error.value = 'Ошибка при загрузке данных';
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>