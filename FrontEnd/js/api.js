const apiUrlLogin = 'http://localhost:5678/api/users/login';
const apiUrlWorks = 'http://localhost:5678/api/works'; // Correction ici


// Appel à l'API
function customFetch(url, method, data) {
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

    return fetch(url, {
        method,
        headers,
        body: data ? (data instanceof FormData ? data : JSON.stringify(data)) : null
    });
}

