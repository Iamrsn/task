# Task Management Application (MERN Stack)

A lightweight, full-stack Task Management application built using the **MERN** stack (MongoDB, Express.js, React, Node.js) with JavaScript and Vite.

---

## Overview

This project is a single-page application that allows users to manage daily tasks seamlessly. Users can view all active tasks, add new tasks with specific statuses (`todo`, `in-progress`, `done`), change task statuses dynamically, and remove tasks.

### Key Highlights
- **Full-Stack JavaScript:** End-to-end integration using Express and React.
- **Input Validation:** Server-side checks to prevent empty titles or invalid statuses.
- **Error Handling:** Graceful error messages and status codes for smooth client-server communication.
- **Fast Development Setup:** Built on Vite for quick frontend bundling and HMR.

---

## Tech Stack

* **Frontend:** React 18, Vite, Native Fetch API
* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose ORM
* **Environment Configuration:** `dotenv`

---

## Repository Structure

```text
task-app/
├── backend/
│   ├── config/
│   │   └── db.js            # Database connection configuration
│   ├── controllers/
│   │   └── taskController.js# Business logic & request handling
│   ├── models/
│   │   └── Task.js          # Mongoose schema definition
│   ├── routes/
│   │   └── taskRoutes.js    # Express API endpoints
│   ├── .env.example
│   ├── package.json
│   └── server.js            # Express server entry point
├── frontend/
│   ├── src/
│   │   ├── api.js           # Centralized API fetcher service
│   │   ├── App.jsx          # Main UI dashboard and state logic
│   │   └── main.jsx         # React DOM mounting
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
└── README.md
