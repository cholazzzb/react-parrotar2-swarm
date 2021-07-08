import matplotlib.pyplot as plt
# from tum_PSO import tum_PSO
# from custom_PSO import custom_PSO
from custom_PSO_z import custom_PSO_z
from custom_PSO_z_lama import custom_PSO_z_lama
from fine_tuning import fine_tuning
from fine_tuning_disturbance import fine_tuning_disturbance

time = fine_tuning_disturbance["time"]
xPos = fine_tuning_disturbance["xPos"]
yPos = fine_tuning_disturbance["yPos"]
zPos = fine_tuning_disturbance["zPos"]

# range(170) for POS AND TIME
# for i in range(350):
#     time.pop()
#     xPos.pop()
#     yPos.pop()
#     zPos.pop()
xPosTarget = []
yPosTarget = []
for data in yPos:
    xPosTarget.append(1.95)
    yPosTarget.append(1.27)
# ----- POS AND TIME -----
plt.plot(time, xPos, label="Marvelmind Koordinat X")
plt.plot(time, xPosTarget, label="Setpoint X")
plt.plot(time, yPos, label="Marvelmind Koordinat Y")
plt.plot(time, yPosTarget, label="Setpoint Y")
plt.title("Kontrol Posisi")
plt.xlabel('Waktu (detik)')
plt.ylabel('Koordinat (meter)')
# plt.ylim(0.5, 2.5)
plt.legend(loc="lower right")

# ----- MAP -----
# plt.scatter(xPos, yPos)
# plt.title("Posisi X dan Y")
# plt.xlabel('Koordinat x (meter)')
# plt.ylabel('Koordinat y (meter)')
# plt.ylim(0.85, 2.163)

plt.show()

# Set point: X =1.95, Y = 1.27