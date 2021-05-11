import ardrone from "ar-drone";
import autonomy from "ardrone-autonomy";

var client = ardrone.createClient();
var control = new autonomy.Controller(client);
control.on("controlData", (data) => {
  console.log("HUHEHEHE", data);
});

client.takeoff();
client.after(5000, () => {
  control.zero();
  control.forward();
  control.hover(1000);
  client.land()
});
