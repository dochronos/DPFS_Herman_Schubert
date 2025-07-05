import axios from "axios";

// 🌍 Configuración base
const BASE_URL = "http://localhost:3000/api";

// ✅ Instancia pública (no necesita credenciales)
const publicAPI = axios.create({
  baseURL: BASE_URL,
});

// 🔒 Instancia autenticada (cookies, headers, etc.)
const privateAPI = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 📤 Exportación unificada
export default publicAPI;

// 🧑‍💼 Servicios privados: usuarios (requiere sesión)
export const fetchUsers = async () => {
  const res = await privateAPI.get("/users");
  return res.data;
};

export const fetchUserDetail = async (id) => {
  const res = await privateAPI.get(`/users/${id}`);
  return res.data;
};

// 🛍️ Servicios privados: productos (requiere sesión)
export const fetchProducts = async () => {
  const res = await privateAPI.get("/products");
  return res.data;
};

export const fetchProductDetail = async (id) => {
  const res = await privateAPI.get(`/products/${id}`);
  return res.data;
};
