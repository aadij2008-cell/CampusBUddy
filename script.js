console.log("JavaScript is working!");


// ===============================
// GET HOME PAGE
// ===============================

const homePage =
    document.getElementById("homePage");


// ===============================
// GET MAIN BUTTONS
// ===============================

const libraryButton =
    document.getElementById("libraryButton");

const sportsButton =
    document.getElementById("sportsButton");

const roomsButton =
    document.getElementById("roomsButton");


// ===============================
// GET CATEGORY PAGES
// ===============================

const libraryPage =
    document.getElementById("libraryPage");

const sportsPage =
    document.getElementById("sportsPage");

const roomsPage =
    document.getElementById("roomsPage");


// ===============================
// GET BACK BUTTONS
// ===============================

const libraryBackButton =
    document.getElementById("libraryBackButton");

const sportsBackButton =
    document.getElementById("sportsBackButton");

const roomsBackButton =
    document.getElementById("roomsBackButton");


// ===============================
// GET SEARCH ELEMENTS
// ===============================

const searchInput =
    document.getElementById("searchInput");

const message =
    document.getElementById("message");


// ===============================
// HIDE EVERY PAGE
// ===============================

function hideAllPages() {

    homePage.style.display = "none";

    libraryPage.style.display = "none";

    sportsPage.style.display = "none";

    roomsPage.style.display = "none";

}


// ===============================
// SHOW HOME
// ===============================

function showHome() {

    hideAllPages();

    homePage.style.display = "block";

}


// ===============================
// SHOW LIBRARY
// ===============================

function openLibrary() {

    hideAllPages();

    libraryPage.style.display = "block";

}


// ===============================
// SHOW SPORTS
// ===============================

function openSports() {

    hideAllPages();

    sportsPage.style.display = "block";

}


// ===============================
// SHOW ROOMS
// ===============================

function openRooms() {

    hideAllPages();

    roomsPage.style.display = "block";

}


// ===============================
// LIBRARY BUTTON
// ===============================

libraryButton.addEventListener("click", function() {

    openLibrary();

});


// ===============================
// SPORTS BUTTON
// ===============================

sportsButton.addEventListener("click", function() {

    openSports();

});


// ===============================
// ROOMS BUTTON
// ===============================

roomsButton.addEventListener("click", function() {

    openRooms();

});


// ===============================
// LIBRARY BACK BUTTON
// ===============================

libraryBackButton.addEventListener("click", function() {

    showHome();

});


// ===============================
// SPORTS BACK BUTTON
// ===============================

sportsBackButton.addEventListener("click", function() {

    showHome();

});


// ===============================
// ROOMS BACK BUTTON
// ===============================

roomsBackButton.addEventListener("click", function() {

    showHome();

});


// ===============================
// SEARCH
// ===============================

searchInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        const searchText =
            searchInput.value.toLowerCase().trim();


        if (searchText === "library") {

            openLibrary();

        }

        else if (searchText === "sports") {

            openSports();

        }

        else if (
            searchText === "room" ||
            searchText === "rooms"
        ) {

            openRooms();

        }

        else {

            message.textContent =
                "Sorry, I couldn't find that.";

        }

    }

});


// ===============================
// LIBRARY SEAT DATA
// ===============================

const totalLibrarySeats = 350;

let occupiedLibrarySeats = 223;


// ===============================
// UPDATE LIBRARY INFORMATION
// ===============================

function updateLibrarySeats() {

    const availableSeats =
        totalLibrarySeats - occupiedLibrarySeats;


    const occupancyPercentage =
        Math.round(
            (occupiedLibrarySeats /
            totalLibrarySeats) * 100
        );


    document.getElementById("totalSeats").textContent =
        totalLibrarySeats;


    document.getElementById("occupiedSeats").textContent =
        occupiedLibrarySeats;


    document.getElementById("availableSeats").textContent =
        availableSeats;


    document.getElementById("availableSeats2").textContent =
        availableSeats;


    document.getElementById("analysisOccupied").textContent =
        occupiedLibrarySeats;


    document.getElementById("analysisAvailable").textContent =
        availableSeats;


    document.getElementById("occupancyPercent").textContent =
        occupancyPercentage + "%";


    document.querySelector(".occupied-bar").style.width =
        occupancyPercentage + "%";

}


