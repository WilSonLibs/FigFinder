# aiScheduler.py
import os
import json
from zoneinfo import ZoneInfo
from operator import itemgetter
from datetime import datetime, timedelta, timezone
from groupManagement import get_group_members
from databaseAPI import get_user_data, store_group_data, get_group_data

def load_model(path):
    """
    Load AI model from the specified path.
    """
    pass  # Load and return the AI model

def predict_optimal_slots(model, data):
    """
    Predict the optimal time slots using the AI model.
    """
    return []  # Replace with AI logic

def get_group_availability(group):
    """
    Retrieve the combined availability of all group members.
    """
    return []  # Replace with code to calculate group availability

def generate_scheduling_suggestions(group):
    """
    Generate and return scheduling suggestions for the group.
    """
    availability_data = get_group_availability(group)
    optimal_time_slots = predict_optimal_slots(load_model('path_to_model'), availability_data)
    return optimal_time_slots


def find_best_free_time(group_id, min_duration_minutes=60):
    group_data = get_group_data(group_id)
    all_events = []

    for member in group_data['members']:
        user_events = get_user_data(member)
        all_events.extend(user_events)

    group_data['events'] = all_events
    store_group_data(group_id, group_data)

    # Convert all events to UTC and create a unified timeline
    unified_events = []
    for event in all_events:
        start = datetime.fromisoformat(event['start']['dateTime']).astimezone(timezone.utc)
        end = datetime.fromisoformat(event['end']['dateTime']).astimezone(timezone.utc)
        unified_events.append({'start': start, 'end': end})

    # Sort events by start time
    unified_events.sort(key=itemgetter('start'))

    # Find free time slots
    free_slots = []
    last_end = unified_events[0]['start']

    for event in unified_events:
        if event['start'] > last_end:
            free_slots.append({'start': last_end, 'end': event['start']})
        last_end = max(last_end, event['end'])

    # Filter free slots based on minimum duration
    min_duration = timedelta(minutes=min_duration_minutes)
    suitable_slots = [slot for slot in free_slots if (slot['end'] - slot['start']) >= min_duration]

    return suitable_slots