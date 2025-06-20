"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const productForm = document.getElementById("productForm");
  const name = document.getElementById("name");
  const description = document.getElementById("description");
  const image = document.getElementById("image");

  const nameError = document.getElementById("nameError");
  const descriptionError = document.getElementById("descriptionError");
  const imageError = document.getElementById("imageError");

  if (!productForm || !name || !description || !image) {
    console.warn("Elementos del formulario de producto no encontrados.");
    return;
  }

  productForm.addEventListener("submit", (event) => {
    let valid = true;

    // Limpiar errores anteriores
    nameError.textContent = "";
    descriptionError.textContent = "";
    imageError.textContent = "";

    // Validar nombre
    const nameValue = name.value.trim();
    if (!nameValue) {
      nameError.textContent = "Campo requerido.";
      valid = false;
    } else if (nameValue.length < 5) {
      nameError.textContent = "El nombre debe tener al menos 5 caracteres.";
      valid = false;
    }

    // Validar descripción
    const descriptionValue = description.value.trim();
    if (!descriptionValue) {
      descriptionError.textContent = "Campo requerido.";
      valid = false;
    } else if (descriptionValue.length < 20) {
      descriptionError.textContent = "La descripción debe tener al menos 20 caracteres.";
      valid = false;
    }

    // Validar imagen si se sube
    if (image.files.length > 0) {
      const file = image.files[0];
      const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

      if (!validExtensions.includes(file.type)) {
        imageError.textContent = "La imagen debe ser JPG, JPEG, PNG o GIF.";
        valid = false;
      }
    }

    if (!valid) {
      event.preventDefault(); // Evitar envío si hay errores
    }
  });
});
