import type { NextApiRequest, NextApiResponse } from "next";

import express from "express";
const app = express();
import cors from "cors";
import pool from "./db";

//Middle wire
app.use(cors);
app.use(express.json());

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  switch (method) {
    //Get the first 25 study sets
    case "GET":
      console.log(req.body);
      try {
        const getSets = await pool.query(
          "SELECT * FROM studyset ORDER BY created_at DESC LIMIT 20"
        );
        res.status(200).json(getSets.rows);
        res.status(200).json({ Message: "Get Received" });
      } catch (error: any) {
        res.status(500).json({
          Error: error.message,
        });
        console.error(error.message);
      }
      break;
    //Creating a new study set
    case "POST":
      try {
        const { setname } = req.body;
        const newItem = await pool.query(
          "INSERT INTO studySet (setname) VALUES ($1) RETURNING *",
          [setname]
        );
        res.status(200).json(newItem);
      } catch (error: any) {
        res.status(500).json({ Error: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
