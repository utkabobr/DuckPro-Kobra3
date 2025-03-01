> [!CAUTION]
> **THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND. BY USING IT YOU TAKE ALL THE RISKS FOR YOUR ACTIONS**

# Duck Pro CFW

The first CFW that you actually need on Kobra 3.

🇷🇺 [Readme на русском языке](./README.ru.md)

# My other projects

[<img src="/.github/img/bk_badge.png">](https://github.com/utkabobr/BeamKlipper) [<img src="/.github/img/sb_badge.png">](https://github.com/utkabobr/SliceBeam)

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

1. Update to the latest supported firmware (Now it's 2.3.5.3)
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

You need to re-flash stock firmware and then try again if you want.

Links to the stock firmware:
- [2.3.5.3](https://ytkab0bp.ru/Kobra3_2.3.5.3.swu)
- [2.3.3.9](https://ytkab0bp.ru/Kobra3_2.3.3.9.swu)

Place it as update.swu in that folder with strange symbols.

## FAQ

**Question**: How to connect to web interface?<br>
**Answer**: Just open your printer's IP address in browser from any local device. Printer's IP can be found via printer's display.

**Q**: Is it clean klipper? Will I be able to update it?<br>
**A**: No. Anycubic modified klipper so hard that (Rewritten everything in Golang) it can't be updated and lack some of clean Klipper features.

**Q**: How to install klipper addons?<br>
**A**: There is no simple way to do it.

**Q**: How to enable mjpg-streamer?<br>
**A**: Create .camera file in config directory, plug your camera & configure webcamera in mainsail/fluidd

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
- [mjpg-streamer](https://sourceforge.net/projects/mjpg-streamer)
- Disabled ADB kill
- Restored [OpenSSH](https://www.openssh.com) - (`root`:`rockchip`)
- Cool At Doom's Gate beeper script on installation (Ported from [here](https://github.com/robsoncouto/arduino-songs/blob/master/doom/doom.ino))
- Based on 2.3.5.3

Use path `/useremain/dist/bin/` for most of the binaries

## Building

Use `./create_update.sh`
