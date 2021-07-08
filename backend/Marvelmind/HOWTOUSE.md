# Open Dashboard through terminal
1. Plug in the cable to modem
2. Wait about 30 seconds
3. sudo chmod 0777 /dev/ttyACM0
4. in terminal run ./dashboard_x86 /dev/ttyACM0

# ROS
1. chmod
2. roscore
3. cd ~/catkin_ws
4. rosrun marvelmind_nav hedge_rcv_bin /dev/ttyACM1
