#!/bin/sh

ps | grep wpa_supplicant | grep -v grep | awk '{print $1}' | xargs kill
export USE_MUTABLE_CONFIG=1
export LD_LIBRARY_PATH=/userdata/app/gk:$LD_LIBRARY_PATH
#echo $LD_LIBRARY_PATH
#./klipper.elf &> elf.log &
killall gklib
killall gkapi
killall K3SysUi
killall gkcam
./gklib -a /tmp/unix_uds1 /useremain/home/ytka/printer_data/config/printer.cfg &> /tmp/gklib.log &
sleep 5
./gkapi &> /tmp/gkapi.log &
./K3SysUi &> /tmp/gkui.log &
sleep 6
./gkcam &
