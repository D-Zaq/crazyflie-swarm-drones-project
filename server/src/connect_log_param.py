import csv
from cflib.crazyflie.log import LogConfig


class ConnectLog:

    def __init__(self) -> None:
        self.uri = ''
        self.position_estimate = [0, 0, 0]
        self.battery_state = None
        self.battery_level = None
        self.distance = [0, 0, 0, 0, 0, 0]
        self.angle = None

    def log_dist_callback(self, timestamp, data, logconf) -> None:

        self.distance[0] = data['range.front']
        self.distance[1] = data['range.back']
        self.distance[2] = data['range.up']
        self.distance[3] = data['range.left']
        self.distance[4] = data['range.right']
        self.distance[5] = data['range.zrange']
        # print('[%d][%s][%s]: %s' % (timestamp, self.uri, logconf.name, data))
        addr = self.uri.split('/')
        file = 'distance' + addr[5] + '.csv'
        with open(file, 'a') as csvfile:
            writer = csv.writer(csvfile, delimiter=',')
            writer.writerow([self.uri, self.distance[0], self.distance[1],
                            self.distance[2], self.distance[3], self.distance[4], self.distance[5]])
            csvfile.close()

    def start_dist_printing(self, cf) -> None:
        logconf = LogConfig(name='Distance', period_in_ms=50)
        logconf.add_variable('range.front', 'float')
        logconf.add_variable('range.back', 'float')
        logconf.add_variable('range.up', 'float')
        logconf.add_variable('range.left', 'float')
        logconf.add_variable('range.right', 'float')
        logconf.add_variable('range.zrange', 'float')
        cf.log.add_config(logconf)
        if logconf.valid:
            logconf.data_received_cb.add_callback(self.log_dist_callback)
            logconf.error_cb.add_callback(self.logging_error)
            logconf.start()
        else:
            print('One or more of the variables in the configuration was not found in log TOC. No logging will be possible.')

    def log_pos_callback(self, timestamp, data, logconf) -> None:

        self.position_estimate[0] = data['kalman.stateX']
        self.position_estimate[1] = data['kalman.stateY']
        self.position_estimate[2] = data['kalman.stateZ']
        self.angle = data['stabilizer.yaw']
        # print('[%d][%s][%s]: %s' % (timestamp, self.uri, logconf.name, data))
        addr = self.uri.split('/')
        file = 'position' + addr[5] + '.csv'
        with open(file, 'a') as csvfile:
            writer = csv.writer(csvfile, delimiter=',')
            writer.writerow([self.uri, self.position_estimate[0],
                            self.position_estimate[1], self.position_estimate[2], self.angle])
            csvfile.close()

    def start_position_printing(self, cf) -> None:
        logconf = LogConfig(name='Position', period_in_ms=50)
        logconf.add_variable('kalman.stateX', 'float')
        logconf.add_variable('kalman.stateY', 'float')
        logconf.add_variable('kalman.stateZ', 'float')
        logconf.add_variable('stabilizer.yaw', 'float')
        cf.log.add_config(logconf)
        if logconf.valid:
            logconf.data_received_cb.add_callback(self.log_pos_callback)
            logconf.error_cb.add_callback(self.logging_error)
            logconf.start()
        else:
            print('One or more of the variables in the configuration was not found in log TOC. No logging will be possible.')

    def log_battery_callback(self, timestamp, data, logconf) -> None:
        self.battery_state = data['pm.state']
        self.battery_level = data['pm.batteryLevel']
        addr = self.uri.split('/')
        file = 'battery' + addr[5] + '.csv'
        with open(file, 'a') as csvfile:
            writer = csv.writer(csvfile, delimiter=',')
            writer.writerow([self.uri, self.battery_state, self.battery_level])
            csvfile.close()

    def start_battery_printing(self, cf) -> None:
        logconf = LogConfig(name='Battery', period_in_ms=500)
        logconf.add_variable('pm.state', 'float')
        logconf.add_variable('pm.batteryLevel', 'float')
        cf.log.add_config(logconf)
        if logconf.valid:
            logconf.data_received_cb.add_callback(self.log_battery_callback)
            logconf.error_cb.add_callback(self.logging_error)
            logconf.start()
        else:
            print('One or more of the variables in the configuration was not found in log TOC. No logging will be possible.')

    def logging_error(logconf, msg):
        print('Error when logging %s' % logconf.name)

    def start_printing(self, cf, cfUri):
        self.uri = cfUri
        self.start_position_printing(cf)
        self.start_dist_printing(cf)
        self.start_battery_printing(cf)
