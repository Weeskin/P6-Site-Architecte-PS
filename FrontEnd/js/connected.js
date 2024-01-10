// -------------  Changements lorsque l'utilisateur est connecté ------------- //

//Sélecteurs DOM
const body = document.querySelector("body");
const header = document.querySelector("header");
const loginLink = document.querySelector("header nav ul li:nth-child(3) a");
const containerModals = document.querySelector(".containerModals");
const crossend = document.querySelector(".fa-xmark");
const modalGaleriePhoto = document.querySelector(".modalGaleriePhoto");
const btnAddPhoto = document.querySelector(".modalGaleriePhoto input");
const modalAjoutImage = document.querySelector(".modalAjoutImage");
const formAjoutImage = document.querySelector("#formAjoutImage");
const previewImg = document.querySelector(".containerFile img");
const inputFile = document.querySelector(".containerFile input");
const labelFile = document.querySelector(".containerFile label");
const iconFile = document.querySelector(".containerFile .fa-image");
const pFile = document.querySelector(".containerFile p");
const title = document.querySelector("#title");
const category = document.querySelector("#category");
const btnAdd = document.querySelector(".containerModals .modalAjoutImage form .button");


// Fonction pour créer un élément i avec une classe donnée
const createIconElement = (className) => {
    const iconElement = document.createElement("i");
    iconElement.className = className;
    return iconElement;
};

// Fonction pour afficher la barre du haut 
const modeditionbar = () => {
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
};

// Déconnexion via Logout
document.addEventListener("DOMContentLoaded", function () {
    const logged = window.sessionStorage.getItem("logged");

    if (logged === "true") {
        modeditionbar();
        creationtitreMesProjets();
        header.style.margin = "100px 0px 50px 0px";

        loginLink.textContent = "Logout";

        loginLink.addEventListener("click", () => {
            window.sessionStorage.setItem("logged", "false");
        });
    }
});

// Fonction pour changer mon titre Mes projets et ajouter le "Modifier"
const creationtitreMesProjets = () => {
    const selectTitlePortfolio = document.querySelector("#portfolio h2");
    const newDiv = document.createElement("div");
    newDiv.className = "editionModPortfolio";
    const clonedTitle = selectTitlePortfolio.cloneNode(true);
    selectTitlePortfolio.parentNode.replaceChild(newDiv, selectTitlePortfolio);
    newDiv.appendChild(clonedTitle);

    const iconElement = createIconElement("fa-regular fa-pen-to-square");
    const textElement = document.createElement("p");
    textElement.textContent = "Modifier";
    textElement.className = "modify";

    newDiv.appendChild(iconElement);
    newDiv.appendChild(textElement);

    textElement.addEventListener("click", () => {
        displaycontainerModals();
    });
};

// Fonction pour gérer la fermeture des modales
function closeModals() {
    containerModals.style.display = "none";
}

// -------------  Affichage de la modale "Galerie"------------- //
// Fonction affichage de la Modale
const displaycontainerModals = () => {
    containerModals.style.display = "flex";
    modalAjoutImage.style.display = "none";
    modalGaleriePhoto.style.display = "flex";

    // Gérer la fermeture de la modale via la croix
    crossend.addEventListener("click", closeModals)

    // Gérer la fermeture de la modale en dehors de la modale
    containerModals.addEventListener("click", (e) => {
        if (e.target.className === "containerModals") {
            closeModals();
        }
    });
};

//Création de la modale "Galerie"
const CreationGalerieModale = async () => {
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

    // Appel de affichageGalerieModal avec les données récupérées depuis l'API
    try {
        const worksForModal = await getWorks();
        affichagegalerieModal(worksForModal);
    } catch (error) {
        console.error('Erreur lors de la récupération des œuvres pour la galerie modale :', error);
    }
};

