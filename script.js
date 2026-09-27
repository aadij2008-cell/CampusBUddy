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

        const searchText = searchInput.value.toLowerCase().trim();


        if (searchText === "library") {

            openLibrary();

        }

        else if (searchText === "sports") {

            openSports();

        }

        else if (searchText === "room" || searchText === "rooms") {

            openRooms();

        }

        else {

            message.textContent = "Sorry, I couldn't find that.";

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


// Run once when the website loads

updateLibrarySeats();
// Get latest library data from backend

async function getLibraryData() {

    const response =
        await fetch("http://localhost:3000/occupancy");

    const data =
        await response.json();

    occupiedLibrarySeats =
        data.peopleInside;

    updateLibrarySeats();
}


// Get data when website loads

getLibraryData();
// ===============================
// CHECK-IN / CHECK-OUT
// ===============================

const checkinButton =
    document.getElementById("checkinButton");

const checkoutButton =
    document.getElementById("checkoutButton");

const checkinMessage =
    document.getElementById("checkinMessage");


// Check in

checkinButton.addEventListener("click", async function () {

    const response =
        await fetch("http://localhost:3000/checkin", {
            method: "POST"
        });

    const data =
        await response.json();

    checkinMessage.textContent =
        data.message;

    getLibraryData();

});


// Check out

checkoutButton.addEventListener("click", async function () {

    const response =
        await fetch("http://localhost:3000/checkout", {
            method: "POST"
        });

    const data =
        await response.json();

    checkinMessage.textContent =
        data.message;

    getLibraryData();

});