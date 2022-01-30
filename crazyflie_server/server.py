import logging
import cflib
from crazyradio_controller import CrazyradioController

logging.basicConfig(level=logging.ERROR)


def exitHandler(sig, frame):
    print('Closing server application')
    CrazyradioController.stopServer()


if __name__ == '__main__':
    cflib.crtp.init_drivers(enable_debug_driver=False)

    crazyradioControllerThread = CrazyradioController().start()
    print('Crazyradio controller launched')

    crazyradioControllerThread.join()
