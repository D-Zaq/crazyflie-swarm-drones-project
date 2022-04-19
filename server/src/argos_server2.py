import logging
import socket
import stat
from threading import Thread
import threading
import time
from sim_drone import Drone

from singleton import Singleton

# HOST = '127.0.0.1'  # Standard loopback interface address (localhost)
# PORT = 8080        # Port to listen on (non-privileged ports are > 1023)


class ArgosServer(metaclass=Singleton):
    running = True
    conn: any
    accepted = False
    server: socket = None
    SOCKET_HOST = '127.0.0.1'
    SOCKET_PORT = 8080

    @staticmethod
    def start() -> Thread:
        thread = Thread(target=ArgosServer.startServer)
        thread.start()
        return thread

    @staticmethod
    def startServer() -> None:
        logging.info(f"launching ARGoS")
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.bind((ArgosServer.SOCKET_HOST, ArgosServer.SOCKET_PORT))
        s.listen()
        ArgosServer.server = None
        ArgosServer.server = s
        threading.Thread(target=ArgosServer.connectServ).start()

    @staticmethod
    def connectServ() -> None:
        while ArgosServer.running:
            if ArgosServer.accepted is False:
                logging.info("connecting to ARGoS")
                ArgosServer.conn, addr = ArgosServer.server.accept()
                logging.info("********* ARGoS connected *********")
                ArgosServer.accepted = True

            time.sleep(1)

    @staticmethod
    def sendCommand(command) -> None:
        logging.info("Sending command to ARGoS")
        if(command == "s"):
            flyCommand = "e"
            ArgosServer.conn.sendall(flyCommand.encode())
            time.sleep(1)

        ArgosServer.conn.sendall(command.encode())

    @staticmethod
    def receiveData() -> Drone:
        buffer = ArgosServer.conn.recv(80000)
        string = buffer.decode("utf-8")
        print("Striiiiinggg : =====> ", string)
        data = string.split()
        nDrones = int(data[-13]) + 1
        simDrones = []
        for i in range(nDrones):
            simDrones.insert(0, Drone(
                id=data.pop(-13),
                name=data.pop(-12),
                speed=data.pop(-11),
                battery=data.pop(-10),
                xPosition=float(data.pop(-9)),
                yPosition=float(data.pop(-8)),
                zPosition=float(data.pop(-7)),
                angle=data.pop(-6),
                frontDistance=data.pop(-5),
                backDistance=data.pop(-4),
                leftDistance=data.pop(-3),
                rightDistance=data.pop(-2),
                state=data.pop(-1)
            ))

        return simDrones
