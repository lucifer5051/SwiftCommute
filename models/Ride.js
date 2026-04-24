const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
    employeeId: String,
    pickup: String,
    dropoff: String,
    time: String,
    subscriptionPeriod: String,
    status: { type: String, default: "pending" }, // pending, completed, cancelled
    fare: String
});

module.exports = mongoose.model("Ride", rideSchema);
