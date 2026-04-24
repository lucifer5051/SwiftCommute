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

1. Open that extracted folder on your Desktop until you can see all the project files.
2. Find the file named **`Launch_SwiftCommute.bat`** and **double-click it**.
3. A black master window will pop open and automatically download all necessary background files, connect to your database, and turn the server on for you entirely automatically!
4. **Do not close this black window!** Simply minimize it so it runs secretly in the background.

---

## 🌐 Step 4: Use the Website!

Exactly 3 seconds after you double-click that file, your default web browser (like Google Chrome or Microsoft Edge) will automatically pop open precisely to `http://localhost:5000`! You are now officially using SwiftCommute!

---

## 🕹️ Step 5: How to Play With the App

The very first time you use it, the database is completely blank and wiped clean. Here is how to create your mock accounts on the fly:

* **To act like a regular Employee:** On the login page, make sure the "Employee" circle is checked. Type a fake email like `alex@gmail.com` and type `1234` for a password. Because the system has never seen "Alex" before, it will permanently and securely register Alex in your database! You can now book rides that will instantly pop up on Alex's private calendar.
* **To act like a Master Driver:** Go back to the login page (or log out). Check the **"Driver"** circle. Type a brand new fake email like `boss@gmail.com` and log in. Because you selected Driver, the database registers this Email as an admin! You will be launched straight into the massive Master Dashboard where you have permissions to see, fare, and complete Alex's pending bookings!
