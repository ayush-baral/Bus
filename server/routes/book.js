import express from "express";
// import { createError } from "../utils/error.js";
import {
  bookBus
} from "../controllers/bookingcontroller.js";
const app = express();
const router = express.Router();

console.log("buasd")
//create
router.post("/", bookBus);

export default router;