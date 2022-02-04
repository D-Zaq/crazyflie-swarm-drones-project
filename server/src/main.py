# coding=utf-8
from crypt import methods
from flask_cors import CORS
from flask import Flask, jsonify, request
# from flask import Flask
# from entities.entity import Session
# from entities.drone import Drone, DroneSchema
import logging
import cflib
from crazyradio_server import CrazyradioController
#from argos_server import ArgosServer
from argos_server2 import server

# creating the Flask applicationError: While importing 'src.main', an ImportError was raised.

app = Flask(__name__)
CORS(app)

# generate database schema
# Base.metadata.create_all(engine)

logging.basicConfig(level=logging.ERROR)


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
    CrazyradioController.sendMessage(data)
    return jsonify("post hello !")


@app.route('/argos', methods=["POST"])
def handleArgosPost():
    data = request.data.decode('utf-8')
    print(f'"post request >>>>>>>>>" {data}')
    # calls argos server message sending method
    #ArgosServer.connectServer(data)
    #ArgosServer.sendCommand(data)
    server.sendCommand(data)
    return jsonify("post hello !")


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


if __name__ == '__main__':
    #cflib.crtp.init_drivers(enable_debug_driver=False)

    #crazyradioControllerThread = CrazyradioController().start()
    
    #print('Crazyradio controller launched')

    #crazyradioControllerThread.join()

    #ArgosServer2().start()
    argosServer = server()
    argosServer.connectServ()
    #argosControllerThread = ArgosServer().start()
    #argosControllerThread.join()
    #print('app launched')
    app.run()


# def exitHandler(sig, frame):
#     print('Closing server application')
#     CrazyradioController.stopServer()


# def exitHandler(sig, frame):
#     print('Closing server application')
#     CrazyradioController.stopServer()


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
