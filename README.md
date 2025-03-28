# Student Management System

## Contexto
Esta aplicación permite crear cursos, usuarios e inscripciones usando el ID del usuario y curso de entidades ya creadas. La visualización de la creación, eliminación o alteración de estos se muestra en tiempo real dentro del proyecto **Home**, alojado en `http://localhost:3004`.

Se ha montado una **SPA** utilizando `react-router-dom`, haciendo uso de componentes creados en otros proyectos con **MUI** y **Module Federation**, permitiendo que la aplicación sea altamente escalable y que equipos de desarrollo trabajen en su propio entorno. De esta manera, los componentes pueden ser reutilizados en cualquier página permitida.

Estos componentes consumen una **API** alojada en `http://localhost:3000`, que sigue una **arquitectura de microservicios** con una base de datos independiente por microservicio. Las validaciones de las foreign keys se manejan en la capa lógica para aprovechar las ventajas de los microservicios, permitiendo que cada equipo se enfoque en su propio desarrollo.

La comunicación entre microservicios se realiza mediante mensajes vía **TCP**, aprovechando la forma nativa de **NestJS** para crear microservicios. Todas las solicitudes a los endpoints son validadas automáticamente con pipelines de **NestJS**, usando `class-transform` y `class-validator`.

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

---

## 📌 Contribución
Si deseas contribuir, sigue estos pasos:
1. Realiza un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz un commit (`git commit -m 'Agrega nueva funcionalidad'`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Crea un Pull Request.

¡Gracias por contribuir! 🚀




