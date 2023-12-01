from joblib import load
from keras.models import load_model
from keras.preprocessing import image
from keras.applications.vgg19 import preprocess_input
from app.utils.SetupDownload import downloadSetupFiles
import numpy as np
import cv2 as cv
import sys


class PredictionController:
    def __init__(self):
        downloadSetupFiles()

        self.clf_model = load_model(
            "./app/models/weights/Umpire_Action_Image_Classifier_MobileNet_V2.h5")

        with open("./app/models/pickles/Umpire_Action_Image_Classifier/Umpire_Action_Image_Classifier_ML.joblib", 'rb') as fpk:
            self.ml_model = load(fpk)

        # self.class_mappings = {0: 'noball', 1: 'out',
        #                        2: 'sixes', 3: 'wide', 4: 'no_action'}

        self.class_mappings = ['no_action', 'out', 'no_ball', 'sixes', 'wide']

    def preprocessImage(self, img):
        img_resized = cv.resize(img, (224, 224))
        x = image.img_to_array(img_resized)
        x = preprocess_input(x)
        return np.expand_dims(x, axis=0)

    def classify(self, img):
        x = self.preprocessImage(img)

        predictions = self.clf_model.predict(x)

        predicted_class_index = np.argmax(predictions)
        predicted_class = self.class_mappings[predicted_class_index]

        confidence_score = predictions[0, predicted_class_index]

        return predicted_class, confidence_score