// ===============================
// INITIAL LIBRARY DISPLAY
// ===============================

updateLibrarySeats();


// ===============================
// GET LATEST LIBRARY DATA
// ===============================

async function getLibraryData() {

    try {

        const response = await fetch(
            "https://campusbuddy-0y4a.onrender.com/occupancy"
        );


        if (!response.ok) {

            throw new Error(
                "Backend returned status " +
                response.status
            );

        }


        const data =
            await response.json();


        occupiedLibrarySeats =
            data.peopleInside;


        updateLibrarySeats();


        console.log(
            "Library data updated:",
            data
        );

    }

    catch (error) {

        console.error(
            "Could not get library data:",
            error
        );


        updateLibrarySeats();

    }

}


// ===============================
// CHECK-IN / CHECK-OUT ELEMENTS
// ===============================

const checkinButton =
    document.getElementById("checkinButton");

const checkoutButton =
    document.getElementById("checkoutButton");

const checkinMessage =
    document.getElementById("checkinMessage");


// ===============================
// CHECK-IN
// ===============================

checkinButton.addEventListener("click", async function() {

    checkinButton.disabled = true;

    checkinMessage.textContent =
        "Processing check-in...";


    try {

        const response = await fetch(
            "https://campusbuddy-0y4a.onrender.com/checkin",
            {
                method: "POST"
            }
        );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message
            );

        }


        occupiedLibrarySeats =
            data.peopleInside;


        updateLibrarySeats();


        checkinMessage.textContent =
            "✅ " + data.message;


        console.log(
            "Check-in successful:",
            data
        );

    }

    catch (error) {

        console.error(
            "Check-in error:",
            error
        );


        checkinMessage.textContent =
            "❌ " + error.message;

    }

    finally {

        checkinButton.disabled = false;

    }

});


// ===============================
// CHECK-OUT
// ===============================

checkoutButton.addEventListener("click", async function() {

    checkoutButton.disabled = true;

    checkinMessage.textContent =
        "Processing check-out...";


    try {

        const response = await fetch(
            "https://campusbuddy-0y4a.onrender.com/checkout",
            {
                method: "POST"
            }
        );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message
            );

        }


        occupiedLibrarySeats =
            data.peopleInside;


        updateLibrarySeats();


        checkinMessage.textContent =
            "✅ " + data.message;


        console.log(
            "Check-out successful:",
            data
        );

    }

    catch (error) {

        console.error(
            "Check-out error:",
            error
        );


        checkinMessage.textContent =
            "❌ " + error.message;

    }

    finally {

        checkoutButton.disabled = false;

    }

});


// ===============================
// LOAD LIBRARY DATA
// ===============================

getLibraryData();


// ===============================
// SPORTS AVAILABILITY
// ===============================

const basketballButton =
    document.getElementById("basketballButton");

const volleyballButton =
    document.getElementById("volleyballButton");

const footballButton =
    document.getElementById("footballButton");

const selectedSport =
    document.getElementById("selectedSport");

const totalSports =
    document.getElementById("totalSports");

const availableSports =
    document.getElementById("availableSports");


// ===============================
// BASKETBALL
// ===============================

basketballButton.addEventListener("click", function() {

    selectedSport.textContent =
        "🏀 Basketball";

    totalSports.textContent =
        "2";

    availableSports.textContent =
        "1";

});


// ===============================
// VOLLEYBALL
// ===============================

volleyballButton.addEventListener("click", function() {

    selectedSport.textContent =
        "🏐 Volleyball";

    totalSports.textContent =
        "2";

    availableSports.textContent =
        "2";

});


// ===============================
// FOOTBALL
// ===============================

footballButton.addEventListener("click", function() {

    selectedSport.textContent =
        "⚽ Football";

    totalSports.textContent =
        "1";

    availableSports.textContent =
        "1";

});/* =========================
   ROOMS & LAB AVAILABILITY
   ========================= */

