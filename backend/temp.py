import requests
import tensorflow as tf
from keras.models import load_model, model_from_json
from io import BytesIO


def load_model_from_url(url):
    response = requests.get(url)
    print('Response.code:', response.status_code)
    if response.status_code == 200:
        # Load the model directly from the in-memory binary stream
        model_content = BytesIO(response.content)
        print(model_content)
        model = load_model(model_content)
        return model
    else:
        print(
            f"Failed to retrieve model from {url}, status code: {response.status_code}")
        return None


model_url = "https://github.com/fchollet/deep-learning-models/releases/download/v0.1/vgg19_weights_tf_dim_ordering_tf_kernels.h5"
model = load_model_from_url(model_url)
print(model)
