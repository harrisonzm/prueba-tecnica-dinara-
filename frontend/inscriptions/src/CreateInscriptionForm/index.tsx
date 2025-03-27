import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  MenuItem,
  Button,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { Course, Inscription, User } from '../utils/index.types';

export interface InscriptionForm{
  onCreation: ()=>void;
}

export const CreateInscriptionForm: React.FC<InscriptionForm> = ({onCreation}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [idUser, setIdUser] = useState<string>('');
  const [idCourse, setIdCourse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      if (users.length === 0 && courses.length === 0) {
        const [usersRes, coursesRes] = await Promise.all([
          axios.get<User[]>('http://localhost:3000/api/users/student'),
          axios.get<Course[]>('http://localhost:3000/api/courses'),
        ]);
        if (usersRes.data.length > 0) setUsers(usersRes.data);
        if (coursesRes.data.length > 0) setCourses(coursesRes.data);
      }
    } catch (err) {
      console.error('Error fetching users or courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (users.length === 0 && courses.length === 0) {
      fetchData();
    }
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> , type:string)=>{
    if(type ==='course') setIdCourse(e.target.value);
    if(type === 'user') setIdUser(e.target.value);
    if(error) setError(false);
    if(success) setSuccess(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res:AxiosResponse<Inscription[]> = await axios.get<Inscription[]>(`http://localhost:3000/api/courses/inscriptions/?idUser=${idUser}&idCourse=${idCourse}`);
      if(res.data.length === 0){
        await axios.post<Inscription>(`http://localhost:3000/api/courses/inscriptions/`, {idUser, idCourse});
        onCreation();
      }
    } catch (err) {
      setError(true);
    }
  };
  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Formulario de Inscripción
      </Typography>
      {error&&<Alert severity="warning">EL usuario ya está Inscrito al curso </Alert>}
      {success&&<Alert severity="success">EL usuario se ha Inscrito al curso </Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          select
          label="Usuarios"
          value={idUser}
          onChange={(e) => onChange(e,'user')}
          fullWidth
          margin="normal"
          required
        >
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.fullName}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Cursos"
          value={idCourse}
          onChange={(e) => onChange(e,'course')}
          fullWidth
          margin="normal"
          required
        >
          {courses.map((course) => (
            <MenuItem key={course.id} value={course.id}>
              {course.name} (Limite: {course.limit}, Inscritos: {course.students})
            </MenuItem>
          ))}
        </TextField>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={error}
        >
          Enviar
        </Button>
      </form>
    </Container>
  );
};

export default CreateInscriptionForm;
