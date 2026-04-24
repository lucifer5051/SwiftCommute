const API = "http://localhost:5000";

// LOGIN
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log(email, password); // debug

    const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    console.log(data); // debug

    if (data.role === "driver") {
        window.location.href = "driver.html";
    } else {
        window.location.href = "dashboard.html";
    }
}
// BOOK
async function bookRide() {
    const pickup = document.getElementById("pickup").value;
    const dropoff = document.getElementById("drop").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    await fetch(API + "/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user: "demo",
            pickup,
            dropoff,
            date,
            time
        })
    });

    loadRides();
}

// LOAD RIDES
async function loadRides() {
    const res = await fetch(API + "/rides");
    const rides = await res.json();

    const div = document.getElementById("rides");
    if (!div) return;

    div.innerHTML = "";

    rides.forEach(r => {
        div.innerHTML += `
        <div class="ride">
            ${r.pickup} → ${r.dropoff}
            <br>Status: ${r.status}
            <br>
            <button class="cancel" onclick="cancelRide('${r._id}')">Cancel</button>
        </div>`;
    });
}

// CANCEL
async function cancelRide(id) {
    await fetch(API + "/cancel/" + id, { method: "DELETE" });
    loadRides();
}

// DRIVER LOAD
async function loadDriver() {
    const res = await fetch(API + "/rides");
    const rides = await res.json();

    const p = document.getElementById("pending");
    const c = document.getElementById("completed");

    if (!p) return;

    p.innerHTML = "";
    c.innerHTML = "";

    rides.forEach(r => {
        if (r.status === "pending") {
            p.innerHTML += `
            <div class="ride">
                ${r.pickup} → ${r.dropoff}
                <input id="fare-${r._id}" placeholder="Fare">
                <button class="complete" onclick="completeRide('${r._id}')">Complete</button>
            </div>`;
        } else {
            c.innerHTML += `
            <div class="ride">
                ${r.pickup} → ${r.dropoff}
                <br>Fare: ₹${r.fare}
            </div>`;
        }
    });
}

// COMPLETE
async function completeRide(id) {
    const fare = document.getElementById("fare-" + id).value;

    await fetch(API + "/complete/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fare })
    });

    loadDriver();
}

// AUTO LOAD
if (window.location.href.includes("dashboard")) {
    loadRides();
}

if (window.location.href.includes("driver")) {
    loadDriver();
}