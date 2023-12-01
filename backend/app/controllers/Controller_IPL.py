import pandas as pd
from ..utils.DictFuncs import getIndicesFromValues
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from joblib import load
# from pickle import load
import sys
# print(sys.path, file=sys.stderr)


class TeamEncoder:
    def __init__(self, teams):
        self.team_labels = {team: idx for idx, team in enumerate(teams)}
        # print(self.team_labels, file=sys.stderr)
        self.team_names = {'MI': 'Mumbai Indians', 'KKR': 'Kolkata Knight Riders', 'RCB': 'Royal Challengers Bangalore',
                           'DC': 'Deccan Chargers', 'CSK': 'Chennai Super Kings', 'RR': 'Rajasthan Royals',
                           'DD': 'Delhi Daredevils', 'GL': 'Gujarat Lions', 'KXIP': 'Kings XI Punjab',
                           'SRH': 'Sunrisers Hyderabad', 'RPS': 'Rising Pune Supergiants', 'KTK': 'Kochi Tuskers Kerala',
                           'PW': 'Pune Warriors'}

    def encode(self, team):
        #         print('Team without Encoding:', team, file=sys.stderr)
        #         print('Team after Encoding:', team, file=sys.stderr)
        #         return self.team_labels.get(team, -1)
        print(getIndicesFromValues(self.team_names, team), file=sys.stderr)
        return getIndicesFromValues(self.team_names, team)[0]

    def decode(self, label):
        return self.team_names.get(label, "Unknown")

    def num_encode(self, label_num):
        return self.team_labels.get(label_num)

    def num_decode(self, label_num):
        return getIndicesFromValues(self.team_labels, label_num)[0]


class IPLMatchPredictor:
    def __init__(self, model, teams, venues, cities):
        self.model = model
        self.team_encoder = TeamEncoder(teams)
        self.venue_encoder = LabelEncoder()
        self.city_encoder = LabelEncoder()

        self.venue_encoder.fit(venues)
        self.city_encoder.fit(cities)

    def predict_winner(self, team1, team2, city, toss_decision, toss_winner, venue):
        team1_value = self.team_encoder.encode(team1)
        team2_value = self.team_encoder.encode(team2)
        toss_winner_value = self.team_encoder.encode(toss_winner)

        team1_value_num = self.team_encoder.num_encode(team1_value)
        team2_value_num = self.team_encoder.num_encode(team2_value)
        toss_winner_value_num = self.team_encoder.num_encode(toss_winner_value)

        venue_encoded = self.venue_encoder.transform([venue])
        city_encoded = self.city_encoder.transform([city])

        input_features = pd.DataFrame({
            'team1': [team1_value_num],
            'team2': [team2_value_num],
            'city': city_encoded,
            'toss_decision': [toss_decision],
            'toss_winner': [toss_winner_value_num],
            'venue': venue_encoded
        })

        print("Input Features:\n", input_features, file=sys.stdout)

        predicted_winner_label_num = self.model.predict(input_features)[0]
        print("Predicted Winner Label:",
              predicted_winner_label_num, file=sys.stdout)

        predicted_winner_label = self.team_encoder.num_decode(
            predicted_winner_label_num)
        print(predicted_winner_label_num, file=sys.stdout)

        predicted_winner_short = self.team_encoder.num_decode(
            predicted_winner_label_num)
        print("Predicted Winner Short Name:",
              predicted_winner_short, file=sys.stdout)

        predicted_winner_long = self.team_encoder.decode(
            predicted_winner_short)
        print("Predicted Winner Long Name:",
              predicted_winner_long, file=sys.stdout)

        return predicted_winner_long


class PredictionController:
    def __init__(self):
        with open("./app/models/pickles/IPL_Winner_Prediction_Model.pkl", 'rb') as fpk:
            self.model = load(fpk)

    def predict(self, features):
        try:
            teams = ['MI', 'KKR', 'RCB', 'DC', 'CSK', 'RR',
                     'DD', 'GL', 'KXIP', 'SRH', 'RPS', 'KTK', 'PW']

            venues = ['Rajiv Gandhi International Stadium, Uppal', 'Maharashtra Cricket Association Stadium',
                      'Saurashtra Cricket Association Stadium', 'Holkar Cricket Stadium', 'M Chinnaswamy Stadium',
                      'Wankhede Stadium', 'Eden Gardens', 'Feroz Shah Kotla',
                      'Punjab Cricket Association IS Bindra Stadium, Mohali', 'Green Park', 'Punjab Cricket Association Stadium, Mohali',
                      'Sawai Mansingh Stadium', 'MA Chidambaram Stadium, Chepauk', 'Dr DY Patil Sports Academy', 'Newlands',
                      "St George's Park", 'Kingsmead', 'SuperSport Park', 'Buffalo Park', 'New Wanderers Stadium',
                      'De Beers Diamond Oval', 'OUTsurance Oval', 'Brabourne Stadium', 'Sardar Patel Stadium, Motera',
                      'Barabati Stadium', 'Vidarbha Cricket Association Stadium, Jamtha',
                      'Himachal Pradesh Cricket Association Stadium', 'Nehru Stadium',
                      'Dr. Y.S. Rajasekhara Reddy ACA-VDCA Cricket Stadium', 'Subrata Roy Sahara Stadium',
                      'Shaheed Veer Narayan Singh International Stadium', 'JSCA International Stadium Complex', 'Sheikh Zayed Stadium',
                      'Sharjah Cricket Stadium', 'Dubai International Cricket Stadium']

            cities = ['Hyderabad', 'Pune', 'Rajkot', 'Indore', 'Bangalore', 'Mumbai', 'Kolkata', 'Delhi', 'Chandigarh', 'Kanpur',
                      'Jaipur', 'Chennai', 'Cape Town', 'Port Elizabeth', 'Durban', 'Centurion', 'East London', 'Johannesburg',
                      'Kimberley', 'Bloemfontein', 'Ahmedabad', 'Cuttack', 'Nagpur', 'Dharamsala', 'Kochi', 'Visakhapatnam',
                      'Raipur', 'Ranchi', 'Abu Dhabi', 'Sharjah', 'Dubai']

            predictor = IPLMatchPredictor(self.model, teams, venues, cities)

            # team1 = 'Royal Challengers Bangalore'
            # team2 = 'Chennai Super Kings'
            # city = 'Hyderabad'
            # toss_decision = 0
            # toss_winner = 'Royal Challengers Bangalore'
            # venue = 'Rajiv Gandhi International Stadium, Uppal'

            team1, team2, city, toss_decision, toss_winner, venue = features

            predicted_winner = predictor.predict_winner(
                team1, team2, city, toss_decision, toss_winner, venue)
            print("Predicted Winner:", predicted_winner, file=sys.stderr)

            # prediction = self.model.predict([features])[0]
            return predicted_winner
        except Exception as ex:
            return str('Exception:', ex)
