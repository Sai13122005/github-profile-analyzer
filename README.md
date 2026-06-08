# GitHub Profile Analyzer API

A backend REST API built using Node.js, Express.js, MySQL, and GitHub Public API to analyze GitHub user profiles and store useful developer insights.

---

## Features

- Analyze GitHub public profiles
- Fetch repository statistics
- Store analyzed data in MySQL
- Search analyzed profiles
- Pagination support
- Delete stored profiles
- Swagger API documentation
- RESTful API architecture

---

## Tech Stack

- Node.js
- Express.js
- MySQL
- GitHub REST API
- Swagger UI

---

## Project Structure

```bash
github-profile-analyzer/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── .env.example
├── schema.sql
├── package.json
└── README.md