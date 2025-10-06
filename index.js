/**
 * ---------------------------------------------------------
 * 🏥 CLÍNICA API — SERVICIO PRINCIPAL
 * Arquitectura: SOA (Service-Oriented Architecture)
 * Patrón aplicado: API Gateway / Fachada de servicios
 * ---------------------------------------------------------
 * Este servidor Express actúa como punto central de entrada
 * y coordina los microservicios:
 * - Pacientes
 * - Laboratorio
 * - Farmacia
 * - Facturación
 *
 * También implementa autenticación mediante JWT.
 * ---------------------------------------------------------
 */

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Estado del servicio
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Servicio activo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ok"
 */

import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";

// Importación de rutas de cada servicio (módulos separados)
import facturacionRoutes from "./routes/facturacion.js";
import farmaciaRoutes from "./routes/farmacia.js";
import laboratorioRoutes from "./routes/laboratorio.js";
import pacientesRoutes from "./routes/pacientes.js";
import { swaggerSpec, swaggerUi } from "./swagger.js";
// Conexión a la base de datos (Postgres en Supabase)
import { pool } from "./db/pool.js";

// Inicialización de la app Express
const app = express();

// ---------------------------------------------------------
// MIDDLEWARES GLOBALES
// ---------------------------------------------------------

// Permitir solicitudes desde cualquier origen (CORS)
app.use(cors());

// Parsear cuerpos de solicitud en formato JSON
app.use(bodyParser.json());

// ---------------------------------------------------------
// SERVICIO DE AUTENTICACIÓN (LOGIN)
// ---------------------------------------------------------
/**
 * Endpoint: POST /api/auth/login
 * Descripción: Valida las credenciales del usuario, verifica
 * la contraseña cifrada y devuelve un token JWT válido.
 *
 * Flujo:
 * 1. Recibe usuario y contraseña.
 * 2. Busca el usuario en la base de datos.
 * 3. Verifica la contraseña con bcrypt.
 * 4. Si es correcta, genera y devuelve un token JWT.
 * 5. Si no, devuelve un error HTTP 401.
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicia sesión y devuelve un token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               pass:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Usuario o contraseña incorrectos
 */

app.post("/api/auth/login", async (req, res) => {
  const { user, pass } = req.body;

  try {
    // Buscar usuario en la tabla "usuarios"
    const { rows } = await pool.query(
      "SELECT * FROM usuarios WHERE username=$1",
      [user]
    );

    // Si no existe, error 401
    if (rows.length === 0)
      return res.status(401).json({ error: "Usuario no encontrado" });

    const usuario = rows[0];

    // Verificar contraseña con bcrypt (comparación segura)
    const valid = await bcrypt.compare(pass, usuario.password);
    if (!valid) return res.status(401).json({ error: "Contraseña incorrecta" });

    // Generar token JWT con datos del usuario
    const token = jwt.sign(
      {
        id: usuario.id,
        user: usuario.username,
        rol: usuario.rol,
      },
      process.env.JWT_SECRET, // clave secreta definida en .env
      { expiresIn: "6h" } // tiempo de expiración del token
    );

    // Enviar token como respuesta
    res.json({ token });
  } catch (err) {
    console.error("❌ Error en autenticación:", err);
    res.status(500).json({ error: "Error al autenticar" });
  }
});

// ---------------------------------------------------------
// REGISTRO DE SERVICIOS (RUTAS PRINCIPALES)
// ---------------------------------------------------------
/**
 * Cada módulo (pacientes, laboratorio, etc.)
 * exporta un enrutador Express independiente.
 *
 * Esto permite mantener el código modular y cumplir
 * con el principio de bajo acoplamiento del patrón SOA.
 */

app.use("/api/pacientes", pacientesRoutes);
app.use("/api/laboratorio", laboratorioRoutes);
app.use("/api/farmacia", farmaciaRoutes);
app.use("/api/facturacion", facturacionRoutes);

// ---------------------------------------------------------
// ENDPOINT DE VERIFICACIÓN DE SALUD (Health Check)
// ---------------------------------------------------------
/**
 * Endpoint: GET /api/health
 * Permite comprobar rápidamente si el servicio está
 * corriendo correctamente (usado para monitoreo o despliegue).
 */
app.get("/api/health", (_, res) => res.json({ status: "ok" }));

// ---------------------------------------------------------
// INICIO DEL SERVIDOR
// ---------------------------------------------------------
/**
 * Levanta el servidor Express en el puerto 4000 (local)
 * o el puerto asignado por la plataforma en producción (Vercel, Render, etc.)
 */
const PORT = process.env.PORT || 4000;

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () =>
  console.log(`✅ API Clínica modular corriendo en puerto ${PORT}`)
);
