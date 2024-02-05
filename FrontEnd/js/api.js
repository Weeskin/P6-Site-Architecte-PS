//Les différents URL
const apiUrlLogin = "http://localhost:5678/api/users/login";
const apiUrlWorks = "http://localhost:5678/api/works";

async function postFetch(url, data) {
  return fetchData(url, "POST", data);
}

async function deleteFetch(url) {
  return fetchData(url, "DELETE");
}

async function fetchData(url, method, data) {
  const token = sessionStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`
  };

  const response = await fetch(url, {
    method,
    headers,
    body: data ? (data instanceof FormData ? data : data) : null
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Erreur HTTP: ${response.status} - ${errorText}`);
    throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
  }

  return response;
}
