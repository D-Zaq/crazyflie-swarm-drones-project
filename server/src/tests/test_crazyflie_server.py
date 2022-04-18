import os
import pytest
import sys
import threading
import time
from tl.testing.thread import ThreadJoiner




sys.path.append("../src")
from crazyflie_server import *
from real_drone import *

crazyflieServer = CrazyflieServer()

def test_start(mocker):
    spy = mocker.spy(crazyflieServer, 'start')
    spy.assert_called()
    # assert 1 == 1