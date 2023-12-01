from joblib import load
from keras.models import load_model
from keras.preprocessing import image
from keras.applications.vgg19 import preprocess_input
import numpy as np
import cv2 as cv
import sys


class PredictionController:
    def __init__(self):
        self.clf_model = load_model(
            "./app/models/weights/Umpire_Action_Image_Classifier.h5")

        with open("./app/models/pickles/Umpire_Action_Image_Classifier/Umpire_Action_Image_Classifier_ML.joblib", 'rb') as fpk:
            self.ml_model = load(fpk)

    def predict(self, img):
        try:
            img_resized = cv.resize(img, (224, 224))

            X = image.img_to_array(img_resized)
            X = np.expand_dims(X, axis=0)
            X = preprocess_input(X)

            features = self.clf_model.predict(X)
            predicted_values_2 = self.ml_model.predict(features.reshape(1, -1))

            choices = {'1': 'noball',
                       '2': 'out',
                       '3': 'six',
                       '4': 'wide',
                       '5': 'noaction'}

            result = choices.get(str(int(predicted_values_2)), 'default')
            print('Result:', result, file=sys.stdout)

            return result
        except Exception as ex:
            return str(ex)
