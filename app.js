const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const methodOverride = require("method-override");
const session = require("express-session");
const rememberMiddleware = require("./src/middlewares/rememberMiddleware");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerConfig");

// Rutas
const indexRouter = require("./src/routes/web/index");
const usersRoutes = require("./src/routes/web/usersRoutes");
const productsRoutes = require("./src/routes/web/productsRoutes");
const usersApi = require("./src/routes/api/usersApi");
const productsApi = require("./src/routes/api/productsApi");

// Instanciar Express
const app = express();

// CORS: permitir conexiones desde frontend (Vite u otro)
app.use(
  cors({
    origin: "http://localhost:5173", // Cambiar en producción
    credentials: true,
  })
);

// View engine setup
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

// Middlewares globales
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// Sesión
app.use(
  session({
    secret: process.env.SESSION_SECRET || "DHproyectoFullStack",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    },
  })
);

// Recordar sesión por cookie
app.use(rememberMiddleware);

// Inyectar usuario logueado en vistas
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Swagger (documentación)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas principales
app.use("/", indexRouter);
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);

// Rutas API
app.use("/api/users", usersApi);
app.use("/api/products", productsApi);

// Catch 404
app.use((req, res, next) => {
  next(createError(404));
});

// Manejador de errores
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
