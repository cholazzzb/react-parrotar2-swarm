import EKF = require("ardrone-autonomy/lib/EKF")

Selamat pagi Pak Yul. Pak kami sudah mencoba performa EKF yang digunakan. Berikut hasil bacaan data pada EKF

(Gambar)

Dari Hasil EKF tersebut, terlihat bahwa nilai posisi akhir yang diprediksi adalah 0.5, 1.0, dan 1.5 (m). Namun, setelah kami melakukan pengukuran dengan alat ukur (meteran).
Hasil pengukuran berbeda sangat jauh. 
Nilai EKF = 0.5 -> nilai ukur dengan instrument x = 1.17, y = 0.8. (m)
Nilai EKF = 1 -> nilai ukur dengan instrument x = 1.87, y = 0.8 (m)
Nilai EKF = 1.5 -> nilai ukur dengan instrument x = 2.32, y = 0.32 (m)

// forward(0.5)
let x = 1.17 //m
let y = 0.80 //m (+ => left)

// forward(1)
let x = 1.87 //m
let y = 5.2 //m 

// fowrad (1.5)
let x = 2.32 // m
let y = 0.32 // m