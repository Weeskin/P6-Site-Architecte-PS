

// -------------  Changements lorsque l'utilisateur est connecté ------------- //

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


// Fonction pour changer mon titre Mes projets et ajouter le "Modifier"
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

    const modalAjoutImage = document.querySelector(".modalAjoutImage");
    modalAjoutImage.style.display = "none";
    modalGaleriePhoto.style.display = "flex";


    // Gérer la fermeture de la modale via la croix
    const  crossend = document.querySelector(".fa-xmark");
    crossend.addEventListener("click", () => {
        console.log("Bouton Cross cliqué");
        containerModals.style.display = "none";
    });

    // Gérer la fermeture de la modale en dehors de la modale
    containerModals.addEventListener("click", (e) => {
        console.log(e.target.className);
        if (e.target.className === "containerModals") {
            containerModals.style.display = "none";
        }
    });
}


//Création de la modale "Galerie"
async function CreationGalerieModale() {
    const galerieModal = document.querySelector(".galerieModal");

    async function affichagegalerieModal(works) {
        try {
            // Nettoyage de la galerie avant ajout de nouveaux éléments
            galerieModal.innerHTML = "";

            // Créer les éléments de la galerie
            works.forEach(work => {
                const figure = document.createElement("figure");
                const img = document.createElement("img");
                const iconElementBin = document.createElement("i");
                img.src = work.imageUrl;
                img.alt = work.title;
                iconElementBin.id = work.id;
                iconElementBin.className = "fa fa-trash";
                figure.appendChild(iconElementBin);
                figure.appendChild(img);
                galerieModal.appendChild(figure);

                iconElementBin.addEventListener("click", () => {
                    console.log("Bouton Corbeille cliqué");
                    // Appel de la fonction pour supprimer l'image avec l'ID associé à l'image
                    deleteImage(work.id);
                    });
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

// Fonction pour supprimer l'image en utilisant l'ID
async function deleteImage(id) {
    const token = window.sessionStorage.getItem("token");

    if (!token) {
        console.error("Token manquant. Impossible de supprimer l'image.");
        return;
    }

    const init = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`http://localhost:5678/api/works/${id}`, init);
        if (!response.ok) {
            console.log("Le delete n'a pas marché !");
            throw new Error("Le delete n'a pas marché !");
        }

        const data = await response.json();
        console.log("La suppression a réussi, voici la data :", data);

        // Recharge la galerie après la suppression
        affichagegalerieModal(await getWorks());
    } catch (error) {
        console.error("Erreur lors de la suppression de l'image :", error);
    }
}


// Appel de la fonction pour créer la galerie modale au chargement de la page
CreationGalerieModale();

// Faire apparaître la deuxième modale en cliquant sur le bouton "Ajouter une photo"
const btnAddPhoto = document.querySelector(".modalGaleriePhoto input");
const modalGaleriePhoto = document.querySelector(".modalGaleriePhoto");

//Faire apparaître la modale "AddModal"
function displayAddModal() {
    btnAddPhoto.addEventListener("click", () => {
        const modalAjoutImage = document.querySelector(".modalAjoutImage");
        const arrowleft = document.querySelector(".modalAjoutImage .fa-arrow-left");
        const containerModals = document.querySelector(".containerModals");
        const crossend = document.querySelector(".fa-xmark");

        modalAjoutImage.style.display = "flex";
        modalGaleriePhoto.style.display = "none";

        arrowleft.addEventListener("click", () => {
            modalAjoutImage.style.display = "none";
            modalGaleriePhoto.style.display = "flex";
        });

        //Fermeture de la modale "AddModal"
        crossend.addEventListener("click", () => {
        containerModals.style.display = "none";
    });
    });
}

displayAddModal();


// Prévisualisation de l'ajout de photo
const previewImg = document.querySelector(".containerFile img");
const inputFile = document.querySelector(".containerFile input");
const labelFile = document.querySelector(".containerFile label");
const iconFile = document.querySelector(".containerFile .fa-image");
const pFile = document.querySelector(".containerFile p");

// Ecouter les changements sur l'input file
inputFile.addEventListener("change", () => {
    const file = inputFile.files[0];
    console.log(file);
    
    if (file) {
        const btnAdd = document.querySelector(".containerModals .modalAjoutImage form .button");
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImg.src = e.target.result;
            previewImg.style.display = "flex";
            labelFile.style.display = "none";
            iconFile.style.display = "none";
            pFile.style.display = "none";
        };
        reader.readAsDataURL(file);
    }
});

// Création de l'image dans la galerie initiale
const form = document.querySelector("form");
const title = document.querySelector("#title");
const category = document.querySelector("#category");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = {
        title: title.value,
        categoryId: category.value,
        category: {
            id: category.value,
            name: category.options[category.selectedIndex].text,
        },
    };

    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST", // Correction ici
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la création du projet");
        }

        const data = await response.json();
        console.log("Nouveau projet créé !", data);
    } catch (error) {
        console.error("Une erreur est survenue lors de l'envoi :", error);
    }
});
