// -------------  Changements lorsque l'utilisateur est connecté ------------- //

// Sélecteurs DOM
const body = document.querySelector("body");
const header = document.querySelector("header");
//const user = window.sessionStorage.getItem("userId");
const loginLink = document.querySelector("header nav ul li:nth-child(3) a");
const containerModals = document.querySelector(".containerModals");
const crossend = document.querySelector(".fa-xmark");
const modalGaleriePhoto = document.querySelector(".modalGaleriePhoto");
const galerieModal = document.querySelector(".galerieModal");
const btnAddPhoto = document.querySelector(".modalGaleriePhoto input");
const modalAjoutImage = document.querySelector(".modalAjoutImage");
const formAjoutImage = document.querySelector("#formAjoutImage");
const previewImg = document.querySelector(".containerFile img");
const inputFile = document.querySelector(".containerFile input");
const labelFile = document.querySelector(".containerFile label");
const iconFile = document.querySelector(".containerFile .fa-image");
const pFile = document.querySelector(".containerFile p");
const title = document.querySelector("#title");
const btnAdd = document.querySelector(".containerModals .modalAjoutImage form .button");

// -------------  Affichage de la modale générale------------- //
function displayContainerModals() {
    containerModals.style.display = "flex";
    modalGaleriePhoto.style.display = "flex";
    modalAjoutImage.style.display = "none";

    // Gérer la fermeture de la modale via la croix
    crossend.addEventListener("click", closeModals)

    // Gérer la fermeture de la modale en dehors de la modale
    containerModals.addEventListener("click", (e) => {
        if (e.target.className === "containerModals") {
            closeModals();
        }
    });
};

// Fonction pour gérer la fermeture des modales
function closeModals() {
    containerModals.style.display = "none";
}

// Fonction pour créer et ajouter un élément figure à la galerie modale
async function createAndAppendFigureModal(work) {
    const figure = createFigureElementModal(work);
    galerieModal.appendChild(figure);
    addDeleteEventListenerModal(work.id);

}

// Fonction pour créer un élément figure dans la galerie modale
function createFigureElementModal(work) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const iconElementBin = document.createElement("i");
    img.src = work.imageUrl;
    img.alt = work.title;
    iconElementBin.id = work.id;
    iconElementBin.className = "fa fa-trash";
    figure.appendChild(iconElementBin);
    figure.appendChild(img);
    return figure;
}

// Fonction pour ajouter un gestionnaire d'événements de suppression dans la galerie modale
async function addDeleteEventListenerModal(id) {
    const iconElementBin = document.getElementById(id);
    iconElementBin.addEventListener("click", () => {
        console.log("Bouton Corbeille cliqué");
        // Appel de la fonction pour supprimer l'image avec l'ID associé à l'image
        deleteImage(id);
    });
}

// Fonction pour afficher la galerie modale
async function affichageGalerieModal(works) {
    try {
        // Nettoyage de la galerie avant ajout de nouveaux éléments
        galerieModal.innerHTML = "";
        works.forEach(work => {
            createAndAppendFigureModal(work);
        });
    } catch (error) {
        console.error('Erreur lors de l\'affichage de la galerieModal :', error);
    }
}

// Appel de affichageGalerieModal avec les données récupérées depuis l'API
async function CreationGalerieModale() {
    try {
        const worksForModal = await getWorks();
        affichageGalerieModal(worksForModal);
    } catch (error) {
        console.error('Erreur lors de la récupération des œuvres pour la galerie modale :', error);
    }
}

// Récupérer les works du localStorage
function getStoredWorks() {
    const storedWorks = localStorage.getItem('works');
    return storedWorks ? JSON.parse(storedWorks) : [];
}

// Mettre à jour les works dans le localStorage
function updateStoredWorks(works) {
    localStorage.setItem('works', JSON.stringify(works));
}

// Fonction de suppression de l'image en utilisant l'ID
async function deleteImage(id){
    const deleteUrl = `http://localhost:5678/api/works/${id}`;
    
    try {
        const response = await deleteFetch(deleteUrl);
        if (response.ok) {
                const currentWorks = getStoredWorks();
                const updatedWorks = currentWorks.filter(work => work.id !== id);
                updateStoredWorks(updatedWorks);
                CreationGalerieModale()
        } else {
            console.log("Le delete n'a pas marché !");
            throw new Error("Le delete n'a pas marché !");
        }
    } catch (error) {
        console.error("Erreur lors de la suppression de l'image :", error.message);
    }
};

CreationGalerieModale();

// -------------  Affichage de la modale "Ajout d'Image"------------- //
function displayAjoutImage(){
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
displayAjoutImage();

// Ecouter les changements sur l'input file pour prévisualisation dans la modale "Ajout d'Image"
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

//Fonction qui génère les catégories dynamiquement pour le select (visuel)
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

champsAValider.forEach(champ => {
    champ.addEventListener('input', verifierChamps);
});

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
verifierChamps();
