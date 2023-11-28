import dropbox
import time
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Retrieve Dropbox access token from environment variable
access_token = os.getenv('dropBoxToken')

# Specify the Dropbox folder path
folder_path = '/valorant/agent'

# Create a Dropbox instance
dbx = dropbox.Dropbox(access_token)

# Get a list of all files in the folder
try:
    response = dbx.files_list_folder(path=folder_path)
    results = response.entries

    # Create a dictionary to store the sharable links
    links = {}

    # Loop through each file in the folder and generate or print a sharable link
    for index, item in enumerate(results):
        if isinstance(item, dropbox.files.FileMetadata):
            existing_link = item.sharing_info.url if item.sharing_info else None
            if existing_link:
                # Print the existing link
                print(f"{item.name}: {existing_link}")
            else:
                # Create a new sharable link
                try:
                    response = dbx.sharing_create_shared_link(path=item.path_lower)
                    link = response.url
                    links[item.name] = link
                    print(f"{item.name}: {link}")
                except dropbox.exceptions.ApiError as e:
                    print(f"Error generating link for {item.name}: {e}")

except dropbox.exceptions.ApiError as e:
    print(f"Error listing files: {e}")
