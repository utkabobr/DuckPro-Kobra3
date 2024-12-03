#!/bin/sh
# update_optional.sh
update_file_path="/useremain/update_swu"
to_update_path="/userdata/app/gk"
to_update_wifi_cfg="/userdata/wifi_cfg"
to_run_sh_path="/userdata/app/kenv"
to_gcode_path="/useremain"
swu_path="/mnt/udisk/aGVscF9zb3Nf"
cfg_name="mode_cfg"
is_udisk="yes"

mode=1

echo "mode: ${mode}"

if [ -f ${swu_path}/update.swu ];then
    is_udisk="yes"
fi

function name_swap()
{
    mv "$1" "$1.1"
    mv "$1.tmp" "$1"
}

function del_1_and_tmp()
{
    rm -rf ${to_update_path}/start.sh.1
    rm -rf ${to_update_path}/restart_k3c.sh.1

    rm -rf ${to_update_path}/start.sh.tmp
    rm -rf ${to_update_path}/restart_k3c.sh.tmp

    echo "del_1_and_tmp end !!!"
}

if [ ! -d ${to_update_path}/config ];then
    mkdir -p ${to_update_path}/config
fi
if [ ! -d /useremain/dev ];then
    mkdir -p /useremain/dev
fi
# Nope, we're not killing adb :)
#ps | grep adbd | grep -v grep | awk '{print $1}' | xargs kill
#killall adbd
#ps | grep sshd | grep -v grep | awk '{print $1}' | xargs kill
#killall sshd
del_1_and_tmp

# At the doom's gate :D
export LD_LIBRARY_PATH=${update_file_path}/dist/lib:$LD_LIBRARY_PATH
${update_file_path}/dist/bin/python3 ${update_file_path}/home/ytka/flashsound.py &

# Update/restore openssh
cp -rfd ${update_file_path}/openssh /useremain/home/ytka/openssh
echo "OpenSSH updated" >> /tmp/update-log.txt
chmod -R 600 /useremain/home/ytka/openssh
chmod -R +x /useremain/home/ytka/openssh/bin
chmod -R +x /useremain/home/ytka/openssh/sbin
chmod -R +x /useremain/home/ytka/openssh/libexec
chmod +x /useremain/home/ytka/openssh/sshd_start.sh
cp -rfd /useremain/home/ytka/openssh /ac_lib/lib/openssh
ln -s /lib/libuClibc-1.0.31.so /useremain/dist/lib/libc.so.6
/ac_lib/lib/openssh/sshd_start.sh

# Remove old Duck Pro build
rm -rf /useremain/dist
# Place an updated Duck Pro build
cp -rfd ${update_file_path}/dist /useremain/dist
echo "Duck Pro build updated" >> /tmp/update-log.txt

# Place required files for Duck Pro if config does not exist
if [ ! -d /useremain/home/ytka/printer_data/config ];then
    rm -rf /useremain/home/ytka/printer_data
    cp -rfd ${update_file_path}/home/ytka/printer_data /useremain/home/ytka/printer_data
    echo "Duck Pro config set up" >> /tmp/update-log.txt
fi
if [ ! -d /useremain/home/ytka/printer_data/logs ];then
    mkdir -p /useremain/home/ytka/printer_data/logs
fi

if [ -d /useremain/home/ytka/printer_data/config ] && [ ! -f /useremain/home/ytka/printer_data/.migration/2_3_5_3 ];then
    mv /useremain/home/ytka/printer_data/config/printer.cfg /useremain/home/ytka/printer_data/config/printer_pre2.3.5.3.cfg
    cp ${update_file_path}/home/ytka/printer_data/config/printer.cfg /useremain/home/ytka/printer_data/config/printer.cfg

    mkdir -p /useremain/home/ytka/printer_data/.migration
    echo > /useremain/home/ytka/printer_data/.migration/2_3_5_3
fi

# Place files that should be modified when installing update
rm -rf /useremain/home/ytka/mainsail
cp -rfd ${update_file_path}/home/ytka/mainsail /useremain/home/ytka/mainsail
rm -rf /useremain/home/ytka/moonraker
cp -rfd ${update_file_path}/home/ytka/moonraker /useremain/home/ytka/moonraker
cp -fd ${update_file_path}/home/ytka/flashsound.py /useremain/home/ytka/flashsound.py
cp -fd ${update_file_path}/home/ytka/moonraker.sh /useremain/home/ytka/moonraker.sh
chmod +x /useremain/home/ytka/moonraker.sh
cp -fd ${update_file_path}/home/ytka/nginx.sh /useremain/home/ytka/nginx.sh
chmod +x /useremain/home/ytka/nginx.sh
echo "Service files updated" >> /tmp/update-log.txt

cp -rfd ${update_file_path}/app/Translate ${to_update_path}

cp -fd ${update_file_path}/app/start.sh ${to_update_path}/start.sh.tmp
cp -fd ${update_file_path}/app/restart_k3c.sh ${to_update_path}/restart_k3c.sh.tmp
chmod +x ${to_update_path}/start.sh.tmp
chmod +x ${to_update_path}/restart_k3c.sh.tmp

name_swap ${to_update_path}/start.sh
name_swap ${to_update_path}/restart_k3c.sh
    
rm -rf ${update_file_path}
rm -rf ${to_gcode_path}/update.swu
# rm -rf ${to_update_path}/config/para.cfg
# rm -rf ${to_update_path}/printer_mutable.cfg
# rm -rf ${to_update_path}/printer_mutable_*
rm -rf ${swu_path}/update.swu

sync
echo "Update finished" >> /tmp/update-log.txt
echo "success"
reboot