const roomDay = document.getElementById("roomDay");
const roomTime = document.getElementById("roomTime");

const checkRoomsButton =
    document.getElementById("checkRoomsButton");

const availableRooms =
    document.getElementById("availableRooms");

const availableLabs =
    document.getElementById("availableLabs");

const roomAvailabilityMessage =
    document.getElementById("roomAvailabilityMessage");


/*
   MASTER LIST OF ROOMS FOUND
   IN THE FIRST-YEAR TIMETABLE
*/

const allRooms = [
    "324",
    "333",
    "334",
    "346",
    "347",
    "511",
    "521",
    "522",
    "532",
    "533",
    "535",
    "536"
];


/*
   LABS / LAB SPACES FROM THE TIMETABLE
*/

const allLabs = [
    "EG-LAB",
    "PHY-LAB",
    "PROG-LAB",
    "CHEM-EVS-LAB"
];


/*
   TIMETABLE OCCUPANCY DATA

   Format:

   Day
      ↓
   Time
      ↓
   occupied rooms

   The section information is NOT shown
   to the user.
*/

const occupiedRooms = {

    Monday: {

        "8:10-9:00": [],

        "9:00-9:50":
            ["532", "346"],

        "9:50-10:40":
            ["535", "511", "522"],

        "10:40-11:30":
            ["535", "511", "522"],

        "11:30-12:20":
            ["347", "533", "532"],

        "12:20-1:10":
            ["347", "333", "346", "532"],

        "1:40-2:30":
            ["324", "333", "514", "522"],

        "2:30-3:20":
            ["324", "333", "522"],

        "3:20-4:10":
            ["346", "536", "532"],

        "4:10-5:00":
            ["346", "535", "532"]
    },


    Tuesday: {

        "8:10-9:00":
            ["333"],

        "9:00-9:50":
            [],

        "9:50-10:40":
            ["511", "522"],

        "10:40-11:30":
            ["511", "522"],

        "11:30-12:20":
            ["511", "533"],

        "12:20-1:10":
            ["511", "535", "346"],

        "1:40-2:30":
            ["346", "511"],

        "2:30-3:20":
            ["511", "334"],

        "3:20-4:10":
            ["511", "533", "334"],

        "4:10-5:00":
            ["511", "334"]
    },


    Wednesday: {

        "8:10-9:00":
            [],

        "9:00-9:50":
            [],

        "9:50-10:40":
            ["535", "522", "511"],

        "10:40-11:30":
            ["535", "522", "511"],

        "11:30-12:20":
            ["535", "522", "536"],

        "12:20-1:10":
            ["535", "522", "536"],

        "1:40-2:30":
            ["333", "334", "535"],

        "2:30-3:20":
            ["333", "334", "511"],

        "3:20-4:10":
            ["333", "334"],

        "4:10-5:00":
            ["334"]
    },


    Thursday: {

        "8:10-9:00":
            [],

        "9:00-9:50":
            ["522"],

        "9:50-10:40":
            ["535", "511", "522"],

        "10:40-11:30":
            ["535", "511", "522"],

        "11:30-12:20":
            ["535", "521"],

        "12:20-1:10":
            ["535", "521"],

        "1:40-2:30":
            ["522", "334"],

        "2:30-3:20":
            ["522", "535"],

        "3:20-4:10":
            ["333", "334"],

        "4:10-5:00":
            ["333", "324"]
    },


    Friday: {

        "8:10-9:00":
            [],

        "9:00-9:50":
            [],

        "9:50-10:40":
            ["532", "533"],

        "10:40-11:30":
            ["532", "533"],

        "11:30-12:20":
            ["521", "522"],

        "12:20-1:10":
            ["521", "522", "533"],

        "1:40-2:30":
            ["324", "333", "521"],

        "2:30-3:20":
            ["333", "522"],

        "3:20-4:10":
            ["333", "521"],

        "4:10-5:00":
            ["333", "521"]
    }

};


/*
   LAB OCCUPANCY

   We keep lab availability separate from
   normal classrooms.
*/

