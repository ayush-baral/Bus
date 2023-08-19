import Book from "../models/bookingmodel.js";

//create new booking
export const bookBus = async (req, res, next) => {
  console.log(req.body);
  try {
    const bookBus = new Book(req.body);
    const bookedBus = await bookBus.save();
    console.log(bookedBus);
    res.status(200).json(bookedBus);
  } catch (err) {
    next(err);
  }
};

//get single book
export const getBook = async (req, res, next) => {
  try {
    console.log("asdasdass");
    const book = await Book.findById(req.params.id);
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
};

//get all book
export const getallBook = async (req, res) => {
  try {
    console.log("asdasdass");
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};
