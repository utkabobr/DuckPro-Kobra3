#!/bin/sh
export_dir="/mnt/udisk/ZXhwb3J0X2Rpcgo="
export_txt="ZXhwb3J0LnR4dAo="
dis_passwd="disable"

function log()
{
    echo "option log !!!"
    mkdir -p /userdata/AcLog
    df -h > /tmp/sys_volume.log
    dmesg > /tmp/sys_kernel.log
    cp -fd /tmp/*.log /userdata/AcLog
    cp -fd /userdata/app/gk/version_log.txt /userdata/AcLog
    cp -fd /useremain/dev/version /userdata/AcLog
    cp -fd /ac_app/gkui* /userdata/AcLog
    cd /userdata
    if [ "${dis_passwd}" == "disable" ];then
	zip -r -P $1 AC_LOG.pack AcLog
    else
        zip -r AC_LOG.pack AcLog
    fi
    rm -rf ${export_dir}/AC_LOG.pack
    cp -fd AC_LOG.pack ${export_dir}
    rm -rf AC_LOG.pack AcLog
    sync
}

function cfg()
{
    echo "option cfg !!!"
    mkdir -p /userdata/AcConfig
    cp -fd /userdata/app/gk/printer_mutable.cfg /userdata/AcConfig
    cp -fd /userdata/app/gk/printer.cfg /userdata/AcConfig
    cp -fd /userdata/app/gk/printer-* /userdata/AcConfig
    cp -fd /userdata/app/gk/printer_mutable_* /userdata/AcConfig
    cp -fd /userdata/app/gk/config/* /userdata/AcConfig
    cd /userdata
    if [ "${dis_passwd}" == "disable" ];then
        zip -r -P $1 AC_CONF.pack AcConfig
    else
        zip -r AC_CONF.pack AcConfig
    fi
    rm -rf ${export_dir}/AC_CONF.pack
    cp -fd AC_CONF.pack ${export_dir}
    rm -rf AC_CONF.pack AcConfig
    sync
}

function dis_passwd()
{
    echo "option dis_passwd !!!"
    dis_passwd="enable"
}

if [ -f "${export_dir}/${export_txt}" ];then
    echo "${export_txt} file exist !!!"
    export_txt_value=$(cat ${export_dir}/${export_txt})
    for value in ${export_txt_value}
    do
        echo "${value}"
        if [ "${value#*:}" == "1" ];then
            case ${value%%:*} in
                dis_passwd) dis_passwd;;
                log) log $1 ;;
		cfg) cfg $1 ;;
            esac
        fi
    done
    echo 1 > /sys/class/pwm/pwmchip0/pwm0/enable
    sleep 1
    echo 0 > /sys/class/pwm/pwmchip0/pwm0/enable
    sleep 1
    echo 1 > /sys/class/pwm/pwmchip0/pwm0/enable
    sleep 1
    echo 0 > /sys/class/pwm/pwmchip0/pwm0/enable
fi

sync
