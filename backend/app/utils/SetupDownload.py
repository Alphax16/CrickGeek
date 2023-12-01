from .ModelDownloader import get_drive_file_id, download_file_from_drive
import os
from dotenv import load_dotenv


load_dotenv()


def downloadSetupFiles():
    # For Umpire Action Image Classifier Model-
    destination_path = "./app/models/weights/"
    destination_file = "Umpire_Action_Image_Classifier.h5"
    destination = os.path.join(destination_path, destination_file)

    if not os.path.exists(destination):
        # file_url = ""
        # file_id = get_drive_file_id()
        file_id = os.getenv("UMPIRE_ACTION_IMAGE_CLASSIFIER_ID")
        print(
            f"Dowloading GDrive File ID: {file_id} to Server Destination: {destination} ...")
        download_file_from_drive(file_id, destination)
