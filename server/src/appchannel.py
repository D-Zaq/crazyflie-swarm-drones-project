
import csv
import logging
import struct
from threading import Thread
import time

from typing import Union
from cflib.crazyflie import Crazyflie
from message import Message
from connect_log_param import ConnectLog
from real_drone import RealDrone

logging.basicConfig(level=logging.ERROR)

class AppChannel:

    def __init__(self) -> None:
        self.uri = ''
        self._cf: Union[Crazyflie, None] = None
        self.log: Union[ConnectLog, None] = None
        self.connexionState: bool = False

    def connect(self, droneUri: str) -> None:
        """Assign the client to the connection. Add callbacks for the
        different events.

          @param droneUri: the drone's identifier.
        """
        self.uri = droneUri
        self._cf = Crazyflie(rw_cache='./cache')
        self.log = ConnectLog()

        thread = Thread(target=self.connected)

        self._cf.connected.add_callback(self.connected)

        self._cf.disconnected.add_callback(self.disconnected)

        self._cf.connection_failed.add_callback(self.connectionFailed)

        self._cf.connection_lost.add_callback(self.connectionLost)

        self._cf.appchannel.packet_received.add_callback(
            self._app_packet_received)

        self._cf.open_link(droneUri)

        thread.start()

    def _app_packet_received(self, data):
        (ledIsOn, ) = struct.unpack("<B", data)
        print(f"Received ledIsOn state: {bool(ledIsOn)}")

    def connected(self) -> None:
        """ This callback is called form the Crazyflie API when a Crazyflie
        has been connected and the TOCs have been downloaded."""
        self.connexionState = True
        print(
            f'New Crazyradio client connected on uri {self.uri}')
        time.sleep(2)
        self.log.start_printing(self._cf, self.uri)


    def disconnected(self, droneUri) -> None:
        """Callback when the Crazyflie is disconnected (called in all cases)"""
        self.connexionState = False
        print(f'Crazyradio client disconnected from uri {self.uri}')

    def connectionFailed(self, droneUri, msg):
        """Callback when connection initial connection fails (i.e no Crazyflie
        at the specified address)"""

        print('Connection to %s failed: %s' % (self.uri, msg))

    def connectionLost(self, droneUri, msg):
        """Callback when disconnected after a connection has been made (i.e
        Crazyflie moves out of range)"""

        print('Connection to %s lost: %s' % (self.uri, msg))

    def sendMessage(self, command: str) -> None:
        print('in AppChannel send message')
        print(command)
        print(struct.pack("<c", command.encode('utf-8')))
        self._cf.appchannel.send_packet(struct.pack("<c", command.encode('utf-8')))

    def closeClient(self) -> None:
        self._cf.close_link()
        self.connexionState = False
        
    def create_drones(self): 
        drone = RealDrone()
        # drones = []
        # uri1 = 'radio://0/80/2M/E7E7E7E731'
        # uri2 = 'radio://0/80/2M/E7E7E7E732'
        with open('position.csv', 'r') as positionFile:
            positionReader = csv.reader(positionFile)
            positionLines = list(positionReader)
            positionEndLine = len(positionLines)-1
            # print('======================= here position end line ==========================')
            # print(positionEndLine)
            with open('distance.csv', 'r') as distanceFile:
                distanceReader = csv.reader(distanceFile)
                distanceLines = list(distanceReader)
                distanceEndLine = len(distanceLines)-1
                # print('======================= here distance end line ==========================')
                # print(distanceEndLine)
                with open('battery.csv', 'r') as batteryFile:
                    batteryReader = csv.reader(batteryFile)                
                    batteryLines = list(batteryReader)                
                    batteryEndLine = len(batteryLines)-1
                    # print('======================= here battery end line ==========================')
                    # print(batteryEndLine)
                    if positionLines[positionEndLine][0] == self.uri and batteryLines[batteryEndLine][0] == self.uri and distanceLines[distanceEndLine][0] == self.uri:
                        drone['name'] = self.uri
                        # elif positionLines[positionEndLine][0] == uri2 and batteryLines[batteryEndLine][0] == uri2 and distanceLines[distanceEndLine][0] == uri2:
                        #     drone['name'] = uri2
                        drone['speed'] = 'None'
                        # if batteryLines[batteryEndLine][0] == uri1:
                        drone['battery'] = batteryLines[batteryEndLine][2]
                        drone['xPosition'] = positionLines[positionEndLine][1]
                        drone['yPosition'] = positionLines[positionEndLine][2]
                        drone['zPosition'] = positionLines[positionEndLine][3]
                        drone['angle'] = positionLines[positionEndLine][4]
                        # if distanceLines[distanceEndLine][0] == uri1:
                        drone['frontDistance'] = distanceLines[distanceEndLine][1]
                        drone['backDistance'] = distanceLines[distanceEndLine][2]
                        drone['leftDistance'] = distanceLines[distanceEndLine][4]
                        drone['rightDistance'] = distanceLines[distanceEndLine][5]
                        if self.connexionState:
                            drone['state'] = 'Connected'
                        else:
                            drone['state'] = 'Disconnected'


        # drones.append(drone)
        return drone
