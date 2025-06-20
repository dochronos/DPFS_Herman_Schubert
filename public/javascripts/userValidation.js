"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const userForm = document.getElementById("userForm");

  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const profileImage = document.getElementById("profileImage");

  const firstNameError = document.getElementById("firstNameError");
  const lastNameError = document.getElementById("lastNameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const profileImageError = document.getElementById("profileImageError");

  const loggedUserEmail = userForm.dataset.loggedUserEmail;
  const isCreateAction = userForm.dataset.action === "crearUsuario";

  userForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    let valid = true;

    // --- Validar Nombre ---
    firstNameError.textContent = "";
    if (!firstName.value.trim()) {
      firstNameError.textContent = "Campo requerido";
      valid = false;
    } else if (firstName.value.trim().length < 2) {
      firstNameError.textContent = "Debe tener al menos 2 caracteres";
      valid = false;
    }

    // --- Validar Apellido ---
    lastNameError.textContent = "";
    if (!lastName.value.trim()) {
      lastNameError.textContent = "Campo requerido";
      valid = false;
    } else if (lastName.value.trim().length < 2) {
      lastNameError.textContent = "Debe tener al menos 2 caracteres";
      valid = false;
    }

    // --- Validar Email ---
    emailError.textContent = "";
    if (!email.value.trim()) {
      emailError.textContent = "Campo requerido";
      valid = false;
    } else if (!validateEmail(email.value)) {
      emailError.textContent = "Correo electrónico inválido";
      valid = false;
    } else {
      try {
        const response = await fetch("/api/users/check-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.value,
            currentEmail: loggedUserEmail,
          }),
        });

        const result = await response.json();

        if (response.status === 404) {
          emailError.textContent = "El correo ya está en uso. Ingresá otro.";
          valid = false;
        } else if (!response.ok) {
          emailError.textContent = "Error al verificar el correo.";
          valid = false;
        }
      } catch {
        emailError.textContent = "Error de conexión con el servidor.";
        valid = false;
      }
    }

    // --- Validar Contraseña ---
    passwordError.textContent = "";
    if (password) {
      const passwordValue = password.value.trim();
      if (!passwordValue && isCreateAction) {
        passwordError.textContent = "Campo requerido";
        valid = false;
      } else if (passwordValue && !validatePassword(passwordValue)) {
        passwordError.textContent =
          "Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.";
        valid = false;
      }
    }

    // --- Validar Imagen ---
    profileImageError.textContent = "";
    if (profileImage.files.length > 0) {
      const file = profileImage.files[0];
      const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      if (!validExtensions.includes(file.type)) {
        profileImageError.textContent = "Debe ser JPG, JPEG, PNG o GIF.";
        valid = false;
      }
    }

    if (valid) userForm.submit();
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validatePassword(password) {
    return (
      /.{8,}/.test(password) &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  }
});
