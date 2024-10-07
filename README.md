# Duck Pro CFW

The first CFW that you actually need on Kobra 3.

:ru: [Readme на русском языке](./README.ru.md)

## Features (Simple)

- Web interface (Mainsail/Fluidd):
  - Send g-code files directly from Prusa/Orca Slicer;
  - Full control of Kobra 3 from computer/phone;
  - View and control bed mesh map;
  - Change printer's configuration;
  - etc.
- Removed some shady tricks in printer.cfg (accelerometer additional config, etc.);
- SSH access (user: `root`, pass: `rockchip`);
- ADB access (port: `5555`).

## Installation

### Versions up to 2.3.2.9

:warning: All actions you take are at your own risk and peril. The firmware author assumes no responsibility for any consequences of its installation :warning:

1. Download the latest version from the Releases page;
2. Extract the contents of the archive onto a FAT32 formatted USB flash drive (do not delete or rename anything);
3. Rename the folder aGVscF9zb3Nf to update;
4. Insert the USB flash drive into the printer;
5. Settings => Device Informations => Printer information => Firmware version (NOT the Wi-Fi IP address);
6. There should be an orange button. Press it and wait for the firmware installation to complete.

### Versions starting from 2.3.2.9

:warning: All actions you take are at your own risk and peril. The firmware author assumes no responsibility for any consequences of its installation :warning:

1. Download the latest version from the Releases page;
2. Extract the contents of the archive onto a USB flash drive, formatted in FAT32 (do not delete or rename anything);
3. Insert the flash drive into the printer. The installation will start automatically, and nothing will be displayed on the screen, but music will play. Wait until the printer automatically restarts (it may take several minutes).

:warning: Do not remove the flash drive until the printer restarts itself!

## FAQ

**Question**: How to connect to web interface?<br>
**Answer**: Just open your printer's IP address in browser from any local device. Printer's IP can be found via printer's display.

**Q**: Is it clean klipper? Will I be able to update it?<br>
**A**: No. Anycubic modified klipper so hard that it can't be updated and lack some of clean klipper features.

**Q**: Is there any plans to move to clean klipper?<br>
**A**: No. It would take too long. But other Kobra 3 users can fork this CFW and change anything they want.

**Q**: How to install klipper addons?<br>
**A**: There is no simple way to do it.

**Q**: How to tip a creator?<br>
**A**: [Boosty](https://boosty.to/ytkab0bp)

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
