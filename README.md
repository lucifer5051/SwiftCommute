# 🚕 SwiftCommute - Corporate Cab Scheduling Platform

SwiftCommute is a premium, beautifully designed full-stack Single Page Application (SPA) designed exclusively for seamless corporate cab bookings and employee ride management. Users can easily book ongoing subscription rides via a modern interface, while drivers get a powerful, centralized dashboard to monitor schedules and mark completions in real-time.

---

## ✨ Key Features
- **Role-based Authentication:** Independent portals for regular **Employees** and operating **Drivers**. 
- **Dynamic Employee History:** A custom built-in Dashboard Calendar dynamically graphs 'Booked', 'Pending', and 'Cancelled' rides perfectly tailored to exactly who is logged in.
- **Smart Subscription Engine:** Book ongoing cab schedules seamlessly with an intuitive, unified Flatpickr range-calendar popup.
- **Driver Master-Control Dashboard:** Drivers view all holistic system bookings spanning dates, times, origins, and destinations to orchestrate the fleet efficiently and log final custom fares.
- **Modern UI Edge:** Dark-mode, premium aesthetics implemented directly with vanilla CSS using polished color theory and glassmorphism structure.

---

## 🛠️ Tech Stack
- **Frontend:** Vanilla HTML, CSS (`index.css` styling architecture), JavaScript (`script.js`, `calendar.js`), and Flatpickr.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (using Mongoose object modeling).

---

## 🚦 Prerequisites 
Before running the application, ensure your machine has the following correctly installed:
1. [Node.js](https://nodejs.org/en) (v14 or higher) - Runtime Environment.
2. [MongoDB Community Server](https://www.mongodb.com/try/download/community) - Required running actively behind the scenes (Default port: `27017`).

---

## 🚀 Installation & Setup Guide

**Step 1. Clone the repository**
```bash
git clone https://github.com/yourusername/SwiftCommute.git
cd SwiftCommute
```

**Step 2. Install Backend Packages**
The project utilizes `express`, `mongoose`, and `cors`.
```bash
npm install
```

**Step 3. Verify MongoDB is Running**
On Windows, you can start your local MongoDB database service by running the following command in an Admin terminal (or verifying it is running automatically in local services):
```bash
net start MongoDB
```

**Step 4. Launch the Server**
Run the native javascript server file directly:
```bash
node server.js
```
*You should see output indicating: "Server running on port 5000" and "MongoDB Connected".*

**Step 5. Access the Web App**
Open your preferred web browser and navigate directly to:
```text
http://localhost:5000
```

---

## 🕹️ Demo Registration Guide
Because this functions dynamically, you must initialize your own test users:
- **To test the Employee side:** Check the "Employee" option, type a brand new email like `steve@gmail.com` and password `123`. Try booking a ride to see the History list and schedule calendar update cleanly just for Steve.
- **To test the Driver side:** Check the "Driver" option, type a completely new email like `head-driver@gmail.com`. You'll immediately unlock the administrative dashboard overseeing all bookings!
