from typing import TypedDict, Literal
from enum import Enum

#TODO Change this to cover every type of message from interface
MessageType = Literal[
    'onLed',
    'offLed',
]


class Message(TypedDict):
    type: MessageType
    data: dict

class Command(Enum):
    Identify = "i",
    StartMission = "s",
    Land = "c"
class CommandStruct:
    droneURI: str
    command: Command
    def __init__(self, droneURI: str, command: Command):
        self.droneURI = droneURI
        self.command = command

    def __bytes__(self):
        return 'b\'' + self.droneURI + '\'' + str(self.command.value)