# Quantum Bloom Space 🌸✨
Proyecto Final - Digital House | Desarrollo Web Full Stack

## 📁 DPFS_Herman_Schubert

Este repositorio contiene el proyecto final del curso de Desarrollo Web Full Stack, compuesto por:

- ✨ Un **backend en Node.js + Express + Sequelize + MySQL** que gestiona productos, usuarios, autenticación, ventas y carrito.
- 📊 Un **dashboard administrativo** construido con **React + Vite** para visualizar estadísticas de ventas, usuarios y productos.
- 🎨 Estética inspirada en el concepto de **Quantum Bloom Space**, con un enfoque relajado y minimalista.

---

## 🧰 Tecnologías utilizadas

### Backend:
- Node.js
- Express.js
- EJS (para vistas del frontend tradicional)
- Sequelize (ORM)
- MySQL
- Swagger (documentación de API)
- Multer (subida de imágenes)
- bcryptjs (hash de contraseñas)
- express-validator

### Frontend (Dashboard):
- React
- Vite
- React Router DOM
- MUI X Charts (gráfico de torta)
- Fetch API

---

## 🚀 Instrucciones para ejecutar el proyecto

### 📦 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/DPFS_Herman_Schubert.git
cd DPFS_Herman_Schubert

⚙️ 2. Backend - Instalación y ejecución
bash
Copiar
Editar
cd backend
npm install
npm run start
El servidor correrá en: http://localhost:3000

Documentación de API: http://localhost:3000/api-docs

⚠️ Asegurate de tener una base de datos MySQL creada y configurada en src/database/config/config.js.

🧪 Seed de datos (opcional)
bash
Copiar
Editar
npx sequelize-cli db:seed:all
Esto cargará categorías, productos, usuarios, carritos, colores y relaciones de ejemplo.

📊 3. Frontend - Dashboard
bash
Copiar
Editar
cd dashboard
npm install
npm run dev
El dashboard estará disponible en: http://localhost:5173

📚 Licencia
Este proyecto fue desarrollado con fines educativos como parte del curso de Desarrollo Web Full Stack en Digital House. Todos los recursos utilizados fueron debidamente referenciados o generados para uso libre no comercial.