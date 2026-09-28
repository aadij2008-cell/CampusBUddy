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


    // Update numbers on the page

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


    // Update occupancy bar

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


        // Keep the current/default values
        // if backend is temporarily unavailable

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


        // Update local occupancy

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


        // Update local occupancy

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