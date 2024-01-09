// Variables
const emailInput = document.querySelector("form #email");
const passwordInput = document.querySelector("form #password");
const form = document.querySelector("form");
const errorMessage = document.querySelector(".login p");

// URL de l'API
const apiUrl = 'http://localhost:5678/api/users/login';

// Fonction pour effectuer une requête d'authentification
async function authenticateUser(email, password, token) {
    try {
        if (email && password && token) {
            // Connexion de l'utilisateur
            const loginResponse = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const userData = await loginResponse.json();
            return { userData, isAuthenticated: true } || { isAuthenticated: false };
        } else {
            console.error("Paramètres manquants pour l'authentification.");
            return { isAuthenticated: false };
        }
    } catch (error) {
        console.error("Erreur lors de l'authentification:", error);
        return { isAuthenticated: false };
    }
}

// Fonction de gestion de la connexion
async function submitLogin(e) {
    e.preventDefault();

    const userEmail = emailInput.value;
    const userPassword = passwordInput.value;
    const userToken = window.sessionStorage.getItem("token");
    console.log(userEmail, userPassword);
    
    const { userData, isAuthenticated } = await authenticateUser(userEmail, userPassword, userToken);

    if (isAuthenticated) {
        console.log("Utilisateur valide. Redirection vers index.html");
        window.sessionStorage.setItem("logged", "true");
        window.sessionStorage.setItem("token", userData.token);
        window.location.href = "./index.html";
    } else {
        emailInput.style.border = "2px solid red";
        passwordInput.style.border = "2px solid red";
        displayError("Votre email ou votre mot de passe est incorrect");
    }
}

// Ajout d'un écouteur d'événement pour la soumission du formulaire
form.addEventListener("submit", submitLogin);