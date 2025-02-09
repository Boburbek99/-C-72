<template>
  <div class="card">
    <div v-if="loading" class="card h-screen flex items-center">
      <ProgressSpinner class="absolute" style="width: 50px; height: 50px" strokeWidth="8" fill="transparent"
        animationDuration="0.5s" aria-label="Custom ProgressSpinner" />
    </div>
    <div v-else>
      <span class="card h-screen flex items-center justify-center text-2xl" v-if="error">{{ error }}</span>
    </div>
    <div v-if="books && !error && !loading" class="main-block">
      <div class="card flex justify-center my-5">
        <IconField>
          <InputIcon class="pi pi-search" />
          <InputText v-model.trim="searchQuery" class="w-100 " placeholder="Search" />
        </IconField>
      </div>
      <div ref="scrollContainer" class="table-container overflow-y-auto m-auto  max-h-145" @scroll="handleScroll">
        <DataTable :value="books" class="table-auto " tableStyle="max-width: 70rem; margin:auto  ">
          <Column header="№">
            <template #body="{ index }">
              {{ index + 1 }}
            </template>
          </Column>
          <Column field="title" header="Наименование книги" style="width: 20%"></Column>
          <Column field="authors" header="Авторы"></Column>
          <Column field="publishedDate" header="Дата публикации"></Column>
          <Column field="categories" header="Категории"></Column>
          <Column header="Редактирование наименования книги">
            <template #body="{ data }">
              <div class="event flex justify-evenly">
                <Button icon="pi pi-pencil" @click="openModal(data.id, true)" />
                <Button icon="pi pi-eye" @click="openModal(data.id)" />
              </div>
              <BookModal v-model="modalVisibility[data.id]">
                <div v-if="isEditing[data.id]" class=" flex-column justify-start gap-4 mb-6">
                  <label for="title"><b>Наименование</b></label>
                  <Textarea id="title" v-model="data.title" rows="5" cols="50" />
                  <p v-if="validText" class="text-red-600">{{ validText }}</p>
                </div>
                <div v-if="!isEditing[data.id]" class="card ">
                  <p class="m-0">
                    <b>Наименование книги:</b> {{ data.title }}
                  </p>
                  <Divider />
                  <p class="m-0">
                    <b>Автор(ы):</b> {{ data.authors }}
                  </p>
                  <Divider />
                  <p class="m-0">
                    <b>Дата публикации:</b> {{ data.publishedDate }}
                  </p>
                  <Divider />
                  <p class="m-0">
                    <b>Категории:</b>{{ data.categories }}
                  </p>
                  <Divider />
                  <p class="m-0">
                    <b> Описание книги:</b> {{ data.description }}
                  </p>
                  <Divider />
                </div>
                <div class="flex justify-end gap-3 ">
                  <Button type="button" label="Отменить" severity="secondary" @click="closeEditModal(data.id)"></Button>
                  <Button type="button" label="Сохранить" @click="saveChanges(data)"></Button>
                </div>
              </BookModal>
            </template>
          </Column>
        </DataTable>
      </div>
      <div v-if="!error && !loading" class="card flex justify-center ">
        <Button label="Загрузить ещё" @click="loadMore()" class="m-auto my-3 " />
      </div>
    </div>
  </div>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ProgressSpinner from 'primevue/progressspinner';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Divider from 'primevue/divider';
import Textarea from 'primevue/textarea';


import { debounce } from 'lodash';

import { ref, onMounted, watch } from 'vue';
import { saveToLocalStorage, getFromLocalStorage, removeToLocalStorage } from '@/utils/localStoreg';
import { getBooks } from '@/requests/bookRequest.js';
import BookModal from '@/components/BookModal.vue';

import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const STORAGE_KEY = 'lastLoadedBooks';

const books = ref([]);
const loading = ref(true);
const error = ref(null);
const startIndex = ref(0);
const searchQuery = ref('');
let modalVisibility = ref({});
const scrollContainer = ref(null);
const isLoadingMore = ref(false);
let isEditing = ref({});
const validText = ref('')

const handleScroll = () => {
  const container = scrollContainer.value;
  if (container) {
    const isBottom =
      container.scrollTop + container.clientHeight >= container.scrollHeight - 100;
    if (isBottom && !isLoadingMore.value) {
      isLoadingMore.value = true;
      loadMore();
    }
  }
};
const fetchBooks = async (query, startIndex) => {
  try {
    const response = await getBooks(query, startIndex);
    if (!response.data || !response.data.items) {
      throw new Error('No data found');
    }
    const newBooks = response.data.items.map((item, index) => ({
      index: index + 1,
      id: item.id,
      title: item.volumeInfo.title || 'Нет названия',
      authors: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Нет автора',
      publishedDate: item.volumeInfo.publishedDate || 'Нет даты',
      categories: item.volumeInfo.categories ? item.volumeInfo.categories.join(', ') : 'Нет категории',
      description: item.volumeInfo.description || 'Нет описании',
    }));
    books.value = startIndex === 0 ? newBooks : [...books.value, ...newBooks];

    saveToLocalStorage(STORAGE_KEY, { query, books: books.value });
  } catch (err) {
    error.value = 'Ошибка при загрузке данных';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  const savedData = getFromLocalStorage(STORAGE_KEY);
  if (savedData && savedData.books) {
    searchQuery.value = savedData.query;
    books.value = savedData.books;

    loading.value = false;
  } else {
    await fetchBooks('JavaScript', 0);
  }
});

watch(searchQuery, debounce(async (newQuery) => {
  if (newQuery) {
    startIndex.value = 0;
    await fetchBooks(newQuery, startIndex.value);
    removeToLocalStorage(STORAGE_KEY);
  }
}, 1000));


// Отслеживаем изменения в query параметрах
watch(() => route.query.modal, (newModalId) => {
  if (newModalId) {
    // Если в URL есть параметр modal, открываем модальное окно
    openModal(newModalId, false);
  } else {
    // Если параметра modal нет, закрываем все модальные окна
    Object.keys(modalVisibility.value).forEach((key) => {
      modalVisibility.value[key] = false;
    });
  }
});
function openModal(bookId, editMode) {
  modalVisibility.value = { ...modalVisibility.value, [bookId]: true };
  isEditing.value = { ...isEditing.value, [bookId]: editMode };
  router.push({ query: { modal: bookId } });
}

function closeEditModal(bookId) {
  modalVisibility.value = { ...modalVisibility.value, [bookId]: false };
  isEditing.value = { ...isEditing.value, [bookId]: false };
  router.push({ query: {} });
}

const loadMore = () => {
  startIndex.value += 10;
  fetchBooks(searchQuery.value, startIndex.value);
  isLoadingMore.value = false
};

const validateTitle = (title) => {
  if (title.length >= 250) {
    return 'Не более 250 символов';
  }
  if (title.length === 0) {
    return 'Обязательное поле для заполнения';
  }
  return null;
};

async function saveChanges(data) {
  const validationError = validateTitle(data.title);
  if (validationError) {
    validText.value = validationError;
    return;
  }

  const bookIndex = books.value.findIndex((book) => book.id === data.id);
  if (bookIndex !== -1) {
    books.value[bookIndex].title = data.title;
    saveToLocalStorage(STORAGE_KEY, { books: books.value });
  }
  validText.value = null;
  closeEditModal(data.id);
}
</script>
<style scoped></style>