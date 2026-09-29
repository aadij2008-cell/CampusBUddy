const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();
const PORT = process.env.PORT || 3000;

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});
app.use(cors());
app.use(express.json());

// Serve frontend files from the main project folder
app.use(express.static("../"));


// ===============================
// LIBRARY
// ===============================

const totalSeats = 350;

let peopleInside = 223;


// Check library occupancy
app.get("/occupancy", (req, res) => {

    const availableSeats = totalSeats - peopleInside;

    const occupancyPercentage =
        Math.round((peopleInside / totalSeats) * 100);

    res.json({
        totalSeats: totalSeats,
        peopleInside: peopleInside,
        availableSeats: availableSeats,
        occupancyPercentage: occupancyPercentage
    });

});


// Check in one person
app.post("/checkin", (req, res) => {

    if (peopleInside >= totalSeats) {

        return res.status(400).json({
            success: false,
            message: "Library is full"
        });

    }

    peopleInside++;

    res.json({
        success: true,
        peopleInside: peopleInside
    });

});


// Check out one person
app.post("/checkout", (req, res) => {

    if (peopleInside > 0) {

        peopleInside--;

        res.json({
            success: true,
            peopleInside: peopleInside
        });

    } else {

        res.status(400).json({
            success: false,
            message: "No students are currently checked in"
        });

    }

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
// AI CHATBOT
// ===============================

app.post("/chat", async (req, res) => {

    try {

        const userMessage = req.body.message;

        if (!userMessage) {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
contents: userMessage
        });

        res.json({
            success: true,
            reply: response.text
        });

    } catch (error) {

        console.error("Gemini error:", error);

        res.status(500).json({
            success: false,
            message: "AI assistant could not respond"
        });

    }

});


// ===============================
// START SERVER
// ===============================

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Campus Buddy backend running on port ${PORT}`);
});
