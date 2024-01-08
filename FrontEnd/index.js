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
