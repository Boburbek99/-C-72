import axios from 'axios';

async function getBooks(query = 'javascript', startIndex = 0) {
    try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
            params: { q: query, startIndex, maxResults: 10 },
        });
        return response;
    } catch (error) {
        console.error('Ошибка при загрузке книг:', error);
        throw error;
    }
}
export { getBooks };