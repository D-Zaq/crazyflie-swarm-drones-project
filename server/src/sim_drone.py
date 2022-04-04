from typing import TypedDict


class Drone(TypedDict):
    id: str
    name: str
    speed: str
    battery: str
    xPosition: float
    yPosition: float
    zPosition: str
    angle: str
    frontDistance: str
    backDistance: str
    leftDistance: str
    rightDistance: str
    state: str
