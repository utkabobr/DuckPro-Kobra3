#!/bin/sh
# update_optional.sh
update_file_path="/useremain/update_swu"
to_update_path="/userdata/app/gk"
to_update_wifi_cfg="/userdata/wifi_cfg"
to_run_sh_path="/userdata/app/kenv"
to_gcode_path="/useremain"
swu_path="/mnt/udisk/aGVscF9zb3Nf"
cfg_name="mode_cfg"
is_udisk="no"

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
    rm -rf ${to_update_path}/K3SysUi.1
    rm -rf ${to_update_path}/gkapi.1
    rm -rf ${to_update_path}/gklib.1
    rm -rf ${to_update_path}/gkcam.1
    rm -rf ${to_update_path}/version_log.txt.1
    rm -rf ${to_gcode_path}/dev/version.1
    rm -rf ${to_update_path}/printer.cfg.1
    rm -rf ${to_update_path}/config/api.cfg.1
    # rm -rf ${to_update_path}/config/device.ini.1
    # rm -rf /userdata/app/certs.1
    # rm -rf ${to_update_wifi_cfg}/wpa_supplicant.conf.1
    # rm -rf ${to_run_sh_path}/run.sh.1
    # rm -rf ${to_update_path}/libc_helper.so.1
    # rm -rf ${to_update_path}/temperature_sensors.cfg.1
    rm -rf ${to_update_path}/start.sh.1
    rm -rf ${to_update_path}/restart_k3c.sh.1
    rm -rf /userdata/channel.sh.1
    rm -rf /userdata/channel.1
    rm -rf /userdata/ex_and_im.sh.1

    rm -rf ${to_update_path}/K3SysUi.tmp
    rm -rf ${to_update_path}/gkapi.tmp
    rm -rf ${to_update_path}/gklib.tmp
    rm -rf ${to_update_path}/gkcam.tmp
    rm -rf ${to_update_path}/version_log.txt.tmp
    rm -rf ${to_gcode_path}/dev/version.tmp
    rm -rf ${to_update_path}/printer.cfg.tmp
    rm -rf ${to_update_path}/config/api.cfg.tmp
    # rm -rf ${to_update_path}/config/device.ini.tmp
    # rm -rf /userdata/app/certs.tmp
    # rm -rf ${to_update_wifi_cfg}/wpa_supplicant.conf.tmp
    # rm -rf ${to_run_sh_path}/run.sh.tmp
    # rm -rf ${to_update_path}/libc_helper.so.tmp
    # rm -rf ${to_update_path}/temperature_sensors.cfg.tmp
    rm -rf ${to_update_path}/start.sh.tmp
    rm -rf ${to_update_path}/restart_k3c.sh.tmp
    rm -rf /userdata/channel.sh.tmp
    rm -rf /userdata/channel.tmp
    rm -rf /userdata/ex_and_im.sh.tmp

    echo "del_1_and_tmp end !!!"
}

