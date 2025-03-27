import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, CircularProgress, Box, Card, CardContent } from '@mui/material';
import CourseCard from '../CourseCard';
import CreateCourseForm from '../CreateCourseForm';
import { Course } from '../utils/courses.types';

export interface Inscription {
  idUser: string;
  idCourse: string;
}

type CoursesListProps = {
  idUser?: string;
};

export function CoursesList({ idUser }: CoursesListProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      let coursesUser: Course[] = [];
      if (idUser) {
        // Obtener las inscripciones del usuario
        const res = await axios.get(`http://localhost:3000/api/courses/inscriptions?idUser=${idUser}`);
        const inscriptionsUser: Inscription[] = res.data;
        // Usamos Promise.all para obtener todos los cursos en paralelo
        coursesUser = await Promise.all(
          inscriptionsUser.map(async (inscription) => {
            const courseRes = await axios.get(`http://localhost:3000/api/courses/${inscription.idCourse}`);
            return courseRes.data;
          })
        );
      } else {
        const res = await axios.get(`http://localhost:3000/api/courses/`);
        coursesUser = res.data;
      }
      setCourses(coursesUser);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [idUser]);

  const handleCourseCreated = () => {
    fetchCourses();
  };

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
      <Container
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box display="flex" gap="10%" width="100%" height="100%">
          {/* Formulario de creación de curso (solo si no hay idUser) */}
          {!idUser && (
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                maxHeight: "fit-content", // No crece más de lo necesario
              }}
            >
              <CardContent>
                <CreateCourseForm onCourseCreated={handleCourseCreated} />
              </CardContent>
            </Card>
          )}
  
          {/* Cargando... */}
          {loading ? (
            <Box
              sx={{
                flex: 1, // Ocupa todo el espacio disponible
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            // Lista de cursos
            <Card
              sx={{
                flex: 1, // Toma el espacio disponible
                borderRadius: 3,
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent
                sx={{
                  flex: 1, // Permite que la lista crezca dentro del Card sin overflow
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                  Courses
                </Typography>
                <Box
                  sx={{
                    flex: 1, // Expande la lista dentro del CardContent
                    overflow: "auto", // Permite scroll si hay muchos cursos
                  }}
                >
                  {courses.map((course: Course) => (
                    <CourseCard key={course.id} course={course} onUpdated={fetchCourses} />
                  ))}
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>
      </Container>
  );
}

export default CoursesList;
