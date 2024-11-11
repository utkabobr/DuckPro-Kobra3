> [!CAUTION]
> **THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND. BY USING IT YOU TAKE ALL THE RISKS FOR YOUR ACTIONS**

# Duck Pro CFW

The first CFW that you actually need on Kobra 3.

🇷🇺 [Readme на русском языке](./README.ru.md)

# My other projects

[<img src="/.github/img/bk_badge.jpg">](https://github.com/utkabobr/BeamKlipper) [<img src="/.github/img/sb_badge.jpg">](https://github.com/utkabobr/SliceBeam)

## Features (Simple)

- Web interface (Mainsail/Fluidd):
  - Send g-code files directly from Prusa/Orca Slicer
  - Full control of Kobra 3 from computer/phone
  - View and control bed mesh map
  - Change printer's configuration
  - etc
- Removed some shady tricks in printer.cfg (accelerometer additional config, etc.)
- SSH access (user: `root`, pass: `rockchip`)
- ADB access (port: `5555`)

## Installation

1. Download latest archive from [Releases](https://github.com/utkabobr/DuckPro-Kobra3/releases/latest)
2. Unpack folder from it onto the FAT32 USB drive (Do not rename or move anything until otherwise stated)

### 2.3.2.9 or above
3. Plug USB drive into the printer
4. Wait about 15-20 minutes for it to install. Anycubic changed install process and now it installs swu files automatically
5. Firmware should reboot upon installation. If not, please wait max time and then reboot manually

:warning: Do not remove USB drive before finish. Rebooting before installation is finished may damage files!!!

### Pre-2.3.2.9:
3. Rename folder "aGVscF9zb3Nf" to "update"
4. Plug USB drive into the printer
5. Settings => Device Informations => Printer information => Firmware version (NOT the Wi-Fi IP address)
6. There should be an orange button next to the row, click it and wait for the installation to finish

## Help! I'm stuck on 11407
This means that Klipper is failed to start.

First - don't worry, you can still re-flash stock firmware or attempt to reinstall Duck Pro.

This could be due to wrong printer.cfg location. This was the case on 01.10.24 (printer_data unpacked into /useremain/home/ytka/printer_data/printer_data/ instead of /useremain/home/ytka/printer_data/), please update to 05.10.24 or later (or move files if you know how to do it) if you've tried to install it and "bricked" the printer.

Link to the stock firmware: [2.3.5.3](https://ytkab0bp.ru/Kobra3_2.3.5.3.swu) (Place it as update.swu in that folder with strange symbols on 2.3.2.9 and "update" on pre-2.3.2.9)

## FAQ

**Question**: How to connect to web interface?<br>
**Answer**: Just open your printer's IP address in browser from any local device. Printer's IP can be found via printer's display.

**Q**: Is it clean klipper? Will I be able to update it?<br>
**A**: No. Anycubic modified klipper so hard that (Rewritten everything in Golang) it can't be updated and lack some of clean Klipper features.

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
