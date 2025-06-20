"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  if (!loginForm || !emailInput || !passwordInput || !emailError || !passwordError) {
    console.warn("No se encontraron elementos necesarios para la validación.");
    return;
  }

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    let isValid = true;

    // Limpiar mensajes de error anteriores
    emailError.textContent = "";
    passwordError.textContent = "";

    // Validación de email
    if (!emailInput.value.trim()) {
      emailError.textContent = "Campo requerido.";
      isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
      emailError.textContent = "Ingrese un correo electrónico válido.";
      isValid = false;
    }

    // Validación de contraseña
    if (!passwordInput.value.trim()) {
      passwordError.textContent = "Campo requerido.";
      isValid = false;
    }

    if (!isValid) return;

    // Envío para validación en el servidor
    try {
      const response = await fetch("/api/users/check-credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailInput.value.trim(),
          password: passwordInput.value,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          emailError.textContent = result.error;
        } else if (response.status === 401) {
          passwordError.textContent = result.error;
        }
        return;
      }

      // Si la validación es exitosa, enviar formulario
      loginForm.submit();
    } catch (error) {
      console.error("Error en la validación del servidor:", error);
    }
  });

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
