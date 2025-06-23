# Retroalimentación del Proyecto – QuantumBloom Space 🪴

## 🌟 ¿Qué hicimos bien?

- **Organización del proyecto**: Se estructuró claramente la aplicación en capas bien definidas (routes, controllers, services, middlewares, views), lo cual facilitó la comprensión y mantenibilidad.
- **Documentación Swagger**: Se incorporó una API REST bien documentada, permitiendo una integración sencilla y profesional con herramientas externas.
- **Validaciones robustas**: Se utilizaron `express-validator` y validaciones personalizadas tanto en el frontend como en el backend para proteger el sistema frente a datos incorrectos o maliciosos.
- **Diseño visual y experiencia de usuario**: Se logró una estética limpia, cálida y minimalista, coherente con la marca QuantumBloom, utilizando Bootstrap y fuentes cuidadosamente seleccionadas.
- **Autenticación y autorización**: Se implementaron sesiones y middleware personalizados para controlar el acceso según el rol del usuario (admin o user), protegiendo recursos sensibles.
- **Separación entre rutas web y API**: Esto permitió mantener una lógica clara entre las vistas renderizadas y los endpoints que devuelven JSON.

---

## 🧩 ¿Qué podríamos mejorar?

- **Testing automatizado**: El proyecto aún no cuenta con pruebas unitarias ni de integración. Incorporar herramientas como Jest, Mocha o Supertest mejoraría la confiabilidad del sistema.
- **Gestión de errores más detallada**: Aunque existe una página de error general, podría profundizarse la diferenciación entre errores de cliente, servidor o autenticación.
- **Mejor manejo de archivos estáticos**: Podríamos optimizar la carga de imágenes y permitir el uso de miniaturas (thumbnails) para mejorar el rendimiento.
- **Internacionalización (i18n)**: Si bien la app está completamente en español, una futura versión podría ofrecer soporte multilingüe desde el frontend y el backend.
- **Dashboard de administrador**: Se podría ampliar el panel admin con un sistema gráfico más completo (gráficos, métricas, usuarios activos, etc.).

---

## 💡 ¿Qué aprendimos?

- Cómo estructurar una aplicación fullstack basada en **Express.js** y **Sequelize** con MVC y arquitectura limpia.
- La importancia de separar responsabilidades entre archivos (controllers, validators, middlewares, routes).
- Cómo usar **Swagger** para documentar APIs de manera profesional.
- Cómo implementar **autenticación** y **control de acceso** desde cero utilizando sesiones y middlewares.
- Cómo reutilizar formularios de manera eficiente con **EJS** y validaciones dinámicas.
- Cómo aplicar diseño web enfocado en **usabilidad**, **accesibilidad** y **consistencia visual**.

---

## 🚀 Próximos pasos sugeridos

- Implementar pruebas automáticas.
- Desplegar en un entorno real como **Render**, **Railway** o **Vercel**.
- Incorporar un sistema de recuperación de contraseña.
- Mejorar el sistema de búsqueda con filtros por categoría, precio o marca.
- Optimizar la base de datos y relaciones con Sequelize para escalar más fácilmente.

---

_Proyecto desarrollado con entusiasmo por el equipo de QuantumBloom 🌿_
