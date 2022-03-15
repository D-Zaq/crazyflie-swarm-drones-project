from typing import TypedDict
import logging

from log import Log


class DashboardLogger(logging.Handler):
    def emit(self, record: logging.LogRecord) -> None:
        logEntry = self.format(record)
        print("looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooggggggggggggggssssssssssssssssss", logEntry)


def initializeLogging() -> None:

    fmt = '%(asctime)s : %(levelname)s : %(message)s'

    rootLogger = logging.getLogger()
    rootLogger.setLevel(level=logging.INFO)
    formatter = logging.Formatter(fmt=fmt)
    rootLogger.addHandler(logging.FileHandler('debug.log'))
    rootLogger.addHandler(DashboardLogger())
    for handler in rootLogger.handlers:
        if isinstance(handler, logging.FileHandler):
            handler.setFormatter(formatter)
