# coding=utf-8

from sqlalchemy import NUMERIC, Boolean, Column, Numeric, String

from marshmallow import Schema, fields
from .entity import Entity, Base


class Drone(Entity, Base):
    __tablename__ = 'drones'

    name = Column(String)
    speed = Column(NUMERIC)
    battery = Column(Numeric)
    ledOn = Column(Boolean)
    real = Column(Boolean)

    def __init__(self, name, speed, battery, ledOn, real, created_by):
        Entity.__init__(self, created_by)
        self.name = name
        self.speed = speed
        self.battery = battery
        self.ledOn = ledOn
        self.real = real


class DroneSchema(Schema):
    id = fields.Number()
    name = fields.Str()
    speed = fields.Number()
    battery = fields.Number()
    ledOn = fields.Boolean()
    real = fields.Boolean()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()
