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
    # TODO: Implement Outlook calendar data retrieval
    print(f"Outlook calendar data retrieval not implemented for user: {user}")
    return []

def get_apple_data(user):
    # TODO: Implement Apple calendar data retrieval
    print(f"Apple calendar data retrieval not implemented for user: {user}")
    return []

def fetch_calendar_data(user, provider, creds=None):
    if provider == 'Google':
        return get_google_data(user, creds)
    elif provider == 'Outlook':
        return get_outlook_data(user)
    elif provider == 'Apple':
        return get_apple_data(user)
    else:
        print(f"Unsupported calendar provider: {provider}")
        return []

def fetch_group_calendar_data(group_id, provider, creds=None):
    group_members = get_group_members(group_id)
    group_data = []
    for user in group_members:
        user_data = fetch_calendar_data(user, provider, creds)
        group_data.extend(user_data)
    return group_data