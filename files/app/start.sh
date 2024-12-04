ps | grep wpa_supplicant | grep -v grep | awk '{print $1}' | xargs kill
# Nope, not killing adb
# But if you really want to disable adb, then uncomment this
#ps | grep adbd | grep -v grep | awk '{print $1}' | xargs kill
#killall adbd

export USE_MUTABLE_CONFIG=1
export LD_LIBRARY_PATH=/userdata/app/gk:$LD_LIBRARY_PATH
#echo $LD_LIBRARY_PATH
#./klipper.elf &> elf.log &

# Modified: Use custom printer.cfg
./gklib -a /tmp/unix_uds1 /useremain/home/ytka/printer_data/config/printer.cfg &> /tmp/gklib.log &
sleep 2
# Start moonraker first, anycubic's api later
/useremain/home/ytka/moonraker.sh &
sleep 4
./gkapi &> /tmp/gkapi.log &
./K3SysUi &> /tmp/gkui.log &
sleep 6
# ./gkcam &
/useremain/home/ytka/mjpg-streamer.sh &

# Start nginx
/useremain/home/ytka/nginx.sh &

# Copy SSH to it's place
cp -rf /useremain/home/ytka/openssh /ac_lib/lib/openssh
mount --bind /tmp/ /var/empty/
chmod 600 /var/empty/
/ac_lib/lib/openssh/sshd_start.sh &

# Bind moonraker's gcodes as main folder
mount --bind /useremain/home/ytka/printer_data/gcodes /useremain/app/gk/gcodes/

# Bind 'config' directory into our config
mount --bind /userdata/app/gk/config /useremain/home/ytka/printer_data/config/anycubic_config

