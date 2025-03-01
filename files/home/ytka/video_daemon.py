from inotify_simple import INotify, flags
import subprocess
import os

DEVICE_NAME = "video10"

inotify = INotify()
watch_flags = flags.CREATE | flags.DELETE
inotify.add_watch("/dev/", watch_flags)
inotify.add_watch("/useremain/home/ytka/printer_data/config/", watch_flags)

has_video = os.path.exists("/dev/video10")
camera_enabled = os.path.exists("/useremain/home/ytka/printer_data/config/.camera")

def start_streamer():
    subprocess.Popen(["sh", "/useremain/home/ytka/mjpg_streamer.sh"])


def stop_streamer():
    subprocess.Popen(["killall", "mjpg_streamer"])


if camera_enabled and has_video:
    # Start streamer if connected at boot
    subprocess.Popen(["sh", "/useremain/home/ytka/mjpg_streamer.sh"])

while True:
    for event in inotify.read():
        if event.name == ".camera":
            if event.mask & flags.CREATE:
                camera_enabled = True
                if has_video:
                     subprocess.Popen(["killall", "gkcam"])
                     start_streamer()
            elif event.mask & flags.DELETE:
                camera_enabled = False
                if has_video:
                     stop_streamer()
                subprocess.Popen(["/userdata/app/gk/gkcam"])

        if event.name == DEVICE_NAME:
            if event.mask & flags.CREATE:
                has_video = True
                if camera_enabled:
                    start_streamer()
            elif event.mask & flags.DELETE:
                has_video = False
                if camera_enabled:
                     stop_streamer()

