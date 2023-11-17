from flask import request, json
import logging
import logging.handlers
import requests
import sys
import os


LOGS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "logs")
if not os.path.exists(LOGS_DIR):
    os.makedirs(LOGS_DIR)

LOG_JSON_FILE = os.path.join(LOGS_DIR, "app.json")
LOG_CSV_FILE = os.path.join(LOGS_DIR, "app.csv")
LOG_TEXT_FILE = os.path.join(LOGS_DIR, "app.txt")

IP_API_BASE_URL = "http://ip-api.com/json/"

def get_geolocation(ip_address):
    try:
        response = requests.get(IP_API_BASE_URL + ip_address)
        if response.status_code == 200:
            return response.json()
        else:
            return None
    except Exception as e:
        print(f'Error fetching geolocation: {e}')
        return None

class JsonFormatter(logging.Formatter):
    def format(self, record):
        log_data = {
            'timestamp': self.formatTime(record),
            'level': record.levelname,
            'message': record.getMessage()
        }
        return json.dumps(log_data)

class StreamToLogger:
    def __init__(self, logger, log_level=logging.INFO):
        self.logger = logger
        self.log_level = log_level
        self.linebuf = ''

    def write(self, buf):
        for line in buf.rstrip().splitlines():
            self.logger.log(self.log_level, line.rstrip())

def setup_logging(app):
    # JSON Handler
    json_handler = logging.handlers.TimedRotatingFileHandler(LOG_JSON_FILE, when='midnight', backupCount=7)
    json_handler.setLevel(logging.INFO)
    
    json_formatter = JsonFormatter()
    json_handler.setFormatter(json_formatter)
    app.logger.addHandler(json_handler)

    # CSV Handler
    csv_handler = logging.handlers.TimedRotatingFileHandler(LOG_CSV_FILE, when='midnight', backupCount=7)
    csv_handler.setLevel(logging.INFO)
    
    class CsvFormatter(logging.Formatter):
        def format(self, record):
            return super(CsvFormatter, self).format(record).replace(",", ";")
    
    csv_formatter = CsvFormatter('%(asctime)s,%(levelname)s,%(message)s')
    csv_handler.setFormatter(csv_formatter)
    app.logger.addHandler(csv_handler)

    # Plain Text Handler
    text_handler = logging.handlers.TimedRotatingFileHandler(LOG_TEXT_FILE, when='midnight', backupCount=7)
    text_handler.setLevel(logging.INFO)
    text_formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
    text_handler.setFormatter(text_formatter)
    app.logger.addHandler(text_handler)
    
    # stdout_logger = logging.getLogger('stdout_logger')
    # stdout_logger.setLevel(logging.INFO)

    # stderr_logger = logging.getLogger('stderr_logger')
    # stderr_logger.setLevel(logging.ERROR)
    
    # sys.stdout = StreamToLogger(stdout_logger, logging.INFO)
    # sys.stderr = StreamToLogger(stderr_logger, logging.ERROR)

    return app

def log_request_info(app):
    @app.before_request
    def log_request_details():
        ip_address = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
        geolocation = get_geolocation(ip_address)
        
        user_agent = request.headers.get('User-Agent')
        method = request.method
        path = request.path

        app.logger.info('Request from IP %s', ip_address)
        app.logger.info('Geolocation: %s', geolocation if geolocation else 'N/A')
        
        with open(LOG_TEXT_FILE, 'a') as log_file:
            log_file.write(f'Request from IP {ip_address}\n')
            log_file.write(f'Geolocation: {geolocation if geolocation else "N/A"}\n\n')
        
        app.logger.info('Request Method: %s', method)
        app.logger.info('Request Path: %s', path)
        app.logger.info('User Agent: %s', user_agent)
        app.logger.info('Request Headers: %s', dict(request.headers))
        app.logger.info('Request Body: %s', request.get_data(as_text=True))
        
    
    return app
