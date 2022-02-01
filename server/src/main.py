# coding=utf-8
from flask_cors import CORS
from flask import Flask, jsonify, request
from .entities.entity import Session, engine, Base
from .entities.drone import Drone, DroneSchema

# creating the Flask application
app = Flask(__name__)
CORS(app)

# generate database schema
Base.metadata.create_all(engine)


@app.route('/drones')
def get_drones():
    # fetching from the database
    session = Session()
    drone_objects = session.query(Drone).all()

    # transforming into JSON-serializable objects
    schema = DroneSchema(many=True)
    drones = schema.dump(drone_objects)

    # serializing as JSON
    session.close()
    return jsonify(drones)


@app.route('/drones', methods=['POST'])
def add_drone():
    # mount drone object
    posted_drone = DroneSchema(only=('name', 'speed', 'battery', 'ledOn', 'real'))\
        .load(request.get_json())

    drone = Drone(**posted_drone, created_by="HTTP post request")
    
    # persist drone
    session = Session()
    session.add(drone)
    session.commit()

    # return created drone
    new_drone = DroneSchema().dump(drone)
    session.close()
    return jsonify(new_drone), 201


if __name__ == '__main__':
    app.run()
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