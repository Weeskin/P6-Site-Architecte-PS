// Variable pour cibler la galerie dans le DOM
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");

// Fonction pour récupérer les travaux depuis l'API
async function getWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la requête :', error);
        throw error; // Renvoie l'erreur pour que la fonction appelante puisse la gérer si nécessaire
    }
}

// Fonction pour afficher les travaux dans le DOM
async function affichageWorks(works) {
    try {
        // Nettoyage de la galerie avant ajout de nouveaux éléments
        gallery.innerHTML = '';

        // Créer les éléments de la galerie
        works.forEach(work => {
            const figure = document.createElement("figure");
            const img = document.createElement("img");
            const figcaption = document.createElement("figcaption");
            img.src = work.imageUrl;
            img.alt = work.title;
            figcaption.textContent = work.title;
            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);
        });
    } catch (error) {
        console.error('Erreur lors de l\'affichage de la gallery :', error);
    }
}

// Fonction pour charger la page au chargement initial
async function chargementPage() {
    await affichageWorks(await getWorks());
}

// Appel de la fonction principale pour charger la page
chargementPage();

// Récupération du tableau des catégories
async function getCategorys() {
    try {
        const response = await fetch("http://localhost:5678/api/categories");
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error.message);
    }
}

// Fonction pour afficher les boutons
async function displayCategorysButtons() {
    const categorys = await getCategorys();
    if (categorys) {
        categorys.forEach(category => {
            const btn = document.createElement("button");
            btn.textContent = category.name;
            btn.id = category.id;
            filters.appendChild(btn);
        });
    }
}

displayCategorysButtons();

// Fonction pour que le bouton fonctionne
async function filterCategory() {
    const allWorks = await getWorks();
    const allButtons = document.querySelectorAll(".filters button");

    allButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const btnId = e.target.id;
            gallery.innerHTML = '';

            if (btnId !== '0') {
                const filteredWorks = allWorks.filter((work) => {
                    return work.categoryId == btnId;
                });

                affichageWorks(filteredWorks);
            } else {
                // Si btnId est '0', affiche tous les travaux
                affichageWorks(allWorks);
            }

            console.log(btnId);
        });
    });
}

// Appel de la fonction pour initialiser le filtrage au chargement
filterCategory();

//Smooth scrool
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'end'
        });
    });
});
// Fonction pour afficher la barre du haut 
function modeditionbar() {
    const body = document.querySelector("body");
    const newDiv = document.createElement("div");
    const iconElement = document.createElement("i");
    const titleEditionMod = document.createElement("p");

    newDiv.className = "editionMod";
    iconElement.className = "fa-regular fa-pen-to-square";
    titleEditionMod.textContent = "Mode édition";

    newDiv.appendChild(iconElement);
    newDiv.appendChild(titleEditionMod);

    // Ajout de la nouvelle div au début de body
    body.insertBefore(newDiv, body.firstChild);
}

// Fonction pour changer mon titre Mes projets 
function creationtitreMesProjets() {
    const selecttitleportfolio = document.querySelector("#portfolio h2");

    // Création d'une nouvelle div
    const newDiv = document.createElement("div");
    newDiv.className = "editionModPortfolio";

    // Clonage du h2
    const clonedTitle = selecttitleportfolio.cloneNode(true);

    // Remplacement du h2 par la nouvelle div
    selecttitleportfolio.parentNode.replaceChild(newDiv, selecttitleportfolio);

    // Ajout du h2 cloné dans la nouvelle div
    newDiv.appendChild(clonedTitle);

    // Création du i avec la classe fa-regular fa-pen-to-square
    const iconElement = document.createElement("i");
    iconElement.className = "fa-regular fa-pen-to-square";

    // Création du paragraphe avec le texte "Modifier"
    const textElement = document.createElement("p");
    textElement.textContent = "Modifier";
    textElement.className = "modify";

    // Ajout du i et du texte dans la nouvelle div
    newDiv.appendChild(iconElement);
    newDiv.appendChild(textElement);

    textElement.addEventListener("click", () => {
        console.log("Bouton Modifier cliqué");
        displaycontainerModals();
    });
}

// Fonction affichage de la Modale
function displaycontainerModals() {
    const containerModals = document.querySelector(".containerModals");
    containerModals.style.display = "flex";

    // Fonction désaffichage de la Modale
    const  crossend = document.querySelector("#crossend");
    crossend.addEventListener("click", () => {
        console.log("Bouton Cross cliqué");
        containerModals.style.display = "none";
    });

    containerModals.addEventListener("click", (e) => {
        console.log(e.target.className);
        if (e.target.className === "containerModals") {
            containerModals.style.display = "none";
        }
    });
}



// Quand l'utilisateur est connecté
document.addEventListener("DOMContentLoaded", function () {
    const logged = window.sessionStorage.getItem("logged");

    if (logged === "true") {
        modeditionbar();
        creationtitreMesProjets();
        const header = document.querySelector("header");
        header.style.margin = "100px 0px 50px 0px";

        const loginLink = document.querySelector("header nav ul li:nth-child(3) a");
        loginLink.textContent = "Logout";

        loginLink.addEventListener("click", () => {
            window.sessionStorage.setItem("logged", "false");
        });
    }
});

//Création de la Galerie Modale
async function CreationGalerieModale() {
    const galerieModal = document.querySelector(".galerieModal");

    async function affichagegalerieModal(works) {
        try {
            // Nettoyage de la galerie avant ajout de nouveaux éléments
            galerieModal.innerHTML = '';

            // Créer les éléments de la galerie
            works.forEach(work => {
                const figure = document.createElement("figure");
                const img = document.createElement("img");
                const iconElementBin = document.createElement("i");
                img.src = work.imageUrl;
                img.alt = work.title;
                iconElementBin.id = "bin";
                iconElementBin.className = "fa fa-trash";
                figure.appendChild(iconElementBin);
                figure.appendChild(img);
                galerieModal.appendChild(figure);

            });
        } catch (error) {
            console.error('Erreur lors de l\'affichage de la galerieModal :', error);
        }
    }

    // Appel de affichagegalerieModal avec les données récupérées depuis l'API
    try {
        const worksForModal = await getWorks();
        affichagegalerieModal(worksForModal);
    } catch (error) {
        console.error('Erreur lors de la récupération des œuvres pour la galerie modale :', error);
    }
}

// Appel de la fonction pour créer la galerie modale au chargement de la page
CreationGalerieModale();