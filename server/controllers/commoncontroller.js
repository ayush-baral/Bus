import users from "../models/usermodel.js";
import bus from "../models/busmodel.js";

export const datacount = async (req, res, next) => {
  try {
    const countdata = [];
    const userdata = await users
      .find({
        isAdmin: false,
      })
      .count();
    const busdata = await bus.find().count();
    countdata.push({
      users: userdata,
      bus: busdata,
    });
    res.status(200).json(countdata);
  } catch (err) {
    next(err);
  }
};
