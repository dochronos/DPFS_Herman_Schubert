# 🌸 Quantum Bloom Space

**Proyecto Final – Digital House | Desarrollo Web Full Stack**

Quantum Bloom Space es una tienda online inspirada en el minimalismo, la calma y la estética funcional. Combina un backend sólido con vistas tradicionales en EJS y un dashboard administrativo moderno construido en React.

---

## 🔗 Accesos rápidos

- 🛠️ Documentación API (Swagger): [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- 🖥️ Backend (servidor web): [http://localhost:3000](http://localhost:3000)
- 📊 Dashboard administrativo (React): [http://localhost:5173](http://localhost:5173)

---

## 📦 Tecnologías utilizadas

### Backend
- Node.js · Express.js · Sequelize ORM · MySQL
- EJS (plantillas) · bcryptjs · multer · express-validator
- express-session · cookie-parser · method-override
- Swagger UI (documentación de la API REST)

### Frontend (Dashboard React)
- React · Vite
- React Router DOM
- MUI X Charts
- Fetch API

---

## 🚀 ¿Cómo correr el proyecto?

### 1. Clonar el repositorio

bash
git clone https://github.com/dochronos/DPFS_Herman_Schubert.git
cd DPFS_Herman_Schubert

Backend

cd backend
npm install

🔧 Configurar base de datos: Asegurate de tener un servidor MySQL activo y completar tus credenciales en src/database/config/config.js.

npm run db:sync     # Crea las tablas
npm run db:seed     # Carga datos de prueba (usuarios, productos, etc.)
npm run dev         # Inicia el servidor en http://localhost:3000

Frontend (Dashboard React)

cd dashboard
npm install
npm run dev

Acceso: http://localhost:5173

🗂️ Estructura de carpetas

DPFS_Herman_Schubert/
├── backend/
│   ├── public/                 # Imágenes, estilos, favicon
│   └── src/
│       ├── controllers/
│       ├── database/
│       ├── middlewares/
│       ├── routes/
│       ├── services/
│       ├── validators/
│       └── views/
├── dashboard/
│   └── src/
└── docs/
    ├── wireframe.pdf
    ├── DER.html
    └── retro.md

✅ Funcionalidades principales
👤 Usuarios
Registro, login, edición y eliminación de perfil

Carga de imagen de perfil

Roles diferenciados: usuario común y administrador

Middleware para recordar sesión y proteger rutas privadas

🛒 Carrito de compras
Agregar, aumentar, disminuir y eliminar productos

Subtotal por ítem y total general

Persistencia por sesión

Confirmación de compra y registro de ventas

📦 Productos
Alta, baja, edición y detalle

Filtros, búsqueda y paginación (desde el backend o el dashboard)

Validaciones robustas (express-validator)

Imágenes y descripción detallada

📊 Dashboard administrativo (React)
SPA con estadísticas gráficas en tiempo real

Gráficos de productos más vendidos, usuarios, categorías y marcas

Consumo de API RESTful vía Fetch

🔐 Seguridad y validaciones
Hash de contraseñas con bcrypt

Middleware de autenticación y autorización

Validaciones frontend y backend

🔎 Documentación de API
Swagger UI accesible desde /api-docs

Estructura clara de endpoints RESTful

🌐 Sitios de referencia e inspiración
Durante el diseño y desarrollo de Quantum Bloom Space, se tomaron como referencia los siguientes sitios por su estética, experiencia de usuario o propuesta visual:

https://www.typology.com/
↳ Inspiración para una estética minimalista y uso de tonos suaves. Su enfoque en el espacio blanco y la tipografía clara sirvió como guía para transmitir calma y sofisticación.

https://www.muji.com/
↳ Referencia clave para estructura simple, navegación intuitiva y filosofía centrada en lo esencial. Su diseño fue modelo para mantener una experiencia limpia y ordenada.

https://www.papersource.com/
↳ Tomamos inspiración de este sitio por su enfoque en papelería y regalos. Nos ayudó a entender cómo presentar planners, accesorios y objetos para el bienestar diario.

https://www.oysho.com/
↳ Aportó ideas sobre paleta cromática suave y armoniosa. También fue útil para observar cómo incorporar imágenes de producto emocionalmente atractivas.

https://notion.so/
↳ Aunque no es una tienda, sirvió como inspiración por su enfoque zen, estilo visual relajado y consistencia tipográfica. Fue clave para definir la identidad visual del dashboard.

🧠 Reflexión
Este proyecto fue desarrollado como parte del curso Desarrollo Web Full Stack de Digital House. Aplicamos buenas prácticas de arquitectura backend, diseño web y consumo de APIs, logrando una solución funcional y visualmente coherente con los valores de la marca QuantumBloom.

📝 Ver retroalimentación completa

👨‍💻 Autor
Herman Schubert – Desarrollador Full Stack
📧 hermand.schubert@gmail.com

📄 Licencia
MIT – Uso educativo y no comercial.
Los assets e imágenes utilizados fueron generados, adaptados o extraídos de fuentes libres.