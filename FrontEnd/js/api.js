const apiUrlLogin = 'http://localhost:5678/api/users/login';
const apiUrlWorks = 'http://localhost:5678/api/works'; // Correction ici

function generateFormData(title, category) {
    return {
        title,
        categoryId: category.value,
        category: {
            id: category.value,
            name: category.options[category.selectedIndex].text,
        }
    };
}

// Appel à l'API
function customFetch(url, method, data) {
    const token = sessionStorage.getItem('token');
    const headers = {
        'Authorization': 'Bearer ' + token
    };

    if ((method === 'POST' || method === 'DELETE') && data) {
        headers['Content-Type'] = 'application/json';
    }

    return fetch(url, {
        method,
        headers,
        body: data ? JSON.stringify(data) : null
    });
}

