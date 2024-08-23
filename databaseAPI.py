# databaseAPI.py
import json
import os
from collections import Counter

def connect(db_url):
    """
    Connect to the database using the provided database URL.
    """
    pass  # Add code to connect to the database

def store_user_data(user, data):
    """
    Store calendar data for the specified user in the database.
    """
    # Create the calendar_json_data folder if it doesn't exist
    folder_path = "calendar_json_data"
    os.makedirs(folder_path, exist_ok=True)

    # Create the file path with the specified format
    file_path = os.path.join(folder_path, f"{user}_calendar.json")

    # Write the data to the JSON file
    with open(file_path, "w") as json_file:
        json.dump(data, json_file, indent=2)
    
    print(f"Data stored for {user} in {file_path}")

def update_user_data(user, data):
    """
    Update calendar data for the specified user in the database.
    """
    # Assuming data is a dictionary and you want to update specific fields
    existing_data = get_user_data(user)
    existing_data.update(data)  # Update with new data
    store_user_data(user, existing_data)  # Store the updated data

def get_user_data(user):
    """
    Retrieve calendar data for the specified user from the database.
    """
    folder_path = "calendar_json_data"
    file_path = os.path.join(folder_path, f"{user}_calendar.json")
    
    try:
        with open(file_path, "r") as json_file:
            return json.load(json_file)
    except FileNotFoundError:
        print(f"No data found for {user} in {file_path}")
        return []
    
def store_group_data(group_id, data):
    file_path = os.path.join("group_data", f"{group_id}.json")
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, "w") as json_file:
        json.dump(data, json_file, indent=2)

def get_group_data(group_id):
    file_path = os.path.join("group_data", f"{group_id}.json")
    try:
        with open(file_path, "r") as json_file:
            return json.load(json_file)
    except FileNotFoundError:
        return None

def get_group_availability(group):
    """
    Retrieve the combined availability of all group members from the database.
    """
    return []  # Replace with code to retrieve group availability

def send_notifications():
    """
    Send notifications to users about upcoming events.
    """
    pass  # Replace with code to send notifications

def save_popular_keywords(keywords):
    try:
        with open("popular_keywords.json", "r") as file:
            existing_keywords = json.load(file)
    except FileNotFoundError:
        existing_keywords = []

    existing_keywords.extend(keywords)
    
    with open("popular_keywords.json", "w") as file:
        json.dump(existing_keywords, file)

def get_popular_keywords(limit=20):
    try:
        with open("popular_keywords.json", "r") as file:
            all_keywords = json.load(file)
    except FileNotFoundError:
        return []

    keyword_counts = Counter(all_keywords)
    return [keyword for keyword, _ in keyword_counts.most_common(limit)]