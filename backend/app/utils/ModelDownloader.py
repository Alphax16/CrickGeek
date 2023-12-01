import requests
from urllib.parse import urlparse, parse_qs


def get_drive_file_id(file_url):
    # parsed_url = urlparse(file_url)
    # query_params = parse_qs(parsed_url.query)
    # file_id = query_params["id"][0]
    # return file_id

    parsed_url = urlparse(file_url)
    file_id = parsed_url.path.split("/file/d/")[-1].split("/")[0]
    print('File ID:', file_id)
    return file_id


def download_file_from_drive(id, destination):
    URL = "https://docs.google.com/uc?export=download&confirm=1"

    session = requests.Session()

    response = session.get(URL, params={"id": id}, stream=True)
    token = get_confirm_token(response)

    if token:
        params = {"id": id, "confirm": token}
        response = session.get(URL, params=params, stream=True)

    save_response_content(response, destination)


def get_confirm_token(response):
    for key, value in response.cookies.items():
        if key.startswith("download_warning"):
            return value

    return None


def save_response_content(response, destination="./app/models/weights/Model_Weights.h5"):
    CHUNK_SIZE = 32768

    print(destination)

    with open(destination, 'wb') as f:
        for chunk in response.iter_content(CHUNK_SIZE):
            if chunk:
                f.write(chunk)
