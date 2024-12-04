if [ -e /dev/video10 ]; then
    /useremain/dist/mjpg-streamer/mjpg_streamer -i "input_uvc.so -d /dev/video10 -n -r 1280x720" -o "output_http.so -w /useremain/dist/mjpg-streamer/www"
fi
