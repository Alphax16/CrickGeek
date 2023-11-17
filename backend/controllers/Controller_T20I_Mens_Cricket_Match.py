from pickle import load


class PredictionController:
    def __init__(self):
        with open("./models/pickles/T20I Men's Cricket Match_EL_NET_CV.pkl", 'rb') as fpk:
            self.best_pipeline = load(fpk)

    def predict(self, features):
        try:
            prediction = self.best_pipeline.predict([features])[0]
            return prediction
        except Exception as ex:
            return str(ex)
