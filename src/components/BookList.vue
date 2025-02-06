<template>
  <div class="card">
    <div v-if="loading" class="card h-screen flex items-center">
      <ProgressSpinner class="absolute" style="width: 50px; height: 50px" strokeWidth="8" fill="transparent"
        animationDuration="0.5s" aria-label="Custom ProgressSpinner" />
    </div>
    <div v-else>
      <span class="card h-screen flex items-center justify-center text-2xl" v-if="error">{{ error }}</span>
    </div>
    <div class="card flex justify-center my-5">
      <IconField>
        <InputIcon class="pi pi-search" />
        <InputText v-model="searchQuery" class="w-100" placeholder="Search" />
      </IconField>
    </div>
    <DataTable v-if="books" :value="books" class="table-auto" tableStyle="max-width: 70rem; margin:auto">
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
          <BookModal v-model:visible="modalVisibility[data.id]">
            <InputText type="text" class="w-sm" v-model="data.title" />
            <div class="flex justify-end gap-3 ">
              <Button type="button" label="Отменить" severity="secondary" @click="closeEditModal(data.id)"></Button>
              <Button type="button" label="Сохранить" @click="saveChanges(data)"></Button>
            </div>
          </BookModal>
        </template>
      </Column>
    </DataTable>

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ProgressSpinner from 'primevue/progressspinner';
import { getBooks } from '@/requests/bookRequest.js';
import BookModal from '@/components/BookModal.vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { saveToLocalStorage, getFromLocalStorage } from '@/utils/localStoreg';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import { debounce } from 'lodash';

const books = ref([]);
const loading = ref(true);
const error = ref(null);
const startIndex = ref(0);
const searchQuery = ref('');
const modalVisibility = ref({});

const fetchBooks = async (query, startIndex) => {
  try {
    loading.value = true;
    const response = await getBooks(query, startIndex.value);
    books.value = response.data.items.map((item, index) => ({
      index: index + 1,
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'N/A',
      publishedDate: item.volumeInfo.publishedDate || 'N/A',
      publisher: item.volumeInfo.publisher || 'N/A',
    }));
    saveToLocalStorage('books', books.value);
  } catch (err) {
    error.value = 'Ошибка при загрузке данных';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  const savedBooks = getFromLocalStorage('books');
  if (savedBooks) {
    books.value = savedBooks;
    loading.value = false;
    return;
  }
  await fetchBooks(searchQuery.value, startIndex.value);
});

watch(searchQuery, debounce(async (newQuery) => {
  await fetchBooks(newQuery, startIndex.value);
}, 1000));

function closeEditModal(bookId) {
  modalVisibility.value[bookId] = false;
}

async function saveChanges(data) {
  const bookIndex = books.value.findIndex((book) => book.id === data.id);
  if (bookIndex !== -1) {
    books.value[bookIndex].title = data.title;
    saveToLocalStorage('books', books.value);
  }
  closeEditModal(data.id);
}
</script>