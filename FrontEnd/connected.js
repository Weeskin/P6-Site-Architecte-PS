// -------------  Changements lorsque l'utilisateur est connecté ------------- //

//Sélecteurs DOM
const body = document.querySelector("body");
const header = document.querySelector("header");
const loginLink = document.querySelector("header nav ul li:nth-child(3) a");
const containerModals = document.querySelector(".containerModals");
const modalAjoutImage = document.querySelector(".modalAjoutImage");
const modalGaleriePhoto = document.querySelector(".modalGaleriePhoto");
const btnAddPhoto = document.querySelector(".modalGaleriePhoto input");
const previewImg = document.querySelector(".containerFile img");
const inputFile = document.querySelector(".containerFile input");
const labelFile = document.querySelector(".containerFile label");
const iconFile = document.querySelector(".containerFile .fa-image");
const pFile = document.querySelector(".containerFile p");
const form = document.querySelector("form");
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
    const selecttitleportfolio = document.querySelector("#portfolio h2");
    const newDiv = document.createElement("div");
    newDiv.className = "editionModPortfolio";
    const clonedTitle = selecttitleportfolio.cloneNode(true);
    selecttitleportfolio.parentNode.replaceChild(newDiv, selecttitleportfolio);
    newDiv.appendChild(clonedTitle);

    const iconElement = createIconElement("fa-regular fa-pen-to-square");
    const textElement = document.createElement("p");
    textElement.textContent = "Modifier";
    textElement.className = "modify";

    newDiv.appendChild(iconElement);
    newDiv.appendChild(textElement);

    textElement.addEventListener("click", () => {
        console.log("Bouton Modifier cliqué");
        displaycontainerModals();
    });
};

// Fonction affichage de la Modale
const displaycontainerModals = () => {
    containerModals.style.display = "flex";
    modalAjoutImage.style.display = "none";
    modalGaleriePhoto.style.display = "flex";

    // Gérer la fermeture de la modale via la croix
    const crossend = document.querySelector(".fa-xmark");
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

    // Appel de affichagegalerieModal avec les données récupérées depuis l'API
    try {
        const worksForModal = await getWorks();
        affichagegalerieModal(worksForModal);
    } catch (error) {
        console.error('Erreur lors de la récupération des œuvres pour la galerie modale :', error);
    }
};

// Fonction pour supprimer l'image en utilisant l'ID
const deleteImage = async (id) => {
    const url = `http://localhost:5678/api/works/${id}`;
    const deleteMethod = {
        method: "DELETE",
    };

    try {
        const response = await customFetch(url, deleteMethod.method, null);
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
};


// Appel de la fonction pour créer la galerie modale au chargement de la page
CreationGalerieModale();

//Faire apparaître la modale "AddModal"
const displayAddModal = () => {
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
};

//Appel de la modale "AddModal"
displayAddModal();

// Ecouter les changements sur l'input file
inputFile.addEventListener("change", () => {
    const file = inputFile.files[0];
    console.log(file);
    const btnAdd = document.querySelector(".containerModals .modalAjoutImage form .button");

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

    btnAdd.style.backgroundColor = "#1D6154"
});

// Fonction pour vérifier si tous les champs sont remplis et changer la couleur du bouton
function verifierChamps() {
    // Sélection des champs à vérifier
    const champsAValider = [
        document.getElementById('file'),
        document.getElementById('title'),
        document.getElementById('category')
    ];

    // Vérification si tous les champs sont remplis
    const tousRemplis = champsAValider.every(champ => champ.value.trim() !== '');

    // Changement de la couleur de fond du bouton en fonction de la vérification
    if (tousRemplis) {
        btnAdd.style.backgroundColor = "#1D6154";
    } else {
        btnAdd.style.backgroundColor = "#ccc";
    }
};

// Fonction pour créer l'image dans la galerie initiale
async function creerImageGalerie() {
    try {
        const formData = generateFormData(title.value, category);

        const response = await customFetch(apiUrlWorks, "POST", formData);

        if (!response.ok) {
            throw new Error("Erreur lors de la création du projet");
        }

        const data = await response.json();
        console.log("Nouveau projet créé !", data);
    } catch (error) {
        console.error("Une erreur est survenue lors de l'envoi :", error);
    }
}

// Ajout des écouteurs d'événements pour vérifier un à un chaque champ
const champsAValider = [
    document.getElementById('file'),
    document.getElementById('title'),
    document.getElementById('category')
];

champsAValider.forEach(champ => {
    champ.addEventListener('input', verifierChamps);
});

verifierChamps();

// Ajout de l'événement de soumission du formulaire
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await creerImageGalerie();
  // Vous pouvez également réinitialiser les valeurs du formulaire ici si nécessaire
  // title.value = "";
  // category.value = "";
  // ...
});

// Fonction pour réinitialiser le formulaire
function reinitialiserFormulaire() {
  form.reset(); // Réinitialiser tous les champs du formulaire
  // Vous pouvez également ajouter d'autres actions de réinitialisation si nécessaire
}

// Ajout de l'événement de soumission du formulaire
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await creerImageGalerie();
  reinitialiserFormulaire();
});
