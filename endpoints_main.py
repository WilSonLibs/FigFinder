from flask import Flask, request, jsonify
from calendarAPI import configure, fetch_calendar_data, fetch_group_calendar_data
from databaseAPI import store_user_data, get_user_data, store_group_data, get_group_data
from aiScheduler import find_best_free_time, plan_intelligent_travel_debug, display_itinerary, generate_trip_summary
from groupManagement import create_group, join_group, generate_invitation_code, get_group_members
from langchain.llms import Together
import os
from dotenv import load_dotenv
from aiScheduler import generate_travel_keywords, expand_travel_idea
from databaseAPI import save_popular_keywords, get_popular_keywords

# Load environment variables
load_dotenv()

together_api_key = os.getenv("TOGETHER_API_KEY")

llm = Together(
    model="meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
    temperature=0.7,
    max_tokens=1024,
    together_api_key=together_api_key
)

app = Flask(__name__)

@app.route('/generate_keywords', methods=['POST'])
def get_travel_keywords():
    user_input = request.form.get('user_input', '')
    group_id = request.form.get('group_id', '')
    keywords = generate_travel_keywords(user_input, group_id, llm)
    return jsonify({'keywords': keywords})

@app.route('/expand_idea', methods=['POST'])
def get_expanded_idea():
    keyword = request.form['keyword']
    expanded_idea = expand_travel_idea(keyword, llm)
    return jsonify({'expanded_idea': expanded_idea})

@app.route('/popular_keywords', methods=['GET'])
def get_trending_keywords():
    keywords = get_popular_keywords()
    return jsonify({'popular_keywords': keywords})

@app.route('/sync_calendar', methods=['POST'])
def sync_calendar():
    user = request.form['user']
    creds = configure("credentials.json")
    google_data = fetch_calendar_data(user, "Google", creds)
    store_user_data(user, google_data)
    return jsonify({'message': f'Calendar synced for {user}'})

@app.route('/create_group', methods=['POST'])
def create_new_group():
    group_name = request.form['group_name']
    description = request.form['description']
    travel_dates = request.form['travel_dates']
    user = request.form['user']
    group_id = create_group(group_name, description, travel_dates, user)
    invitation_code = generate_invitation_code(group_id)
    return jsonify({'group_id': group_id, 'invitation_code': invitation_code})

@app.route('/join_group', methods=['POST'])
def join_existing_group():
    user = request.form['user']
    group_code = request.form['group_code']
    if join_group(user, group_code):
        return jsonify({'message': 'Successfully joined the group!'})
    else:
        return jsonify({'message': 'Failed to join the group. Invalid code.'}), 400

@app.route('/find_group_free_time', methods=['POST'])
def find_group_free_time():
    group_id = request.form['group_id']
    duration = int(request.form['duration'])
    creds = configure("credentials.json")
    group_data = fetch_group_calendar_data(group_id, "Google", creds)
    best_times = find_best_free_time(group_id, min_duration_minutes=duration)
    return jsonify({'best_times': best_times})

@app.route('/test_intelligent_travel_planning', methods=['POST'])
def test_intelligent_travel_planning():
    locations = request.form['locations'].split(',')
    itinerary = plan_intelligent_travel_debug(locations)
    if itinerary:
        group_id = request.form['group_id']
        trip_summary = generate_trip_summary(group_id, itinerary, llm)
        return jsonify({'itinerary': itinerary, 'trip_summary': trip_summary})
    else:
        return jsonify({'message': 'Failed to generate itinerary.'}), 400

if __name__ == '__main__':
    app.run(debug=True)
