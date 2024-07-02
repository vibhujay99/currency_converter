import express from "express";
import {
  createTransfer,
  getTransfers,
  deleteTransfer,
} from "../controllers/transferController.js";

const router = express.Router();

router.post("/", createTransfer);
router.get("/", getTransfers);
router.delete("/:id", deleteTransfer);

export default router;
