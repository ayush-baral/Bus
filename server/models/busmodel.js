import mongoose from "mongoose";

const BusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  busType: {
    type: String,
    required: true,
  },
  busNumber: {
    type: String,
    unique: true,
    required: true,
  },
  startCity: {
    type: String,
    required: true,
  },
  destinationCity: {
    type: String,
    required: true,
  },
  totalSeats: {
    type: Number,
    required: true,
  },
  availableSeats: {
    type: Number,
    required: true,
  },
  pricePerSeat: {
    type: Number,
    required: true,
  },
  phonenum: {
    type: Number,
    required: true,
  },
  photos: {
    type: [String],
  },
  features: {
    type: String,
    required: false,
  },
  time: {
    type: String,
    required: true,
  },
  boardingPoints: {
    type: [String],
    required: true,
  },
  date: {
    type: Date,
  },
});

export default mongoose.model("Bus", BusSchema);
