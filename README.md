> [!CAUTION]
> **THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND. BY USING IT YOU TAKE ALL THE RISKS FOR YOUR ACTIONS**

# Duck Pro CFW

The first CFW that you actually need on Kobra 3.

## Features (Simple)

- Web interface on device's IP
- Removed some shady tricks in printer.cfg (accelerometer additional config, etc.)
- SSH / ADB access (`root`:`rockchip` / `adb connect IP:5555`)
- Based on 2.3.2.9

## Installation

1. Download latest archive from [Releases](https://github.com/utkabobr/DuckPro-Kobra3/releases/latest)
2. Unpack it's content onto the FAT32 USB drive (Do not rename or move anything until otherwise stated)

### 2.3.2.9 or above
1. Plug USB drive into the printer
2. Wait about 15-20 minutes for it to install. Anycubic changed install process and now it installs swu files automatically
3. Firmware should reboot upon installation. If not, please wait max time and then reboot manually. Rebooting before installation is finished may damage files!!!

### Pre-2.3.2.9:
1. Rename folder "aGVscF9zb3Nf" to "update"
5. Plug USB drive into the printer
6. Settings => Device Informations => Printer information => Firmware version (NOT the Wi-Fi IP address)
7. There should be an orange button next to the row, click it and wait for the installation to finish

## Help! I'm stuck on 11407
This means that Klipper is failed to start.

First - don't worry, you can still re-flash stock firmware or attempt to reinstall Duck Pro.

This could be due to wrong printer.cfg location. This was the case on 01.10.24 (printer_data unpacked into /useremain/home/ytka/printer_data/printer_data/ instead of /useremain/home/ytka/printer_data/), please update to 05.10.24 or later (or move files if you know how to do it) if you've tried to install it and "bricked" the printer.

Link to the stock firmware: [2.3.2.9](https://ytkab0bp.ru/Kobra3_2.3.2.9.swu) (Place it as update.swu in that folder with strange symbols on 2.3.2.9 and "update" on pre-2.3.2.9)

## Features (Advanced)

- [Python 3.11](https://python.org)
- [Moonraker](https://github.com/Arksine/moonraker) - Modified for Kobra 3 (https://github.com/utkabobr/moonraker/tree/duckpro), emulating Heightmap instead of goklipper, emulating required features that goklipper doesn't support
- [Nginx](https://nginx.org)
- [Mainsail](https://github.com/mainsail-crew/mainsail)
- [fbgrab](https://github.com/GunnarMonell/fbgrab)
- [socat](http://www.dest-unreach.org/socat)
- Disabled ADB kill
- Restored [OpenSSH](https://www.openssh.com) - (`root`:`rockchip`)
- Cool At Doom's Gate beeper script on installation (Ported from [here](https://github.com/robsoncouto/arduino-songs/blob/master/doom/doom.ino))
- Based on 2.3.2.9

Use path `/useremain/dist/bin/` for most of the binaries

## Building

Use `./create_update.sh`
