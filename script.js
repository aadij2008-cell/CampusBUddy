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
/* =========================
   SPORTS DEPARTMENT
   ========================= */

#sportsPage {
    min-height: 100vh;

    padding: 60px 7%;

    box-sizing: border-box;

    background: rgba(255, 255, 255, 0.97);

    color: #222;
}


/* SPORTS HEADER */

.sports-header {
    max-width: 1100px;

    margin: 0 auto 45px auto;

    text-align: center;
}


.sports-header h1 {
    font-size: 42px;

    margin: 0 0 12px 0;
}


.sports-header p {
    font-size: 18px;

    color: #666;

    margin: 0;
}


/* SPORTS BUTTONS */

.sports-options {
    max-width: 1100px;

    margin: auto;

    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap: 25px;
}


.sports-options button {
    height: 150px;

    margin: 0 !important;

    padding: 20px;

    font-size: 22px;

    font-weight: bold;

    background: white;

    color: #222;

    border: none;

    border-radius: 18px;

    cursor: pointer;

    box-shadow:
        0 4px 15px rgba(0, 0, 0, 0.12);

    transition: 0.2s;
}


.sports-options button:hover {
    transform: translateY(-5px);

    box-shadow:
        0 8px 25px rgba(0, 0, 0, 0.18);
}


/* SPORTS INFORMATION */

.sports-info {
    max-width: 900px;

    margin: 45px auto 0 auto;

    padding: 30px;

    background: #f7f8fa;

    border-radius: 18px;

    box-shadow:
        0 4px 15px rgba(0, 0, 0, 0.08);
}


.sports-info h2 {
    margin-top: 0;

    font-size: 28px;
}


/* SPORTS STATS */

.sports-stats {
    display: grid;

    grid-template-columns:
        repeat(2, 1fr);

    gap: 20px;

    margin-top: 25px;
}


.sports-stat-card {
    background: white;

    padding: 25px;

    border-radius: 15px;

    text-align: center;

    box-shadow:
        0 3px 10px rgba(0, 0, 0, 0.07);
}


.sports-stat-card span {
    display: block;

    font-size: 30px;

    margin-bottom: 10px;
}


.sports-stat-card strong {
    display: block;

    font-size: 36px;

    margin-bottom: 5px;
}


.sports-stat-card p {
    margin: 0;

    color: #666;

    font-size: 16px;
}


/* SPORTS BACK BUTTON */

#sportsPage > #sportsBackButton {
    margin-top: 45px;
}


/* =========================
   SPORTS MOBILE
   ========================= */

@media (max-width: 800px) {

    .sports-options {
        grid-template-columns: 1fr;
    }


    .sports-options button {
        height: 110px;
    }


    .sports-stats {
        grid-template-columns: 1fr;
    }


    .sports-header h1 {
        font-size: 32px;
    }

}
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

    selectedSport.textContent = "🏀 Basketball";

    totalSports.textContent = "2";

    availableSports.textContent = "1";

});


// ===============================
// VOLLEYBALL
// ===============================

volleyballButton.addEventListener("click", function() {

    selectedSport.textContent = "🏐 Volleyball";

    totalSports.textContent = "2";

    availableSports.textContent = "2";

});


// ===============================
// FOOTBALL
// ===============================

footballButton.addEventListener("click", function() {

    selectedSport.textContent = "⚽ Football";

    totalSports.textContent = "1";

    availableSports.textContent = "1";

});