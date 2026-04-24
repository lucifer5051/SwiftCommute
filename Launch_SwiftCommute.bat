@echo off
title SwiftCommute Auto Launcher
echo ==========================================
echo 🚕 Starting SwiftCommute Platform...
echo ==========================================
echo.
echo [Step 1] Connecting to internet and downloading any missing components...
call npm install
echo.
echo [Step 2] Queuing your web browser to open automatically...
:: This async command waits 3 seconds specifically to give the server time to start up before the browser opens
start "" cmd /c "timeout /t 3 /nobreak > nul & start http://localhost:5000"
echo.
echo [Step 3] Launching the Database and Backend!
echo ==========================================
echo  IMPORTANT: PLEASE DO NOT CLOSE THIS WINDOW! 
echo  (You can minimize it while using the app)
echo ==========================================
echo.
node server.js
pause
