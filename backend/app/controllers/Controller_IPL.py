import pandas as pd
import numpy as np
from joblib import load
from sklearn.impute import SimpleImputer
import sys


class PredictionController:
    def __init__(self):
        # with open("./app/models/pickles/IPL/IPL_Random_Forest_Classifier.joblib", 'rb') as fjb:
        # self.IPL_Reg = load(
        #     "./app/models/pickles/IPL/IPL_Random_Forest_Regressor.joblib")
        # self.xl_encodings = pd.read_excel(
        #     "./app/models/Data/IPL/IPL_Encodings.xlsx", sheet_name=None)
        # self.team_encodings = self.xl_encodings['Team Encodings']
        # self.city_encodings = self.xl_encodings['City Encodings']
        # self.venue_encodings = self.xl_encodings['Venue Encodings']

        self.model = load(
            "./app/models/pickles/IPL/IPL_Random_Forest_Classifier_2.joblib")

        self.label_encoders = load(
            "./app/models/pickles/IPL/IPL_Label_Encoder_2.joblib")

        # print('Encoding...', self.team_encodings, self.city_encodings,
        #       self.venue_encodings, file=sys.stdout)

    def predict(self, features):
        try:
            data = features

            print('data:', data, file=sys.stdout)

            # input_data = pd.DataFrame(data)

            # # imputer = SimpleImputer(strategy="most_frequent")
            # # input_data = pd.DataFrame(imputer.fit_transform(
            # #     input_data), columns=input_data.columns)

            # print('Input Data:', input_data, file=sys.stdout)

            categorical_columns = ['team1', 'team2',
                                   'toss_winner', 'city', 'toss_decision', 'venue']
            # for col in categorical_columns:
            #     input_data[col] = self.label_encoders[col].transform(
            #         input_data[col])

            # # expected_columns = ['team1', 'team2', 'city',
            # #                     'toss_decision', 'toss_winner', 'venue']
            # expected_columns = ['winner']
            # for col in expected_columns:
            #     if col not in input_data.columns:
            #         if col in categorical_columns:
            #             # If the column is categorical, set it to the most frequent value
            #             default_value = input_data[col].mode().iloc[0]
            #         else:
            #             # If the column is numerical, set it to the mean value
            #             default_value = input_data[col].mean()

            #         # Create a DataFrame with a single row and assign it to the missing column
            #         input_data[col] = pd.DataFrame(
            #             {col: [default_value]}, index=[0])

            enc_data = {}
            for category in categorical_columns:
                if category in ['team1', 'team2', 'toss_winner']:
                    enc_data[category] = self.label_encoders['teams'].transform(
                        data[category])
                else:
                    enc_data[category] = self.label_encoders[category].transform(
                        data[category])

            print('Encoded Data:', enc_data, file=sys.stdout)
            print('List of Encoded Data Dict. Values:',
                  [i[0] for i in enc_data.values()])

            predictions = self.model.predict(
                np.array([i[0] for i in enc_data.values()]).reshape(1, -1))
            print('predictions-79:', predictions)

            decoded_prediction = [list(self.label_encoders['teams'].inverse_transform([pred]))[
                0] for pred in predictions]

            return decoded_prediction
        except Exception as ex:
            print('Exception:', ex, file=sys.stdout)
            return f'Exception: {ex}'
