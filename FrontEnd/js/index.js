// Variable pour cibler la galerie dans le DOM
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");

// Fonction pour récupérer les travaux depuis l'API
async function getWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
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

// Fonction pour charger la page au chargement initial
function loadingPage() {
  displayGalleryProjets();
  displayCategorysButtons().then(() => {
    filterCategorys();
  });
}

loadingPage();

// Fonction pour afficher les travaux dans le DOM
async function displayGalleryProjets() {
  try {
    // Nettoyage de la galerie avant ajout de nouveaux éléments
    gallery.innerHTML = "";

    // Récupérer les travaux depuis l'API
    const works = await getWorks();

    // Créer les éléments de la galerie
    works.forEach((work) => {
      createWorkElement(work);
    });
  } catch (error) {
    console.error("Erreur lors de l'affichage de la galerie :", error);
  }
}

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
  console.log("loadingPage executed");
  const categorys = await getCategorys();
  if (categorys) {
    categorys.forEach((category) => {
      const btn = document.createElement("button");
      btn.textContent = category.name;
      btn.id = category.id;
      btn.classList.add("active");
      filters.appendChild(btn);
    });
  }
}

// Fonction pour que le bouton fonctionne
function filterCategorys() {
  const allButtons = document.querySelectorAll(".filters button");

  allButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const allStoredWorks = await getWorks(); // Récupérer les travaux depuis le localStorage
      const btnId = e.target.id;
      // Afficher les travaux depuis le localStorage
      gallery.innerHTML = "";
      allStoredWorks.forEach((work) => {
        if (btnId == work.categoryId || btnId == "0") {
          createWorkElement(work);
          // console.log(work);
        }
      });
      // Retirer la classe 'active' de tous les boutons
      allButtons.forEach((button) => {
        button.classList.remove("active");
      });
      // Si le bouton cliqué est "Tous", ajouter la classe 'active' à tous les boutons
      if (btnId == "0") {
        allButtons.forEach((button) => {
          button.classList.add("active");
        });
      } else {
        // Ajouter la classe 'active' au bouton cliqué
        e.target.classList.add("active");
      }
    });
  });
}

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
      createModal();
      filters.style.display = "none";
      header.style.margin = "100px 0px 50px 0px";
      loginLink.textContent = "Logout";
      loginLink.addEventListener("click", () => {
        window.sessionStorage.setItem("logged", "false");
      });
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
