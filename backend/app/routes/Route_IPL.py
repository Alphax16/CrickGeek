from flask import Blueprint, request, jsonify
from app.controllers.Controller_IPL import PredictionController
from app.models.Model_Table import CSV2JSON, get_paginated_data
from json import loads
import sys


Route_IPL_bp = Blueprint('IPL_prediction', __name__)
prediction_controller = PredictionController()


@Route_IPL_bp.route("/IPL-Predictor", methods=['POST'])
def predict():
    try:
        # data = request.get_json(force=True)
        data = request.json
        print(data, file=sys.stderr)

        # innings_runs, 'Innings Wickets', 'Balls Remaining', 'Total Batter Runs', 'Total Non Striker Runs', 'Batter Balls Faced', 'Non Striker Balls Faced', 'Runs From Ball'] = data['features']

        # data_dict = loads(data)
        data_dict = data

        team1, team2, city, toss_decision, toss_winner, venue = data_dict.values()

        toss_decision = int(toss_decision)

        prediction = prediction_controller.predict(
            [team1, team2, city, toss_decision, toss_winner, venue])
        res = jsonify(winner_team=prediction)
        print(res)
        return res
    except Exception as ex:
        return jsonify(error=str(ex))


@Route_IPL_bp.route("/IPL-Predictor", methods=['GET'])
def getData():
    try:
        data = CSV2JSON("./app/models/Data/IPL/IPL_Data.csv")
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
