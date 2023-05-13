# INF3995 firmware main app for Crazyflie 2.x

This application demonstrates how to use the appchannel API to send and receive
radio packets between a Crazyflie app and the python lib.

This demo defines a protocol where the Crazyflie waits for boolean value and flashes all LEDs.

To run this example, compile and flash the app with ```make && make cload```.
