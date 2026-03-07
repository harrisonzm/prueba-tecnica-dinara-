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


# Student Management System  ESPAÑOL

## Contexto
Esta aplicación permite crear cursos, usuarios e inscripciones usando el ID del usuario y curso de entidades ya creadas. La visualización de la creación, eliminación o alteración de estos se muestra en tiempo real dentro del proyecto **Home**, alojado en `http://localhost:3004`.

Se ha montado una **SPA** utilizando `react-router-dom`, haciendo uso de componentes creados en otros proyectos con **MUI** y **Module Federation**, permitiendo que la aplicación sea altamente escalable y que equipos de desarrollo trabajen en su propio entorno. De esta manera, los componentes pueden ser reutilizados en cualquier página permitida.

Estos componentes consumen una **API** alojada en `http://localhost:3000`, que sigue una **arquitectura de microservicios** con una base de datos independiente por microservicio. Las validaciones de las foreign keys se manejan en la capa lógica para aprovechar las ventajas de los microservicios, permitiendo que cada equipo se enfoque en su propio desarrollo.

La comunicación entre microservicios se realiza mediante mensajes vía **TCP**, aprovechando la forma nativa de **NestJS** para crear microservicios. Todas las solicitudes a los endpoints son validadas automáticamente con pipelines de **NestJS**, usando `class-transform` y `class-validator`.
![image](https://github.com/user-attachments/assets/8c124dfe-93bc-4866-b201-b9cf1c510922)


---

## 📌 Instalación y Ejecución
Para ejecutar el proyecto, sigue estos pasos:

1. Descarga el proyecto.
2. Si tienes la extensión de **Docker** en **VSCode**, usa la opción **Run All Services** dentro del `docker-compose.yml` de la raíz del proyecto.
3. Si no usas la extensión, ejecuta el siguiente comando desde la terminal en la raíz del proyecto:
   
   ```sh
   docker-compose up -d
   ```

---

## 🌍 URLs de Servicios Desplegados

### Frontend:
- **Home de la Web App:** [http://localhost:3004](http://localhost:3004)
- **Proyecto de Usuarios:** [http://localhost:3005](http://localhost:3005)
- **Proyecto de Cursos:** [http://localhost:3006](http://localhost:3006)
- **Proyecto de Inscripciones:** [http://localhost:3007](http://localhost:3007)

### Backend:
- **API REST:** [http://localhost:3000](http://localhost:3000)
- **Endpoints:**
  - **Usuarios:** [http://localhost:3000/users/student](http://localhost:3000/users/student)
    - Soporta operaciones: `GET`, `POST`, `PATCH`, `DELETE`.
  - **Cursos:** [http://localhost:3000/courses](http://localhost:3000/courses)
    - Soporta operaciones: `GET`, `POST`, `PATCH`, `DELETE`.
  - **Inscripciones:** [http://localhost:3000/courses/inscriptions](http://localhost:3000/courses/inscriptions)
    - Soporta `GET`, `POST`, y `DELETE` (No se implementó `PATCH` porque no tiene sentido editar una inscripción).
    - Se pueden realizar búsquedas con query params:
      ```sh
      http://localhost:3000/courses/inscriptions/?idUser={id}&idCourse={id}
      ```
      - Sin parámetros: obtiene todas las inscripciones.
      - Con `idUser` o `idCourse`: filtra inscripciones según el ID proporcionado.
      - Con ambos parámetros: busca la inscripción exacta del usuario en el curso.

---

## 📌 Entidades del Proyecto
### 📌 Usuarios
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

### 📌 Inscripciones
```ts
export interface Inscription {
  idUser: string;
  idCourse: string;
}
```

### 📌 Cursos
#### Entidad de Creación
```ts
export interface Course {
  id: string;
  name: string;
  limit: number;
}
```

#### Entidad en las Respuestas GET
```ts
export interface Course {
  id: string;
  name: string;
  limit: number;
  students: number;
}
```

---

## 📌 Componentes en cada página del microfrontend

### 🏠 **Página 1 - Usuarios**
- **Lista de Usuarios**
- **Formulario para Crear Usuarios**
- **Tarjeta de Usuario**

### 🏠 **Página 2 - Inscripciones**
- **Lista de Inscripciones**
- **Tarjeta de Inscripción**
- **Formulario de Inscripción**

### 🏠 **Página 3 - Cursos**
- **Lista de Cursos**
- **Formulario para Crear Cursos**
- **Tarjeta de Curso**


