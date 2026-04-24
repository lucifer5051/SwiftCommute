const API = "http://localhost:5000";

let currentUser = null;

function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.innerText = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}

// Navigation / SPA Setup
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');

    if (sectionId === 'dashboard') loadDriverRides();
    if (sectionId === 'book') {
        if(window.renderCalendar) window.renderCalendar();
        loadUserHistory();
    }
}

function updateNav() {
    if (!currentUser) {
        document.getElementById('nav-login').style.display = 'inline';
        document.getElementById('nav-signup').style.display = 'inline';
        document.getElementById('nav-dashboard').style.display = 'none';
        document.getElementById('nav-book').style.display = 'none';
        document.getElementById('nav-logout').style.display = 'none';
    } else {
        document.getElementById('nav-login').style.display = 'none';
        document.getElementById('nav-signup').style.display = 'none';
        document.getElementById('nav-logout').style.display = 'inline';

        if (currentUser.role === 'driver') {
            document.getElementById('nav-dashboard').style.display = 'inline';
            document.getElementById('nav-book').style.display = 'none';
            showSection('dashboard');
        } else {
            document.getElementById('nav-book').style.display = 'inline';
            document.getElementById('nav-dashboard').style.display = 'none';
            showSection('book');
        }
    }
}

function logout() {
    currentUser = null;
    updateNav();
    showSection('hero');
    showToast("Logged out successfully");
}

// LOGIN
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.querySelector('input[name="role"]:checked').value;
    const errorEl = document.getElementById("emailError");

    if (!email || !password) {
        showToast("Email and Password are compulsory!");
        return;
    }

    if (!email.endsWith("@gmail.com")) {
        errorEl.style.display = "block";
        return;
    }
    errorEl.style.display = "none";

    const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role })
    });

    const data = await res.json();
    if (data.error) {
        showToast(data.error);
        return;
    }

    currentUser = data;
    showToast("Login successful!");
    updateNav();
}

// Initialize Flatpickr on load
window.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById("subscriptionPeriod")) {
        flatpickr("#subscriptionPeriod", {
            mode: "range",
            dateFormat: "Y-m-d"
        });
    }
});

// BOOK RIDE (User)
async function bookRide() {
    const employeeId = currentUser ? currentUser.email : "demo@gmail.com";
    const pickup = document.getElementById("pickup").value;
    const dropoff = document.getElementById("dropoff").value;
    const time = document.getElementById("time").value;
    const subscriptionPeriod = document.getElementById("subscriptionPeriod").value || "Not Specified";

    if (!pickup || !dropoff) {
        showToast("Pickup and Dropoff locations are compulsory!");
        return;
    }

    await fetch(`${API}/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId, pickup, dropoff, time, subscriptionPeriod })
    });

    showToast("Ride booked successfully!");
    // Refresh outputs
    if(window.renderCalendar) window.renderCalendar();
    loadUserHistory();
}

// USER HISTORY
async function loadUserHistory() {
    if (!currentUser) return;
    const res = await fetch(`${API}/rides`);
    let rides = await res.json();
    
    // Filter by current employee
    rides = rides.filter(r => r.employeeId === currentUser.email);

    const histBody = document.getElementById("user-history");
    if (!histBody) return;
    histBody.innerHTML = "";
    
    rides.forEach(r => {
        let actionBtn = r.status === 'pending' ? `<button class="btn-outline text-danger" onclick="cancelRide('${r._id}')">Cancel</button>` : "-";
        
        histBody.innerHTML += `
        <tr>
            <td>${r.pickup}</td>
            <td>${r.dropoff}</td>
            <td>${r.subscriptionPeriod}</td>
            <td class="${r.status === 'completed' ? 'text-success' : (r.status === 'pending' ? 'text-warning' : 'text-danger')}">${r.status.toUpperCase()}</td>
            <td>${actionBtn}</td>
        </tr>`;
    });
}

// CANCEL
async function cancelRide(id) {
    await fetch(`${API}/cancel/${id}`, { method: "DELETE" });
    showToast("Ride cancelled");
    if (window.renderCalendar) window.renderCalendar();
    loadUserHistory();
}

// LOAD DRIVER DASHBOARD
async function loadDriverRides() {
    const res = await fetch(`${API}/rides`);
    const rides = await res.json();

    const pendingBody = document.getElementById("pending-rides");
    const completedBody = document.getElementById("completed-rides");
    if (!pendingBody || !completedBody) return;

    pendingBody.innerHTML = "";
    completedBody.innerHTML = "";

    rides.forEach(r => {
        // Extract display name from employeeId if possible
        let userDisplay = r.employeeId ? r.employeeId.split(" ")[0] : "user";
        
        if (r.status === "pending") {
            pendingBody.innerHTML += `
            <tr>
                <td>${userDisplay}</td>
                <td>${r.pickup || '-'}</td>
                <td>${r.dropoff || '-'}</td>
                <td>${r.subscriptionPeriod || '-'}</td>
                <td>${r.time || '-'}</td>
                <td><input type="text" id="fare-${r._id}" class="input-sm" placeholder="e.g. 200"></td>
                <td><button class="btn-outline" onclick="completeRide('${r._id}')">Complete Ride</button></td>
            </tr>`;
        } else if (r.status === "completed") {
            completedBody.innerHTML += `
            <tr>
                <td>${userDisplay}</td>
                <td>${r.pickup || '-'}</td>
                <td>${r.dropoff || '-'}</td>
                <td>${r.subscriptionPeriod || '-'}</td>
                <td>${r.time || '-'}</td>
                <td class="text-success">₹${r.fare || 0}</td>
            </tr>`;
        }
    });
}

// COMPLETE RIDE (Driver)
async function completeRide(id) {
    const fare = document.getElementById("fare-" + id).value;

    await fetch(`${API}/complete/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fare })
    });

    showToast("Ride marked as complete!");
    loadDriverRides();
}
