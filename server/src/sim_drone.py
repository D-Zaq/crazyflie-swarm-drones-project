from typing import TypedDict


class Drone(TypedDict):
    name: str
    speed: str
    battery: str
    xPosition: str
    yPosition: str
    zPosition: str
    angle: str
    frontDistance: str
    backDistance: str
    leftDistance: str
    rightDistance: str
    state: str
