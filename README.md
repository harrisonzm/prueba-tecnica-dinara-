# Student Management System

## Context
This application allows creating courses, users, and enrollments using the ID of the user and course from already-created entities. The creation, deletion, or modification of these is displayed in real time within the **Home** project, hosted at `http://localhost:3004`.

A **SPA** has been built using `react-router-dom`, making use of components created in other projects with **MUI** and **Module Federation**, allowing the application to be highly scalable and enabling development teams to work in their own environment. This way, components can be reused on any permitted page.

These components consume an **API** hosted at `http://localhost:3000`, which follows a **microservices architecture** with an independent database per microservice. Foreign key validations are handled at the logic layer to take advantage of the benefits of microservices, allowing each team to focus on its own development.

Communication between microservices is done via messages over **TCP**, leveraging **NestJS**'s native way of creating microservices. All endpoint requests are automatically validated with **NestJS** pipelines, using `class-transformer` and `class-validator`.
![image](https://github.com/user-attachments/assets/8c124dfe-93bc-4866-b201-b9cf1c510922)


---

## 📌 Installation and Setup
To run the project, follow these steps:

1. Download the project.
2. If you have the **Docker** extension in **VSCode**, use the **Run All Services** option inside the `docker-compose.yml` at the root of the project.
3. If you are not using the extension, run the following command from the terminal at the root of the project:
   
   ```sh
   docker-compose up -d
   ```

---

## 🌍 Deployed Service URLs

### Frontend:
- **Web App Home:** [http://localhost:3004](http://localhost:3004)
- **Users Project:** [http://localhost:3005](http://localhost:3005)
- **Courses Project:** [http://localhost:3006](http://localhost:3006)
- **Enrollments Project:** [http://localhost:3007](http://localhost:3007)

### Backend:
- **REST API:** [http://localhost:3000](http://localhost:3000)
- **Endpoints:**
  - **Users:** [http://localhost:3000/users/student](http://localhost:3000/users/student)
    - Supports operations: `GET`, `POST`, `PATCH`, `DELETE`.
  - **Courses:** [http://localhost:3000/courses](http://localhost:3000/courses)
    - Supports operations: `GET`, `POST`, `PATCH`, `DELETE`.
  - **Enrollments:** [http://localhost:3000/courses/inscriptions](http://localhost:3000/courses/inscriptions)
    - Supports `GET`, `POST`, and `DELETE` (`PATCH` was not implemented because editing an enrollment does not make sense).
    - Searches can be performed using query params:
      ```sh
      http://localhost:3000/courses/inscriptions/?idUser={id}&idCourse={id}
      ```
      - No parameters: retrieves all enrollments.
      - With `idUser` or `idCourse`: filters enrollments by the provided ID.
      - With both parameters: finds the exact enrollment of the user in the course.

---

## 📌 Project Entities
### 📌 Users
```ts
export interface User {
  id: string;
  fullName: string;
  departmentOfIssue: string;
  placeOfIssue: string;
  gender: string;
  ethnicity: string;
  personalEmail: string;
  institutionalEmail: string;
  mobilePhone: string;
  landlinePhone: string;
  birthDate: string;
  nationality: string;
}
```

### 📌 Enrollments
```ts
export interface Inscription {
  idUser: string;
  idCourse: string;
}
```

### 📌 Courses
#### Creation Entity
```ts
export interface Course {
  id: string;
  name: string;
  limit: number;
}
```

#### Entity in GET Responses
```ts
export interface Course {
  id: string;
  name: string;
  limit: number;
  students: number;
}
```

---

## 📌 Components on each microfrontend page

### 🏠 **Page 1 - Users**
- **User List**
- **Create User Form**
- **User Card**

### 🏠 **Page 2 - Enrollments**
- **Enrollment List**
- **Enrollment Card**
- **Enrollment Form**

### 🏠 **Page 3 - Courses**
- **Course List**
- **Create Course Form**
- **Course Card**






