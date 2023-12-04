from flask import Blueprint, request, jsonify
from app.controllers.Controller_ICC_Test_Cricket_Runs_Prediction import PredictionController
from app.models.Model_Table import CSV2JSON, get_paginated_data
from json import loads
import sys


Route_ICC_bp = Blueprint('ICC_Test_Cricket_Runs_prediction', __name__)
prediction_controller = PredictionController()


@Route_ICC_bp.route("/ICC-Test-Cricket-Runs-Predictor", methods=['POST'])
def predict():
    try:
        # data = request.get_json(force=True)
        data = request.json
        print(data, file=sys.stderr)

        # innings_runs, 'Innings Wickets', 'Balls Remaining', 'Total Batter Runs', 'Total Non Striker Runs', 'Batter Balls Faced', 'Non Striker Balls Faced', 'Runs From Ball'] = data['features']

        # data_dict = loads(data)
        data_dict = data

        matches_played, innings, not_out, highest_score, avg, centuries, fifties, ducks, country, years_played, debut_year = map(
            lambda x: round(x) if type(x) in (int, float) else x, data_dict.values())

        prediction = prediction_controller.predict(
            [matches_played, innings, not_out, highest_score, avg, centuries, fifties, ducks, country, years_played, debut_year])

        res = jsonify(predicted_runs=prediction)
        print(res)
        return res
    except Exception as ex:
        return jsonify(error=str(ex))


@Route_ICC_bp.route("/ICC-Test-Cricket-Runs-Predictor", methods=['GET'])
def getData():
    try:
        data = CSV2JSON("./app/models/Data/ICC/ICC_Test_Cricket_Runs_Data.csv")
        print(data[0], file=sys.stderr)
        return data
    except Exception as ex:
        return jsonify(error=str(ex))

# @Route_IPL_bp.route("/IPL-Predictor", methods=['GET'])
# def get_data():
#     try:
#         page = int(request.args.get('page', 1))
#         page_size = int(request.args.get('pageSize', 10))

#         data = get_paginated_data(page, page_size)

#         return jsonify(data=data)
#     except Exception as ex:
#         return jsonify(error=str(ex))
