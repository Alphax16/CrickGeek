import pandas as pd
import numpy as np
from joblib import load
from sklearn.impute import SimpleImputer
import sys


class PredictionController:
    def __init__(self):
        self.model = load(
            "./app/models/pickles/IPL/IPL_Random_Forest_Regressor_2.joblib")
        self.label_encoders = load(
            "./app/models/pickles/IPL/IPL_Label_Encoders_2.joblib")

    def predict(self, features):
        try:
            enc_data = {}

            enc_data['team1'] = self.label_encoders['teams'].transform(
                features['team1'])[0]
            enc_data['team2'] = self.label_encoders['teams'].transform(
                features['team2'])[0]

            # Encode 'toss_winner', 'city', 'toss_decision', 'venue'
            for category in ['city', 'toss_decision', 'toss_winner', 'venue']:
                enc_data[category] = self.label_encoders[category].transform(
                    features[category])[0]

            # Handle 'team1' and 'team2' encoding
            # team_encoding = self.label_encoders['teams'].transform(
            #     [features['team1'], features['team2']])
            # enc_data['team1'], enc_data['team2'] = team_encoding[0], team_encoding[1]

            print('Encoded Data:', enc_data, file=sys.stdout)

            # Extract values from the dictionary to form a list for prediction
            # predictions = self.model.predict(
            #     np.array([enc_data[cat] for cat in enc_data.values()]).reshape(1, -1))
            enc_df = pd.DataFrame(enc_data, index=[0])
            prediction = self.model.predict(enc_df)
            print('Prediction-41:', prediction, file=sys.stdout)

            # decoded_prediction = self.label_encoders['teams'].inverse_transform([
            #     predictions[0]])[0]

            return prediction
        except Exception as ex:
            print('Exception:', ex, file=sys.stdout)
            return f'Exception: {ex}'
