const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
    user: String,
    pickup: String,
    dropoff: String,
    time: String,
    date: String,
    status: String,
    fare: String
});

module.exports = mongoose.model("Ride", rideSchema);