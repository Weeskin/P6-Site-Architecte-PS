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

//Création de la modale en Javascript
function createModal() {
  // Vérifie si la modale existe déjà
  if (document.getElementById("modale")) {
    return document.getElementById("modale");
  }
  // Création de l'élément modal
  let modal = document.createElement("div");
  modal.className = "containerModals";
  modal.id = "modale";

  // Création de la galerie
  let gallery = document.createElement("div");
  gallery.className = "containerModalGallery";
  modal.appendChild(gallery);

  // Ajout des éléments à la galerie
  let span1 = document.createElement("span");
  span1.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  gallery.appendChild(span1);

  let h3_1 = document.createElement("h3");
  h3_1.textContent = "Galerie Photo";
  gallery.appendChild(h3_1);

  let div1 = document.createElement("div");
  div1.className = "galerieModal";
  gallery.appendChild(div1);

  let input1 = document.createElement("input");
  input1.type = "submit";
  input1.value = "Ajouter une photo";
  gallery.appendChild(input1);

  // Création du formulaire d'ajout de travaux
  let form = document.createElement("div");
  form.className = "containerModalAddWorks";
  modal.appendChild(form);

  // Ajout des éléments au formulaire
  let span2 = document.createElement("span");
  span2.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
  form.appendChild(span2);

  let span3 = document.createElement("span");
  span3.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  form.appendChild(span3);

  let h3_2 = document.createElement("h3");
  h3_2.textContent = "Ajout Photo";
  form.appendChild(h3_2);

  // Ajout du reste du formulaire
  let div2 = document.createElement("div");
  div2.className = "containerFile";
  form.appendChild(div2);

  let span4 = document.createElement("span");
  span4.innerHTML = '<i class="fa-regular fa-image"></i>';
  div2.appendChild(span4);

  let label1 = document.createElement("label");
  label1.setAttribute("for", "file");
  label1.textContent = "+ Ajouter photo";
  div2.appendChild(label1);

  let input2 = document.createElement("input");
  input2.type = "file";
  input2.id = "file";
  input2.name = "imageUrl";
  div2.appendChild(input2);

  let img = document.createElement("img");
  img.id = "previewImage";
  img.src = "#";
  img.alt = "Aperçu de l'image";
  div2.appendChild(img);

  let p = document.createElement("p");
  p.textContent = "jpg,png: 4mo max";
  div2.appendChild(p);

  let label2 = document.createElement("label");
  label2.setAttribute("for", "title");
  label2.textContent = "Titre";
  form.appendChild(label2);

  let input3 = document.createElement("input");
  input3.type = "text";
  input3.id = "title";
  input3.name = "title";
  form.appendChild(input3);

  let label3 = document.createElement("label");
  label3.setAttribute("for", "categoryInput");
  label3.textContent = "Catégorie";
  form.appendChild(label3);

  let select = document.createElement("select");
  select.id = "categoryInput";
  select.name = "category";
  select.required = true;
  form.appendChild(select);

  let option = document.createElement("option");
  option.value = "";
  select.appendChild(option);

  let button = document.createElement("button");
  button.type = "submit";
  button.className = "button";
  button.textContent = "Valider";
  form.appendChild(button);

  // Ajout de la modale à la page
  document.body.insertBefore(modal, document.body.firstChild);

  //Appels des fonctions utilisé dans la modale
  displayAddWorks();
  displayModalGallery();
  prevImg();
  displayCategoryModal();
  validateFormInputs();

  return modal;
}

// Affichage de la modale générale
function displayContainerModals() {
  let modal = createModal();
  let containerModals = modal.querySelector(".containerModals");
  let containerModalGallery = modal.querySelector(".containerModalGallery");
  let containerModalAddWorks = modal.querySelector(".containerModalAddWorks");

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
  inputFile.value = "";
  resetPreviewImg();
}

// Fonction pour créer et ajouter un élément figure à la Modal Gallery
function createAndAppendFigureModal(work) {
  const figure = createFigureElementModal(work);
  galerieModal.appendChild(figure);
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
  iconElementBin.addEventListener("click", (e) => {
    if (e.target.className === "fa fa-trash") {
      e.preventDefault();
      console.log("Bouton Corbeille cliqué");
      // Appel de la fonction pour supprimer l'image avec l'ID associé à l'image
      deleteWorks(work.id);
    }
  });
  figure.appendChild(iconElementBin);
  figure.appendChild(img);
  return figure;
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
      inputFile.value = "";
      resetPreviewImg();
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

// Fonction pour réinitialiser l'aperrçu de l'image
function resetPreviewImg() {
  // Réinitialisez l'aperçu de l'image
  previewImg.src = "#";
  previewImg.style.display = "none";

  // Réinitialisez les autres éléments à leur état initial
  labelFile.style.display = "block";
  iconFile.style.display = "block";
  pFile.style.display = "block";
}

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
