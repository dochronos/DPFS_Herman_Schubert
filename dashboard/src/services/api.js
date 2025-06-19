// 📍 Dirección base del backend (modificable según entorno)
const BASE_URL = "http://localhost:3000";

// 🌐 Función reutilizable para peticiones con sesión
const fetchWithCredentials = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    switch (response.status) {
      case 401:
        throw new Error("No autenticado. Por favor, inicie sesión.");
      case 403:
        throw new Error("Acceso denegado. Permisos insuficientes.");
      default:
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  }

  return response.json();
};

// 🧑‍💼 Servicios: API de Usuarios
export const fetchUsers = async () => {
  return fetchWithCredentials(`${BASE_URL}/api/users`);
};

export const fetchUserDetail = async (id) => {
  return fetchWithCredentials(`${BASE_URL}/api/users/${id}`);
};

// 🛍️ Servicios: API de Productos
export const fetchProducts = async () => {
  return fetchWithCredentials(`${BASE_URL}/api/products`);
};

export const fetchProductDetail = async (id) => {
  return fetchWithCredentials(`${BASE_URL}/api/products/${id}`);
};
