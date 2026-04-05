# zorvyn_assignement

## Live API

https://zorvyn-assignement.onrender.com

---
## Live Documentation

https://dark-escape-794411.docs.buildwithfern.com

---


## Overview

This is a backend system for a finance dashboard that manages financial transactions and users based on roles. It provides APIs for CRUD operations, authentication, and dashboard analytics.

---

## Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <project-folder>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run the Server

```bash
npm start
```

---

## Authentication

* Uses JWT (JSON Web Token)
* Pass token in headers:

```http
Authorization: <token>
```

---

## Roles and Permissions

| Role    | Permissions                            |
| ------- | -------------------------------------- |
| Viewer  | View dashboard only                    |
| Analyst | View transactions and dashboard        |
| Admin   | Full access (CRUD and user management) |

---

## API Endpoints

### Auth

```http
POST   /auth/register
POST   /auth/login
```

---

### Users (Admin Only)

```http
GET    /users
PATCH  /users/:id
```

---

### Transactions

```http
GET    /transactions
POST   /transactions
PUT    /transactions/:id
DELETE /transactions/:id
```

Supports:

* Filtering (type, category)
* Search
* Pagination

---

### Dashboard

```http
GET /dashboard
GET /dashboard/category
GET /dashboard/trends
```

---

## Features

* JWT Authentication
* Role-Based Access Control
* Modular Architecture
* Full CRUD Operations
* Dashboard Analytics
* Filtering, Search, Pagination

---

## Project Structure

```
 ├── controllers/
 ├── routes/
 ├── models/
 ├── middleware/
 ├── config/
```

---

## Limitations

* No refresh token support
* Basic validation
* Aggregation handled in application logic

---

## Future Improvements

* Use MongoDB aggregation pipeline
* Add Swagger API documentation
* Add unit and integration tests
* Improve validation using Joi or express-validator

---

## Final Note

This project focuses on clean backend design, role-based access control, and structured API development aligned with real-world practices.
