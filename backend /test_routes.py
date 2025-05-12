import requests

BASE_URL = "http://127.0.0.1:5000"

ROUTES_TO_TEST = {
    "User Detail (GET)": ("/user", "GET"),
    "User Detail (PATCH)": ("/user", "PATCH"),
    "User Detail (DELETE)": ("/user", "DELETE"),
    "User Parcels (GET)": ("/user/parcels", "GET"),
    "User Parcels (POST)": ("/user/parcels", "POST"),
    "Parcel Detail (GET)": ("/parcels/1", "GET"),
    "Parcel Detail (PATCH)": ("/parcels/1", "PATCH"),
    "Parcel Detail (DELETE)": ("/parcels/1", "DELETE"),
    "Parcel Delivery Confirmation (POST)": ("/parcels/1/deliver", "POST"),
    "Parcel Tracking (GET)": ("/parcels/1/tracking", "GET"),
    "Parcel Rating (POST)": ("/parcels/1/rating", "POST"),
    "Driver Rating (POST)": ("/drivers/1/rating", "POST"),
    "Driver Detail (GET)": ("/drivers/1", "GET"),
    "Driver Detail (PATCH)": ("/drivers/1", "PATCH"),
    "Driver Detail (DELETE)": ("/drivers/1", "DELETE"),
    "Admin View Parcels (GET)": ("/admin/parcels", "GET"),
    "Admin Users (GET)": ("/admin/users", "GET"),
    "Admin Ratings (GET)": ("/admin/ratings", "GET"),
    "Admin Tracking Updates (POST)": ("/admin/parcels/1/tracking", "POST"),
}

def test_route(name, endpoint, method):
    url = f"{BASE_URL}{endpoint}"
    response = requests.request(method, url)

    print(f"{name} ({method} {url}) → Status: {response.status_code}, Response: {response.text[:200]}")

if __name__ == "__main__":
    print("\n🔎 Testing API Endpoints...\n")
    for name, (endpoint, method) in ROUTES_TO_TEST.items():
        test_route(name, endpoint, method)
