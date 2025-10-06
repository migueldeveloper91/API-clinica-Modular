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
