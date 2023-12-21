// Variables
const email = document.querySelector("form #email");
const password = document.querySelector("form #password");
const form = document.querySelector("form");
const errorMessage = document.querySelector(".login p");

// Fonction pour récupérer les utilisateur
async function getUsers() {
    console.log(email.value,password.value)
    
    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            }),
            
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des utilisateurs");
        }

        const userData = await response.json();
        return userData.users; 

    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
        return [];
    }
}

// Fonction de gestion de la connexion
async function submitLogin(e) {
    e.preventDefault(); // Pour pas avoir la page blanche après soummission du formulaire

    const users = await getUsers();
    const userEmail = email.value;
    const userPassword = password.value;
    let isValidUser = false;

    users.forEach((user) => {
        if (user.email === userEmail && user.password === userPassword)
        

        {
            isValidUser = true;
            window.sessionStorage.setItem("logged", "true");
            window.location.href = "index.html";
        }
    });

    if (isValidUser) {
        window.sessionStorage.setItem("logged", "true");
        window.location.href = "index.html";
    } else {
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
