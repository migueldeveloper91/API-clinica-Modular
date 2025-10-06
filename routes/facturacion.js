/**
 * @swagger
 * /api/facturacion/cuentas:
 *   post:
 *     summary: Crea una cuenta para un paciente
 *     tags: [Facturación]
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
 *               - servicios
 *               - total
 *             properties:
 *               paciente_id:
 *                 type: integer
 *               servicios:
 *                 type: object
 *                 description: Lista de servicios prestados
 *                 example:
 *                   consulta: 50000
 *               total:
 *                 type: integer
 *                 example: 50000
 *     responses:
 *       201:
 *         description: Cuenta creada
 *
 *   get:
 *     summary: Lista todas las cuentas
 *     tags: [Facturación]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de cuentas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   paciente_id:
 *                     type: integer
 *                   servicios:
 *                     type: object
 *                   total:
 *                     type: integer
 *                   estado:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 */

/**
 * @swagger
 * /api/facturacion/pagos:
 *   post:
 *     summary: Registra un pago de una cuenta
 *     tags: [Facturación]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cuenta_id
 *               - monto
 *               - metodo
 *             properties:
 *               cuenta_id:
 *                 type: integer
 *               monto:
 *                 type: integer
 *                 example: 50000
 *               metodo:
 *                 type: string
 *                 description: Ej. "efectivo", "tarjeta"
 *                 example: "efectivo"
 *               transaccion_id:
 *                 type: string
 *                 description: ID de transacción (opcional)
 *                 example: "TX123456"
 *     responses:
 *       201:
 *         description: Pago registrado
 */

import express from "express";
import { pool } from "../db/pool.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/cuentas", verifyToken, async (req, res) => {
  const { paciente_id, servicios, total } = req.body;
  const query = `INSERT INTO cuentas (paciente_id, servicios, total)
                 VALUES ($1,$2,$3) RETURNING *`;
  const { rows } = await pool.query(query, [paciente_id, servicios, total]);
  res.status(201).json(rows[0]);
});

router.get("/cuentas", verifyToken, async (_, res) => {
  const { rows } = await pool.query("SELECT * FROM cuentas");
  res.json(rows);
});

router.post("/pagos", verifyToken, async (req, res) => {
  const { cuenta_id, monto, metodo, transaccion_id } = req.body;
  const query = `INSERT INTO pagos (cuenta_id, monto, metodo, transaccion_id)
                 VALUES ($1,$2,$3,$4) RETURNING *`;
  const { rows } = await pool.query(query, [
    cuenta_id,
    monto,
    metodo,
    transaccion_id,
  ]);
  res.status(201).json(rows[0]);
});

export default router;
