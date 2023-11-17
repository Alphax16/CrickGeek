from flask import Blueprint, request, jsonify
from app.controllers.Controller_IPL import PredictionController
from app.models.Model_Images import get_image_links_from_Cloudinary
from json import loads
import sys


Route_Umpire_Decision_Clf_bp = Blueprint(
    'Umpire_decision_classification', __name__)
prediction_controller = PredictionController()


@Route_Umpire_Decision_Clf_bp.route("/Umpire-Decision-Classifier", methods=['POST'])
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


@Route_Umpire_Decision_Clf_bp.route("/Umpire-Decision-Classifier", methods=['GET'])
def getData():
    try:
        data = get_image_links_from_Cloudinary(
            "Cricket Umpires Action Classification Images")
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
