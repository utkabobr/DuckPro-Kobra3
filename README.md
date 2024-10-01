# Duck Pro CFW

The first CFW that you actually need on Kobra 3.

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

1. Download latest archive from [Releases](https://github.com/utkabobr/DuckPro-Kobra3/releases/latest);
2. Unpack it's content onto the FAT32 USB drive (Do not rename or move anything until otherwise stated);
3. :warning: If you're on firmware lower than 2.3.2.9, then rename folder `aGVscF9zb3Nf` to `update`;
4. Plug USB drive into the printer;
5. Settings => Device Informations => Printer information => Firmware version (NOT the Wi-Fi IP address);
6. There should be an orange button next to the row, click it and wait for the installation to finish.

## FAQ

**Q**uestion: How to connect to web interface?<br>
**A**nswer: Just open your printer's IP address in browser from any local device. Printer's IP can be found via printer's display.

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
