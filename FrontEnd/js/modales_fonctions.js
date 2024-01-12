// Fonction de suppression de l'image en utilisant l'ID
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

// Fonction pour ajouter une nouvelle image dans la modale "Ajout d'Image", pour ajouter dans la BDD
function ajoutImage() {
    formAjoutImage.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Récupération des valeurs du formulaire
        const formData = new FormData();
        const categoryInput = document.getElementById('categoryInput')
        const projectTitle = title.value;
        const projectImage = inputFile.files[0];
        const categoryValue = categoryInput.value; //Chaque option dans le select doit avoir comme valeur le category ID
    
        formData.append("title", projectTitle);
        formData.append("category", categoryValue);
        formData.append("image", projectImage);

        try {
            const response = await postFetch(apiUrlWorks, formData);

            if (response.ok) {
                const data = await response.json();
                console.log("Fichier envoyé avec succès :", data);

                // Actualiser la galerie et les works
                affichagegalerieModal();
                affichageWorks();

            } else {
                throw new Error("Erreur lors de l'envoi du fichier");
            }
        } catch (error) {
            console.error("Erreur :", error.message);
        } finally {
            //Réinitialiser tout
            previewImg.src = "#";
            previewImg.style.display = "none";
            labelFile.style.display = "flex";
            iconFile.style.display = "flex";
            pFile.style.display = "flex";
            formAjoutImage.reset();
            modalGaleriePhoto.style.display = "flex";
            modalAjoutImage.style.display = "none";
        }
    });
}
ajoutImage()