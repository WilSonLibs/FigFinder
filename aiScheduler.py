# aiScheduler.py
import os
import json
from zoneinfo import ZoneInfo
from operator import itemgetter
from serpapi import GoogleSearch
from datetime import datetime, timedelta, timezone
from groupManagement import get_group_members
from databaseAPI import get_user_data, store_group_data, get_group_data

# Set your SerpApi key as an environment variable
os.environ["SERPAPI_API_KEY"] = "d8be108b46854add4fcddb16e3d168da47c031553bbbe82ac62a387c71333199"

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

def get_group_preferences(group_id):
    group_data = get_group_data(group_id)
    preferences = {}
    for member in group_data['members']:
        user_data = get_user_data(member)
        preferences[member] = user_data.get('preferences', {})
    return preferences

def get_optimal_route(start_location, end_location):
    params = {
        "engine": "google_maps_directions",
        "start_addr": start_location,
        "end_addr": end_location,
        "api_key": os.getenv("SERPAPI_API_KEY")
    }
    search = GoogleSearch(params)
    results = search.get_dict()
    
    if 'directions' not in results or not results['directions']:
        raise ValueError(f"No route found between {start_location} and {end_location}")
    
    return results['directions'][0]

def matches_preferences(place, group_preferences):
    # Implement logic to check if the place matches group preferences
    # This could involve checking place types, ratings, etc.
    return True  # Placeholder

def find_points_of_interest(route, max_stops=5):
    points_of_interest = []
    if 'trips' in route:
        midpoint = len(route['trips']) // 2
        lat, lng = route['trips'][midpoint]['details'][0]['gps_coordinates'].values()
        params = {
            "engine": "google_maps",
            "q": "tourist attractions",
            "ll": f"@{lat},{lng},14z",
            "type": "search",
            "api_key": os.getenv("SERPAPI_API_KEY")
        }
        search = GoogleSearch(params)
        results = search.get_dict()
        if 'local_results' in results:
            points_of_interest = sorted(results['local_results'], key=itemgetter('rating'), reverse=True)[:max_stops]
    return points_of_interest

def create_travel_itinerary(route, points_of_interest):
    itinerary = {
        'travel_mode': route['travel_mode'],
        'start_address': route.get('start_address', 'N/A'),
        'end_address': route.get('end_address', 'N/A'),
        'total_distance': route['formatted_distance'],
        'total_duration': route['formatted_duration'],
        'stops': []
    }
    
    for poi in points_of_interest:
        itinerary['stops'].append({
            'name': poi['title'],
            'address': poi.get('address', 'N/A'),
            'rating': poi.get('rating', 'N/A'),
            'types': poi.get('type', 'N/A')
        })
    
    return itinerary

def plan_intelligent_travel(group_id, start_location, end_location):
    group_preferences = get_group_preferences(group_id)
    route = get_optimal_route(start_location, end_location)
    points_of_interest = find_points_of_interest(route, group_preferences)
    return create_travel_itinerary(route, points_of_interest)

def plan_intelligent_travel_debug(locations):
    try:
        route = get_optimal_route(locations[0], locations[-1])
        points_of_interest = find_points_of_interest(route)
        itinerary = create_travel_itinerary(route, points_of_interest)
        save_itinerary(itinerary)
        return itinerary
    except ValueError as e:
        print(f"Error: {str(e)}")
        return None


def save_itinerary(itinerary):
    with open('itinerary.json', 'w') as f:
        json.dump(itinerary, f, indent=2)
    print("Itinerary saved to itinerary.json")

def display_itinerary(itinerary):
    if not itinerary:
        print("No itinerary available.")
        return

    print("Travel Itinerary:")
    print(f"Travel Mode: {itinerary['travel_mode']}")
    print(f"Start: {itinerary['start_address']}")
    print(f"End: {itinerary['end_address']}")
    print(f"Total Distance: {itinerary['total_distance']}")
    print(f"Total Duration: {itinerary['total_duration']}")
    print("\nStops:")
    for i, stop in enumerate(itinerary['stops'], 1):
        print(f"{i}. {stop['name']}")
        print(f"   Address: {stop['address']}")
        print(f"   Rating: {stop['rating']}")
        print(f"   Types: {stop['types']}")
        print()