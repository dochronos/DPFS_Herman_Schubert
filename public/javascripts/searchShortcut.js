"use strict";

document.addEventListener("keydown", (event) => {
  const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  const isCtrlOrCmd = isMac ? event.metaKey : event.ctrlKey;

  if (isCtrlOrCmd && event.key === "k") {
    event.preventDefault();
    const searchInput = document.getElementById("search");

    if (searchInput) {
      searchInput.focus();
    } else {
      console.warn("El input de búsqueda con id 'search' no fue encontrado.");
    }
  }
});
