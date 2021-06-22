import socketio

MARVELMIND = "MARVELMIND"

socketClient = socketio.Client()
socketClient.connect("http://localhost:4000")
socketClient.emit(MARVELMIND, {'hat': 's'})