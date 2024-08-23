# aiScheduler.py
import os
import json
from zoneinfo import ZoneInfo
from operator import itemgetter
from serpapi import GoogleSearch
from datetime import datetime, timedelta, timezone
from groupManagement import get_group_members
from databaseAPI import get_user_data, store_group_data, get_group_data
import requests
from langchain.llms import Together
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
import datetime
import os.path
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from groupManagement import get_group_members
from dotenv import load_dotenv
from databaseAPI import save_popular_keywords
load_dotenv()

# Set your SerpApi key as an environment variable
serpapi_key = os.getenv("SERPAPI_API_KEY")
together_api_key = os.getenv("TOGETHER_API_KEY")

# Initialize Together AI
llm = Together(
    model="meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
    temperature=0.7,
    max_tokens=1024,
    together_api_key=together_api_key
)

def load_model(path):
    pass

def generate_travel_keywords(user_input, group_id, llm):
    group_data = get_group_data(group_id)
    group_preferences = get_group_preferences(group_id)
    
    prompt = f"Generate 10 travel destination keywords based on the following input: '{user_input}'. "
    prompt += f"Consider these group preferences: {group_preferences}. "
    prompt += "Provide a diverse range of options."

    response = llm.invoke(prompt)
    keywords = response.strip().split('\n')
    
    save_popular_keywords(keywords)
    return keywords

def expand_travel_idea(keyword, llm):
    prompt = f"Provide more information about '{keyword}' as a travel destination. "
    prompt += "Include key attractions, best time to visit, and any unique experiences."

    response = llm.invoke(prompt)
    return response.strip()

def generate_trip_summary(group_id, itinerary, llm):
    """
    Generates a summary of the trip using Langchain and Together AI's text generation API.
    """
    group_data = get_group_data(group_id)
    group_name = group_data.get('name', 'Your Group')
    travel_dates = group_data.get('travel_dates', 'Sometime soon')

    # Template for trip summary
    template = """
    You are a helpful and friendly AI assistant, planning a trip itinerary.
    Generate a fun and engaging trip summary for {group_name}, who are traveling {travel_dates}.
    The itinerary includes stops at these key locations: {locations}.
    Make sure to highlight the most exciting aspects of the trip and keep the summary concise. 
    """

    # Create the prompt
    prompt = PromptTemplate(
        input_variables=["group_name", "travel_dates", "locations"],
        template=template,
    )

    # Create the Langchain chain
    chain = LLMChain(llm=llm, prompt=prompt)

    # Run the chain with the input data
    summary = chain.run({
        "group_name": group_name,
        "travel_dates": travel_dates,
        "locations": ', '.join([stop['name'] for stop in itinerary['stops']])
    })

    return summary


def suggest_activities(location, interests):
    """
    Suggests activities based on location and user interests using Together AI.
    """
    prompt = f"Suggest some activities in {location} that would be suitable for a group of friends"
    if interests:
        prompt += f" who are interested in {', '.join(interests)}."
    else:
        prompt += "."

    # Call Together AI API to get activity suggestions using llm.invoke()
    response = llm.invoke(prompt)
    suggestions = response # Assuming the response is the suggestions

    return suggestions

def get_travel_advice(destination, trip_duration):
    """
    Provides travel advice based on the destination and trip duration.
    """
    prompt = f"Provide some travel advice for a trip to {destination} lasting {trip_duration} days."
    prompt += "Include tips on things like packing, local customs, and must-see attractions."

    # Call Together AI API to get travel advice using llm.invoke()
    advice = llm.invoke(prompt)

    return advice

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