const occupiedLabs = {

    Monday: {

        "8:10-9:00": [],

        "9:00-9:50": [],

        "9:50-10:40": [],

        "10:40-11:30": [],

        "11:30-12:20": [],

        "12:20-1:10": [],

        "1:40-2:30": ["PHY-LAB"],

        "2:30-3:20": ["PHY-LAB"],

        "3:20-4:10": ["EG-LAB"],

        "4:10-5:00": ["EG-LAB"]
    },


    Tuesday: {

        "8:10-9:00": [],

        "9:00-9:50": [],

        "9:50-10:40": [],

        "10:40-11:30": [],

        "11:30-12:20": [],

        "12:20-1:10": [],

        "1:40-2:30": ["EG-LAB"],

        "2:30-3:20": ["EG-LAB"],

        "3:20-4:10": ["PHY-LAB"],

        "4:10-5:00": ["PHY-LAB"]
    },


    Wednesday: {

        "8:10-9:00": [],

        "9:00-9:50": [],

        "9:50-10:40": ["CHEM-EVS-LAB"],

        "10:40-11:30": ["CHEM-EVS-LAB"],

        "11:30-12:20": [],

        "12:20-1:10": [],

        "1:40-2:30": ["PROG-LAB"],

        "2:30-3:20": ["PROG-LAB"],

        "3:20-4:10": [],

        "4:10-5:00": []
    },


    Thursday: {

        "8:10-9:00": [],

        "9:00-9:50": [],

        "9:50-10:40": ["PHY-LAB"],

        "10:40-11:30": ["PHY-LAB"],

        "11:30-12:20": [],

        "12:20-1:10": [],

        "1:40-2:30": ["PROG-LAB"],

        "2:30-3:20": ["PROG-LAB"],

        "3:20-4:10": [],

        "4:10-5:00": []
    },


    Friday: {

        "8:10-9:00": [],

        "9:00-9:50": [],

        "9:50-10:40": ["CHEM-EVS-LAB"],

        "10:40-11:30": ["CHEM-EVS-LAB"],

        "11:30-12:20": ["PROG-LAB"],

        "12:20-1:10": ["PROG-LAB"],

        "1:40-2:30": [],

        "2:30-3:20": [],

        "3:20-4:10": [],

        "4:10-5:00": []
    }

};


/*
   CHECK AVAILABILITY
*/

checkRoomsButton.addEventListener(
    "click",
    function() {

        const selectedDay =
            roomDay.value;

        const selectedTime =
            roomTime.value;

        if (!selectedDay || !selectedTime) {

            roomAvailabilityMessage.textContent =
                "Please select both a day and a time.";

            return;
        }


        const occupied =
            occupiedRooms[selectedDay][selectedTime] || [];

        const occupiedLabList =
            occupiedLabs[selectedDay][selectedTime] || [];


        /*
           AVAILABLE CLASSROOMS
        */

        const freeRooms =
            allRooms.filter(function(room) {

                return !occupied.includes(room);

            });


        /*
           AVAILABLE LABS
        */

        const freeLabs =
            allLabs.filter(function(lab) {

                return !occupiedLabList.includes(lab);

            });


        /*
           DISPLAY ROOMS
        */

        availableRooms.innerHTML = "";

        if (freeRooms.length === 0) {

            availableRooms.innerHTML =
                '<p class="no-availability">No rooms available.</p>';

        }
        else {

            freeRooms.forEach(function(room) {

                const item =
                    document.createElement("div");

                item.className =
                    "available-item";

                item.textContent =
                    "🟢 Room " + room;

                availableRooms.appendChild(item);

            });

        }


        /*
           DISPLAY LABS
        */

        availableLabs.innerHTML = "";

        if (freeLabs.length === 0) {

            availableLabs.innerHTML =
                '<p class="no-availability">No labs available.</p>';

        }
        else {

            freeLabs.forEach(function(lab) {

                const item =
                    document.createElement("div");

                item.className =
                    "available-item";

                item.textContent =
                    "🧪 " + lab;

                availableLabs.appendChild(item);

            });

        }


        roomAvailabilityMessage.textContent =
            "Availability for " +
            selectedDay +
            " • " +
            selectedTime;

    }
);