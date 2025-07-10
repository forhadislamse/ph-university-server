# University Management System Backend

A full-featured backend API for managing users (Admin, Student, Faculty), academic semesters, faculties, departments, course creation, course offerings, and semester registration for a university system. Built with **TypeScript**, **Express**, **MongoDB (Mongoose)**, and **Zod**.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Features](#features)
- [Technology Used](#technology-used)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Licenses](#licenses)

## Requirements

Before starting the project we should ensure that we have the following software installed:

- **Node.js** (v14 or higher)
- **MongoDB** (Running locally or a cloud-based instance such as MongoDB Atlas)
- **NPM or Yarn** for package management

## Installation

**1. Clone the repository:**

```
   git clone https://github.com/forhadislamse/university-management-server.git
   cd university-management-server
   // Using npm:
   npm install
   // Or, using yarn:
   yarn install
```

2. Create a `.env` file in the root of the project directory to store environment variables. Example .env file:

```
   PORT=port number
   DATABASE_URL=mongodb atlas connection
```
