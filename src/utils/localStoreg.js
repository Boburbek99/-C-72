
export const saveToLocalStorage = (key, data) => {
    try {
        const serializedData = JSON.stringify(data);
        localStorage.setItem(key, serializedData);
    } catch (error) {
        console.error('Ошибка при сохранении в localStorage:', error);
    }
};


export const getFromLocalStorage = (key) => {
    try {
        const serializedData = localStorage.getItem(key);
        return serializedData ? JSON.parse(serializedData) : null;
    } catch (error) {
        console.error('Ошибка при получении данных из localStorage:', error);
        return null;
    }
};
