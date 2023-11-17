from flask import Blueprint, request, jsonify
from app.controllers.Controller_IPL_2008_2017 import IPL_2008_2017
from app.models.Model_Table import CSV2JSON
from json import loads


Route_IPL_2008_2017_bp = Blueprint('IPL_prediction_2008_2017', __name__)
prediction_controller = IPL_2008_2017()


@Route_IPL_2008_2017_bp.route("/IPL-Predictor-2008-2017", methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)

        # innings_runs, 'Innings Wickets', 'Balls Remaining', 'Total Batter Runs', 'Total Non Striker Runs', 'Batter Balls Faced', 'Non Striker Balls Faced', 'Runs From Ball'] = data['features']

        # data_dict = loads(data)
        data_dict = data

        venue, batting_team, bowling_team, striker, bowler = data_dict.values()

        prediction = prediction_controller.predict(
            venue, batting_team, bowling_team, striker, bowler)
        res = jsonify(predicted_score=prediction)
        print(res)
        return res
    except Exception as ex:
        return jsonify(error=str(ex))


@Route_IPL_2008_2017_bp.route("/IPL-Predictor-2008-2017", methods=['GET'])
def getData():
    try:
        data = CSV2JSON("./app/models/Data/IPL/IPL_Innings_Data.csv")
        return data
    except Exception as ex:
        return jsonify(error=str(ex))
