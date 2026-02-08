# AniFar

## Project Overview

**AniFar** is a RESTful backend application for managing a personal anime library.  
The project provides user authentication, profile management, CRUD operations for anime resources, and integration with the **AniList GraphQL API**.

### Docs
```bash
https://docs.anilist.co/guide/introduction
```
The backend is built using **Node.js**, **Express**, and **MongoDB**, follows a layered architecture with model, route, controller and uses **JWT-based authentication** to secure private endpoints.

The application is deployed on **Render** and the database is hosted on **MongoDB Atlas**.

---

## Technologies Used

- Node.js
- Express.js
- Mongoose
- dotenv
- MongoDB Atlas (For Render)
- MongoDB Compass (For Testing) 
- AniList GraphQL API
- JSON Web Token (JWT)
- Render (Deployment)
  

---

## Setup and Installation

### 1. Clone repository
```bash
git clone https://github.com/F4rqday/AniFar.git
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create .env file if you wanna connect your Data Base (MongoDB) and put it inside and cnange as you wish
```bash
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.hkpdbo5.mongodb.net/anifar?appName=Cluster0 
JWT_SECRET=hereshouldbeyourpassword 
JWT_EXPIRES_IN=7d
ANILIST_API_URL=https://graphql.anilist.co
```

- `<username>` and `<password>` should be replaced with your MongoDB Atlas data.
- or you can use Compass but make sure that you took localhost from it 
- `JWT_SECRET` can be any secure random string

---

## Running the project (Render)
```bash
https://anifar.onrender.com/
```
## Running the project (localy)

### Local run
```bash
node src/server.js
```
### Server will start at:
```bash
http://localhost:3000
``` 
---

## API Documentation

### Auth Routes

 | Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login and receive JWT token ||

Body for register:
```bash
{
  "username": "userTest", 
  "email": "user@mail.com",
  "password": "123456"
}
```


Body for login:
```bash
{ 
  "email": "user@mail.com",
  "password": "123456"
}
```

### User Routes (Private endpoints)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/users/profile` | Private | Get logged-in user profile |
| PUT | `/api/users/profile` | Private | Update logged-in user profile |


### Resource Routes (Private endpoints)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/resource` | Private | Create a new resource (add anime to library) |
| GET | `/api/resource` | Private | Get all user resources |
| GET | `/api/resource/:id` | Private | Get a specific resource by Mongo `_id` |
| PUT | `/api/resource/:id` | Private | Update a specific resource by Mongo `_id` |
| DELETE | `/api/resource/:id` | Private | Delete a specific resource by Mongo `_id` |

Body for POST anime:
```bash
{
  "anilistId": 20,
  "title": "Naruto",
  "notes": "my childhood anime"
}
```

Headers for GET /api/resource | GET /api/resource/:id | DELETE /api/resource/:id (in Postman) 
```bash
Authorization: Bearer <JWT_TOKEN>
```


Headers for PUT /api/resource/:id (in Postman) 
```bash
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```



### AniList Routes
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/anilist/search?query=<title>` | Public | Search anime by title (AniList GraphQL) |
| GET | `/api/anilist/:id` | Public | Get anime details by AniList ID |

