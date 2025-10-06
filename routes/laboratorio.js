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
