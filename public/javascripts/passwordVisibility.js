"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.getElementById("eyeIcon");

  if (!togglePassword || !passwordInput || !eyeIcon) {
    console.warn("Elementos para alternar visibilidad de contraseña no encontrados.");
    return;
  }

  togglePassword.addEventListener("click", () => {
    const isPasswordVisible = passwordInput.type === "text";

    // Alternar tipo de input
    passwordInput.type = isPasswordVisible ? "password" : "text";
    passwordInput.style.color = isPasswordVisible ? "" : "gray";
    passwordInput.style.fontSize = isPasswordVisible ? "" : "14px";

    // Alternar estado visual del botón
    togglePassword.classList.toggle("active");

    // Cambiar color del botón e icono
    togglePassword.style.backgroundColor = togglePassword.classList.contains("active") ? "blueviolet" : "";
    eyeIcon.style.fill = togglePassword.classList.contains("active") ? "white" : "";
  });
});
