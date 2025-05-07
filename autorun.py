import subprocess
import time
import os

OBS1_DIR = r"C:\OBS_Instances\OBS1\bin\64bit\obs64.exe"
OBS2_DIR = r"C:\OBS_Instances\OBS2\bin\64bit\obs64.exe"
current_dir = os.path.dirname(os.path.abspath(__file__))

# Launch OBS1
obs1_dir = os.path.dirname(OBS1_DIR)
obs1 = subprocess.Popen([OBS1_DIR, '--portable','--disable-shutdown-check'], cwd=obs1_dir)
print("Launching OBS1 on port 4455...")
time.sleep(5)

# Launch OBS2
obs2_dir = os.path.dirname(OBS2_DIR)
obs2 = subprocess.Popen([OBS2_DIR, '--portable', '--disable-shutdown-check'], cwd=obs2_dir)
print("Launching OBS2 on port 4456...")
time.sleep(5)

# Start stream via node script (after build)
# obs_exe = os.path.join(current_dir, "autoStream.exe")
# subprocess.run([obs_exe])  # Run all streams

# for dev
subprocess.run(["node","obs.js"])  # Run all streams
