import requests

api_key = 'f34e592e904e268c392f5c6cb622d649'
user_input = input("Enter country or city name: ")

# Make the API request
weather_data = requests.get(
    f"https://api.openweathermap.org/data/2.5/weather?q={user_input}&units=imperial&APPID={api_key}"
)

# Check if the location was found
if weather_data.json()['cod'] == "404":
    print("No location by that name was found")
else:
    # Extract weather description and temperature
    weather = weather_data.json()['weather'][0]['description']
    temp = round(weather_data.json()['main']['temp'])
    
    # Print the result
    print(f"The weather in {user_input} is {weather} and the temperature seems to be around {temp}°F")
