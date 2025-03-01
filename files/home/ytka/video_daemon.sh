export LD_LIBRARY_PATH=/useremain/dist/lib:$LD_LIBRARY_PATH
export HOME=/useremain/home/ytka
ln -s /lib/libuClibc-1.0.31.so /useremain/dist/lib/libc.so.6
/useremain/dist/bin/python3 /useremain/home/ytka/video_daemon.py
