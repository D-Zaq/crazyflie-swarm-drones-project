import pytest
import sys
import logging


sys.path.append("../src")
from appchannel import *
# from real_drone import *


logging.basicConfig(level=logging.ERROR)

channel = AppChannel()
channel.log = ConnectLog()
channel._cf = Crazyflie(rw_cache='./cache')

logging.basicConfig(level=logging.ERROR)

def test_call_back_functions_should_not_crash():
    channel.connected()
    channel.connectionFailed(0, 'test')
    channel.connectionLost(0, 'test')
    channel.disconnected('test')
    assert 1 == 1

def test_send_message_calls_cf_appchannel_send_packet(mocker):
    global channel
    spy = mocker.spy(channel._cf.appchannel, 'send_packet')
    cmd = 'b'
    channel.sendMessage(cmd)
    spy.assert_called_once_with(struct.pack("<c", cmd.encode('utf-8')))

def test_close_client_calls_cf_close_link_and_sets_connexion_state_to_false(mocker):
    global channel
    spy = mocker.spy(channel._cf, 'close_link')
    channel.closeClient()
    spy.assert_called()
    assert channel.connexionState == False