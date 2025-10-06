/**
 * @swagger
 * /api/farmacia/medicamentos:
 *   post:
 *     summary: Crea un medicamento
 *     tags: [Farmacia]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - nombre
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID único del medicamento (ej. "MED123")
 *               nombre:
 *                 type: string
 *               stock:
 *                 type: integer
 *                 description: Cantidad disponible
 *               precio:
 *                 type: integer
 *                 description: Precio del medicamento
 *     responses:
 *       201:
 *         description: Medicamento creado
 *
 *   get:
 *     summary: Lista todos los medicamentos
 *     tags: [Farmacia]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de medicamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   nombre:
 *                     type: string
 *                   stock:
 *                     type: integer
 *                   precio:
 *                     type: integer
 */

/**
 * @swagger
 * /api/farmacia/dispensaciones:
 *   post:
 *     summary: Registra una dispensación a un paciente
 *     tags: [Farmacia]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paciente_id
 *               - medicamento_id
 *               - cantidad
 *             properties:
 *               paciente_id:
 *                 type: integer
 *                 description: ID del paciente
 *               medicamento_id:
 *                 type: string
 *                 description: ID del medicamento
 *               cantidad:
 *                 type: integer
 *                 description: Cantidad dispensada
 *     responses:
 *       201:
 *         description: Dispensación registrada
 */

import express from "express";
import { pool } from "../db/pool.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/medicamentos", verifyToken, async (req, res) => {
  const { id, nombre, stock, precio } = req.body;
  const query = `INSERT INTO medicamentos (id, nombre, stock, precio)
                 VALUES ($1,$2,$3,$4) RETURNING *`;
  const { rows } = await pool.query(query, [id, nombre, stock, precio]);
  res.status(201).json(rows[0]);
});

router.get("/medicamentos", verifyToken, async (_, res) => {
  const { rows } = await pool.query("SELECT * FROM medicamentos");
  res.json(rows);
});

router.post("/dispensaciones", verifyToken, async (req, res) => {
  const { paciente_id, medicamento_id, cantidad } = req.body;
  const query = `INSERT INTO dispensaciones (paciente_id, medicamento_id, cantidad)
                 VALUES ($1,$2,$3) RETURNING *`;
  const { rows } = await pool.query(query, [
    paciente_id,
    medicamento_id,
    cantidad,
  ]);
  res.status(201).json(rows[0]);
});

export default router;
