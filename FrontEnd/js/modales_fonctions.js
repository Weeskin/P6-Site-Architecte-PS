// Fonction pour ajouter une nouvelle image dans la modale "Ajout d'Image", pour ajouter dans la BDD
function addWorks() {
  formAddWorks.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Récupération des valeurs du formulaire
    const formData = new FormData();
    const projectTitle = title.value;
    const projectImage = inputFile.files[0];
    const categoryInput = document.getElementById("categoryInput");
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
        displayModalGallery();
        displayGalleryProjets();
      } else {
        throw new Error("Erreur lors de l'envoi du fichier");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'image :", error.message);
    } finally {
      //Réinitialiser tout
      previewImg.src = "#";
      previewImg.style.display = "none";
      labelFile.style.display = "flex";
      iconFile.style.display = "flex";
      pFile.style.display = "flex";
      formAddWorks.reset();
      containerModalGallery.style.display = "flex";
      containerModalAddWorks.style.display = "none";
    }
  });
}
addWorks();

// Fonction de suppression de l'image en utilisant l'ID
async function deleteWorks(id) {
  const deleteUrl = `http://localhost:5678/api/works/${id}`;

  try {
    const response = await deleteFetch(deleteUrl);
    if (response.ok) {
      await displayModalGallery();
      await displayGalleryProjets();
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de l'image :", error.message);
  }
}
