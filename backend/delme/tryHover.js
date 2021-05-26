import socketIOClient from "socket.io-client";
import * as arDrone from "ar-drone";
import autonomy from "ardrone-autonomy";

var quadrotor = arDrone.createClient()
quadrotor.disableEmergency()

quadrotor.takeoff()
console.log('takeoff')
quadrotor.after(5000, function(){
    console.log('clockwise')
    this.clockwise(0.5)
})