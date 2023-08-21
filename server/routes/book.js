import express from "express";
import {
  bookBus,
  getBook,
  getallBook,
} from "../controllers/bookingcontroller.js";
import { verifyAdmin, verifyUser } from "../utils/verifytoken.js";

const app = express();
const router = express.Router();

console.log("buasd");
//create
router.post("/", bookBus);
router.get("/", getallBook);
router.get("/:id", verifyUser, getBook);

export default router;
