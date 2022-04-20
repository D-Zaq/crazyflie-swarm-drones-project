# coding=utf-8
from crypt import methods
import os
#from xml.etree.ElementTree import tostring
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

logs = []


@app.route('/')
def home():
    return "flask working !"


@app.route('/crazyflie', methods=["POST"])
def handleCrazyfliePost():
    data = request.data
    print(f'"post request >>>>>>>>>" {data}')
    CrazyflieServer.sendCommand(data)
    return jsonify("post hello !")


@app.route('/argos', methods=["POST"])
def handleArgosPost():
    data = request.data.decode('utf-8')
    print(f'"post request >>>>>>>>>" {data}')
    ArgosServer.sendCommand(data)
    return jsonify("post hello !")


@app.route('/argosData', methods=["GET"])
def handleArgosDataPolling():
    ArgosServer.sendCommand('i')
    simDrones = []
    simDrones = ArgosServer.receiveData()

    return jsonify(simDrones)


@app.route('/simMapData', methods=["GET"])
def handleSimMapDataPolling():
    ArgosServer.sendCommand('i')
    simDrones = []
    simDrones = ArgosServer.receiveData()

    return jsonify(simDrones)


@app.route('/logs', methods=["GET"])
def handleLogsPolling():
    return jsonify(logs)


@app.route('/crazyflieData', methods=["GET"])
def handleCFLogsPolling():
    drones = CrazyflieServer.createDrones()
    return jsonify(drones)


@app.route('/realMapData', methods=["GET"])
def handleRealMapDataPolling():
    drones = CrazyflieServer.createDrones()
    return jsonify(drones)


class DashboardLogger(logging.Handler):
    def emit(self, record: logging.LogRecord) -> None:
        logEntry = self.format(record)
        global logs
        logs.append(ServerLog(
                    log=logEntry,
                    timestamp=int(record.created)
                    ))


if __name__ == '__main__':

    try:
        os.remove('positionE7E7E7E731.csv')
        os.remove('batteryE7E7E7E731.csv')
        os.remove('distanceE7E7E7E731.csv')
    except :
        print ('Already deleted') 

    try:
        os.remove('positionE7E7E7E732.csv')
        os.remove('batteryE7E7E7E732.csv')
        os.remove('distanceE7E7E7E732.csv')
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

