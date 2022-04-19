
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

# logging.basicConfig(level=logging.ERROR)


class AppChannel:

    def __init__(self) -> None:
        self.uri = ''
        self._cf: Union[Crazyflie, None] = None
        self.log: Union[ConnectLog, None] = None
        self.connexionState: bool = False
        self.state: str = "Disconnected"

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

    # def _app_packet_received(self, data):
    #     (ledIsOn, ) = struct.unpack("<B", data)
    #     print(f"Received ledIsOn state: {bool(ledIsOn)}")

    def _app_packet_received(self, data):
        (state,) = struct.unpack("<i", data)
        print(f"Received drone data: {int(state)}")  
        if(state == 0):
            self.state = 'On the ground'
        elif(state == 1):
            self.state = 'in mission'
        elif(state == 2):
            self.state = 'landed'
        elif(state == 3):
            self.state = 'crashed'
        elif(state == 4):
            self.state = 'returning to base'
        elif(state == 5):
            self.state = 'Error'

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
        self._cf.appchannel.send_packet(
            struct.pack("<c", command.encode('utf-8')))

    def closeClient(self) -> None:
        self._cf.close_link()
        self.connexionState = False

    def create_drone(self) -> RealDrone: 
        drone = RealDrone()

        addr = self.uri.split('/')
        posFile = 'position' + addr[5] + '.csv'
        distFile = 'distance' + addr[5] + '.csv'
        battFile = 'battery' + addr[5] + '.csv'
        with open(posFile, 'r') as positionFile:
            positionReader = csv.reader(positionFile)
            positionLines = list(positionReader)
            positionEndLine = len(positionLines)-1
            # print('======================= here position end line ==========================')
            with open(distFile, 'r') as distanceFile:
                distanceReader = csv.reader(distanceFile)
                distanceLines = list(distanceReader)
                distanceEndLine = len(distanceLines)-1
                # print('======================= here distance end line ==========================')
                with open(battFile, 'r') as batteryFile:
                    batteryReader = csv.reader(batteryFile)                
                    batteryLines = list(batteryReader)                
                    batteryEndLine = len(batteryLines)-1
                    # print('======================= here battery end line ==========================')
                    drone['name'] = self.uri
                    drone['speed'] = 'None'
                    drone['battery'] = batteryLines[batteryEndLine][2]
                    drone['xPosition'] = float(positionLines[positionEndLine][1])
                    drone['yPosition'] = float(positionLines[positionEndLine][2])
                    drone['zPosition'] = float(positionLines[positionEndLine][3])
                    drone['angle'] = positionLines[positionEndLine][4]
                    drone['frontDistance'] = distanceLines[distanceEndLine][1]
                    drone['backDistance'] = distanceLines[distanceEndLine][2]
                    drone['leftDistance'] = distanceLines[distanceEndLine][4]
                    drone['rightDistance'] = distanceLines[distanceEndLine][5]
                    if self.connexionState:
                        drone['state'] = 'Connected'
                    else:
                        drone['state'] = 'Disconnected'
                    if self.state != 'Disconnected':
                        drone['state'] = self.state

        return drone
