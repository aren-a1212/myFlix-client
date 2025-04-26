# *MY FLIX-CLIENT APP*


Welcome to the **Movie App**! This project allows users to explore a movie database, log in, and manage their favorite movies.

---

## Features

- Browse a catalog of movies
- View movie details, including title, director, description, and genre
- User authentication and personalized features (favorites, profile)
- Responsive design for seamless use across devices
- Navigation using React Router
- Real-time state management with Redux (optional bonus)

---

## Technologies Used

- **Frontend:** React, React Bootstrap, React Router, Sass
- **Backend:** Node.js, Express.js, MongoDB
- **API Hosting:** Heroku
- **Frontend Hosting:** Netlify

---

## API Endpoints

| Method | Endpoint                  | Description                                    |
|--------|---------------------------|------------------------------------------------|
| POST   | `/login`                  | Login a user and retrieve a JWT token          |
| POST   | `/users/create`           | Register a new user                            |
| GET    | `/movies`                 | Fetch all movies                               |
| GET    | `/movies/:id`             | Fetch details of a specific movie              |
| PUT    | `/users/update/:userName` | Update user details                            |
| DELETE | `/users/:userName`        | Remove a user                                  |
| GET    | `/documentation`          | API documentation (Swagger UI)                 |

For complete API documentation, visit the `/documentation` endpoint on the running backend.

---

## Setup

### Prerequisites

- Node.js (>= 14.x)
- MongoDB
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/movie-app.git
cd movie-app

# Install backend dependencies
npm install
npm start        # starts Express server on port 8080 by default

# In a new terminal, navigate to the client folder
cd client
npm install      # install React app dependencies
npm start        # starts React dev server on port 3000
