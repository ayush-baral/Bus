import Bus from "../models/busmodel.js";

export const createBus = async (req, res, next) => {
  console.log(req.body);
  const newBus = new Bus(req.body);
  try {
    const savedBus = await newBus.save();
    console.log(savedBus);
    res.status(200).json(savedBus);
  } catch (err) {
    next(err);
  }
};

export const updateBus = async (req, res, next) => {
  try {
    const updatedBus = await Bus.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedBus);
  } catch (err) {
    next(err);
  }
};

export const deleteBus = async (req, res, next) => {
  try {
    await Bus.findByIdAndDelete(req.params.id);
    res.status(200).json("Bus has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getBus = async (req, res, next) => {
  try {
    console.log("asdasdass");
    const bus = await Bus.findById(req.params.id);
    res.status(200).json(bus);
  } catch (err) {
    next(err);
  }
};

export const getallBus = async (req, res, next) => {
  try {
    const buses = await Bus.find();
    res.status(200).json(buses);
  } catch (err) {
    next(err);
  }
};

export const getBusesFromTo = async (req, res, next) => {
  console.log("asdas");
  const { startCity, destinationCity } = req.query;
  const filter = {};
  console.log(startCity, destinationCity);
  if (!startCity && !destinationCity) {
    return res.status(200).json([]);
  }
  if (startCity) {
    filter["startCity"] = {
      $regex: startCity?.toLowerCase().trim(),
      $options: "i",
    };
  }

  if (destinationCity) {
    filter["destinationCity"] = {
      $regex: destinationCity?.toLowerCase().trim(),
      $options: "i",
    };
  }
  try {
    const buses = await Bus.find(filter);
    return res.status(200).json(buses);
  } catch (err) {
    next(err);
  }
};
export const getBusSeats = async (req, res, next) => {
  try {
    const Bus = await Bus.findById(req.params.id);
  } catch (error) {
    next(error);
  }
};
