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
        data = request.json
        print(data, file=sys.stdout)

        data_dict = data
        team1, team2, city, toss_decision, toss_winner, venue = data_dict.values()

        prediction = prediction_controller.predict({
            'team1': [team1],
            'team2': [team2],
            'city': [city],
            'toss_decision': [toss_decision],
            'toss_winner': [toss_winner],
            'venue': [venue]
        })

        print('prediction:', prediction, file=sys.stdout)

        prediction_val = round(prediction[0])

        if prediction_val > 0:
            results = {'winner_team': team1, 'runs': abs(prediction_val)}
        elif prediction_val < 0:
            results = {'winner_team': team2, 'runs': abs(prediction_val)}
        else:
            results = {'winner_team': 'Tie', 'runs': abs(prediction_val)}

        # res = jsonify(winner_team=prediction)
        return results
    except Exception as ex:
        return jsonify(error=str(ex))


@Route_IPL_bp.route("/IPL-Predictor", methods=['GET'])
def getData():
    try:
        data = CSV2JSON("./app/models/Data/IPL2/IPL_Data.csv")
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
