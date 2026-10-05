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



Local Setup & QuickstartFollow these steps to get the application running on your local machine.PrerequisitesMake sure you have the following installed on your computer:Node.js (v18.0.0 or higher)npm (comes with Node.js)MongoDB (running locally on port 27017 or a MongoDB Atlas URI)Step 1: Clone the RepositoryBashgit clone <YOUR_REPOSITORY_URL>
cd <YOUR_REPOSITORY_FOLDER_NAME>
Step 2: Backend SetupNavigate to the backend folder:Bashcd backend
Install dependencies:Bashnpm install
Create a .env file in the backend directory (or rename .env.example to .env):Code snippetPORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/task_db
FRONTEND_URL=http://localhost:5173
Start the backend server:Bash# Development mode (with live reload)
npm run dev

# Production mode
npm start
You should see: Server running on port 3000 and MongoDB Connected.Step 3: Frontend SetupOpen a new terminal window, navigate to the frontend folder:Bashcd frontend
Install dependencies:Bashnpm install
Create a .env file in the frontend directory:Code snippetVITE_API_URL=http://localhost:3000/api
Start the Vite development server:Bashnpm run dev
Open your browser and go to http://localhost:5173 to view the application!API DocumentationBase API URL: http://localhost:3000/apiMethodEndpointDescriptionRequest BodyGET/tasksFetch all tasks (sorted newest first)NonePOST/tasksCreate a new task{ "title": "String", "status": "todo" | "in-progress" | "done" }PATCH/tasks/:id/statusUpdate task status{ "status": "todo" | "in-progress" | "done" }DELETE/tasks/:idDelete a task by IDNoneSample API ResponsesSuccessful Task Creation (201 Created)JSON{
  "success": true,
  "data": {
    "_id": "661f2345a1b2c3d4e5f67890",
    "title": "Build full stack task app",
    "status": "todo",
    "createdAt": "2026-04-15T10:00:00.000Z",
    "updatedAt": "2026-04-15T10:00:00.000Z"
  }
}
Validation Error (400 Bad Request)JSON{
  "success": false,
  "error": "Task title cannot be empty"
}
Features & Error Handling DetailsSanitized Inputs: Leading/trailing whitespaces are automatically trimmed from titles.Status Constraints: Status entries are strictly limited to todo, in-progress, or done.Database Safety: Mongoose CastError exceptions (e.g., passing invalid MongoDB ID strings) are handled explicitly to avoid server crashes.User Feedback: Clear error banners display when network failures or bad requests occur.
<FollowUp label="Want me to generate a .gitignore or .env.example file for this project?" query="Generate .gitignore and .env.example files for this MERN task app repository."/>
