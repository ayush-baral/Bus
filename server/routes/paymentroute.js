import express from "express";
import axios from "axios";
import dotenv from "dotenv";
// KHALTI_SECRET_KEY=2bcd1dcfa0f34f368ab246f27f706c0d
const app = express();
const router = express.Router();
dotenv.config();

router.post("/khalti", async (req, res) => {
  const { token, amount } = req.body;
  const khaltiresponse = await axios.post(
    "https://khalti.com/api/v2/payment/verify/",
    {
      token,
      amount,
    },
    {
      headers: {
        Authorization: `Key test_secret_key_178a4691eca34077a0d47daf52ed0701`,
      },
    }
  );
  console.log(khaltiresponse);
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
