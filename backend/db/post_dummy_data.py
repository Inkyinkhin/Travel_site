import csv
import pandas
import json
import requests





def post_data(payload):
    url = 'http://localhost:3001/api/landmarks/add_landmark'
    headers = {
    'Content-Type': 'application/json'  
}
    json_payload = json.dumps(payload)
    response = requests.post(url, data=json_payload, headers=headers)
    if response.status_code == 200:
        print('POST request successful!')
    else:
        print(f'POST request failed with status code: {response.status_code}')
        print(response.text)  # Print error message if any


# Function to read CSV file and return data as dictionary of lists


# Example usage: Reading data from a CSV file
csv_filename = 'dummy_2.csv'
df = pandas.read_csv(csv_filename)
d_keys = df.columns

for d in df.iterrows():
    payload = d[1].to_dict()
    payload['description'] = 'This is test'
    payload['city_name'] = 'test'
    post_data(payload)
