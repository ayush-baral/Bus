import express from "express";
import axios from "axios";
import dotenv from "dotenv";
// KHALTI_SECRET_KEY=2bcd1dcfa0f34f368ab246f27f706c0d
const app = express();
const router = express.Router();
dotenv.config();

router.post("/khalti", async (req, res) => {
  const payload = req.body;
  const khaltiresponse = await axios.post(
    "https://a.khalti.com/api/v2/epayment/initiate/",
    payload,
    {
      headers: {
        Authorization: `key ${process.env.KHALTI_SECRET_KEY}`,
      },
    }
  );
  if (khaltiresponse) {
    res.json({
      success: true,
      data: khaltiresponse?.data,
    });
  } else {
    res.json({
      success: false,
      message: "Something Went Wrong",
    });
  }
});
export default router;