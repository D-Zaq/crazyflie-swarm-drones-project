import csv
from typing import TypedDict

# from appchannel import AppChannel
# from crazyflie_server import CrazyflieServer


class RealDrone(TypedDict):
    name: str
    speed: str
    battery: str
    xPosition: float
    yPosition: float
    zPosition: float
    angle: str
    frontDistance: str
    backDistance: str
    leftDistance: str
    rightDistance: str
    state: str


# def create_drones():

#     drone = RealDrone()
#     # drones = []

#     uri1 = 'radio://0/80/2M/E7E7E7E731'
#     uri2 = 'radio://0/80/2M/E7E7E7E732'
#     with open('position.csv', 'r') as positionFile:
#         positionReader = csv.reader(positionFile)
#         positionLines = list(positionReader)
#         positionEndLine = len(positionLines)-1
#         # print('======================= here position end line ==========================')
#         # print(positionEndLine)
#         with open('distance.csv', 'r') as distanceFile:
#             distanceReader = csv.reader(distanceFile)
#             distanceLines = list(distanceReader)
#             distanceEndLine = len(distanceLines)-1
#             # print('======================= here distance end line ==========================')
#             # print(distanceEndLine)
#             with open('battery.csv', 'r') as batteryFile:
#                 batteryReader = csv.reader(batteryFile)
#                 batteryLines = list(batteryReader)
#                 batteryEndLine = len(batteryLines)-1
#                 # print('======================= here battery end line ==========================')
#                 # print(batteryEndLine)
#                 if positionLines[positionEndLine][0] == uri1 and batteryLines[batteryEndLine][0] == uri1 and distanceLines[distanceEndLine][0] == uri1:
#                     drone['name'] = uri1
#                 elif positionLines[positionEndLine][0] == uri2 and batteryLines[batteryEndLine][0] == uri2 and distanceLines[distanceEndLine][0] == uri2:
#                     drone['name'] = uri2
#                     drone['speed'] = 'None'
#                 # if batteryLines[batteryEndLine][0] == uri1:
#                 drone['battery'] = batteryLines[batteryEndLine][2]
#                 drone['xPosition'] = positionLines[positionEndLine][1]
#                 drone['yPosition'] = positionLines[positionEndLine][2]
#                 drone['zPosition'] = positionLines[positionEndLine][3]
#                 drone['angle'] = positionLines[positionEndLine][4]
#                 # if distanceLines[distanceEndLine][0] == uri1:
#                 drone['frontDistance'] = distanceLines[distanceEndLine][1]
#                 drone['backDistance'] = distanceLines[distanceEndLine][2]
#                 drone['leftDistance'] = distanceLines[distanceEndLine][4]
#                 drone['rightDistance'] = distanceLines[distanceEndLine][5]
#                 drone['state'] = 'Connected'
#      # drones.append(drone)
#     return drone


# if __name__ == '__main__':
#     print(create_drones())
