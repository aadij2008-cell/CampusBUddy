const express = require("express");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.static("../"));

const PORT = 3000;


// Library data

const totalSeats = 350;

let peopleInside = 223;


// Check library occupancy

app.get("/occupancy", function (req, res) {

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


// Check-in

app.post("/checkin", function (req, res) {

    if (peopleInside < totalSeats) {

        peopleInside = peopleInside + 1;

        res.json({
            message: "Check-in successful",
            peopleInside: peopleInside
        });

    } else {

        res.status(400).json({
            message: "Library is full"
        });

    }

});


// Check-out

app.post("/checkout", function (req, res) {

    if (peopleInside > 0) {

        peopleInside = peopleInside - 1;

        res.json({
            message: "Check-out successful",
            peopleInside: peopleInside
        });

    } else {

        res.status(400).json({
            message: "No students are currently checked in"
        });

    }

});


// Start server

app.listen(PORT, "0.0.0.0", function () {

    console.log(`CampusBUddy backend running on port ${PORT}`);

});