// Fonction pour supprimer l'image en utilisant l'ID
const deleteImage = async (id) => {
    const deleteUrl = `http://localhost:5678/api/works/${id}`;

    try {
        const response = await deleteFetch(deleteUrl);

        if (response.ok) {
            const responseData = await response.text();

            // Vérifie si la réponse est vide
            if (responseData.trim() !== "") {
                const data = JSON.parse(responseData);
                console.log("La suppression a réussi, voici la data :", data);

                // Recharge la galerie après la suppression
                affichageGalerieModal(await getWorks());
            } else {
                console.log("La réponse JSON est vide.");
            }
        } else {
            console.log("Le delete n'a pas marché !");
            throw new Error("Le delete n'a pas marché !");
        }
    } catch (error) {
        console.error("Erreur lors de la suppression de l'image :", error.message);
    }
};


// Appel de la fonction pour créer la galerie modale au chargement de la page
CreationGalerieModale();

// -------------  Affichage de la modale "Ajout d'Image"------------- //
//Faire apparaître la modale "AjoutImage"
const displayAjoutImage = () => {
    btnAddPhoto.addEventListener("click", () => {
        const arrowleft = document.querySelector(".modalAjoutImage .fa-arrow-left");
        const crossendAjoutImage = document.querySelector(".modalAjoutImage .fa-xmark");

        modalAjoutImage.style.display = "flex";
        modalGaleriePhoto.style.display = "none";

    //Retour arière avec flèche indiquant à gauche
        arrowleft.addEventListener("click", () => {
        modalAjoutImage.style.display = "none";
        modalGaleriePhoto.style.display = "flex";
    });

    // Gérer la fermeture de la modale via la croix
        crossendAjoutImage.addEventListener("click", closeModals);

    // Gérer la fermeture de la modale en dehors de la modale
        containerModals.addEventListener("click", (e) => {
            if (e.target.className === "containerModals") {
                closeModals();
            }
        });
    });
};

//Appel de la modale "AddModal"
displayAjoutImage();

// Ecouter les changements sur l'input file pour prévisualisation
function prevImg() {
    inputFile.addEventListener("change", () => {
        const file = inputFile.files[0];

        if (file) {
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
}
prevImg();

// Fonction pour ajouter une nouvelle image
function ajoutImage() {
    formAjoutImage.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Récupération des valeurs du formulaire
        const formData = new FormData(formAjoutImage);
       

        try {
            const response = await postFetch(apiUrlWorks,formData);

            if (!response.ok) {
                throw new Error("Erreur lors de l'envoi du fichier");
            }

            const data = await response.json();
            console.log("Fichier envoyé avec succès :", data);
            affichagegalerieModal();
            affichageWorks();
            formAjoutImage.reset();
            modalGaleriePhoto.style.display = "flex";
            modalAjoutImage.style.display = "none";
            previewImg.style.display = "none";
        } catch (error) {
            console.error("Erreur :", error);
        }
    });
}


//Fonction qui génère les catégories dynamiquement pour le select
async function displayCategoryModal() {
    const select = document.querySelector("form select");
    const categorys = await getCategorys();
    categorys.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        select.appendChild(option);
    });
}
displayCategoryModal();

// Ajout des écouteurs d'événements pour vérifier un à un chaque champ
const champsAValider = [
    document.getElementById('file'),
    document.getElementById('title'),
    document.getElementById('categoryInput')
];
// Fonction pour vérifier si tous les champs sont remplis et changer la couleur du bouton
function verifierChamps() {
    // Vérification si tous les champs sont remplis
    const tousRemplis = champsAValider.every(champ => champ.value.trim() !== '');

    // Changement de la couleur de fond du bouton en fonction de la vérification
    if (tousRemplis) {
        btnAdd.style.backgroundColor = "#1D6154";
    } else {
        btnAdd.style.backgroundColor = "#ccc";
    }
};

champsAValider.forEach(champ => {
    champ.addEventListener('input', verifierChamps);
});

verifierChamps();

// Fonction pour réinitialiser le formulaire
function reinitialiserFormulaire() {
    previewImg.src = "#";
    previewImg.style.display = "none";
    labelFile.style.display = "flex";
    iconFile.style.display = "flex";
    pFile.style.display = "flex";
    formAjoutImage.reset();
}

// Ajout de l'événement de soumission du formulaire
formAjoutImage.addEventListener("submit", async (e) => {
    e.preventDefault();
    await ajoutImage();
    reinitialiserFormulaire();
});