from joblib import load


class PredictionController:
    def __init__(self):
        with open("./app/models/pickles/T20/T20I Mens Cricket Match_EL_NET_CV.joblib", 'rb') as fjb:
            self.best_pipeline = load(fjb)

    def predict(self, features):
        try:
            prediction = self.best_pipeline.predict([features])[0]
            return prediction
        except Exception as ex:
            return str(ex)
