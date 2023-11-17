from flask import request, jsonify
import numpy as np
import pandas as pd
from keras.models import load_model
import tensorflow as tf
from joblib import load
import logging


class IPL_2008_2017:
    # DATA_PATH = "./app/models/Data/"
    PKL_BASE_PATH = "./app/models/pickles/IPL_Predictor-2008-2017/"
    MODEL_BASE_PATH = "./app/models/weights/"

    def __init__(self):
        tf.get_logger().setLevel('ERROR')
        tf.compat.v1.logging.set_verbosity(logging.ERROR)

        self.categories = load(self.PKL_BASE_PATH + "categories.joblib")

        # Load the necessary components-
        self.venue_encoder = load(
            self.PKL_BASE_PATH + "venue_encoder.joblib")
        self.batting_team_encoder = load(
            self.PKL_BASE_PATH + "batting_team_encoder.joblib")
        self.bowling_team_encoder = load(
            self.PKL_BASE_PATH + "bowling_team_encoder.joblib")
        self.striker_encoder = load(
            self.PKL_BASE_PATH + "striker_encoder.joblib")
        self.bowler_encoder = load(
            self.PKL_BASE_PATH + "bowler_encoder.joblib")
        self.scaler = load(self.PKL_BASE_PATH + "scaler.joblib")

        # Load the Model-
        try:
            self.model = load_model(self.MODEL_BASE_PATH + "IPL_Match_Score_Predictor_2008_2017.h5")
        except Exception as ex:
            print(ex)

    def predict(self, venue, batting_team, bowling_team, striker, bowler):
        # print(self.categories)
        # pd.DataFrame.from_dict(self.categories, orient='index').transpose().to_csv(
        #     self.DATA_PATH + "IPL_Predictor_2008-2017_Players.csv", index=False)
        # pd.DataFrame(self.categories).to_pickle(
        #     self.DATA_PATH + "IPL_Predictor-2008-2017_Players.pkl")
        # if venue not in self.categories['venue'] and batting_team not in self.categories['batting_team'] and bowling_team not in self.categories['bowling_team'] and striker not in self.categories['striker'] and bowler not in self.categories['bowler']:
        #     return 'Please choose valid categories'
        input_data = np.array(
            [venue, batting_team, bowling_team, striker, bowler])
        input_data = input_data.reshape(1, 5)

        # Transform using loaded encoders and scaler
        input_data[0, 0] = self.venue_encoder.transform([input_data[0, 0]])[0]
        input_data[0, 1] = self.batting_team_encoder.transform([input_data[0, 1]])[
            0]
        input_data[0, 2] = self.bowling_team_encoder.transform([input_data[0, 2]])[
            0]
        input_data[0, 3] = self.striker_encoder.transform([input_data[0, 3]])[
            0]
        input_data[0, 4] = self.bowler_encoder.transform([input_data[0, 4]])[0]

        input_data = self.scaler.transform(input_data)

        predicted_score = self.model.predict(input_data)
        predicted_score = int(predicted_score[0, 0])

        return predicted_score
