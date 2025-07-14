# University Management Server Backend

A full-featured backend API for managing users (Admin, Student, Faculty), academic semesters, faculties, departments, course creation, course offerings, and semester registration for a university system. Built with **TypeScript**, **Express**, **MongoDB (Mongoose)**, and **Zod**.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Features](#features)
- [Technology Used](#technology-used)
- [Folder Structure](#folder-structure)
- [Entity Relationship Diagram (ERD)](#entity-relationship-diagram-erd)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
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

## Entity Relationship Diagram (ERD)

![ER Diagram](./Final.png)

## API Endpoints

**1. User Routes:**

| Method | Endpoint                       | Description             |
| ------ | ------------------------------ | ----------------------- |
| POST   | `/api/v1/users/create-student` | Create new student user |
| POST   | `/api/v1/users/create-faculty` | Create new faculty user |
| POST   | `/api/v1/users/create-admin`   | Create new admin user   |

**2. Admin Routes:**

| Method | Endpoint             | Description                                                                            |
| ------ | -------------------- | -------------------------------------------------------------------------------------- |
| GET    | `/api/v1/admins`     | Get all admins — supports email, searchTerm, fields, sort, page, limit as query params |
| GET    | `/api/v1/admins/:id` | Get single admin                                                                       |
| PATCH  | `/api/v1/admins/:id` | Update admin info                                                                      |
| DELETE | `/api/v1/admins/:id` | Delete an admin                                                                        |

**3. Student Routes:**

| Method | Endpoint               | Description                                                                              |
| ------ | ---------------------- | ---------------------------------------------------------------------------------------- |
| GET    | `/api/v1/students`     | Get all students — supports email, searchTerm, fields, sort, page, limit as query params |
| GET    | `/api/v1/students/:id` | Get single student                                                                       |
| PATCH  | `/api/v1/students/:id` | Update student info                                                                      |
| DELETE | `/api/v1/students/:id` | Delete a student                                                                         |

**4. Faculty Routes:**

| Method | Endpoint                | Description                                                                               |
| ------ | ----------------------- | ----------------------------------------------------------------------------------------- |
| GET    | `/api/v1/faculties`     | Get all faculties — supports email, searchTerm, fields, sort, page, limit as query params |
| GET    | `/api/v1/faculties/:id` | Get single faculty                                                                        |
| PATCH  | `/api/v1/faculties/:id` | Update faculty info                                                                       |
| DELETE | `/api/v1/faculties/:id` | Delete a faculty                                                                          |

**5. Academic Semester:**

| Method | Endpoint                                              | Description        |
| ------ | ----------------------------------------------------- | ------------------ |
| POST   | `/api/v1/academic-semesters/create-academic-semester` | Create semester    |
| GET    | `/api/v1/academic-semesters`                          | Get all semesters  |
| GET    | `/api/v1/academic-semesters/:id`                      | Get semester by ID |
| PATCH  | `/api/v1/academic-semesters/:id`                      | Update semester    |

**6. Academic Faculty:**

| Method | Endpoint                                             | Description       |
| ------ | ---------------------------------------------------- | ----------------- |
| POST   | `/api/v1/academic-faculties/create-academic-faculty` | Create faculty    |
| GET    | `/api/v1/academic-faculties`                         | Get all faculties |
| GET    | `/api/v1/academic-faculties/:id`                     | Get by ID         |
| PATCH  | `/api/v1/academic-faculties/:id`                     | Update faculty    |

**7. Academic Department:**

| Method | Endpoint                                                  | Description         |
| ------ | --------------------------------------------------------- | ------------------- |
| POST   | `/api/v1/academic-departments/create-academic-department` | Create department   |
| GET    | `/api/v1/academic-departments`                            | Get all departments |
| GET    | `/api/v1/academic-departments/:id`                        | Get by ID           |
| PATCH  | `/api/v1/academic-departments/:id`                        | Update department   |

**8. Course:**

| Method | Endpoint                                     | Description       |
| ------ | -------------------------------------------- | ----------------- |
| POST   | `/api/v1/courses/create-course`              | Create course     |
| GET    | `/api/v1/courses`                            | Get all courses   |
| GET    | `/api/v1/courses/:id`                        | Get single course |
| PATCH  | `/api/v1/courses/:id`                        | Update course     |
| DELETE | `/api/v1/courses/:id`                        | Delete course     |
| PUT    | `/api/v1/courses/:courseId/assign-faculties` | Assign faculty    |
| DELETE | `/api/v1/courses/:courseId/remove-faculties` | Remove faculty    |

**9. Semester Registration:**

| Method | Endpoint                                                      | Description                       |
| ------ | ------------------------------------------------------------- | --------------------------------- |
| POST   | `/api/v1/semester-registrations/create-semester-registration` | Create registration               |
| GET    | `/api/v1/semester-registrations`                              | Get all registrations             |
| GET    | `/api/v1/semester-registrations/:id`                          | Get one registration              |
| PATCH  | `/api/v1/semester-registrations/:id`                          | Update registration               |
| DELETE | `/api/v1/semester-registrations/:id`                          | Delete registration (if UPCOMING) |

**10. Offered Course:**

| Method | Endpoint                                        | Description                           |
| ------ | ----------------------------------------------- | ------------------------------------- |
| POST   | `/api/v1/offered-courses/create-offered-course` | Create new offered course             |
| GET    | `/api/v1/offered-courses`                       | Get all offered courses               |
| GET    | `/api/v1/offered-courses/:id`                   | Get single offered course             |
| PATCH  | `/api/v1/offered-courses/:id`                   | Update offered course (time, faculty) |
| DELETE | `/api/v1/offered-courses/:id`                   | Delete offered course                 |

## Error Handling

**Sample global Error Responses example**

**Zod Error**
Occurs when the request body fails Zod validation (e.g., missing fields or wrong types).

```json
{
  "success": false,
  "message": "Zod Validation Error",
  "errorSources": [
    {
      "path": "dateOfBirth",
      "message": "Expected string, received number"
    }
  ],
  "stack": null // only in development
}
```

**Mongoose Validation Error**
Occurs when Mongoose schema validation fails (e.g., required field missing in DB schema).

```json
{
  "success": false,
  "message": "Mongoose Validation Error",
  "errorSources": [
    {
      "path": "year",
      "message": "Path `year` is required."
    }
  ],
  "stack": null
}
```

**Cast Error**
Occurs when an invalid ObjectId is passed in a route param (e.g., /students/123abc)

```json
{
  "success": false,
  "message": "Invalid Id",
  "errorSources": [
    {
      "path": "_id",
      "message": "Cast to ObjectId failed for value \"6854eac205b8398cf46e1e\" (type string) at path \"_id\" for model \"AcademicSemester\""
    }
  ],
  "stack": null
}
```

**Duplicate Error (MongoDB Error Code 11000)**
Occurs when inserting a document with a unique constraint that already exists.

```json
{
  "success": false,
  "message": "Duplicate entry for name:\"Department of English\"",
  "errorSources": [
    {
      "path": "name",
      "message": "Department of English already exists"
    }
  ],
  "stack": null // only in development
}
```

**AppError (Custom Error)**
Thrown explicitly using throw new AppError(...), often for business rules.

```json
{
  "success": false,
  "message": "Semester registration is already ENDED",
  "errorSources": [
    {
      "path": "",
      "message": "Semester registration is already ENDED"
    }
  ],
  "stack": "..."
}
```

**Generic JavaScript Error (Error)**
Any uncaught throw new Error(...).

```json
{
  "success": false,
  "message": "Unexpected failure in processing request",
  "errorSources": [
    {
      "path": "",
      "message": "Unexpected failure in processing request"
    }
  ],
  "stack": "..."
}
```

**Not Found Route**
if no matching routes then response will be

```json
{
  "success": false,
  "message": "API Not Found !!",
  "error": ""
}
```

## Licenses:

//add this section later

## Happy Coding
