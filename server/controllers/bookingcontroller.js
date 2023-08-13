import Book from "../models/bookingmodel.js";
export const bookBus = async (req, res, next) => {
    console.log(req.body);
    try {
        const bookBus = new Book(req.body);
      const bookedBus = await bookBus.save();
      console.log(bookedBus)
      res.status(200).json(bookedBus);
    } catch (err) {
      next(err);
    }
  };