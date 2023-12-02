from flask import Blueprint, request, jsonify
from app.controllers.Controller_Umpire_Decision_Classification import PredictionController
from app.models.Model_Images import upload_images2Cloudinary_NoLocSave, get_image_links_from_Cloudinary
from json import loads
from PIL import Image
from io import BytesIO
import numpy as np
import cv2 as cv
import sys


Route_Umpire_Action_Decision_Clf_bp = Blueprint(
    'Umpire_action_decision_classification', __name__)
prediction_controller = PredictionController()


# @Route_Umpire_Action_Decision_Clf_bp.route("/Umpire-Action-Decision-Classifier", methods=['POST'])
# def predict():
#     try:
#         if 'image' not in request.files:
#             return jsonify({'error': 'No file provided'}), 400

#         file = request.files['image']
#         print('File:', file, file=sys.stdout)

#         # Check if the file is an image (you may want to add more robust image type checking)
#         if not file.content_type.startswith('image/'):
#             return jsonify({'error': 'Invalid file type. Please provide an image'}), 400

#         # Read the image from FileStorage using BytesIO
#         img_bytes = BytesIO(file.read())
#         img = cv.imdecode(np.frombuffer(
#             img_bytes.read(), np.uint8), cv.IMREAD_COLOR)
#         print('img', img, file=sys.stdout)

#         # img = cv.imread(file)

#         predicted_class, confidence_score = prediction_controller.classify(img)
#         print(
#             f'Prediction: {predicted_class}\nConfidence Score: {confidence_score}', file=sys.stdout)
#         res = jsonify(decision=predicted_class,
#                       confidence=str(confidence_score))
#         return res

#     except Exception as ex:
#         print(ex, file=sys.stderr)
#         return jsonify(error=str(ex))


@Route_Umpire_Action_Decision_Clf_bp.route("/Umpire-Action-Decision-Classifier", methods=['GET'])
def getData():
    try:
        data = get_image_links_from_Cloudinary(
            "Cricket Umpires Action Classification Images")
        print(data[0], file=sys.stderr)
        return data
    except Exception as ex:
        return jsonify(error=str(ex))

# @Route_IPL_bp.route("/IPL-Predictor", methods=['GET'])
# def get_data():
#     try:
#         page = int(request.args.get('page', 1))
#         page_size = int(request.args.get('pageSize', 10))

#         data = get_paginated_data(page, page_size)

#         return jsonify(data=data)
#     except Exception as ex:
#         return jsonify(error=str(ex))
