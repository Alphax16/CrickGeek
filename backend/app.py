from flask import Flask, request
from routes.Route_T20I_Mens_Cricket_Match import Route_T20I_Mens_Cricket_Match_prediction_bp
# from configs import initialize_logging
from configs.logging_config import setup_logging, log_request_info


app = Flask(__name__)
# initialize_logging(app)
app = setup_logging(app)
app = log_request_info(app)

app.register_blueprint(Route_T20I_Mens_Cricket_Match_prediction_bp, url_prefix="/api/v1")

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
