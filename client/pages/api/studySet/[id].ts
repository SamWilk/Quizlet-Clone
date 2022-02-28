import type { NextApiRequest, NextApiResponse } from "next";

import express from "express";
import cors from "cors";
import pool from "../../api/db";

//Middle wire
const app = express();
app.use(cors);
app.use(express.json());

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const method = req.method;
  switch (method) {
    case "PUT":
      try {
        const { id } = req.query;
        const { setname } = req.body;
        const updateName = await pool.query(
          "UPDATE studyset SET setname = $1 WHERE id = $2 RETURNING *",
          [setname, id]
        );
        res.status(200).json(updateName.rows);
      } catch (error: any) {
        res.status(500).json({ Error: error.message });
      }
      break;
    case "GET":
      try {
        const { id } = req.query;
        const set = await pool.query("SELECT * FROM studyset WHERE id = $1", [
          id,
        ]);
        if (set.rows[0] != undefined) {
          res.status(200).json(set.rows[0]);
        }
      } catch (error: any) {
        res.status(500).json({ Error: error.message });
      }
    case "DELETE":
      try {
        const { id } = req.query;
        const remove = await pool.query("DELETE FROM studyset WHERE id = $1", [
          id,
        ]);
        res.status(200).json(`${remove.command} id: ${id} from studyset TABLE`);
      } catch (error) {}
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
