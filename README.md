> [!CAUTION]
> **THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND. BY USING IT YOU TAKE ALL THE RISKS FOR YOUR ACTIONS**

# Duck Pro CFW

The first CFW that you actually need on Kobra 3.

🇷🇺 [Readme на русском языке](./README.ru.md)


# My other projects

[<img src="/.github/img/bk_badge.png">](https://github.com/utkabobr/BeamKlipper) [<img src="/.github/img/sb_badge.png">](https://github.com/utkabobr/SliceBeam)


## Features (Simple)

> This custom firmware is still a work in progress. Even if it might be usable on a day to day basis, it might require advanced manipulations from the user. Please do not use it unless you know what's you are doing

- Web interface (Mainsail/Fluidd):
  - Send g-code files directly from Prusa/Orca Slicer
  - Full control of Kobra 3 from computer/phone
  - View and control bed mesh map
  - Change printer's configuration
  - Access to USB camera
  - etc
- Removed some shady tricks in printer.cfg (accelerometer additional config, etc.)
- SSH access (user: `root`, pass: `rockchip`)
- ADB access (port: `5555`)


## Installation

1. Update to the latest supported firmware (now it's 2.3.5.3)
2. Download latest archive from [Releases](https://github.com/utkabobr/DuckPro-Kobra3/releases/latest)
3. Unpack folder from it onto the FAT32 USB drive (Do not rename or move anything)
4. Power on the printer and wait it to boot
5. Plug USB drive into the printer
6. Wait about 5-10 minutes for it to install
7. Firmware should reboot upon installation. If not, please wait max time and then reboot manually

:warning: Do not remove USB drive before finish. Rebooting before installation is finished may damage files!!!


## Help! I'm stuck on 11407

This means that Klipper is failed to start.
First - don't worry, you can still re-flash stock firmware, then attempt to reinstall Duck Pro.

Here is the full process to recover:
- Reflash the stock 2.3.3.9 firmware (download the firmware from the links below, then follow instructions below)
- Do a factory reset from the printer touchscreen (Settings > Device information > System restore)
- Once done, let the printer update itself to 2.3.5.3 or flash the stock 2.3.5.3 firmware
- Then perform the regular installation described above

Notes:
- Even if you get 11407 using a 2.5.3.5 firmware, you might need to downgrade to 2.3.3.9 to recover. Please follow all the steps listed above


## Stock firmware links

- [2.3.5.3](https://ytkab0bp.ru/Kobra3_2.3.5.3.swu)
- [2.3.3.9](https://ytkab0bp.ru/Kobra3_2.3.3.9.swu)

Read the installation instructions below


## How to install any firmware on the Kobra 3?

At this point you should have a .swu file, either a stock firmware or a custom one like DuckPro.

- Format a USB drive as FAT32
- Create a new directory
  - If the firmware is based on 2.3.3.9 or later (most firmwares should now), name it `aGVscF9zb3Nf`
  - If it's an older one before 2.3.3.9, name it `update`
- Copy your .swu file in this directory as `update.swu`
- Plug the USB drive in the Kobra 3
- You should hear a beep, meaning the printer detected the firmware file
- Give the printer some time
- Then it should reboot itself. If it doesn't, wait 20~30 minutes then reboot the printer manually
- Once installed, the update.swu file will have been removed from the USB drive, you can check as a confirmation

Notes:
- With official firmware, you will hear two beeps when the installation is done, then the printer will reboot


## How to access my USB camera from Mainsail / Fluidd?

Kobra 3 printers make the USB camera accessible through their tools (Anycubic app or slicers). In order to make it accessible through Mainsail / Fluidd, we implemented a switch to disable the use from their tools and make it work with mjpg-streamer.

- Create a .camera file in /useremain/home/ytka/printer_data/config/ using Mainsail, Fluidd, SSH or ADB
- Make sure your camera is plugged in
- Reboot your printer
- Create a default webcam in Mainsail or Fluidd (with MJPG Streamer and the default /webcam?action=X paths)
- Your camera should work now


## FAQ

**Question**: How to connect to web interface?<br>
**Answer**: Just open your printer's IP address in browser from any local device. Printer's IP can be found via printer's display.

**Q**: Is it clean klipper? Will I be able to update it?<br>
**A**: No. Anycubic modified klipper so hard that (Rewritten everything in Golang) it can't be updated and lack some of clean Klipper features.

**Q**: How to install klipper addons?<br>
**A**: There is no simple way to do it.

**Q**: How to tip a creator?<br>
**A**: [Boosty](https://boosty.to/ytkab0bp)


## Features (Advanced)

- [Python 3.11](https://python.org)
- [Moonraker](https://github.com/Arksine/moonraker) - Modified for Kobra 3 (https://github.com/utkabobr/moonraker/tree/duckpro), emulating Heightmap instead of goklipper, emulating required features that goklipper doesn't support
- [Nginx](https://nginx.org)
- [Mainsail](https://github.com/mainsail-crew/mainsail)
- [Fluidd](https://github.com/fluidd-core/fluidd) - Runs on port 4408
- [fbgrab](https://github.com/GunnarMonell/fbgrab)
- [socat](http://www.dest-unreach.org/socat)
- [mjpg-streamer](https://sourceforge.net/projects/mjpg-streamer) - Runs if .camera file is present in your config directory, enabled by default. Reboot is required.
- Disabled ADB kill
- Restored [OpenSSH](https://www.openssh.com) - (`root`:`rockchip`)
- Cool At Doom's Gate beeper script on installation (Ported from [here](https://github.com/robsoncouto/arduino-songs/blob/master/doom/doom.ino))
- Based on 2.3.5.3

Use path `/useremain/dist/bin/` for most of the binaries


## Building

Use `./create_update.sh`
