if [ -e /useremain/home/ytka/printer_data/config/.camera ]; then
    if [ -e /dev/video10 ]; then
        killall gkcam
        /useremain/dist/mjpg_streamer/mjpg_streamer -i "input_uvc.so -d /dev/video10 -n -r 1280x720" -o "output_http.so -w /useremain/dist/mjpg_streamer/www"
    fi
fi
