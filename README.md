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
3. If you're on firmware lower than 2.3.2.9, then rename folder "aGVscF9zb3Nf" to "update"
4. Plug USB drive into the printer
5. Settings => Device Informations => Printer information => Firmware version (NOT the Wi-Fi IP address)
6. There should be an orange button next to the row, click it and wait for the installation to finish

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
