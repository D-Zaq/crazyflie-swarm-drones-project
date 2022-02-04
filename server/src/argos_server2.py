import socket

HOST = '127.0.0.1'  # Standard loopback interface address (localhost)
PORT = 8080        # Port to listen on (non-privileged ports are > 1023)


class server():

    conn: any

    def connectServ(self):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.bind((HOST, PORT))
            s.listen()
            server.conn, addr = s.accept()

    def sendCommand(command):
        server.conn.sendall(command.encode())

    