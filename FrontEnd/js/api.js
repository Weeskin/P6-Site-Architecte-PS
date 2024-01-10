const apiUrlLogin = 'http://localhost:5678/api/users/login';
const apiUrlWorks = 'http://localhost:5678/api/works'; // Correction ici

async function postFetch(url, data) {
    return fetchData(url, 'POST', data);
}

async function deleteFetch(url) {
    return fetchData(url, 'DELETE');
}

async function fetchData(url, method, data) {
    try {
        const token = sessionStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        console.log("Envoi de la requête vers :", url);
        console.log("Méthode de la requête :", method);
        console.log("Données de la requête :", data);

        if ((method === 'POST' || method === 'DELETE') && data) {
            headers['Content-Type'] = data instanceof FormData ? 'multipart/form-data' : 'application/json';
        }

        const response = await fetch(url, {
            method,
            headers,
            body: data ? (data instanceof FormData ? data : JSON.stringify(data)) : null
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        return response;
    } catch (error) {
        console.error("Erreur lors de la requête :", error.message);
        throw error;
    }
}