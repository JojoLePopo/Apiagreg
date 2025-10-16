import requests
import json
from apikey import RANDOMMER_API_KEY as randommer_api_key
from flask import Flask, jsonify

app = Flask(__name__)

HEADERS = {"X-Api-Key": randommer_api_key}


def get_random_user():
    response = requests.get("https://randomuser.me/api/")
    data = response.json()["results"][0]
    return {
        "name": f"{data['name']['first']} {data['name']['last']}",
        "email": data["email"],
        "gender": data["gender"],
        "location": f"{data['location']['city']}, {data['location']['country']}",
        "picture": data["picture"]["large"]
    }


def get_random_credit_card():
    response = requests.get("https://randommer.io/api/Card", headers=HEADERS, params={"type": "Visa"})
    try:
        data = response.json()
        return data[0] if isinstance(data, list) and len(data) > 0 else None
    except ValueError:
        return None


def get_phone_number():
    response = requests.get("https://randommer.io/api/Phone/Generate", headers=HEADERS, params={"countryCode": "FR", "quantity": 1})
    try:
        data = response.json()
        return data[0] if isinstance(data, list) and len(data) > 0 else None
    except ValueError:
        return None


def get_iban():
    response = requests.get("https://randommer.io/api/Finance/Iban/FR", headers=HEADERS)
    try:
        return response.json()
    except ValueError:
        return None


def get_random_name():
    response = requests.get("https://randommer.io/api/Name", headers=HEADERS, params={"quantity": 1, "nameType": "firstname"})
    try:
        data = response.json()
        return data[0] if isinstance(data, list) else None
    except ValueError:
        return None



def get_joke():
    response = requests.get("https://v2.jokeapi.dev/joke/Programming?type=single")
    data = response.json()
    return {
        "type": data.get("category", "Unknown"),
        "content": data.get("joke", "")
    }



def get_complete_profile():
    user = get_random_user()
    phone_number = get_phone_number()
    iban = get_iban()
    credit_card = get_random_credit_card()
    random_name = get_random_name()
    joke = get_joke()

    profile = {
        "user": user,
        "phone_number": phone_number,
        "iban": iban,
        "credit_card": credit_card,
        "random_name": random_name,
        "joke": joke
    }

    print(json.dumps(profile, indent=2, ensure_ascii=False))
    return profile

@app.route("/get-complete-profile", methods=["GET"])
def api_get_complete_profile():
    data = get_complete_profile()
    print("✅ Profil généré :", data)
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
