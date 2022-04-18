# import os
# import pytest
# import sys
# import logging
# from io import StringIO
# import csv


# sys.path.append("../src")
# from appchannel import *
# from real_drone import *


# logging.basicConfig(level=logging.ERROR)

# channel = AppChannel()
# channel.log = ConnectLog()
# channel._cf = Crazyflie(rw_cache='./cache')

# logging.basicConfig(level=logging.ERROR)

# def test_call_back_functions_should_not_crash():
#     channel.connected()
#     channel.connectionFailed(0, 'test')
#     channel.connectionLost(0, 'test')
#     channel.disconnected('test')
#     assert 1 == 1

# def test_send_message_calls_cf_appchannel_send_packet(mocker):
#     global channel
#     spy = mocker.spy(channel._cf.appchannel, 'send_packet')
#     cmd = 'b'
#     channel.sendMessage(cmd)
#     spy.assert_called_once_with(struct.pack("<c", cmd.encode('utf-8')))

# def test_close_client_calls_cf_close_link_and_sets_connexion_state_to_false(mocker):
#     global channel
#     spy = mocker.spy(channel._cf, 'close_link')
#     channel.closeClient()
#     spy.assert_called()
#     assert channel.connexionState == False

# def test_create_drones_returns_expected_object_and_state_to_Connected():
#     global channel
#     channel.uri = 'radio://0/80/2M/E7E7E7E731'
#     channel.connexionState = True

#     ExpectedDrone = RealDrone(name='radio://0/80/2M/E7E7E7E731', speed='None', battery= '50.0', xPosition= '-0.0002851971366908401', yPosition= '-0.23085884749889374', zPosition= '0.008457029238343239', angle= '-0.2579251825809479', frontDistance= '191.0', backDistance= '205.0', leftDistance= '164.0', rightDistance= '170.0', state='Connected')
#     try:
#         os.remove('positionE7E7E7E731.csv')
#         os.remove('batteryE7E7E7E731.csv')
#         os.remove('distanceE7E7E7E731.csv')
#     except :
#         print ('Already deleted')   

#     posfile = 'positionE7E7E7E731' + '.csv'
#     with open (posfile, 'a') as csvfile :
#         writer = csv.writer(csvfile , delimiter =',')
#         writer.writerow(['radio://0/80/2M/E7E7E7E731',-0.0002851971366908401,-0.23085884749889374,0.008457029238343239,-0.2579251825809479])
#         csvfile.close ()
    
#     distfile = 'distanceE7E7E7E731' + '.csv'
#     with open (distfile, 'a') as csvfile :
#         writer = csv.writer(csvfile , delimiter =',')
#         writer.writerow(['radio://0/80/2M/E7E7E7E731',191.0,205.0,2084.0,164.0,170.0,7.0])
#         csvfile.close ()

#     battfile = 'batteryE7E7E7E731' + '.csv'
#     with open (battfile, 'a') as csvfile :
#         writer = csv.writer(csvfile , delimiter =',')
#         writer.writerow(['radio://0/80/2M/E7E7E7E731',0.0,50.0])
#         csvfile.close ()

#     ResultDrone = channel.create_drones()

#     os.remove('positionE7E7E7E731.csv')
#     os.remove('batteryE7E7E7E731.csv')
#     os.remove('distanceE7E7E7E731.csv')

#     assert ResultDrone == ExpectedDrone

# def test_create_drones_returns_expected_object_and_state_to_Disconnected():
#     global channel
#     channel.uri = 'radio://0/80/2M/E7E7E7E731'
#     channel.connexionState = False

#     ExpectedDrone = RealDrone(name='radio://0/80/2M/E7E7E7E731', speed='None', battery= '50.0', xPosition= '-0.0002851971366908401', yPosition= '-0.23085884749889374', zPosition= '0.008457029238343239', angle= '-0.2579251825809479', frontDistance= '191.0', backDistance= '205.0', leftDistance= '164.0', rightDistance= '170.0', state='Disconnected')
#     try:
#         os.remove('positionE7E7E7E731.csv')
#         os.remove('batteryE7E7E7E731.csv')
#         os.remove('distanceE7E7E7E731.csv')
#     except :
#         print ('Already deleted')   

#     posfile = 'positionE7E7E7E731' + '.csv'
#     with open (posfile, 'a') as csvfile :
#         writer = csv.writer(csvfile , delimiter =',')
#         writer.writerow(['radio://0/80/2M/E7E7E7E731',-0.0002851971366908401,-0.23085884749889374,0.008457029238343239,-0.2579251825809479])
#         csvfile.close ()
    
#     distfile = 'distanceE7E7E7E731' + '.csv'
#     with open (distfile, 'a') as csvfile :
#         writer = csv.writer(csvfile , delimiter =',')
#         writer.writerow(['radio://0/80/2M/E7E7E7E731',191.0,205.0,2084.0,164.0,170.0,7.0])
#         csvfile.close ()

#     battfile = 'batteryE7E7E7E731' + '.csv'
#     with open (battfile, 'a') as csvfile :
#         writer = csv.writer(csvfile , delimiter =',')
#         writer.writerow(['radio://0/80/2M/E7E7E7E731',0.0,50.0])
#         csvfile.close ()

#     ResultDrone = channel.create_drones()

#     os.remove('positionE7E7E7E731.csv')
#     os.remove('batteryE7E7E7E731.csv')
#     os.remove('distanceE7E7E7E731.csv')

#     assert ResultDrone == ExpectedDrone


# def test_create_drones_returns_expected_object_and_state_to_In_Mission():
#     global channel
#     channel.uri = 'radio://0/80/2M/E7E7E7E731'
#     channel.connexionState = True
#     channel.state = 'In Mission'

#     ExpectedDrone = RealDrone(name='radio://0/80/2M/E7E7E7E731', speed='None', battery= '50.0', xPosition= '-0.0002851971366908401', yPosition= '-0.23085884749889374', zPosition= '0.008457029238343239', angle= '-0.2579251825809479', frontDistance= '191.0', backDistance= '205.0', leftDistance= '164.0', rightDistance= '170.0', state='In Mission')
#     try:
#         os.remove('positionE7E7E7E731.csv')
#         os.remove('batteryE7E7E7E731.csv')
#         os.remove('distanceE7E7E7E731.csv')
#     except :
#         print ('Already deleted')   

#     posfile = 'positionE7E7E7E731' + '.csv'
#     with open (posfile, 'a') as csvfile :
#         writer = csv.writer(csvfile , delimiter =',')
#         writer.writerow(['radio://0/80/2M/E7E7E7E731',-0.0002851971366908401,-0.23085884749889374,0.008457029238343239,-0.2579251825809479])
#         csvfile.close ()
    
#     distfile = 'distanceE7E7E7E731' + '.csv'
#     with open (distfile, 'a') as csvfile :
#         writer = csv.writer(csvfile , delimiter =',')
#         writer.writerow(['radio://0/80/2M/E7E7E7E731',191.0,205.0,2084.0,164.0,170.0,7.0])
#         csvfile.close ()

#     battfile = 'batteryE7E7E7E731' + '.csv'
#     with open (battfile, 'a') as csvfile :
#         writer = csv.writer(csvfile , delimiter =',')
#         writer.writerow(['radio://0/80/2M/E7E7E7E731',0.0,50.0])
#         csvfile.close ()

#     ResultDrone = channel.create_drones()

#     os.remove('positionE7E7E7E731.csv')
#     os.remove('batteryE7E7E7E731.csv')
#     os.remove('distanceE7E7E7E731.csv')

#     assert ResultDrone == ExpectedDrone
    