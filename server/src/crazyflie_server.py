import logging
import threading
import time
from threading import Thread
from typing import List, Set
import cflib.crtp
from cflib.crtp.radiodriver import RadioManager
from appchannel import AppChannel
from real_drone import *
from singleton import Singleton
import re
from message import Message


class CrazyflieServer(metaclass=Singleton):
    running = True
    drones: Set[AppChannel] = set()
    FIRST_DRONE_ADDRESS = 0xE7E7E7E731
    SECOND_DRONE_ADDRESS = 0xE7E7E7E732
    ADDRESSES = [FIRST_DRONE_ADDRESS, SECOND_DRONE_ADDRESS]
    MAX_DRONE_NUMBER = 2
    # state = False

    @staticmethod
    def start() -> Thread:
        thread = Thread(target=CrazyflieServer.startServer)
        thread.start()
        return thread

    @staticmethod
    def startServer() -> None:
        cflib.crtp.init_drivers(enable_debug_driver=False)
        # while not CrazyflieServer.isCrazyradioConnected() and \
        #         CrazyflieServer.running:
        #     print(
        #         'CrazyradioPA is not connected. Retrying in 5 seconds.')
        #     time.sleep(5)

        if not CrazyflieServer.running:
            return

        # print(f"Successfully connected to CrazyradioPA")
        threading.Thread(target=CrazyflieServer.findNewDrones).start()

    @staticmethod
    def findNewDrones() -> None:
        while CrazyflieServer.running:
            nDrones = len(CrazyflieServer.drones)
            if nDrones < CrazyflieServer.MAX_DRONE_NUMBER:
                interfaces = CrazyflieServer.scanAvailableInterfaces()
                if len(interfaces) == 0 and \
                        nDrones == 0:
                    logging.info(
                        f'No drones found nearby. Retrying in 5 seconds.')
                for interface in interfaces:
                    CrazyflieServer.connectClient(interface)

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

        for address in CrazyflieServer.ADDRESSES:
            available = [
                *available,
                *cflib.crtp.scan_interfaces(address)
            ]
        logging.info(f'getting drones.................')
        return available

    @staticmethod
    def stopServer() -> None:
        CrazyflieServer.running = False
        for drone in CrazyflieServer.drones:
            drone.closeClient()

    @staticmethod
    def connectClient(interface) -> None:
        drone = AppChannel()
        CrazyflieServer.drones.add(drone)
        drone.connect(interface[0])
        logging.info('Crazyflie connect to client')

    @staticmethod
    def sendCommand(command) -> None:
        print('in Crazyflie server send message')
        commandStr = command.decode("utf-8")
        commandStr = re.sub('[}"{]', '', commandStr)
        droneURI = commandStr.split(',')[0][9:35]
        commandAction = commandStr[-1]
        for drone in CrazyflieServer.drones:
            uriString = str(drone.uri)
            # print('seeeeeeeeeee', uriString, '=========', str(uri))
            print(uriString)
            if uriString == droneURI:
                targetDrone = drone
                print(
                    '======================> Sending message to drone : ', targetDrone.uri)

                targetDrone.sendMessage(commandAction)

    @staticmethod
    def createDrones():
        drone1 = RealDrone(name='radio://0/80/2M/E7E7E7E731', speed='0', battery='0', xPosition=0, yPosition=0, zPosition=0,
                           angle='0', frontDistance='500', backDistance='500', leftDistance='500', rightDistance='500', state='Disconnected')
        drone2 = RealDrone(name='radio://0/80/2M/E7E7E7E732', speed='0', battery='0', xPosition=0, yPosition=0, zPosition=0,
                           angle='0', frontDistance='500', backDistance='500', leftDistance='500', rightDistance='500', state='Disconnected')
        drones = [drone1, drone2]
        for drone in CrazyflieServer.drones:
            tmpDrone = drone.create_drone()
            if drone.uri == "radio://0/80/2M/E7E7E7E731":
                drones[0] = tmpDrone
            elif drone.uri == "radio://0/80/2M/E7E7E7E732":
                drones[1] = tmpDrone
        return drones
