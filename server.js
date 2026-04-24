const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Serve static frontend files (SPA)
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb://127.0.0.1:27017/cabDB")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Connection Error:", err));

const Ride = require("./models/Ride");
const User = require("./models/User");

// LOGIN (DB endpoint)
app.post("/login", async (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Missing fields" });
    
    try {
        let user = await User.findOne({ email });
        
        if (!user) {
            user = new User({ email, password, role: role || "user" });
            await user.save();
            return res.json({ role: user.role, email: user.email });
        } else {
            if (user.password !== password) {
                return res.status(401).json({ error: "Invalid credentials" });
            }
            if (user.role !== role) {
                return res.status(403).json({ error: `This account is registered as an ${user.role}. Please select the correct tab.`});
            }
            return res.json({ role: user.role, email: user.email });
        }
    } catch (e) {
        return res.status(500).json({ error: "DB Error" });
    }
});

// BOOK RIDE
app.post("/book", async(req, res) => {
    const ride = new Ride({...req.body, status: "pending" });
    await ride.save();
    res.json(ride);
});

// GET RIDES
app.get("/rides", async(req, res) => {
    const rides = await Ride.find();
    res.json(rides);
});

// CANCEL
app.delete("/cancel/:id", async(req, res) => {
    await Ride.findByIdAndUpdate(req.params.id, { status: "cancelled" });
    res.json({ msg: "Cancelled" });
});

// COMPLETE
app.put("/complete/:id", async(req, res) => {
    await Ride.findByIdAndUpdate(req.params.id, {
        status: "completed",
        fare: req.body.fare
    });
    res.json({ msg: "Completed" });
});

app.listen(5000, () => console.log("Server running on port 5000"));