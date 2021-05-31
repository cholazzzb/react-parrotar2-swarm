# 1. Quadrotor Angles' Respond from node-ar-drone module
- Fly the quadrotor, and give a target forward(1) for 2 seconds
- Fly the quadrotor, and give a target left/right(1) for 2 seconds
- Fly the quadrotor, and give a target forward(1) for 2 seconds then forward(0)
- Fly the quadrotor, and give a target left/right(1) for 2 seconds then left/right(0)
- Fly the quadrotor, and give a target forward(0.1) for 2 seconds
- Fly the quadrotor, and give a target left/right(0.1) for 2 seconds
- reply the experiment for 10 times

## Data to analyzed :
- phi, theta, psi -> calculate the mean of that data. Doing a PSO to modelling PID control for Angles
- Simulate Position Controller and Search the optimum parameter with PSO

# 2. See the precision of Kalman Filter
- Doing the same experiment as Number 1

## Data to analyzed :
- position x, y in real world vs EKF

# 3. See the PID Position controller performance
- Fly the quadrotor, and give a target forward 1 m
- Fly the quadrotor, ang give a target left 1m

## Data to analyzed :
- Quadrotor position

# 4. Formation Control
- Fly 2 quadrotor, control the distance between them to 1.5m for this corresponding path:
+ Forward 1m
+ Forward 1m -> ForwardLeft 1m -> ForwardRight 1m

## Data to analyzed :
- Distance between them, final position

## 5. Fly as the map


## 6. Integrate with Camera and Image Processing
