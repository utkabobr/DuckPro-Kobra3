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

echo "del_1_and_tmp end !!!"

rm -rf ${to_update_path}/printer_mutable.cfg
rm -rf ${to_update_path}/printer_mutable_*
rm -rf /useremain/home/ytka/printer_data/config/printer_mutable.cfg
rm -rf /useremain/home/ytka/printer_data/config/printer_mutable_*
    
rm -rf ${update_file_path}
rm -rf ${to_gcode_path}/update.swu
rm -rf ${swu_path}/update.swu

sync
echo "Update finished" >> /tmp/update-log.txt
echo "success"
reboot

