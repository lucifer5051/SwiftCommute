window.renderCalendar = async function() {
    const container = document.getElementById('calendar-container');
    if(!container) return;

    // Fetch rides to populate calendar tags
    let rides = [];
    try {
        const res = await fetch("http://localhost:5000/rides");
        rides = await res.json();
        
        if (typeof currentUser !== 'undefined' && currentUser && currentUser.email) {
            rides = rides.filter(r => r.employeeId === currentUser.email);
        }
    } catch(e) {
        console.error("Failed to load rides for calendar");
    }

    const today = new Date();
    // Simulate March 2025 as seen in screenshot, or current month
    const year = today.getFullYear();
    const month = today.getMonth(); 

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    // Header
    let html = `
        <div class="calendar-header">
            <h3>${monthNames[month]} ${year}</h3>
            <div class="calendar-controls">
                <button>today</button>
                <button>&lt;</button>
                <button>&gt;</button>
            </div>
        </div>
        <div class="calendar-grid">
            <div class="calendar-day-header">Sun</div>
            <div class="calendar-day-header">Mon</div>
            <div class="calendar-day-header">Tue</div>
            <div class="calendar-day-header">Wed</div>
            <div class="calendar-day-header">Thu</div>
            <div class="calendar-day-header">Fri</div>
            <div class="calendar-day-header">Sat</div>
    `;

    // Calculate days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Fill empties
    for(let i=0; i<firstDay; i++) {
        html += `<div class="calendar-day empty"></div>`;
    }

    // Fill days
    for(let day=1; day<=daysInMonth; day++) {
        let tagsHtml = "";
        let currentDateObj = new Date(year, month, day);

        let dayHasPending = false;
        let dayHasCompleted = false;
        let dayHasCancelled = false;

        rides.forEach(r => {
            if (!r.subscriptionPeriod || r.subscriptionPeriod === "Not Specified") return;
            
            // Flatpickr format: "YYYY-MM-DD to YYYY-MM-DD" or "YYYY-MM-DD"
            let parts = r.subscriptionPeriod.split(" to ");
            if (parts.length >= 1) {
                let startD = new Date(parts[0]);
                let endD = new Date(parts[parts.length === 1 ? 0 : 1]);
                
                // normalize times for comparison
                startD.setHours(0,0,0,0);
                endD.setHours(23,59,59,999);
                
                if (currentDateObj >= startD && currentDateObj <= endD) {
                    if (r.status === 'pending') dayHasPending = true;
                    if (r.status === 'completed') dayHasCompleted = true;
                    if (r.status === 'cancelled') dayHasCancelled = true;
                }
            }
        });

        if (dayHasCompleted) tagsHtml += `<div class="ride-tag tag-booked">Booked</div>`;
        if (dayHasCancelled) tagsHtml += `<div class="ride-tag tag-cancelled">Cancelled</div>`;
        if (dayHasPending) tagsHtml += `<div class="ride-tag tag-pending">Pending</div>`;

        html += `
            <div class="calendar-day">
                <span class="day-number">${day}</span>
                ${tagsHtml}
            </div>
        `;
    }

    // Fill remaining
    const totalBoxes = firstDay + daysInMonth;
    const remaining = 42 - totalBoxes; // 6 rows
    for(let i=0; i<remaining; i++) {
        if (i > 6 && totalBoxes + i >= 35) break; // Don't draw 6th row if empty
        html += `<div class="calendar-day empty"></div>`;
    }

    html += `</div>`;
    container.innerHTML = html;
};

// Initial load
window.addEventListener('DOMContentLoaded', () => {
    if(window.renderCalendar) window.renderCalendar();
});