if [ "${mode}" == '1' ];then
    echo "mode: ${mode}"
    if [ ! -d ${to_update_path}/config ];then
        mkdir -p ${to_update_path}/config
    fi
    if [ ! -d /useremain/app/gk/gcodes/test_model ];then
        mkdir -p /useremain/app/gk/gcodes/test_model
    fi
    if [ ! -d /useremain/dev ];then
        mkdir -p /useremain/dev
    fi
    #ps | grep adbd | grep -v grep | awk '{print $1}' | xargs kill
    #killall adbd
    #ps | grep sshd | grep -v grep | awk '{print $1}' | xargs kill
    #killall sshd
    del_1_and_tmp
    #rm -rf /ac_lib/lib/openssh
    # rm -rf ${to_update_path}/gcodes/*
    # set -e
    cp -fd ${update_file_path}/app/K3SysUi ${to_update_path}/K3SysUi.tmp
    cp -fd ${update_file_path}/app/gkapi ${to_update_path}/gkapi.tmp
    cp -fd ${update_file_path}/app/gklib ${to_update_path}/gklib.tmp
    cp -fd ${update_file_path}/app/gkcam ${to_update_path}/gkcam.tmp
    cp -fd ${update_file_path}/app/version_log.txt ${to_update_path}/version_log.txt.tmp
    cp -fd ${update_file_path}/version ${to_gcode_path}/dev/version.tmp
    cp -fd ${update_file_path}/app/printer.cfg ${to_update_path}/printer.cfg.tmp
    cp -fd ${update_file_path}/app/config/api.cfg ${to_update_path}/config/api.cfg.tmp
    # cp -fd ${update_file_path}/app/config/device.ini ${to_update_path}/config/device.ini.tmp
 
    # del all old gcode model
    rm -rf ${to_gcode_path}/app/gk/gcodes/test_model/*
    # copy new k3 combo gcode model into test_model
    cp -rfd ${update_file_path}/app/gcodes/* ${to_gcode_path}/app/gk/gcodes/test_model
    cp -rfd ${update_file_path}/app/Translate ${to_update_path}
 
    # cp -rfd ${update_file_path}/certs /userdata/app/certs.tmp
    # cp -rfd ${update_file_path}/wpa_supplicant.conf ${to_update_wifi_cfg}/wpa_supplicant.conf.tmp
    # cp -fd ${update_file_path}/run.sh ${to_run_sh_path}/run.sh.tmp
    # cp -fd ${update_file_path}/app/libc_helper.so ${to_update_path}/libc_helper.so.tmp
    # cp -fd ${update_file_path}/app/temperature_sensors.cfg ${to_update_path}/temperature_sensors.cfg.tmp
    cp -fd ${update_file_path}/app/start.sh ${to_update_path}/start.sh.tmp
    cp -fd ${update_file_path}/app/restart_k3c.sh ${to_update_path}/restart_k3c.sh.tmp
    cp -fd ${update_file_path}/channel.sh /userdata/channel.sh.tmp
    cp -fd ${update_file_path}/channel /userdata/channel.tmp
    cp -fd ${update_file_path}/ex_and_im_factory.sh /userdata/ex_and_im.sh.tmp
    chmod +x /userdata/channel.sh.tmp
    chmod +x /userdata/channel.tmp
    chmod +x /userdata/ex_and_im.sh.tmp
    chmod +x ${to_update_path}/K3SysUi.tmp
    chmod +x ${to_update_path}/gkapi.tmp
    chmod +x ${to_update_path}/gklib.tmp
    chmod +x ${to_update_path}/gkcam.tmp
    chmod +x ${to_update_path}/start.sh.tmp
    chmod +x ${to_update_path}/restart_k3c.sh.tmp
    # chmod +x ${to_run_sh_path}/run.sh.tmp
    rk_ota --misc=update --tar_path=${update_file_path}/update_ota.tar --save_dir=${update_file_path} --partition=all --extra_part=all --set_slot=enable

    name_swap ${to_update_path}/K3SysUi
    name_swap ${to_update_path}/gkapi
    name_swap ${to_update_path}/gklib
    name_swap ${to_update_path}/gkcam
    name_swap ${to_update_path}/version_log.txt
    name_swap ${to_gcode_path}/dev/version
    name_swap ${to_update_path}/printer.cfg
    name_swap ${to_update_path}/config/api.cfg
    # name_swap ${to_update_path}/config/device.ini
    # name_swap /userdata/app/certs
    # name_swap ${to_update_wifi_cfg}/wpa_supplicant.conf
    # name_swap ${to_run_sh_path}/run.sh
    # name_swap ${to_update_path}/libc_helper.so
    # name_swap ${to_update_path}/temperature_sensors.cfg
    name_swap ${to_update_path}/start.sh
    name_swap ${to_update_path}/restart_k3c.sh
    name_swap /userdata/channel.sh
    name_swap /userdata/channel
    name_swap /userdata/ex_and_im.sh
    # set +e
    
    rm -rf ${update_file_path}
    rm -rf ${to_gcode_path}/update.swu
    # rm -rf ${to_update_path}/config/para.cfg
    # rm -rf ${to_update_path}/printer_mutable.cfg
    # rm -rf ${to_update_path}/printer_mutable_*
    if [ "${is_udisk}" == "yes"  ];then
        rm -rf ${swu_path}/update.swu
    fi
    sync
    echo 1 > /sys/class/pwm/pwmchip0/pwm0/enable
    sleep 1
    echo 0 > /sys/class/pwm/pwmchip0/pwm0/enable
    sleep 1
    echo 1 > /sys/class/pwm/pwmchip0/pwm0/enable
    sleep 1
    echo 0 > /sys/class/pwm/pwmchip0/pwm0/enable
    echo "success"
    if [ "${is_udisk}" == "yes"  ];then
        reboot
    fi
elif [ "${mode}" == '2' ];then
    echo "mode ${mode}"
else
    echo "no mode"
fi
