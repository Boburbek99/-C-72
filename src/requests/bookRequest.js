import axios from 'axios';

async function getBooks(query = "JavaScript", startIndex = 0, maxResults = 10) {
    try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
            params: { q: query, startIndex, maxResults: maxResults },
        });
        return response;
    } catch (error) {
        console.error('Ошибка при загрузке книг:', error);
        throw error;
    }
}
export { getBooks };