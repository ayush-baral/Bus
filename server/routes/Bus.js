import express from "express";
import Bus from "../models/busmodel.js";
import { verifyAdmin } from "../utils/verifytoken.js";
// import { createError } from "../utils/error.js";
import {
  createBus,
  deleteBus,
  getBus,
  getBusesFromTo,
  getallBus,
  updateBus,
} from "../controllers/buscontroller.js";
const app = express();
const router = express.Router();

console.log("buasd")
//create
router.post("/", verifyAdmin, createBus);

//update
router.put("/:id", verifyAdmin, updateBus);
//delete
router.delete("/:id", verifyAdmin, deleteBus);

//Get
router.get("/find/:id", getBus);
//getall
router.get("/", getallBus);
router.get("/buses", getBusesFromTo);
// router.get("/", getallBus);
// const failed = true;

// if (failed) return next(createError(401, "You are not authenticated!"));

export default router;
