//Les différents URL
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

        const response = await fetch(url, {
            method,
            headers,
            body: data ? (data instanceof FormData ? data : data) : null
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
        }

        return response;
    } catch (error) {
        console.error("Erreur lors de la requête :", error.message);
        throw error;
    }
}