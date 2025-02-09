import axios from 'axios';

async function getBooks(query, startIndex = 0) {
    try {
        const searchQuery = query || 'JavaScript';
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
            params: { q: searchQuery, startIndex, maxResults: 10 },
        });
        return response;
    } catch (error) {
        console.error('Ошибка при загрузке книг:', error);
        throw error;
    }
}
export { getBooks };