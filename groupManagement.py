import uuid
from databaseAPI import store_group_data, get_group_data

def create_group(group_name, description, travel_dates, creator):
    group_id = str(uuid.uuid4())
    group_data = {
        'id': group_id,
        'name': group_name,
        'description': description,
        'travel_dates': travel_dates,
        'members': [creator]
    }
    store_group_data(group_id, group_data)
    return group_id

def join_group(user, group_code):
    group_data = get_group_data(group_code)
    if group_data:
        group_data['members'].append(user)
        store_group_data(group_code, group_data)
        return True
    return False

def generate_invitation_code(group_id):
    return group_id  # Using group_id as invitation code for simplicity

def get_group_members(group_id):
    """
    Retrieve the members of a specific group.
    
    Args:
    group_id (str): The unique identifier of the group.
    
    Returns:
    list: A list of user IDs who are members of the group.
    """
    group_data = get_group_data(group_id)
    return group_data['members'] if group_data else []