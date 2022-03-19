# coding=utf-8
from crypt import methods
import os
import requests
import threading
import time
from xml.etree.ElementTree import tostring
from flask_cors import CORS
from scipy import rand
from flask import Flask, jsonify, request
# from flask import Flask
# from entities.entity import Session
# from entities.drone import Drone, DroneSchema
import logging
import cflib
from crazyflie_server import CrazyflieServer
from argos_server2 import ArgosServer
# from logs_handler import initializeLogging
from log import ServerLog
# from real_drone import create_drones
from sim_drone import Drone

# creating the Flask applicationError: While importing 'src.main', an ImportError was raised.

app = Flask(__name__)
CORS(app)

# generate database schema
# Base.metadata.create_all(engine)

# logging.basicConfig(level=logging.ERROR)

logs = []


@app.route('/')
def home():
    return "flask working !"


@app.route('/crazyflie', methods=["POST"])
def handleCrazyfliePost():
    data = request.data
    # data = request.data.decode('utf-8')
    # data = json.loads(StringIO(data))
    # jsonify(data)
    # print("post request >>>>>>>>>", data)
    print(f'"post request >>>>>>>>>" {data}')
    CrazyflieServer.sendCommand(data)
    return jsonify("post hello !")


@app.route('/argos', methods=["POST"])
def handleArgosPost():
    data = request.data.decode('utf-8')
    print(f'"post request >>>>>>>>>" {data}')
    # calls argos server message sending method
    # ArgosServer.connectServer(data)
    # ArgosServer.sendCommand(data)
    ArgosServer.sendCommand(data)
    return jsonify("post hello !")


@app.route('/argosData', methods=["GET"])
def handleArgosDataPolling():
    # b = random.randint(0, 99)
    # string = str(b)
    # print("llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll", string)
    ArgosServer.sendCommand('i')
    buffer = ArgosServer.conn.recv(80000)
    string = buffer.decode("utf-8")
    # print("Striiiiinggg : =====> ", string)
    # print("Striiiiinggg 00000 : =====> ", string[0])
    # string = string[-10:]
    data = string.split()
    simDrone: Drone = Drone(
        name=data[-12],
        speed=data[-11],
        battery=data[-10],
        xPosition=data[-9],
        yPosition=data[-8],
        zPosition=data[-7],
        angle=data[-6],
        frontDistance=data[-5],
        backDistance=data[-4],
        leftDistance=data[-3],
        rightDistance=data[-2],
        state=data[-1]
    )
    # print("Sim Drone : ===>   ", simDrone)

    return jsonify(simDrone)


@app.route('/logs', methods=["GET"])
def handleLogsPolling():
    # print("llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll GGGGGGGGGGEEEEEEEEEEEEEEEETTTTTTTTTTTTTTTTT")
    return jsonify(logs)

@app.route('/crazyflieData', methods=["GET"])
def handleCFLogsPolling():
    drones = CrazyflieServer.createDrone()
    # if CrazyflieServer.state:
    #     drones['state'] = 'Connected'
    # else:
    #     drones['state'] = 'Disconnected'
    print('Drone physique : ====================> ', drones)
    return jsonify(drones)


# @app.route('/drones')
# def get_drones():
#     # fetching from the database
#     session = Session()
#     drone_objects = session.query(Drone).all()

#     # transforming into JSON-serializable objects
#     schema = DroneSchema(many=True)
#     drones = schema.dump(drone_objects)

#     # serializing as JSON
#     session.close()
#     return jsonify(drones)


# @app.route('/drones', methods=['POST'])
# def add_drone():
#     # mount drone object
#     posted_drone = DroneSchema(only=('name', 'speed', 'battery', 'ledOn', 'real'))\
#         .load(request.get_json())

#     drone = Drone(**posted_drone, created_by="HTTP post request")

#     # persist drone
#     session = Session()
#     session.add(drone)
#     session.commit()

#     # return created drone
#     new_drone = DroneSchema().dump(drone)
#     session.close()
#     return jsonify(new_drone), 201

# def start_runner():
#     def start_loop():
#         not_started = True
#         while not_started:
#             print('In start loop')
#             try:
#                 r = requests.get('http://127.0.0.1:5000/')
#                 if r.status_code == 200:
#                     print('Server started, quiting start_loop')
#                     global flaskLaunched
#                     flaskLaunched = True
#                     not_started = False
#                 print(r.status_code)
#             except:
#                 print('Server not yet started')
#             time.sleep(2)

#     print('Started runner')
#     thread = threading.Thread(target=start_loop)
#     thread.start()


class DashboardLogger(logging.Handler):
    def emit(self, record: logging.LogRecord) -> None:
        logEntry = self.format(record)
        # if(flaskLaunched == True):
        #     requests.get('http://127.0.0.1:5000/argosData')
        global logs
        logs.append(ServerLog(
                    log=logEntry,
                    timestamp=int(record.created)
                    ))
        # print("looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooggggggggggggggssssssssssssssssss", logEntry)


if __name__ == '__main__':
    
    try:
        os.remove('position.csv')
        os.remove('battery.csv')
        os.remove('distance.csv')
    except :
        print ('Already deleted')      

    # To test 'Identify': comment lines: argosServer = server() , argosServer.connectServ()
    # To test ARGoS sim: comment lines: CrazyflieServerThread = CrazyflieServer().start() , CrazyflieServerThread.join()
    cflib.crtp.init_drivers(enable_debug_driver=False)
    # Some initializations

    fmt = '%(asctime)s : %(levelname)s : %(message)s'

    rootLogger = logging.getLogger()
    rootLogger.setLevel(level=logging.INFO)
    formatter = logging.Formatter(fmt=fmt)
    rootLogger.addHandler(logging.FileHandler('debug.log'))
    rootLogger.addHandler(DashboardLogger())
    for handler in rootLogger.handlers:
        if isinstance(handler, logging.FileHandler):
            handler.setFormatter(formatter)

    argosServerThread = ArgosServer.start()
    logging.info('Argos server launched')
    argosServerThread.join()

    CrazyflieServerThread = CrazyflieServer().start()

    logging.info('Crazyflie server launched')
    CrazyflieServerThread.join()

    logging.info('app launched')
    # start_runner()
    app.run()


# def exitHandler(sig, frame):
#     print('Closing server application')
#     CrazyflieServer.stopServer()


# def exitHandler(sig, frame):
#     print('Closing server application')
#     CrazyflieServer.stopServer()


# # start session
# session = Session()


# # check for existing data
# drones = session.query(Drone).all()

# if len(drones) == 0:
#     # create and persist mock drone
#     firstDrone = Drone("firstDrone", 10, 100, 0, 0)
#     session.add(firstDrone)
#     session.commit()
#     session.close()

#     # reload drones
#     drones = session.query(Drone).all()

# # show existing drones
# print('### Drones:')
# for drone in drones:
#     print(f'({drone.id}) {drone.name} - {drone.speed} {drone.battery} {drone.ledOn} {drone.real}')
