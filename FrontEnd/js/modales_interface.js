// -------------  Changements lorsque l'utilisateur est connecté ------------- //

// Sélecteurs DOM
const body = document.querySelector("body");
const header = document.querySelector("header");
//const user = window.sessionStorage.getItem("userId");
const loginLink = document.querySelector("header nav ul li:nth-child(3) a");
const containerModals = document.querySelector(".containerModals");
const crossend = document.querySelector(".fa-xmark");
const containerModalGallery = document.querySelector(".containerModalGallery");
const galerieModal = document.querySelector(".galerieModal");
const btnAddPhoto = document.querySelector(".containerModalGallery input");
const containerModalAddWorks = document.querySelector(
  ".containerModalAddWorks"
);
const formAddWorks = document.querySelector("#formAddWorks");
const previewImg = document.querySelector(".containerFile img");
const inputFile = document.querySelector(".containerFile input");
const labelFile = document.querySelector(".containerFile label");
const iconFile = document.querySelector(".containerFile .fa-image");
const pFile = document.querySelector(".containerFile p");
const title = document.querySelector("#title");
const btnAdd = document.querySelector(
  ".containerModals .containerModalAddWorks form .button"
);

// -------------  Affichage de la modale générale------------- //
function displayContainerModals() {
  containerModals.style.display = "flex";
  containerModalGallery.style.display = "flex";
  containerModalAddWorks.style.display = "none";

  // Gérer la fermeture de la modale via la croix
  crossend.addEventListener("click", closeModals);

  // Gérer la fermeture de la modale en dehors de la modale
  containerModals.addEventListener("click", (e) => {
    if (e.target.className === "containerModals") {
      closeModals();
    }
  });
}

// Fonction pour gérer la fermeture des modales
function closeModals() {
  containerModals.style.display = "none";
}

// Fonction pour créer et ajouter un élément figure à la Modal Gallery
function createAndAppendFigureModal(work) {
  const figure = createFigureElementModal(work);
  galerieModal.appendChild(figure);
  addDeleteEventListenerModal(work.id);
}

// Fonction pour créer un élément figure dans la Modal Gallery
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

// Fonction pour ajouter un gestionnaire d'événements de suppression dans la Modal Gallery
function addDeleteEventListenerModal(id) {
  const iconElementBin = document.getElementById(id);
  iconElementBin.addEventListener("click", () => {
    console.log("Bouton Corbeille cliqué");
    // Appel de la fonction pour supprimer l'image avec l'ID associé à l'image
    deleteWorks(id);
  });
}

// Fonction pour afficher la Modal Gallery
async function displayModalGallery(works) {
  try {
    galerieModal.innerHTML = "";
    const worksForModal = await getWorks();
    worksForModal.forEach((work) => {
      createAndAppendFigureModal(work);
    });
  } catch (error) {
    console.error("Erreur lors de l'affichage de la modale galerie :", error);
  }
}

// -------------  Affichage de la modale "Add Works"------------- //
function displayAddWorks() {
  btnAddPhoto.addEventListener("click", () => {
    const arrowleft = document.querySelector(
      ".containerModalAddWorks .fa-arrow-left"
    );
    const crossendAddWorks = document.querySelector(
      ".containerModalAddWorks .fa-xmark"
    );

    containerModalAddWorks.style.display = "flex";
    containerModalGallery.style.display = "none";

    //Retour arière avec flèche indiquant à gauche
    arrowleft.addEventListener("click", () => {
      containerModalAddWorks.style.display = "none";
      containerModalGallery.style.display = "flex";
    });

    // Gérer la fermeture de la modale via la croix
    crossendAddWorks.addEventListener("click", closeModals);

    // Gérer la fermeture de la modale en dehors de la modale
    containerModals.addEventListener("click", (e) => {
      if (e.target.className === "containerModals") {
        closeModals();
      }
    });
  });
}
displayAddWorks();

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
const checkFormFields = [
  document.getElementById("file"),
  document.getElementById("title"),
  document.getElementById("categoryInput")
];

checkFormFields.forEach((champ) => {
  champ.addEventListener("input", validateFormInputs);
});

// Fonction pour vérifier si tous les champs sont remplis et changer la couleur du bouton
function validateFormInputs() {
  // Vérification si tous les champs sont remplis
  const tousRemplis = checkFormFields.every(
    (champ) => champ.value.trim() !== ""
  );

  // Changement de la couleur de fond du bouton en fonction de la vérification
  if (tousRemplis) {
    btnAdd.style.backgroundColor = "#1D6154";
  } else {
    btnAdd.style.backgroundColor = "#ccc";
  }
}
validateFormInputs();
