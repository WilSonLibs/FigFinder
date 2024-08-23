from calendarAPI import configure, fetch_calendar_data, fetch_group_calendar_data
from databaseAPI import store_user_data, get_user_data, store_group_data, get_group_data
from aiScheduler import find_best_free_time, plan_intelligent_travel_debug, display_itinerary, generate_trip_summary
from groupManagement import create_group, join_group, generate_invitation_code, get_group_members
from langchain.llms import Together
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

together_api_key = os.getenv("TOGETHER_API_KEY")

llm = Together(
    model="meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
    temperature=0.7,
    max_tokens=1024,
    together_api_key=together_api_key
)

def main():
    # Configure and authenticate user
    user = input("Enter your username: ")
    creds = configure("credentials.json")
    
    while True:
        print("\n--- FigFinder Menu ---")
        print("1. Sync Calendar")
        print("2. Create a new group")
        print("3. Join an existing group")
        print("4. Find best free time for a group")
        print("5. Test Intelligent Travel Planning")
        print("6. Exit")
        
        choice = input("Enter your choice (1-6): ")
        
        if choice == '1':
            sync_calendar(user, creds)
        elif choice == '2':
            create_new_group(user)
        elif choice == '3':
            join_existing_group(user)
        elif choice == '4':
            find_group_free_time(creds)
        elif choice == '5':
            test_intelligent_travel_planning()
        elif choice == '6':
            print("Thank you for using FigFinder. Goodbye!")
            break
        else:
            print("Invalid choice. Please try again.")

def sync_calendar(user, creds):
    google_data = fetch_calendar_data(user, "Google", creds)
    store_user_data(user, google_data)
    print(f"Calendar synced for {user}")

def create_new_group(user):
    group_name = input("Enter group name: ")
    description = input("Enter group description: ")
    travel_dates = input("Enter travel dates: ")
    group_id = create_group(group_name, description, travel_dates, user)
    invitation_code = generate_invitation_code(group_id)
    print(f"Group created! Invitation code: {invitation_code}")

def join_existing_group(user):
    group_code = input("Enter group invitation code: ")
    if join_group(user, group_code):
        print("Successfully joined the group!")
    else:
        print("Failed to join the group. Invalid code.")

def find_group_free_time(creds):
    group_id = input("Enter group ID: ")
    duration = int(input("Enter minimum duration (in minutes): "))
    group_data = fetch_group_calendar_data(group_id, "Google", creds)
    best_times = find_best_free_time(group_id, min_duration_minutes=duration)
    print("\nBest free time slots for the group:")
    for slot in best_times:
        print(f"Free slot: {slot['start']} to {slot['end']}")

def test_intelligent_travel_planning():
    locations = input("Enter locations (comma-separated): ").split(',')
    itinerary = plan_intelligent_travel_debug(locations)
    if itinerary:
        display_itinerary(itinerary)
        group_id = input("Enter group ID for trip summary: ")
        trip_summary = generate_trip_summary(group_id, itinerary, llm)
        print("\nTrip Summary:\n", trip_summary)
    else:
        print("Failed to generate itinerary.")

if __name__ == "__main__":
    main()