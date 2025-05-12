🚚 Deliveroo Backend

This is the Flask backend for Deliveroo, a parcel delivery platform that allows users to send parcels and admins to track them. The backend handles authentication, parcel creation, user dashboards, and admin oversight, all connected to a PostgreSQL database.

NOTE:

This is the user flow of the app, the app has a few bugs but functions, there were complications with connecting the admin dashboard to the program.This is also because of the fact that we didnt have much help debugging when needed help.

THE BRANCH TO USE IS CALLED "Final".





⚙️ Tech Stack

Python 3.8+

Flask

Flask-SQLAlchemy

Flask-Migrate

Flask-JWT-Extended

PostgreSQL

Flask-CORS

flask mail, smtp

vite react

Features

✅ User Signup & Login (with JWT Authentication)

✅ Users can create and track parcels

✅ Admin dashboard to view all user parcels(integration imporvement)

✅ Secure PostgreSQL integration

✅ Supports frontend communication via CORS

✅ Flask-Migrate for DB migrations

Below is a trello link witht the roles of each member of the group
https://trello.com/b/WlhN3bNK/deliveroo

Clone the Repository

bash

CopyEdit

git clone <your-repo-url>cd deliveroo-backend

2. Set Up Virtual Environment

bash

CopyEdit

python3 -m venv venvsource venv/bin/activatepip install -r requirements.txt

3. Create a .env File

env

CopyEdit

FLASK_APP=manage.pyFLASK_ENV=developmentDATABASE_URL=postgresql://<username>:<password>@localhost:5432/<your-db-name>JWT_SECRET_KEY=your_jwt_secret_key

4. Run Database Migrations

bash

CopyEdit

flask db init # only onceflask db migrate -m "Initial migration"flask db upgrade

5. Start the Development Server

bash

CopyEdit

flask run

Runs on: http://localhost:5000

📬 API Endpoints
🔐 Auth Routes
Method	Endpoint	Description
POST	/signup	Register a new user
POST	/login	Login & receive JWT
📦 Parcel Routes (User)
Method	Endpoint	Description
POST	/parcels	Create a new parcel
GET	/parcels	View all user’s parcels
🛡️ Admin Routes
Method	Endpoint	Description
GET	/admin/parcels	View all parcels (admin)

Note: Admin routes require a valid JWT token with admin privileges.

🔗 Frontend Integration Notes

Make sure the frontend includes the JWT token in request headers for protected routes.

Base API URL: http://localhost:5000

All routes accept and return JSON.

📝 To-Do (Optional Improvements)

✨ Add delivery status updates

📍 Integrate maps/location services

📊 Add parcel filtering and search

🛑 Add parcel cancelation
