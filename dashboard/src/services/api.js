import axios from "axios";

// 🌍 Configuración base
const BASE_URL = "http://localhost:3000/api";

// ✅ Instancia pública (no necesita credenciales)
const publicAPI = axios.create({
  baseURL: BASE_URL,
});

// 📤 Exportación unificada por defecto
export default publicAPI;

// 🧑‍💼 Servicios públicos: usuarios (no requiere sesión)
export const fetchUsers = async () => {
  const res = await publicAPI.get("/users/public");
  return res.data;
};

export const fetchUserDetail = async (id) => {
  const res = await publicAPI.get(`/users/${id}`);
  return res.data;
};

// 🛍️ Productos – acceso público
export const fetchProducts = async () => {
  const res = await publicAPI.get("/products/public");
  return res.data;
};

export const fetchProductDetail = async (id) => {
  const res = await publicAPI.get(`/products/public/${id}`);
  return res.data;
};
