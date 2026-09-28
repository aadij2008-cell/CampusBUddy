console.log("JavaScript is working!");


// Get home page
const homePage = document.getElementById("homePage");


// Get buttons
const libraryButton = document.getElementById("libraryButton");
const sportsButton = document.getElementById("sportsButton");
const roomsButton = document.getElementById("roomsButton");


// Get category pages
const libraryPage = document.getElementById("libraryPage");
const sportsPage = document.getElementById("sportsPage");
const roomsPage = document.getElementById("roomsPage");


// Get back buttons
const libraryBackButton = document.getElementById("libraryBackButton");
const sportsBackButton = document.getElementById("sportsBackButton");
const roomsBackButton = document.getElementById("roomsBackButton");


// Get search elements
const searchInput = document.getElementById("searchInput");
const message = document.getElementById("message");


// Hide every page
function hideAllPages() {

    homePage.style.display = "none";
    libraryPage.style.display = "none";
    sportsPage.style.display = "none";
    roomsPage.style.display = "none";

}


// Show home
function showHome() {

    hideAllPages();

    homePage.style.display = "block";

}


// Show library
function openLibrary() {

    hideAllPages();

    libraryPage.style.display = "block";

}


// Show sports
function openSports() {

    hideAllPages();

    sportsPage.style.display = "block";

}


// Show rooms
function openRooms() {

    hideAllPages();

    roomsPage.style.display = "block";

}


// Library button
libraryButton.addEventListener("click", function() {

    openLibrary();

});


// Sports button
sportsButton.addEventListener("click", function() {

    openSports();

});


// Rooms button
roomsButton.addEventListener("click", function() {

    openRooms();

});


// Library Back
libraryBackButton.addEventListener("click", function() {

    showHome();

});


// Sports Back
sportsBackButton.addEventListener("click", function() {

    showHome();

});


// Rooms Back
roomsBackButton.addEventListener("click", function() {

    showHome();

});


// Search
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


// Update library information
function updateLibrarySeats() {

    const availableSeats =
        totalLibrarySeats - occupiedLibrarySeats;


    const occupancyPercentage =
        Math.round(
            (occupiedLibrarySeats / totalLibrarySeats) * 100
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


// Run once when website loads

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
                "Backend returned status " + response.status
            );

        }


        const data = await response.json();


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

        // Keep the default values if backend
        // is temporarily unavailable

        updateLibrarySeats();

    }

}


// Get data when website loads

getLibraryData();