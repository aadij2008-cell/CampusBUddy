const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve frontend files from the main project folder
app.use(express.static("../"));


// ===============================
// LIBRARY
// ===============================

let occupancy = {
    studyRoom: 0,
    readingRoom: 0
};

app.get("/occupancy", (req, res) => {
    res.json(occupancy);
});

app.post("/checkin", (req, res) => {
    const { area } = req.body;

    if (!area || occupancy[area] === undefined) {
        return res.status(400).json({
            success: false,
            message: "Invalid area"
        });
    }

    occupancy[area]++;

    res.json({
        success: true,
        occupancy
    });
});

app.post("/checkout", (req, res) => {
    const { area } = req.body;

    if (!area || occupancy[area] === undefined) {
        return res.status(400).json({
            success: false,
            message: "Invalid area"
        });
    }

    if (occupancy[area] > 0) {
        occupancy[area]--;
    }

    res.json({
        success: true,
        occupancy
    });
});


// ===============================
// SPORTS
// ===============================

const sports = {
    basketball: {
        total: 2,
        available: 1
    },

    volleyball: {
        total: 2,
        available: 2
    },

    football: {
        total: 1,
        available: 1
    }
};


// Get sports availability
app.get("/sports", (req, res) => {
    res.json(sports);
});


// Occupy a sports facility
app.post("/sports/:sport/occupy", (req, res) => {
    const sport = req.params.sport;

    if (!sports[sport]) {
        return res.status(404).json({
            success: false,
            message: "Sport not found"
        });
    }

    if (sports[sport].available <= 0) {
        return res.status(400).json({
            success: false,
            message: `${sport} is currently full`
        });
    }

    sports[sport].available--;

    res.json({
        success: true,
        message: `${sport} occupied successfully`,
        data: sports[sport]
    });
});


// Release a sports facility
app.post("/sports/:sport/release", (req, res) => {
    const sport = req.params.sport;

    if (!sports[sport]) {
        return res.status(404).json({
            success: false,
            message: "Sport not found"
        });
    }

    if (sports[sport].available >= sports[sport].total) {
        return res.status(400).json({
            success: false,
            message: `${sport} is already completely available`
        });
    }

    sports[sport].available++;

    res.json({
        success: true,
        message: `${sport} released successfully`,
        data: sports[sport]
    });
});


// ===============================
// START SERVER
// ===============================

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Campus Buddy backend running on port ${PORT}`);
});