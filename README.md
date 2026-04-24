# 🚕 SwiftCommute - The Easy Guide for Beginners

Welcome to SwiftCommute, a beautiful platform for booking corporate cabs. This guide is specifically written so that absolutely anyone (even without any technical experience) can install and run this application on their own computer!

---

## 🛑 Step 1: Install the Required Software

You only need two standard free programs to run this on your Windows computer:

### 1. Download & Install Node.js (The App Engine)
1. Go to this website: [https://nodejs.org/en](https://nodejs.org/en)
2. Click the big green button that says **"LTS"** (Recommended for Most Users) to download the installer.
3. Open the downloaded file and legitimately just keep clicking **"Next"** until it successfully finishes installing.

### 2. Download & Install MongoDB (The Memory Database)
This is the invisible system where all your rides and user accounts are permanently saved.
1. Go to this website: [MongoDB Download Page](https://www.mongodb.com/try/download/community)
2. Scroll to the "MongoDB Community Server" section and click the green **"Download"** button.
3. Open the downloaded file and click **"Next"** through the setup. *(Make absolutely sure to leave the "Install MongoDB as a Service" box checked during the installation!)*

---

## 📥 Step 2: Download This Project

1. Scroll to the very top of this GitHub page.
2. Click the green **"<> Code"** button.
3. Click **"Download ZIP"**.
4. Once downloaded, Right-Click the zip file and choose **Extract All**. Extract the folder to your `Desktop` so it is incredibly easy to find.

---

## ⚙️ Step 3: Start the Application

1. Open that extracted folder on your Desktop until you can see all the project files (files named things like `server.js` and `package.json`).
2. Click directly on the long horizontal **Address Bar** at the very top of your Windows folder window.
3. Delete whatever folder path text is lingering there, type `cmd`, and press **Enter**. *(This will cleanly open a black command window pointing directly at your folder)*.
4. Inside that black window, type exactly this and press Enter:
   ```cmd
   npm install
   ```
   *(Wait a minute or two while the window automatically downloads the background files the app needs).*
5. When that finishes and stops moving, type this final command and press Enter:
   ```cmd
   node server.js
   ```
6. You should immediately see a message pop up in the black window saying `Server running on port 5000` and `MongoDB Connected`. **Do not close this black window!** Let it run secretly in the background.

---

## 🌐 Step 4: Open the Website!

1. Open your normal web browser (like Google Chrome or Microsoft Edge).
2. In the very top website URL bar (where you usually type google.com), type:
   ```text
   http://localhost:5000
   ```
3. Press Enter. You are now officially using SwiftCommute!

---

## 🕹️ Step 5: How to Play With the App

The very first time you use it, the database is completely blank and wiped clean. Here is how to create your mock accounts on the fly:

* **To act like a regular Employee:** On the login page, make sure the "Employee" circle is checked. Type a fake email like `alex@gmail.com` and type `1234` for a password. Because the system has never seen "Alex" before, it will permanently and securely register Alex in your database! You can now book rides that will instantly pop up on Alex's private calendar.
* **To act like a Master Driver:** Go back to the login page (or log out). Check the **"Driver"** circle. Type a brand new fake email like `boss@gmail.com` and log in. Because you selected Driver, the database registers this Email as an admin! You will be launched straight into the massive Master Dashboard where you have permissions to see, fare, and complete Alex's pending bookings!
