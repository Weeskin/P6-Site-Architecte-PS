// Variables
const email = document.querySelector("form #email");
const password = document.querySelector("form #password");
const form = document.querySelector("form");
const errorMessage = document.querySelector(".login p");

// Fonction pour récupérer les utilisateurs
async function loginUser(email, password) {
    try {
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const userData = await response.json();
        return userData || {};
    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        return {};
    }
}

// Fonction de gestion de la connexion
async function submitLogin(e) {
    e.preventDefault();

    const userEmail = email.value;
    const userPassword = password.value;
    console.log(userEmail, userPassword);

    const userData = await loginUser(userEmail, userPassword);

    if (userData.token) { //si ok on fait ça
        console.log("Utilisateur valide. Redirection vers index.html");
        window.sessionStorage.setItem("logged", "true");
        window.sessionStorage.setItem("token", userData.token);
        window.location.href = "./index.html";
    } else {//message d'erreur
        email.style.border = "2px solid red";
        password.style.border = "2px solid red";
        displayError("Votre email ou votre mot de passe est incorrect");
    }
}

// Fonction pour afficher le message d'erreur
function displayError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.toggle("error-message", Boolean(message));
}

// Ajout d'un écouteur d'événement pour la soumission du formulaire
form.addEventListener("submit", submitLogin);
