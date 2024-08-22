# calendarAPI.py
import datetime
import os.path
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from groupManagement import get_group_members
SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"]

def configure(credentials_file):
    creds = None
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(credentials_file, SCOPES)
            creds = flow.run_local_server(port=0)
        with open("token.json", "w") as token:
            token.write(creds.to_json())
    return creds


def get_google_data(user, creds):
    try:
        service = build("calendar", "v3", credentials=creds)
        now = datetime.datetime.utcnow().isoformat() + "Z"
        events_result = service.events().list(
            calendarId="primary",
            timeMin=now,
            maxResults=10,
            singleEvents=True,
            orderBy="startTime",
        ).execute()
        events = events_result.get("items", [])
        return events
    except HttpError as error:
        print(f"An error occurred: {error}")
        return []


def get_outlook_data(user):
    """
    Fetch calendar data from Outlook Calendar for the specified user.
    """
    return []  # Replace with code to fetch Outlook Calendar data

def get_apple_data(user):
    """
    Fetch calendar data from Apple Calendar for the specified user.
    """
    return []  # Replace with code to fetch Apple Calendar data

def sync_calendars(user):
    calendar_providers = ['Google', 'Outlook', 'Apple']
    for provider in calendar_providers:
        calendar_data = fetch_calendar_data(user, provider)
        store_calendar_data(user, calendar_data)
    print(f"Calendars synchronized for {user}")

def fetch_calendar_data(user, provider, creds=None):
    if provider == 'Google':
        return get_google_data(user, creds)
    elif provider == 'Outlook':
        return get_outlook_data(user)
    elif provider == 'Apple':
        return get_apple_data(user)

def store_calendar_data(user, data):
    print(f"Data stored for {user}")

def fetch_group_calendar_data(group_id, provider, creds=None):
    group_members = get_group_members(group_id)
    group_data = []
    for user in group_members:
        user_data = fetch_calendar_data(user, provider, creds)
        group_data.extend(user_data)
    return group_data