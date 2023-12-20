// Variable pour cibler la galerie dans le DOM
const gallery = document.querySelector(".gallery");


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
async function affichageWorks() {
    try {
        const arrayWorks = await getWorks();

        // Nettoyage de la galerie avant ajout  de nouveaux éléments
        gallery.innerHTML = '';

        // Créer les éléments de la galerie
        arrayWorks.forEach(work => {
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

// Appel de la fonction principale
affichageWorks();


// Affichage des boutons filtres
const filters = document.querySelector(".filters");
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
