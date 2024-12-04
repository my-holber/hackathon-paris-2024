import os
import re
import base64
import requests
from google.cloud import vision

# Function to download the image from a URL or base64 string
def download_image(image_url, save_path):
    if image_url.startswith('data:image'):
        # Handle base64-encoded image data
        base64_str = re.sub('^data:image/.+;base64,', '', image_url)
        image_data = base64.b64decode(base64_str)
        with open(save_path, 'wb') as file:
            file.write(image_data)
    else:
        # Handle normal image URL
        response = requests.get(image_url)
        if response.status_code == 200:
            with open(save_path, 'wb') as file:
                file.write(response.content)
        else:
            raise Exception(f"Failed to download image. Status code: {response.status_code}")

# Function to detect landmarks using Google Vision API
def detect_landmarks(image_path):
    client = vision.ImageAnnotatorClient()
    with open(image_path, "rb") as image_file:
        content = image_file.read()
    image = vision.Image(content=content)
    response = client.landmark_detection(image=image)
    landmarks = response.landmark_annotations

    detected_landmarks = []
    for landmark in landmarks:
        name = landmark.description
        detected_landmarks.append({"name": name})

    if response.error.message:
        raise Exception(
            "{}\nFor more info on error messages, check: "
            "https://cloud.google.com/apis/design/errors".format(response.error.message)
        )

    return detected_landmarks

# Function to validate language codes
def validate_language_code(code):
    valid_codes = ["en", "fr", "es", "de", "it", "zh", "ja", "ru", "ar"]  # Extend as needed
    return code in valid_codes

# Function to generate Wikipedia link
def generate_wikipedia_link(entity_name, lang_code):
    return f"https://{lang_code}.wikipedia.org/wiki/{entity_name.replace(' ', '_')}"

# Main function to process an image URL
def process_image_for_landmarks(image_url, language_code):
    image_path = "downloaded_image.jpg"  # Temporary file to save the image
    link = None

    try:
        # Download the image
        download_image(image_url, image_path)

        # Detect landmarks
        landmarks = detect_landmarks(image_path)

        # Validate the language code
        if not validate_language_code(language_code):
            print(f"Invalid language code '{language_code}'. Defaulting to English.")
            language_code = "en"

        # Output results
        if landmarks:
            for landmark in landmarks:
                print(f"Landmark Detected: {landmark['name']}")
                wikipedia_link = generate_wikipedia_link(landmark['name'], language_code)
                print(f" - Wikipedia Link: {wikipedia_link}")
                link = wikipedia_link
                break
        else:
            print("No landmarks detected.")

    except Exception as e:
        print(f"Error occurred: {e}")
    finally:
        # Clean up by deleting the downloaded image
        if os.path.exists(image_path):
            os.remove(image_path)
    
    return link