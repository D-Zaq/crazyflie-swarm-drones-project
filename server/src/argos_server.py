import threading
import time
from threading import Thread
from typing import List, Set
from singleton import Singleton
from message import Message
import socket

# HOST = '127.0.0.1'  # Standard loopback interface address (localhost)
# PORT = 8080        # Port to listen on (non-privileged ports are > 1023)

class ArgosServer(metaclass=Singleton):
    HOST = '127.0.0.1'  # Standard loopback interface address (localhost)
    PORT = 8080
    running = True
    connexion: socket
    serveur: socket
    # drones: Set[AppChannel] = set()
    # FIRST_DRONE_ADDRESS = 0xE7E7E7E731
    # SECOND_DRONE_ADDRESS = 0xE7E7E7E732
    # ADDRESSES = [FIRST_DRONE_ADDRESS, SECOND_DRONE_ADDRESS]
    # MAX_DRONE_NUMBER = 2

    @staticmethod
    def start() -> Thread:
        thread = Thread(target=ArgosServer.startServer)
        thread.start()
        return thread

    @staticmethod
    def startServer():
        
        if not ArgosServer.running:
            print("dsfsdf")
            return


        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.bind((ArgosServer.HOST, ArgosServer.PORT))
        s.listen()
        ArgosServer.serveur = s
        # ArgosServer.connexion = s.accept()
        
        print(f"Successfully connected to CrazyradioPA")
        threading.Thread(target=ArgosServer.connectServer).start()
        #threading.Thread(target=ArgosServer.sendCommand).start()

    @staticmethod
    def connectServer():
        print("NOT CONNEcTED")
        ArgosServer.connexion = ArgosServer.serveur.accept()
        # with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            
        #     s.bind((ArgosServer.HOST, ArgosServer.PORT))
        #     s.listen()
        #     #ArgosServer.sock = s
        #     conn, addr = s.accept()
        #     print("CONNEcTED")
        #    #threading.Thread(target=ArgosServer.acceptConn, args= (s, )).start()
        #     #ArgosServer.connexion = s.accept()
        #     #             
        #     with conn:
        #         print('Connected by', addr)
                
        #         #while True:
                    
        #         conn.sendall(command.encode())

    @staticmethod
    def sendCommand(command):
        print("command " + command)
        # conn = ArgosServer.serveur.accept()
        ArgosServer.connexion.sendall(command.encode())


    @staticmethod
    def stopServer():
        ArgosServer.running = False
        for drone in ArgosServer.drones:
            drone.closeClient()

    @staticmethod
    def connectClient(interface):
        drone = AppChannel()
        ArgosServer.drones.add(drone)
        drone.connect(interface[0])
        print('connect')

    @staticmethod
    def sendMessage(uri):

        print('in Crazyflie server send message')
        for drone in ArgosServer.drones:
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