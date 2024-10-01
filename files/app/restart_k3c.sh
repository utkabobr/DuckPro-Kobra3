#!/bin/sh

killall gklib
killall gkapi
killall K3SysUi
killall gkcam

rm -rf /tmp/gklib.log
export USE_MUTABLE_CONFIG=1
export LD_LIBRARY_PATH=/userdata/app/gk:$LD_LIBRARY_PATH
./gklib -a /tmp/unix_uds1 /useremain/home/ytka/printer_data/config/printer.cfg &> /tmp/gklib.log &
sleep 5
./gkapi &> /tmp/gkapi.log &
./K3SysUi &> /tmp/gkui.log &
sleep 6
./gkcam &

