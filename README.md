# GitHub Profile Analyzer API

A RESTful backend API built using Node.js, Express.js, MySQL, and GitHub Public API to analyze GitHub user profiles and store useful repository insights.

---

# Live Demo

## Live API URL
https://github-profile-analyzer-api-3lko.onrender.com

## Swagger Documentation
https://github-profile-analyzer-api-3lko.onrender.com/api-docs

## GitHub Repository
https://github.com/Sai13122005/github-profile-analyzer

---

# Features

- Fetch GitHub public profile data using username
- Analyze repository insights
- Store analysis results in MySQL
- Fetch all analyzed profiles
- Fetch single analyzed profile
- Search profiles
- Delete profile data
- Swagger API documentation
- Cloud deployed backend and database

---

# Tech Stack

- Node.js
- Express.js
- MySQL
- GitHub REST API
- Swagger UI
- Railway (MySQL Hosting)
- Render (Backend Deployment)

---

# Project Structure

```bash
github-profile-analyzer/
│
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── swagger.js
│   │
│   ├── controllers/
│   │   └── githubController.js
│   │
│   ├── middleware/
│   │   └── errorMiddleware.js
│   │
│   ├── routes/
│   │   └── githubRoutes.js
│   │
│   ├── services/
│   │   └── githubService.js
│   │
│   ├── utils/
│   │   └── calculateInsights.js
│   │
│   ├── app.js
│   └── server.js
│
├── schema.sql
├── package.json
├── .env.example
└── README.md
```

---

# API Endpoints

## Analyze GitHub Profile

### Request

```http
POST /api/github/analyze/:username
```

### Example

```http
POST /api/github/analyze/octocat
```

---

## Get All Profiles

```http
GET /api/github/profiles
```

---

## Get Single Profile

```http
GET /api/github/profile/:username
```

### Example

```http
GET /api/github/profile/octocat
```

---

## Search Profiles

```http
GET /api/github/search?username=octo
```

---

## Delete Profile

```http
DELETE /api/github/profile/:username
```

---

# Example Response

```json
{
  "success": true,
  "message": "GitHub profile analyzed successfully",
  "profile": {
    "username": "octocat",
    "name": "The Octocat",
    "followers": 22886,
    "publicRepos": 8,
    "profileUrl": "https://github.com/octocat"
  },
  "insights": {
    "totalStars": 21499,
    "totalForks": 165071,
    "mostUsedLanguage": "Ruby",
    "topRepo": "Spoon-Knife",
    "profileScore": 44401
  }
}
```

---

# Database Schema

## Table: github_profiles

```sql
CREATE TABLE github_profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    github_username VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    bio TEXT,
    followers INT,
    following_count INT,
    public_repos INT,
    total_stars INT,
    total_forks INT,
    most_used_language VARCHAR(100),
    top_repo VARCHAR(255),
    profile_score INT,
    github_created_at DATETIME,
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/Sai13122005/github-profile-analyzer.git
```

---

## 2. Move into Project Folder

```bash
cd github-profile-analyzer
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Configure Environment Variables

Create `.env` file:

```env
PORT=5000

DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name

GITHUB_TOKEN=your_github_token
```

---

# 5. Create Database Table

Run SQL from:

```bash
schema.sql
```

---

# 6. Start Server

```bash
npm run dev
```

OR

```bash
npm start
```

---

# Swagger Documentation

After running the server:

```bash
http://localhost:5000/api-docs
```

Production:

```bash
https://github-profile-analyzer-api-3lko.onrender.com/api-docs
```

---

# Deployment

## Backend Deployment
- Render

## Database Hosting
- Railway MySQL

---

# Future Improvements

- JWT Authentication
- Redis Caching
- Docker Support
- GitHub Contribution Analysis
- Unit Testing with Jest
- CI/CD Pipeline

---

# Author

## Saikrishna

GitHub:
https://github.com/Sai13122005