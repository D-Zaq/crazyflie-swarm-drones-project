import logging
import socket
from threading import Thread
import threading
import time

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
    def startServer():
        logging.info(f"launching ARGoS")
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        # s.setblocking(False)
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        s.bind((ArgosServer.SOCKET_HOST, ArgosServer.SOCKET_PORT))
        s.listen(2)
        ArgosServer.server = None
        ArgosServer.server = s
        threading.Thread(target=ArgosServer.connectServ).start()

    @staticmethod
    def connectServ():
        while ArgosServer.running:
            # if ArgosServer.accepted is False:
            logging.info("connecting to ARGoS")
            ArgosServer.conn, addr = ArgosServer.server.accept()
            logging.info("********* ARGoS connected *********")
            # ArgosServer.accepted = True

            time.sleep(1)

    @staticmethod
    def sendCommand(command):
        logging.info("Sending command to ARGoS")
        ArgosServer.conn.sendall(command.encode())
