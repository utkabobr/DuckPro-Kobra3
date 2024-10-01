#!/bin/sh
export_dir="/mnt/udisk/ZXhwb3J0X2Rpcgo="
export_txt="ZXhwb3J0LnR4dAo="
import_dir="/mnt/udisk/aW1wb3J0X2Rpcgo="
import_txt="aW1wb3J0LnR4dAo="
file_dir="ZmlsZV9kaXIK"
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
	zip -r -P 2YLVrATRvUEnMeXk6Vtc7qxfzYM4TJzrLnEBma8zpUKeGtseGWqp4LXs7e8KeU2u AC_LOG.pack AcLog
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
        zip -r -P 2YLVrATRvUEnMeXk6Vtc7qxfzYM4TJzrLnEBma8zpUKeGtseGWqp4LXs7e8KeU2u AC_CONF.pack AcConfig
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
                log) log ;;
		cfg) cfg ;;
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
sleep 1

if [ -f "${import_dir}/${import_txt}" ];then
    echo "${import_txt} file exist !!!"
    import_txt_value=$(cat ${import_dir}/${import_txt})
    for value in ${import_txt_value}
    do
        echo "${value}"
        if [ "${value##*:}" == "x" ];then
            echo "need chmod !!!"
            value_right=${value#*:}
            value_left=${value_right%:*}
            cp -rfd ${import_dir}/${value%%:*} ${value_left}
            chmod +x ${value_left}/${value%%:*}
        elif [ "e${value##*:}" != "e" ];then
            cp -rfd ${import_dir}/${value%%:*} ${value#*:}
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

