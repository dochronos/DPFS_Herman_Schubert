// ─────── DEPENDENCIAS PRINCIPALES ───────
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const methodOverride = require("method-override");
const session = require("express-session");
const cors = require("cors");
const createError = require("http-errors");

// ─────── SWAGGER ───────
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerConfig");

// ─────── MIDDLEWARES ───────
const rememberMiddleware = require("./src/middlewares/rememberMiddleware");

// ─────── RUTAS WEB ───────
const indexRouter = require("./src/routes/web/index");
const usersRoutes = require("./src/routes/web/usersRoutes");
const productsRoutes = require("./src/routes/web/productsRoutes");

// ─────── RUTAS API ───────
const usersApi = require("./src/routes/api/usersApi");
const productsApi = require("./src/routes/api/productsApi");

// ─────── INSTANCIA EXPRESS ───────
const app = express();

// ─────── CONFIGURACIÓN CORS ───────
app.use(cors({
  origin: "http://localhost:5173", // Cambiar en producción
  credentials: true
}));

// ─────── CONFIGURACIÓN VIEW ENGINE ───────
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

// ─────── MIDDLEWARES GLOBALES ───────
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// ─────── SESIONES ───────
app.use(session({
  secret: process.env.SESSION_SECRET || "DHproyectoFullStack",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
  }
}));

// ─────── RECORDAR USUARIO POR COOKIE ───────
app.use(rememberMiddleware);

// ─────── INYECTAR USUARIO EN TODAS LAS VISTAS ───────
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// ─────── SWAGGER ───────
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ─────── RUTAS PRINCIPALES ───────
app.use("/", indexRouter);
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);

// ─────── RUTAS API ───────
app.use("/api/users", usersApi);
app.use("/api/products", productsApi);

// ─────── MANEJO DE ERRORES ───────
// 404
app.use((req, res, next) => {
  next(createError(404));
});

// Manejador general de errores
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
