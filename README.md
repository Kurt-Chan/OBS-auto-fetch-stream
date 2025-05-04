
# 🎥 OBS Auto-Streaming Setup — User Guide

Welcome! This tool will automatically launch **two OBS windows instances** and start streaming for you. Follow the guide below to set it up properly.

---

## 📁 What’s Inside This Folder

- `autorun.exe` – Launches both OBS instances and starts streaming.
- `obs.exe` – The automation engine that controls OBS.
- `.env` – Environment configuration (used internally, **do not modify**)

---

## 🛠️ One-Time Setup – Create 2 OBS Portable Folders

You’ll need **two separate OBS folders** for the automation to work.

### ✅ Step-by-Step Instructions

1. **Create these folders:**
   - `C:\OBS_Instances\OBS1`
   - `C:\OBS_Instances\OBS2`

2. **Copy your OBS files** (already downloaded) into both folders:
   - From your OBS ZIP or extracted folder, copy everything into **both** `OBS1` and `OBS2`.

   Example:
   ```
   C:\OBS_Instances\OBS1\bin\64bit\obs64.exe
   C:\OBS_Instances\OBS2\bin\64bit\obs64.exe
   ```

3. **Enable Portable Mode for both:**
   - Inside each of these folders (`OBS1` and `OBS2`), create a blank file named:
     ```
     portable_mode.txt
     ```
     - No extension. Just the name.

---

## 🚀 How to Start Streaming

1. **Double-click** `autorun.exe`

   It will:
   - Launch OBS1
   - Launch OBS2
   - Start the automation (stream control)

2. **Wait about 10 seconds**  
   Your streams should begin automatically.

---

## 🛑 To Stop

- Simply close both OBS windows manually.  
- The automation will stop once OBS is closed.

---

## ⚠️ Tips and Requirements

- OBS folders **must be exactly at**:
  ```
  C:\OBS_Instances\OBS1
  C:\OBS_Instances\OBS2
  ```
- Do not delete or rename the following files:
  - `autorun.exe`
  - `obs.exe`
  - `.env`

---
## Dev Environment
- Clone the repository and install required packages
   ```
      npm install
   ```
- Make sure you have [Python](https://www.python.org/downloads/) installed
- Modify changes in the **.env** (e.g., RTSP Url, Stream key, Server etc.)
- Run the autorun.py
   ```
      python autorun.py
   ```
---
## Build
- To build `obs.js` into executable, run the command. (Make sure you have [pkg](https://www.npmjs.com/package/pkg) installed globally.)
   ```
   pkg . --targets node18-win-x64 --output autoStream.exe 
   ```
- To build `autorun.py`, run the command:
   ```
   pyinstaller --onefile autorun.py --add-data "autoStream.exe;."
   ```
- Compile all executable files with the .env files into one folder.

---

**Kurt Chan**  
[Portfolio](https://kurtchan.com) | [Blog about this](https://dev.to/kurtchan/how-i-automated-obs-streaming-with-javascript-and-saved-our-office-hours-of-setup-time-12ja)


   