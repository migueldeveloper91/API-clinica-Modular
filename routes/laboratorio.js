/**
 * @swagger
 * /api/laboratorio/ordenes:
 *   post:
 *     summary: Registra una orden de examen
 *     tags: [Laboratorio]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paciente_id:
 *                 type: integer
 *               examen:
 *                 type: string
 *               fecha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Orden creada correctamente
 *   get:
 *     summary: Lista todas las órdenes de laboratorio
 *     tags: [Laboratorio]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de órdenes
 */

/**
 * @swagger
 * /api/laboratorio/resultados:
 *   post:
 *     summary: Guarda resultados de exámenes
 *     tags: [Laboratorio]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orden_id:
 *                 type: integer
 *               resultado:
 *                 type: string
 *               fecha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Resultado registrado correctamente
 */

import express from "express";
import { pool } from "../db/pool.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/ordenes", verifyToken, async (req, res) => {
  const { paciente_id, examen, fecha } = req.body;
  const query = `INSERT INTO laboratorio_ordenes (paciente_id, examen, fecha)
                 VALUES ($1,$2,$3) RETURNING *`;
  const { rows } = await pool.query(query, [paciente_id, examen, fecha]);
  res.status(201).json(rows[0]);
});

router.get("/ordenes", verifyToken, async (_, res) => {
  const { rows } = await pool.query("SELECT * FROM laboratorio_ordenes");
  res.json(rows);
});

router.post("/resultados", verifyToken, async (req, res) => {
  const { orden_id, resultado, fecha } = req.body;
  const query = `INSERT INTO laboratorio_resultados (orden_id, resultado, fecha)
                 VALUES ($1,$2,$3) RETURNING *`;
  const { rows } = await pool.query(query, [orden_id, resultado, fecha]);
  res.status(201).json(rows[0]);
});

export default router;
