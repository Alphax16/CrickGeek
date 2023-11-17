from flask import Blueprint, request, jsonify
from controllers.Controller_T20I_Mens_Cricket_Match import PredictionController
from json import loads


Route_T20I_Mens_Cricket_Match_prediction_bp = Blueprint('prediction', __name__)
prediction_controller = PredictionController()

@Route_T20I_Mens_Cricket_Match_prediction_bp.route("/T20-Mens-Cricket-Match-Predictor", methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        
        # innings_runs, 'Innings Wickets', 'Balls Remaining', 'Total Batter Runs','Total Non Striker Runs','Batter Balls Faced','Non Striker Balls Faced', 'Runs From Ball'] = data['features']
        
        # data_dict = loads(data)
        data_dict = data
        
        inng_runs, inng_wickets, balls_remaining, total_batter_runs, total_non_striker_runs, batter_balls_faced, non_striker_balls_faced, runs_from_ball = data_dict.values()
        
        prediction = prediction_controller.predict([inng_runs, inng_wickets, balls_remaining, total_batter_runs, total_non_striker_runs, batter_balls_faced, non_striker_balls_faced, runs_from_ball])
        res = jsonify(prediction=prediction)
        print(res)
        return res
    except Exception as ex:
        return jsonify(error=str(ex))
