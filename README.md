# 🌸 Quantum Bloom Space

Proyecto Final – Digital House | Desarrollo Web Full Stack

Quantum Bloom Space es una tienda online inspirada en el minimalismo y la calma. Ofrece una experiencia de compra estética, funcional y moderna, combinando un backend robusto con vistas tradicionales y un dashboard administrativo realizado en React.

---

## 📦 Repositorio

Este repositorio contiene:

- 🛒 Un **backend** desarrollado en **Node.js + Express + Sequelize + MySQL**, que gestiona usuarios, productos, autenticación, carrito y sesiones.
- 📊 Un **dashboard administrativo** construido con **React + Vite**, para visualizar analíticas de productos, usuarios y ventas.
- 🖼️ Una interfaz tradicional basada en **EJS + Bootstrap**, con enfoque limpio y adaptativo.
- 🔐 Validaciones de formularios, carga de imágenes y documentación con **Swagger**.

---

## 🛠️ Tecnologías utilizadas

### 🔧 Backend
- Node.js · Express.js · Sequelize · MySQL
- EJS · bcryptjs · multer · express-validator
- express-session · cookie-parser · method-override
- Swagger (documentación API)

### 📈 Dashboard (Frontend)
- React · Vite
- React Router DOM
- MUI X Charts
- Fetch API

---

## 🚀 ¿Cómo correr el proyecto?

### 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/DPFS_Herman_Schubert.git
cd DPFS_Herman_Schubert

### 2. Configurar el Backend

cd backend
npm install

Crear base de datos MySQL
Asegurate de tener un servidor MySQL corriendo y configurado en src/database/config/config.js.

Sincronizar modelos y cargar seeders (opcional)

npm run db:sync        # Crea tablas automáticamente
npm run db:seed        # Carga datos de ejemplo (categorías, usuarios, productos)

Iniciar servidor backend

npm run dev
Acceso: http://localhost:3000
Documentación API: http://localhost:3000/api-docs

3. Iniciar el Dashboard (frontend administrativo)

cd dashboard
npm install
npm run dev
Acceso: http://localhost:5173

🗂️ Estructura de carpetas clave

├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   └── views/
│   ├── public/
│   └── swaggerConfig.js
│
├── dashboard/
│   ├── src/
│   └── vite.config.js
│
├── docs/
│   ├── DER.html          # Diagrama entidad-relación
│   ├── wireframe.pdf     # Wireframe general del sitio
│   └── retro.md          # Reflexión personal del proyecto
📄 Documentación técnica
🔎 Swagger UI: http://localhost:3000/api-docs

📌 Wireframe: docs/wireframe.pdf

📌 Modelo Entidad-Relación (DER): docs/DER.html

🧠 Reflexión personal: docs/retro.md

✅ Funcionalidades principales
Registro, login y edición de perfil de usuarios.

Alta, baja, edición y detalle de productos.

Carrito de compras persistente por sesión.

Gestión de productos y visualización de estadísticas desde dashboard.

Validaciones tanto en frontend como backend.

CRUD completo de usuarios desde backend.

Carga de imágenes (productos / usuarios).

Middleware para recordar sesión y proteger rutas.

Documentación Swagger de endpoints RESTful.

🧠 Reflexión
Este proyecto fue desarrollado con fines educativos como parte del curso Desarrollo Web Full Stack de Digital House. Refleja un proceso de aprendizaje profundo sobre arquitectura backend, integración frontend y diseño web centrado en el usuario.

👨‍💻 Autor
Herman Schubert – Desarrollador Full Stack

📄 Licencia
MIT – Uso libre educativo y no comercial.
Los assets e imágenes utilizados en el sitio fueron generados, adaptados o extraídos de fuentes libres.

