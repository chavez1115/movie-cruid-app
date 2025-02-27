# Movie CRUD App

This is a Movie CRUD application built using NestJS for the backend and a frontend framework of your choice (e.g., React, Angular, etc.). This app allows users to manage movies, with options to upload posters and view the movie details.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Running the Backend Locally](#running-the-backend-locally)
- [Running the Frontend Locally](#running-the-frontend-locally)
- [TODO](#todo)

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
