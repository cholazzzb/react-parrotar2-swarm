# $sudo chmod 0777 /dev/ttyAMA0 (which basically sets blanket permissions for anyone to access it)

import time
import socketio
from marvelmind import MarvelmindHedge
import sys

MARVELMIND = "MARVELMIND"

socketClient = socketio.Client()
socketClient.connect("http://localhost:4000")


def main():
    # create MarvelmindHedge thread
    hedge1 = MarvelmindHedge(tty="/dev/ttyACM0", adr=7, debug=False)
    hedge1.start()  # start thread
    hedge2 = MarvelmindHedge(tty = "/dev/ttyACM0", adr=8, debug=False) # create MarvelmindHedge thread
    hedge2.start() # start thread
    startTime = time.time()
    currentPos1 = list()
    currentPos2 = list()

    while True:
        try:
            # print (hedge1.position()) # get last position and print
            currentPos1 = hedge1.position()
            currentPos2 = hedge2.position()
            currentTime = round(float(time.time() - startTime), 1)
            # latestPos1 = currentPos1
            # latestPos2 = currentPos2
            socketClient.emit(MARVELMIND, [
                {"id": "Quad1",
                "time": currentTime,
                "xPos": currentPos1[1],
                "yPos": currentPos1[2],
                "zPos": 0},
                {"id": "Quad2",
                "time": currentTime,
                "xPos": currentPos2[1],
                "yPos": currentPos2[2],
                "zPos": 0}
            ])
            # if ((latestPos1 != currentPos1) or (latestPos2 != currentPos2)):
            #     print("Data", currentPos1)
            #     print("Data2", currentPos2)
            

        except KeyboardInterrupt:
            hedge1.stop()  # stop and close serial port
            sys.exit()

main()
