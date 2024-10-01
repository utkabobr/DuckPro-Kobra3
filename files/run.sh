# usb sel
echo 41 > /sys/class/gpio/export
echo out > /sys/class/gpio/gpio41/direction
echo 1 > /sys/class/gpio/gpio41/value

# set cpufreq 1.4GHZ
echo userspace > /sys/devices/system/cpu/cpufreq/policy0/scaling_governor
echo 1416000 > /sys/devices/system/cpu/cpufreq/policy0/scaling_setspeed

if [ ! -d /useremain/app/gk/gcodes/test_model ];then
    mkdir -p /useremain/app/gk/gcodes/test_model
fi

if [ ! -d /useremain/dev ];then
    mkdir -p /useremain/dev
fi

if [ -f /userdata/app/gk/version ];then
    mv /userdata/app/gk/version /useremain/dev
fi

sync

cd /userdata/app/gk
# chmod +x start.sh
./start.sh
exit 0
#io -4 0xff990028 0x09081004
#io -4 0xff990000 0xffffffff
