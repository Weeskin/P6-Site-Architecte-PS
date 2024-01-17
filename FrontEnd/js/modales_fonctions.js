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
                CreationGalerieModale();
                affichageGalleryProjets()

                 // Mise à jour du localStorage
                const currentWorks = await getStoredWorks();
                currentWorks.push(data); // Ajouter le nouveau work
                updateStoredWorks(currentWorks);


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


