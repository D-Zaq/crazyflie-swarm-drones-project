from typing import TypedDict, Literal

MessageType = Literal[
    'onLed',
    'offLed',
]


class Message(TypedDict):
    type: MessageType
    data: dict
