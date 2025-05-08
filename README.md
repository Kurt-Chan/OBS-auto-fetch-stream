
# 🎥 OBS Auto-Streaming Setup — User Guide

Welcome! This tool will automatically launch **two OBS windows instances** and start streaming for you. Follow the guide below to set it up properly.

---

## 🛠️ Pre-requisites

- **OBS Studio version 30.1.0 or above**  
  [Download OBS here](https://obsproject.com/)
- Download the automation script in the [Releases](https://github.com/Kurt-Chan/OBS-auto-fetch-stream/releases/tag/v1.0.0) page

---

## 📁 What's Inside the Folder

| File            | Description                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| `.env`          | Configuration file for both OBS instances                                   |
| `autorun.exe`   | Automatically opens two OBS instances and runs `autoStream.exe`             |
| `autoStream.exe`| Applies the `.env` configuration to OBS and starts streaming                |
| `init.bat`      | One-time setup script (automates steps 1–4 below)                           |
| `restartObs.bat`| Restarts all OBS instances                                                  |

---

## 🛠️ One-Time Setup – Create 2 OBS Portable Folders
> 💡 To skip steps 1–4, **run `init.bat` as Administrator**

You’ll need **two separate OBS folders** for the automation to work.

### ✅ Step-by-Step Instructions
1. Create a folder named `OBS_Instances` in the C drive:  
   `C:\OBS_Instances`

2. Inside `OBS_Instances`, create two folders:  
   - `C:\OBS_Instances\OBS1`  
   - `C:\OBS_Instances\OBS2`

3. Copy the entire contents of your original OBS installation folder:  
   From: `C:\Program Files\obs-studio`  
   Into: both `OBS1` and `OBS2`

4. Inside **both OBS1 and OBS2**, create a blank text file named:  
   `portable_mode.txt`  
   *(No file extension. Leave it empty.)*

5. Launch OBS from `OBS2`:
   - Skip the auto-configuration wizard
   - Go to `Tools > WebSocket Server Settings`
   - Enable the WebSocket server
   - Change the port from `4455` to `4456`
   - Click **Save**

6. Launch OBS from `OBS1`:
   - Skip the auto-configuration wizard
   - Go to `Tools > WebSocket Server Settings`
   - Enable the WebSocket server
   - Leave the default port: `4455`

7. Open `.env` with Notepad and configure your values:

```env
MINIPC_IP=<IP ADDRESS OF THE MINI PC>
RTMP_SERVER=<RTMP URL>

OBS1_PORT=4455
OBS1_PASSWORD=<WEBSOCKET PASSWORD>
OBS1_MEDIA_SOURCE_NAME=<MEDIA SOURCE NAME>
OBS1_RTSP_URL=<RTSP PTZ URL>
OBS1_SCENE_NAME=Scene
OBS1_STREAM_KEY=<STREAM KEY>

OBS2_PORT=4456
OBS2_PASSWORD=<WEBSOCKET PASSWORD>
OBS2_MEDIA_SOURCE_NAME=<MEDIA SOURCE NAME>
OBS2_RTSP_URL=<RTSP PTZ URL>
OBS2_SCENE_NAME=Scene
OBS2_STREAM_KEY=<STREAM KEY>
```

> 🔐 To get the WebSocket password for each OBS instance:
> - Open OBS
> - Go to `Tools > WebSocket Server Settings`
> - Click **"Show Connect Info"**

---

## 🚀 How to Start Streaming

1. **Double-click** `autorun.exe`

   It will:
   - Launch OBS instances
   - Start the `autoStream.exe`

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
- Do not delete or rename any file.

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


   