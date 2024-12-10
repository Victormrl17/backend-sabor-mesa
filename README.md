# Make It Real - Sabor&Mesa Backend 🍽️

Sabor & Mesa is the perfect app for lovers of Peruvian cuisine. With our platform, you can easily reserve your table at the best restaurants in Peru, enjoying unique culinary experiences in real-time.

# Table of Contents

1. [Sabor&Mesa Backend 🍽️](#sabormesa-backend-)

   - [Installation](#installation)
   - [Usage](#usage)
   - [Environment Variables](#environment-variables)

2. [Restaurant Booking API](#restaurant-booking-api)

   - [API Endpoints](#api-endpoints)
     - [User Routes](#user-routes)
     - [Restaurant Routes](#restaurant-routes)
     - [Booking Routes](#booking-routes)
     - [Comment Routes](#comment-routes)
   - [Technologies Used](#technologies-used)

3. [Author](#author)
4. [Acknowledgments](#acknowledgments)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/sabor-mesa-backend.git
   cd sabor-mesa-backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up the database:
   ```sh
   npx prisma migrate dev
   ```

## Usage

1. Start the development server:

   ```sh
   npm run dev
   ```

2. Build the project:

   ```sh
   npm run build
   ```

3. Start the production server:
   ```sh
   npm start
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
PORT=your_port (default is 3000)
```

# Restaurant Booking API

This API allows users to register, login, and make bookings at restaurants. It includes routes for user management, restaurant information, booking management, and comments.

## API Endpoints

### User Routes

- **POST** `/api/users/register` - Register a new user
- **POST** `/api/users/login` - Login a user

### Restaurant Routes

- **GET** `/api/restaurants` - Get all restaurants
- **GET** `/api/restaurants/:id` - Get a restaurant by ID
- **POST** `/api/restaurants` - Create a new restaurant (protected)
- **PUT** `/api/restaurants/:id` - Update a restaurant (protected)

### Booking Routes

- **POST** `/api/bookings` - Create a new booking (protected)
- **GET** `/api/bookings/user` - Get bookings by user (protected)
- **GET** `/api/bookings/restaurant/:id` - Get bookings by restaurant
- **GET** `/api/bookings/:id/details` - Get booking details
- **DELETE** `/api/bookings/:id` - Delete a booking (protected)

### Comment Routes

- **POST** `/api/comments` - Add a comment (protected)
- **GET** `/api/comments/restaurant/:id` - Get comments by restaurant

## Technologies Used

- Node.js
- Express
- Prisma
- PostgreSQL
- JWT
- TypeScript

## Author

Full stack Developer:

- Victor Ramirez - [@Victormrl17](https://github.com/Victormrl17) (https://www.linkedin.com/in/victor-ramirez-8049a4193/)

## Acknowledgments

A special thanks to Make it Real, especially [@khriztianmoreno](https://github.com/khriztianmoreno) for the valuable feedback during daily meetings and demos, and to [@nayruthCalla](https://github.com/nayruthCalla) for the support and review.
