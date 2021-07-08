import time
import socketio

MARVELMIND = "MARVELMIND"

socketClient = socketio.Client()
socketClient.connect("http://localhost:4000")

newXPos = 0
startTime = time.time()
while True:
    newXPos = round(newXPos + 0.1, 1)
    currentTime = round(float(time.time() - startTime), 1)
    socketClient.emit(MARVELMIND, [
        {"id": "Quad1",
        "time": currentTime,
        "xPos": newXPos,
        "yPos": -0.75,
        "zPos": 1},
        {"id": "Quad2",
        "time": currentTime,
        "xPos": newXPos,
        "yPos": 0.75,
        "zPos": 1}
    ])
    time.sleep(3)