# Voting System Platform

A full-stack voting system built with:

* React (Frontend for users/voters)
* Laravel API (Backend)
* AdminLTE (Admin Dashboard)

This system allows users to register, get approved by an admin, and participate in voting securely.

---

# Project Overview

This platform provides:

* User registration & authentication
* Admin approval system
* Voting between users (candidates)
* Admin dashboard for managing users and votes
* Secure API-based architecture

### User Roles

* **Admin**

  * Approve / reject users
  * View Voting Leaderboard

* **Candidate (User)**

  * Register account
  * Wait for approval
  * Vote for other users

---

# Tech Stack

### Frontend

* React (Vite)
* Axios
* Bootstrap 

### Backend

* Laravel 12 (API)
* Laravel Sanctum (Auth)
* MySQL

### Admin Panel

* AdminLTE (Blade templates)

---

# Installation Steps

## 1️⃣ Clone the repository

```bash
git clone [https://github.com/your-username/voting-system.git](https://github.com/Abdelwahab-Saeed/Voting-System)
cd voting-system
```

---

## 2️⃣ Backend Setup (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

---

## 3️⃣ Environment Configuration

Edit `.env`:

```env
APP_NAME=VotingSystem
APP_URL=http://localhost:8000

DB_DATABASE=voting_system
DB_USERNAME=root
DB_PASSWORD=

---

## 4️⃣ Database Setup

```bash
php artisan migrate
php artisan db:seed --class=UserSeeder
```

Create storage link:

```bash
php artisan storage:link
```

---

## 5️⃣ Run Backend

```bash
php artisan serve
```

Backend runs on:

```bash
http://localhost:8000
```

---

## 6️Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173

---

# System Workflow

### Registration

1. User registers
2. Status = `pending`
3. Admin approves/rejects

---

### Voting

* User can vote for other approved users
* Cannot vote for himself
* Cannot vote twice for same user

---

# API Usage

## Auth Routes

### Register

```http
POST /api/register
```

### Login

```http
POST /api/login
```

---

## Users

### Get approved users for voting

```http
GET /api/users
```

### Response Example

```json
{
  "data": [
    {
      "id": 2,
      "name": "Ali",
      "status": "approved",
      "has_voted": true
    }
  ]
}
```

---

## Voting

### Vote for a user

```http
POST /api/vote
```

```json
{
  "target_user_id": 2
}
```

---

# Security Rules

* Users must be **approved**
* Users cannot vote for themselves
* Unique voting constraint:

```sql
UNIQUE(voter_id, target_user_id)
```

---

# Admin Panel (AdminLTE)

Access:

```bash
http://localhost:8000/admin/dashboard
```

### Features:

* Approve / Reject users
* View all users
* Dashboard statistics

