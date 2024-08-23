# main.py

from calendarAPI import configure, fetch_calendar_data, fetch_group_calendar_data
from databaseAPI import store_user_data, get_user_data, store_group_data, get_group_data
from aiScheduler import find_best_free_time, plan_intelligent_travel_debug, display_itinerary
from groupManagement import create_group, join_group, generate_invitation_code, get_group_members

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
            # Sync user's calendar
            google_data = fetch_calendar_data(user, "Google", creds)
            store_user_data(user, google_data)
            print(f"Calendar synced for {user}")
        
        elif choice == '2':
            # Create a new group
            group_name = input("Enter group name: ")
            description = input("Enter group description: ")
            travel_dates = input("Enter travel dates: ")
            group_id = create_group(group_name, description, travel_dates, user)
            invitation_code = generate_invitation_code(group_id)
            print(f"Group created! Invitation code: {invitation_code}")
        
        elif choice == '3':
            # Join an existing group
            group_code = input("Enter group invitation code: ")
            if join_group(user, group_code):
                print("Successfully joined the group!")
            else:
                print("Failed to join the group. Invalid code.")
        
        elif choice == '4':
            # Find best free time for a group
            group_id = input("Enter group ID: ")
            duration = int(input("Enter minimum duration (in minutes): "))
            group_data = fetch_group_calendar_data(group_id, "Google", creds)
            best_times = find_best_free_time(group_id, min_duration_minutes=duration)
            print("\nBest free time slots for the group:")
            for slot in best_times:
                print(f"Free slot: {slot['start']} to {slot['end']}")
        
        elif choice == '5':
            # Test Intelligent Travel Planning
            locations = input("Enter locations (comma-separated): ").split(',')
            itinerary = plan_intelligent_travel_debug(locations)
            display_itinerary(itinerary)
        
        elif choice == '6':
            # Exit the program
            print("Thank you for using FigFinder. Goodbye!")
            break
        
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
