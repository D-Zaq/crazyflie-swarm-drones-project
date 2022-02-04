import threading
import time
from threading import Thread
from typing import List, Set
import cflib.crtp
from cflib.crtp.radiodriver import RadioManager
from appchannel import AppChannel
from singleton import Singleton
from message import Message


class CrazyradioController(metaclass=Singleton):
    running = True
    drones: Set[AppChannel] = set()
    FIRST_DRONE_ADDRESS = 0xE7E7E7E731
    SECOND_DRONE_ADDRESS = 0xE7E7E7E732
    ADDRESSES = [FIRST_DRONE_ADDRESS, SECOND_DRONE_ADDRESS]
    MAX_DRONE_NUMBER = 2

    @staticmethod
    def start() -> Thread:
        thread = Thread(target=CrazyradioController.startServer)
        thread.start()
        return thread

    @staticmethod
    def startServer():
        cflib.crtp.init_drivers(enable_debug_driver=False)
        while not CrazyradioController.isCrazyradioConnected() and \
                CrazyradioController.running:
            print(
                'CrazyradioPA is not connected. Retrying in 5 seconds.')
            time.sleep(5)

        if not CrazyradioController.running:
            return

        print(f"Successfully connected to CrazyradioPA")
        threading.Thread(target=CrazyradioController.findNewDrones).start()

    @staticmethod
    def findNewDrones():
        while CrazyradioController.running:
            nDrones = len(CrazyradioController.drones)
            if nDrones < CrazyradioController.MAX_DRONE_NUMBER:
                interfaces = CrazyradioController.scanAvailableInterfaces()
                if len(interfaces) == 0 and \
                        nDrones == 0:
                    print(
                        f'No drones found nearby. Retrying in 5 seconds.')
                for interface in interfaces:
                    CrazyradioController.connectClient(interface)

            time.sleep(5)

    @staticmethod
    def isCrazyradioConnected() -> bool:
        crazyradioDriver = RadioManager()
        try:
            crazyradioDriver.open(0)
            return True
        except:
            return False

    @staticmethod
    def scanAvailableInterfaces() -> List:
        available = []

        for address in CrazyradioController.ADDRESSES:
            available = [
                *available,
                *cflib.crtp.scan_interfaces(address)
            ]
        print(f'getting drones.................')
        return available

    @staticmethod
    def stopServer():
        CrazyradioController.running = False
        for drone in CrazyradioController.drones:
            drone.closeClient()

    @staticmethod
    def connectClient(interface):
        drone = AppChannel()
        CrazyradioController.drones.add(drone)
        drone.connect(interface[0])
        print('connect')

    @staticmethod
    def sendMessage(uri):

        print('in Crazyflie server send message')
        for drone in CrazyradioController.drones:
            uriString = 'b\'' + str(drone.uri) + '\''
            print('seeeeeeeeeee', uriString, '=========', str(uri))
            if uriString == str(uri):
                targetDrone = drone
                print('heeeeeeeeeeer')

                targetDrone.sendMessage(Message(
                    type="onLed",
                    data={
                        "name": targetDrone.uri
                    }
                ))
