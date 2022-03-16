
import struct
from threading import Thread

from typing import Union
from cflib.crazyflie import Crazyflie
from message import Message
from message import CommandStruct


class AppChannel:

    def __init__(self) -> None:
        self.uri = ''
        self._cf: Union[Crazyflie, None] = None

    def connect(self, droneUri: str) -> None:
        """Assign the client to the connection. Add callbacks for the
        different events.

          @param droneUri: the drone's identifier.
        """
        self.uri = droneUri
        self._cf = Crazyflie()

        thread = Thread(target=self.connected)

        self._cf.connected.add_callback(self.connected)

        self._cf.disconnected.add_callback(self.disconnected)

        self._cf.connection_failed.add_callback(self.connectionFailed)

        self._cf.connection_lost.add_callback(self.connectionLost)

        # TODO What to do when we receive a packet
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

        print(
            f'New Crazyradio client connected on uri {self.uri}')

    def disconnected(self, droneUri) -> None:
        """Callback when the Crazyflie is disconnected (called in all cases)"""

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
        #TODO Send all kinds of messages to the drones
        print('in AppChannel send message')
        print(command)
        print(struct.pack("<c", command.encode('utf-8')))
        # command = 'onLed'
        self._cf.appchannel.send_packet(struct.pack("<c", command.encode('utf-8')))

    def closeClient(self) -> None:
        self._cf.close_link()
