import os
from dotenv import load_dotenv
import cloudinary
from cloudinary import api, uploader


load_dotenv()

env_vars = ['CLOUDINARY_CLOUD_NAME',
            'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET']

conf = {
    env_vars[i].lower(): os.getenv(env_vars[i]) for i in range(len(env_vars))
}

cloudinary.config(
    cloud_name=conf['cloudinary_cloud_name'],
    api_key=conf['cloudinary_api_key'],
    api_secret=conf['cloudinary_api_secret']
)


def upload_images2Cloudinary(folder_path, cloud_folder_name):
    # Get a list of files in the specified folder
    file_list = [f for f in os.listdir(
        folder_path) if os.path.isfile(os.path.join(folder_path, f))]

    # Upload each file to Cloudinary
    public_id_mapping = {}  # Mapping of original filenames to Cloudinary public IDs

    for index, filename in enumerate(file_list):
        file_path = os.path.join(folder_path, filename)

        # Upload the image to Cloudinary
        result = uploader.upload(
            file_path, folder=cloud_folder_name, use_filename=True, unique_filename=False)

        # Save the mapping of original filename to Cloudinary public ID
        public_id_mapping[filename] = result['public_id']

    return public_id_mapping


def get_image_links_from_Cloudinary(folder_name):
    # List all resources in the specified folder
    result = api.resources(
        type="upload",
        prefix=f"{folder_name}/",
        max_results=300  # Adjust the number based on your needs
    )

    # # Create a dictionary with image names as keys and their secure URLs as values
    # image_links_dict = {item['public_id']: item['secure_url']
    #                     for item in result['resources']}

    # return image_links_dict

    # Create an array of dictionaries with image names, IDs, and their secure URLs
    image_data_list = [
        {'id': index + 1, 'name': os.path.basename(item['public_id']), 'url': item['secure_url']} for index, item in enumerate(result['resources'])
    ]

    return image_data_list


# def main():
#     upload_images2Cloudinary("./xyz", "Cricket Umpires Action Classification Images")
#     print('All Items Uploaded Successfully!')

#     folder_name = "Cricket Umpires Action Classification Images"
#     links = get_image_links(folder_name)

#     for link in links:
#         print(link)


# if __name__ == "__main__":
#     main()
