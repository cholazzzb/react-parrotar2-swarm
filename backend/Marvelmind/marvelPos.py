import time
import socketio

MARVELMIND = "MARVELMIND"

socketClient = socketio.Client()
socketClient.connect("http://localhost:4000")

startTime = time.time()
currentTime = round(float(time.time() - startTime), 1)
socketClient.emit(MARVELMIND, [
    {"id": "Quad1",
     "time": currentTime,
     "xPos": 0,
     "yPos": 0,
     "zPos": 0},
    {"id": "Quad2",
     "time": currentTime,
     "xPos": 0,
     "yPos": 0,
     "zPos": 0}
])
