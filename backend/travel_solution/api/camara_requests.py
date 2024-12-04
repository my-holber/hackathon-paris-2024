from django.test import TestCase

# Create your tests here.
import requests
import base64
import json



def get_access_token(client_id, client_secret):
    url = "https://api.orange.com/oauth/v3/token"
    try:
        response = requests.post(
            url,
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            auth=(client_id, client_secret),
            data={"grant_type": "client_credentials"}
        )
        response.raise_for_status()
        return response.json().get("access_token")
    except requests.exceptions.RequestException as e:
        print(f"Error obtaining access token: {e}")
        return None

def check_device_status(access_token, phone_number):
    url = "https://api.orange.com/camara/orange-lab/device-reachability-status/v0/retrieve"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Cache-Control": "no-cache",
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    data = {
        "device": {
            "phoneNumber": phone_number
        }
    }
    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error checking device status: {e}")
        return None

# Replace with your credentials and phone number
client_id = "AXwP3EWvpa2dWg66zguB8Jp9YaKlgyM8"
client_secret = "Vb2MFWn2xSdKPRMIhMycnnaAKPT4gZXIL9isLmdNgCw0"
phone_number = "+33699901032"

def _get_device_location(access_token, phone_number, max_age=60):
    url = "https://api.orange.com/camara/location-retrieval/orange-lab/v0/retrieve"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Cache-Control": "no-cache",
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    data = {
        "device": {
            "phoneNumber": phone_number
        },
        "maxAge": max_age
    }
    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error retrieving device location: {e}")
        return None


def get_device_location():
    access_token = get_access_token(client_id, client_secret)
    location = _get_device_location(access_token, phone_number)
    if not location:
        return None
    return location["area"]["center"]