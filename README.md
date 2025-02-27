# Movie CRUD App

This is a Movie CRUD application built using NestJS for the backend and a frontend framework of your choice (e.g., React, Angular, etc.). This app allows users to manage movies, with options to upload posters and view the movie details.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Running the Backend Locally](#running-the-backend-locally)
- [Running the Frontend Locally](#running-the-frontend-locally)
- [TODO](#todo)
- [API Documentation](#api-documentation)

---

## Prerequisites

1. **MongoDB**: MongoDB should be installed and running before you can start the backend application.
   - You can install MongoDB locally or use a cloud-based MongoDB service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   
2. **Node.js and npm**: You should have Node.js and npm installed on your machine. You can download them from [here](https://nodejs.org/).

---

## Setup Instructions

1. **Clone the repository**  
   First, clone the repository from GitHub to your local machine:
   ```bash
   git clone https://github.com/chavez1115/movie-cruid-app.git
   cd movie-cruid-app
2. **Install backend dependencies**
   Navigate to the backend folder and install the dependencies:
   ```bash
   cd backend
   npm install
3. **Install frontend dependencies**

## Running the Backend Locally
1. **Start the MongoDB service**
2. **Run the backend application**
   ```bash
   npm run start:dev

## Running the Frontend Locally
1. **Run the frontend application**
   ```bash
   npm run dev

## TODO
1. **Deploy to AWS**
   Current the app is hosted in the VPS not AWS. If you are gonna host the app to AWS, you should use Amazon S3 instead of local file uplodas which is hosted in backend/uplods/posters(served as static content server). Or you can dockerize the frontend and backend app.
2. **Fultter Design**
3. **Add an endpoint to delete movie**

## API Documentation
Endpoint | Method | Description | Query Params
| :--- | :--- | :--- | :---:
/movies  | GET | Fetch a list of all movies in the database. | page: Optional, pagination for the results (e.g., page=1).<br>limit: Optional, limit the number of results per page (e.g., limit=10).
/movies/:id  | GET |  Fetch a single movie by its ID. | none
/movies  | POST | Create a new movie in the database. | none
/movies/:id  | PUT | Update an existing movie by its ID. | none
1. **Get All Movies**
   * Endpoint: `/movies`
   * Method: `GET`
   * Description: Fetch a list of all movies in the database.
   * Query Params:
        - `page`: Optional, pagination for the results (e.g., `page=1`).
        - `limit`: Optional, limit the number of results per page (e.g., `limit=10`).
   * Response:
     ```json
     {
        "message": "Movies fetched sucessfully",
        "movies": [
          {
            "_id": "67c072bad79f177ce3e2ea9d",
            "title": "Room1",
            "year": 2024,
            "poster": "1740665525718-blurred-background-coffee-shop-garden-blur-background-with-bokeh-vintage-filtered-image.jpg",
            "__v": 0
          },
          {
            "_id": "67c07d02d79f177ce3e2ead0",
            "title": "Room3",
            "year": 2004,
            "poster": "1740668162467-pexels-photo-2883049.jpg",
            "__v": 0
          }
        ],
        "totalMovies": 2
      }
2. **Get Movie by ID**
   * Endpoint: `/movies/:id`
   * Method: `GET`
   * Description: Fetch a single movie by its ID.
   * Path Parameter:
        - `id`: The ID of the movie (e.g., `id=1`).
   * Response:
     ```json
     {
        "message": "Movie fetched successfully",
        "movie": {
          "_id": "67c072bad79f177ce3e2ea9d",
          "title": "Room1",
          "year": 2024,
          "poster": "1740665525718-blurred-background-coffee-shop-garden-blur-background-with-bokeh-vintage-filtered-image.jpg",
          "__v": 0
        }
      }
3. **Create a New Movie**
   * Endpoint: `/movie`
   * Method: `POST`
   * Description: Create a new movie in the database.
   * Request Body:
     ```json
     {
        "title": "Waterfall"
        "year": 2024
        "poster": (binary) //which is the file to upload from dropzone
     }
   * Response:
     ```json
     {
          "message": "Movie created successfully",
          "movie": {
              "title": "Waterfall",
              "year": 2024,
              "poster": "1740673361812-waterfall.png",
              "_id": "67c09153ac8101689800d597",
              "__v": 0
          }
      }
