# Star Wars App Project

This project is a **React application** using **Vite** for fast development and **TypeScript** for static typing. The app is containerized with **Docker** and **Docker Compose** for easy setup and deployment.

---

## Installation Instructions

### 1. Clone the repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/caiqalmeida/star-wars-app.git
cd star-wars-app
```

### 2. Install Dependencies
Ensure you have Node.js, Docker, and Docker Compose installed.

Install Node.js
Install Docker
Install Docker Compose
Install project dependencies:

```bash
npm install
```

Alternatively, dependencies will be installed within the Docker container when you build it.

## Running the Application
### Development Mode
To start the app in development mode with hot reloading, run:

```bash
npm run dev
```
This will:

Build the Docker image for the app (using the Dockerfile).
Start the app in development mode using Vite, with hot-reloading enabled.
Open the app at http://localhost:3000.

### Production Mode
To run the app in production mode with an optimized build:

Build the app using Vite:

```bash
npm run build
```

Start the app in production mode:

```bash
docker-compose up --build
```
The production build will be available at http://localhost:3000.

---

# To fix

- [ ] Typescript type errors (principally, people array)
- [ ] Handle API errors
- [ ] Fix lint can't find vitest (vi) namespace

# To improve

- [ ] Refactor search logic
- [ ] Refactor filter logic (to work with pagination)
- [ ] Refactor people state to handle pagination and without
- [ ] Change complex state to handle with Redux
- [ ] 