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
