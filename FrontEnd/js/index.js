// Variable pour cibler la galerie dans le DOM
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");

// Fonction pour récupérer les travaux depuis l'API
async function getWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    updateStoredWorks(works);

    return works;
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
}

// Récupération pour récupérer les catégories depuis l'API
async function getCategorys() {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    return await response.json();
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des catégories :",
      error.message
    );
  }
}

//Stockage de getWorks dans le local Storage
function updateStoredWorks(works) {
  localStorage.setItem("works", JSON.stringify(works));
}

// Fonction pour afficher les travaux dans le DOM
function displayGalleryProjets() {
  console.log("displayGalleryProjets executed");
  try {
    // Nettoyage de la galerie avant ajout de nouveaux éléments
    gallery.innerHTML = "";
    displayCategorysButtons().then(() => {
      filterCategorys();
    });
  } catch (error) {
    console.error("Erreur lors de l'affichage de la galerie :", error);
  }
}
displayGalleryProjets();

function createWorkElement(work) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  img.src = work.imageUrl;
  img.alt = work.title;
  figcaption.textContent = work.title;
  figure.appendChild(img);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
}

// Fonction pour afficher les boutons dynamiquement
async function displayCategorysButtons() {
  console.log("displayCategorysButtons executed");
  const categorys = await getCategorys();
  if (categorys) {
    categorys.forEach((category) => {
      const btn = document.createElement("button");
      btn.textContent = category.name;
      btn.id = category.id;
      filters.appendChild(btn);
    });
  }
}

// Fonction pour récupérer la liste des works depuis le localStorage
function getStoredWorks() {
  const storedWorks = localStorage.getItem("works");
  return storedWorks ? JSON.parse(storedWorks) : [];
}

// Fonction pour que le bouton fonctionne
function filterCategorys() {
  console.log("filterCategorys executed");
  const allButtons = document.querySelectorAll(".filters button");
  const allStoredWorks = getStoredWorks(); // Récupérer les travaux depuis le localStorage
  console.log(allStoredWorks);
  try {
    allButtons.forEach((button) => {
      // Afficher les travaux récupérés
      allStoredWorks.forEach((work) => {
        createWorkElement(work);
      });
      //Créer les boutons active et non active
      button.addEventListener("click", (e) => {
        allButtons.forEach((btn) => {
          btn.classList.remove("active");
        });
        button.classList.add("active");
        const btnId = e.target.id;

        // Filtrer les travaux en fonction de category.id
        const filteredWorks = allStoredWorks.filter(
          (work) => work.category.id === btnId || btnId == "0"
        );

        // Afficher les travaux filtrés
        filteredWorks.forEach((work) => {
          createWorkElement(work);
        });
      });
    });
  } catch (error) {
    console.error("Erreur lors de l'affichage de la galerie :", error);
  }
}

// allButtons.forEach((button) => {
//   button.addEventListener("change", (e) => {});
// })

//Smooth scrool
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
      block: "end"
    });
  });
});

//Si utilisateur connecté :
//Affichage et déconnexion via Logout
async function displayAdminInterface() {
  document.addEventListener("DOMContentLoaded", function () {
    const logged = window.sessionStorage.getItem("logged");

    if (logged === "true") {
      displayAdminTopBar();
      updateTitleWithEditButton();
      header.style.margin = "100px 0px 50px 0px";

      loginLink.textContent = "Logout";

      loginLink.addEventListener("click", () => {
        window.sessionStorage.setItem("logged", "false");
      });
      console.log("L'utilisateur est bien connecté");
    } else {
      console.log("L'utilisateur n'est pas connecté");
    }
  });
}

// Fonction pour afficher la barre du haut du mode administrateur
function displayAdminTopBar() {
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

// Fonction pour changer mon titre Mes projets et ajouter le "Modifier"
function updateTitleWithEditButton() {
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
    displayContainerModals();
  });
}

displayAdminInterface();

// Fonction pour créer un élément i avec une classe donnée
const createIconElement = (className) => {
  const iconElement = document.createElement("i");
  iconElement.className = className;
  return iconElement;
};

//Fonction pour mettre à jour le localStorage avec la liste des works
function updateStoredWorks(works) {
  localStorage.setItem("works", JSON.stringify(works));
}
