# Task Manager – Helfy Home Assignment

## Overview

Full-stack Task Manager application built as part of a home assignment.
The application allows users to create, update, delete and manage tasks with filtering and search capabilities.

## Features

- Create a new task
- Edit existing task
- Delete task
- Mark task as completed / todo
- Set task priority (low / medium / high)
- Filtering & Search
- Search by title
- Filter by status (All / Todo / Done)
- Filter by priority
- Endless Carousel


## How To Run
### Backend
```bash
cd backend
npm install
npm run dev -> start with nodemon
npm run start -> start with node
```
Server runs on http://localhost:4000

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Client side runs on http://localhost:5173

## API Endpoints
- GET /api/tasks -> Get all tasks
- POST /api/tasks -> Create a new task
- DELETE /api/tasks/:id -> Delete a task by ID
- PATCH /api/tasks/:id/toggle -> Toggle task completion status
- PUT /api/tasks/:id -> Update task title, description and priority

## Design Decisions and Assumptions
- ID is auto-generated
- Tasks are stored in memory (no database)
- Title and priority is mandatory, description is optional
- Separation between API logic and UI logic
- Derived state handled using useMemo
- Controlled components for form handling
- Error and loading states handled explicitly

## Time Spent On Each Part
- Backend : 60 min~
- Frontend : 150 min~
- README + Polish : 30 min~