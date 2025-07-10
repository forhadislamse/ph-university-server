# University Management Server Backend

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

- **Node.js** (v16+)
- **MongoDB** (Running locally or a cloud-based instance such as MongoDB Atlas)
- **NPM or Yarn** for package management
- **Environment variables setup**

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
   PORT= port number
   DATABASE_URL= mongodb+srv://<your-db-uri>
   NODE_ENV= development
   BCRYPT_SALT_ROUNDS= salt_round
   DEFAULT_PASS= your password
   JWT_SECRET= your_secret_key
   JWT_EXPIRES_IN= your expire time
```

## Running the Application

We can run the application using the following npm scripts:

### **1. Build the application:**

This command compiles the TypeScript files into JavaScript files:

`npm run build`

### **2. Start the application:**

After building the application, we can start it with the following command:

`npm run start`

### **3. Start the application in development mode:**

For development, we use the start:dev script, which runs the application using ts-node-dev, so it will automatically reload on file changes:

`npm run start:dev`

### **4. Start the application in production mode with nodemon:**

This script uses nodemon to restart the application automatically when changes occur in the compiled JavaScript files:

`npm run start:prod`

### **5. Linting:**

To run ESLint and check for code issues, use the following command:

`npm run lint`

To automatically fix linting issues, use:

`npm run lint:fix`

### **6. Prettier:**

To format your code with Prettier (ignoring .gitignore files), use this command:

`npm run prettier`

To automatically fix prettier issues, use:

`npm run prettier:fix`

## Features

- Role-based user management (Admin, Student, Faculty)
- Academic semester and registration CRUD with validations
- Academic faculties & departments associations
- Course creation with prerequisite management
- Course offerings with faculty assignment and time-slot conflict detection
- Semester registration logic and credit limits
- Input validation powered by Zod
- MongoDB transactions for critical operations like creation and deletion
- Error handling and standardized API responses

## Technologies Used

- **[Express](https://expressjs.com/)**: Fast, unopinionated, minimalist web framework for Node.js.
- **[TypeScript](https://www.typescriptlang.org/)**: Strongly typed programming language that builds on JavaScript.
- **[MongoDB](https://www.mongodb.com/)**: Flexible, scalable, and high-performance NoSQL database that utilizes a document-oriented data model.
- **[Mongoose](https://mongoosejs.com/)**: Elegant MongoDB object modeling for Node.js.
- **[Zod](https://github.com/colinhacks/zod)**: TypeScript-first schema declaration and validation library.
- **[ESlint](https://eslint.org/)**: Find and fix problems in your JavaScript code.
- **[Prettier](https://prettier.io/docs/)**: Prettier is an opinionated code formatter.

## Folder Structure

```
|   app.ts
|   server.ts
|
\---app
    +---builder
    |       QueryBuilder.ts
    |
    +---config
    |       index.ts
    |
    +---errors
    |       AppError.ts
    |       handleCastError.ts
    |       handleDuplicateError.ts
    |       handleValidationError.ts
    |       handleZodError.ts
    |
    +---interface
    |       error.ts
    |
    +---middlewares
    |       globalErrorhandler.ts
    |       notFound.ts
    |       validateRequest.ts
    |
    +---modules
    |   +---academicDepartment
    |   |       academicDepartment.controller.ts
    |   |       academicDepartment.interface.ts
    |   |       academicDepartment.model.ts
    |   |       academicDepartment.route.ts
    |   |       academicDepartment.service.ts
    |   |       academicDepartment.validation.ts
    |   |
    |   +---academicFaculty
    |   |       academicFaculty.controller.ts
    |   |       academicFaculty.interface.ts
    |   |       academicFaculty.model.ts
    |   |       academicFaculty.routes.ts
    |   |       academicFaculty.service.ts
    |   |       academicFaculty.validation.ts
    |   |
    |   +---academicSemester
    |   |       academicSemester.constant.ts
    |   |       academicSemester.controller.ts
    |   |       academicSemester.interface.ts
    |   |       academicSemester.model.ts
    |   |       academicSemester.routes.ts
    |   |       academicSemester.service.ts
    |   |       academicSemester.validation.ts
    |   |
    |   +---Admin
    |   |       admin.constant.ts
    |   |       admin.controller.ts
    |   |       admin.interface.ts
    |   |       admin.model.ts
    |   |       admin.route.ts
    |   |       admin.service.ts
    |   |       admin.validation.ts
    |   |
    |   +---course
    |   |       course.constant.ts
    |   |       course.controller.ts
    |   |       course.interface.ts
    |   |       course.model.ts
    |   |       course.routes.ts
    |   |       course.service.ts
    |   |       course.validation.ts
    |   |
    |   +---faculty
    |   |       faculty.constant.ts
    |   |       faculty.controller.ts
    |   |       faculty.interface.ts
    |   |       faculty.model.ts
    |   |       faculty.route.ts
    |   |       faculty.service.ts
    |   |       faculty.validation.ts
    |   |
    |   +---offeredCourse
    |   |       offeredCourse.constant.ts
    |   |       offeredCourse.controller.ts
    |   |       offeredCourse.interface.ts
    |   |       offeredCourse.model.ts
    |   |       offeredCourse.route.ts
    |   |       offeredCourse.service.ts
    |   |       offeredCourse.utils.ts
    |   |       offeredCourse.validation.ts
    |   |
    |   +---semesterRegistration
    |   |       semesterRegistration.constant.ts
    |   |       semesterRegistration.controller.ts
    |   |       semesterRegistration.interface.ts
    |   |       semesterRegistration.model.ts
    |   |       semesterRegistration.route.ts
    |   |       semesterRegistration.service.ts
    |   |       semesterRegistration.validation.ts
    |   |
    |   +---student
    |   |       student.constant.ts
    |   |       student.controller.ts
    |   |       student.interface.ts
    |   |       student.model.ts
    |   |       student.route.ts
    |   |       student.service.ts
    |   |       student.zod.validation.ts
    |   |
    |   \---user
    |           user.controller.ts
    |           user.interface.ts
    |           user.model.ts
    |           user.routes.ts
    |           user.services.ts
    |           user.utils.ts
    |           user.zodValidation.ts
    |
    +---routes
    |       index.ts
    |
    \---utils
            catchAsync.ts
            sendResponse.ts

```
