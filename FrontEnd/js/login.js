// URL de l'API
const apiUrl = "http://localhost:5678/api/users/login";

// Sélection des éléments du DOM
const emailInput = document.querySelector("form #email");
const passwordInput = document.querySelector("form #password");
const form = document.querySelector("form");
const errorMessage = document.querySelector(".login p");

// Fonction pour effectuer une requête d'authentification
async function loginUser(email, password) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    // Retourne les données utilisateur ou un objet vide
    return (await response.json()) || {};
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    return {};
  }
}

// Fonction pour afficher le message d'erreur
function displayError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.toggle("error-message", Boolean(message));
}

// Fonction pour rediriger vers la page d'accueil
function redirectToIndex() {
  console.log("Utilisateur valide. Redirection vers index.html");
  window.sessionStorage.setItem("logged", "true");
  window.location.href = "./index.html";
}

// Fonction de gestion de la connexion
async function submitLogin(e) {
  e.preventDefault();

  // Récupération des valeurs des champs email et password
  const userEmail = emailInput.value;
  const userPassword = passwordInput.value;

  // Appel de la fonction loginUser avec les identifiants
  const userData = await loginUser(userEmail, userPassword);

  // Vérification de l'existence du token dans les données utilisateur
  if (userData.token) {
    // Stockage du token et redirection vers la page d'accueil
    window.sessionStorage.setItem("token", userData.token);
    redirectToIndex();
  } else {
    // Affichage d'un message d'erreur si l'authentification échoue
    emailInput.style.border = "2px solid red";
    passwordInput.style.border = "2px solid red";
    displayError("Votre email ou votre mot de passe est incorrect");
  }
}

// Ajout d'un écouteur d'événement pour la soumission du formulaire
form.addEventListener("submit", submitLogin);
