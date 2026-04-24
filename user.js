const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    role: String // user / driver
});

module.exports = mongoose.model("User", userSchema);