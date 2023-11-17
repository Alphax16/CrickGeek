from flask import Flask, request
from flask_cors import CORS
from app.routes.Route_T20I_Mens_Cricket_Match import Route_T20I_Mens_Cricket_Match_prediction_bp
from app.routes.Route_IPL import Route_IPL_bp
from app.routes.Route_IPL_2008_2017 import Route_IPL_2008_2017_bp
from app.routes.Route_ODI import Route_ODI_bp
from app.routes.Route_Umpire_Decision_Classification import Route_Umpire_Decision_Clf_bp
# from configs import initialize_logging
from app.configs.logging_config import setup_logging, log_request_info


app = Flask(__name__)
CORS(app)

# initialize_logging(app)

'''
app = setup_logging(app)
app = log_request_info(app)
'''

# AI Services-
prefix = "/api/v1"

# Numerical Data AI Models Routes' Blueprints-
app.register_blueprint(
    Route_T20I_Mens_Cricket_Match_prediction_bp, url_prefix=prefix)
app.register_blueprint(
    Route_IPL_bp, url_prefix=prefix)
# app.register_blueprint(
    # Route_IPL_2008_2017_bp, url_prefix=prefix)
app.register_blueprint(
    Route_ODI_bp, url_prefix=prefix)


# Graphical Multimedia(Image) Data AI Models Routes' Blueprints-
app.register_blueprint(
    Route_Umpire_Decision_Clf_bp, url_prefix=prefix)


# @app.before_request
# def before_request():
#     app.logger.info('Request Headers: %s', request.headers)
#     app.logger.info('Request Body: %s', request.get_data(as_text=True))

# @app.after_request
# def after_request(response):
#     app.logger.info('Response Status Code: %s', response.status_code)
#     app.logger.info('Response Headers: %s', response.headers)
#     app.logger.info('Response Body: %s', response.get_data(as_text=True))
#     return response

@app.route("/")
def index():
    return 'Hello, World!'

def main():
    # with app.app_context():
    #     setup_logging(app)
    # app.run(debug=True)
    # app = setup_logging(app)
    # app = log_request_info(app)
    app.run(debug=True)

if __name__ == '__main__':
    main()
