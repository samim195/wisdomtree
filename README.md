# Crypto Tracker

This project is a full-stack web application designed to track cryptocurrency prices and view historical data. It is built with Django as the backend API and React for the frontend interface.

## Features

- View a list of cryptocurrencies available on Coinbase.
- Click on any cryptocurrency to view historical data.
- CRUD functionality for managing cryptocurrency data.
- CORS-enabled for communication between frontend and backend.

## Tech Stack

### Backend

- **Django**: Backend framework for building the REST API.
- **Django Rest Framework (DRF)**: To build and expose RESTful APIs.
- **Celery**: For background task handling (fetching data from Coinbase).
- **Redis**: Message broker for Celery to handle tasks.
- **SQLLite**: Relational database to store cryptocurrency and historical data.

### Frontend

- **React**: Frontend library for building the user interface.
- **Axios**: For making HTTP requests to the Django API.

## Requirements

### Backend

1. Python 3.8+ (or 3.x)
2. Django
3. Django Rest Framework
4. Celery
5. Redis (for Celery tasks)
6. PostgreSQL (or another database of choice)

### Frontend

1. Node.js (latest version)
2. npm or yarn

## Setup Instructions

### Backend Setup

1. Clone the repository.
2. Install the required Python packages:
    ```bash
    pip install -r requirements.txt
    ```
3. Configure environment variables for database, Redis, etc. You can create a `.env` file in the backend directory.
4. Run database migrations:
    ```bash
    python manage.py migrate
    ```
5. Start Redis in the background (for Celery):
    ```bash
    redis-server
    ```
6. Start the Django development server:
    ```bash
    python manage.py runserver
    ```

### Frontend Setup

1. Navigate to the frontend directory.
2. Install the required packages:
    ```bash
    npm install
    ```
3. Run the frontend development server:
    ```bash
    npm start
    ```

The frontend will be available at `http://localhost:3000` or `http://localhost:5173`, and the backend will be served at `http://localhost:8000`.

## Endpoints

### Products API

- **GET** `/api/products/`: Fetch all products.
- **POST** `/api/products/`: Create a new product.
- **PUT** `/api/products/{ticker}/`: Edit an existing product by ticker.

### Historical Data API

- **GET** `/api/historical-data/{ticker}/`: Fetch historical data for a specific product by ticker.

## CORS Setup

CORS (Cross-Origin Resource Sharing) is enabled for communication between the frontend and backend, which is served from different ports in development.

Make sure you configure Django's CORS headers for frontend-to-backend communication:
```bash
pip install django-cors-headers

image.png
