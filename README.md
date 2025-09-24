🏡 Wanderlust – Airbnb Clone
A full-stack web application inspired by Airbnb, where users can create, browse, and review property listings. Built with Node.js, Express, EJS, and MongoDB, featuring authentication, image uploads, and star ratings.

📸 Live Demo
Check out the live demo:
https://wanderlust-g8jq.onrender.com

✨ Features
🔑 Authentication & Authorization – Secure login/signup with Passport.js. Owners can edit or delete only their own listings.
🏠 Listings – Owners can create, edit, and delete property listings.
📷 Image Uploads – Store and manage listing images with Cloudinary.
⭐ Star Ratings & Reviews – Users can rate listings with stars and leave detailed reviews.
💾 MongoDB Integration – Data persistence for users, listings, and reviews.
🎨 EJS Templates – Dynamic and responsive UI.

🚀 Future Enhancements
Search and filter functionality.
Maps integration (Leaflet).
Booking system with availability.
Favorite listings for users.

🛠️ Tech Stack
Frontend: EJS, CSS, JavaScript
Backend: Node.js, Express.js
Database: MongoDB (Mongoose ODM)
Authentication: Passport.js
Image Storage: Cloudinary

📂 Project Structure
```text
│── models/           # Mongoose models (User, Listing, Review)
│── routes/           # Express route handlers for listings, reviews, and users
│── views/            # EJS templates for UI (home, listings, reviews, authentication)
│── public/           # Static assets (CSS, JavaScript, images)
│── middleware.js     # Custom middleware (authentication checks, isLoggedIn, isOwner)
│── cloudConfig.js    # Cloudinary setup for storing and serving images
│── schema.js         # Joi validation schemas for server-side data validation
│── app.js            # Main Express app entry point (server and route setup)
│── package.json      # Project dependencies and npm scripts
│── .env.example      # Example environment variables (MongoDB URI, Cloudinary, etc.)
```

Setup & Installation
1. Clone the repository
```bash
git clone https://github.com/THEJAS-BK/wanderlust.git
cd wanderlust
```
2. Install dependencies (Online, one-time)
```bash
npm install
```
This creates the node_modules folder locally with all dependencies.

3. Set up environment variables (create .env file)
Create a .env file in the project root directory, and add the following values with your actual credentials:
```text
MONGO_URI=your_mongodb_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
MONGO_URL=your_mongo_url
```
4. Run the application
```bash
node app.js
```
5. Visit in browser
Open your browser and visit the listings page:
http://localhost:8080/listings
