import express from "express";
import { pool } from "../db/pool.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  const { nombre, documento, fechaNacimiento, direccion, telefono } = req.body;
  const query = `INSERT INTO pacientes (nombre, documento, fecha_nacimiento, direccion, telefono)
                 VALUES ($1,$2,$3,$4,$5) RETURNING *`;
  const { rows } = await pool.query(query, [
    nombre,
    documento,
    fechaNacimiento,
    direccion,
    telefono,
  ]);
  res.status(201).json(rows[0]);
});

router.get("/", verifyToken, async (_, res) => {
  const { rows } = await pool.query("SELECT * FROM pacientes ORDER BY id DESC");
  res.json(rows);
});

router.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query("SELECT * FROM pacientes WHERE id=$1", [
    id,
  ]);
  if (rows.length === 0)
    return res.status(404).json({ error: "No encontrado" });
  res.json(rows[0]);
});

export default router;
